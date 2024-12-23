import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Switch, View, ActivityIndicator, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { LayoutAnimator } from '../../helper/layout-animator';
import { ITvShow, ITvShowDetails } from '../../types/tv';
import { TVShowService } from '../../services/tv-show';
import { Poster } from '../../components/poster.component';
import InputField from '../../uikit/input/input.component';
import { useDebouncedCallback } from '../../hooks';
import routes from '../../constants';

export type HomeScreenProps = {};

export const TvShowScreen = ({ navigation }: any): React.JSX.Element => {

  const [tvShows, setTvShows] = useState<ITvShow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredMovies, setFilteredMovies] = useState<ITvShow[]>(tvShows);
  const [showTopTvShow, setShowTopTvShow] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loadingOverlay, setLoadingOverlay] = useState(false);

  useEffect(() => {
    const allMovies: ITvShow[] = [...tvShows];
    if (showTopTvShow) {
      const filteredMoviesByVoteAverage: ITvShow[] = allMovies.filter((movie: ITvShow) => movie.vote_average > 8);
      LayoutAnimator.animateNext();
      setFilteredMovies(filteredMoviesByVoteAverage);
    } else {
      setFilteredMovies(allMovies);
    }
  }, [tvShows, showTopTvShow]);
  // ----------------

  const debouncedFetchMovies = useDebouncedCallback(() => {
    if (searchText.length === 0 && tvShows.length > 0) {
      setFilteredMovies(tvShows);
      setShowTopTvShow(false);
      return;
    }
    const matchedMovies = [...tvShows].filter((movie: ITvShow) => movie.name.toLowerCase().includes(searchText.toLowerCase()));
    LayoutAnimator.animateNext();
    setFilteredMovies(matchedMovies);
  }, [searchText]);
  // ----------------

  useEffect(() => {
    debouncedFetchMovies();
  }, [debouncedFetchMovies, searchText]);
  // ----------------

  const fetchMovies = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const result = await TVShowService.getTvShowList();
      const sortedMovies = result.sort((a, b) => { return new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime(); });
      LayoutAnimator.animateNext();
      setTvShows(sortedMovies);
      setFilteredMovies(sortedMovies);
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  }, []);
  // ----------------

  const onTvShowPressed = useCallback(async (id: number) => {
    try {
      setLoadingOverlay(true);
      const result: ITvShowDetails | undefined = await TVShowService.getTvSDetails(id);
      if (result) {
        navigation.navigate(routes.MOVIE_DETAILS, { id: result.id, name: result.name, overview: result.overview, genres: result.genres, poster_path: result.poster_path, release_date: result.first_air_date, vote_average: result.vote_average });
        setLoadingOverlay(false);
      }
    } catch {
      setLoadingOverlay(false);
    }
  }, [navigation]);
  // ----------------

  const renderTVShow = useCallback((tv: any) => {
    const props: ITvShow = tv.item;
    return <Poster id={props.id} title={props.name} vote_average={props.vote_average} date={props.first_air_date} poster_path={props.poster_path} onPress={onTvShowPressed} />;
  }, [onTvShowPressed]);
  // ----------------

  const keyExtractorMovie = useCallback((movie: ITvShow) => {
    return `${movie.id}`;
  }, []);
  // ----------------

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  // ----------------

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.moviesContainer}>TV Show Section</Text>
      <View style={styles.switchBtn}>
        {/* Top Rated Movies */}
        <View style={styles.topRatedMoviesContainer}>
          <Text>Show top rated tv show (above 8.0)</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FF6E46' }}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setShowTopTvShow}
            value={showTopTvShow}
          />
        </View>
        {/* Search for Movie */}
        <View style={styles.searchContainer}>
          <InputField value={searchText} onChangeText={setSearchText} placeholder="Search For tv show .." />
        </View>
      </View>
      {/* Movies List */}
      {
        loading ? <ActivityIndicator size="large" /> :
          error ?
            <Text style={styles.moviesContainer}>Failed to fetch movies ...</Text>
            :
            <FlatList
              data={filteredMovies}
              keyExtractor={keyExtractorMovie}
              renderItem={renderTVShow}
            />
      }
      <View style={styles.separator} />
      {
        loadingOverlay &&
        <View style={styles.overlayContainer}>
          <ActivityIndicator size={'large'} color={'white'} />
        </View>
      }
    </SafeAreaView>
  );
  // ----------------------------------------------------------------------------------------
};

// Styles ---------------------
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  switchBtn: {
    paddingLeft: 18,
    paddingBottom: 18,
  },
  moviesContainer: {
    paddingVertical: 12,
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: '800',
  },
  topRatedMoviesContainer: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
  },
  searchContainer: {
    width: '95%',
    marginTop: 14,
  },
  separator: {
    paddingTop: 160,
  },
  overlayContainer: {
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    backgroundColor: 'background: rgba(0,0,0,0.5)',
  },
});
// ------------------------------------------------------------------------------------------
