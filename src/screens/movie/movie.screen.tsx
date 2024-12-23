import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Switch, View, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { IMovie, IMovieDetails } from '../../types/movie';
import { LayoutAnimator } from '../../helper/layout-animator';
import { MovieService } from '../../services/movie.service';
import { Poster } from '../../components/poster.component';
import InputField from '../../uikit/input/input.component';
import { useDebouncedCallback } from '../../hooks';
import routes from '../../constants';

export type MovieScreenProps = {};

export const MovieScreen = ({ navigation }: any): React.JSX.Element => {

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>(movies);
  const [showTopMovies, setShowTopMovies] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const allMovies: IMovie[] = [...movies];
    if (showTopMovies) {
      const filteredMoviesByVoteAverage: IMovie[] = allMovies.filter((movie: IMovie) => movie.vote_average > 8);
      LayoutAnimator.animateNext();
      setFilteredMovies(filteredMoviesByVoteAverage);
    } else {
      setFilteredMovies(allMovies);
    }
  }, [movies, showTopMovies]);
  // ----------------

  const debouncedFetchMovies = useDebouncedCallback(() => {
    if (searchText.length === 0 && movies.length > 0) {
      setFilteredMovies(movies);
      setShowTopMovies(false);
      return;
    }
    const matchedMovies = [...movies].filter((movie: IMovie) => movie.title.toLowerCase().includes(searchText.toLowerCase()));
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
      const result = await MovieService.getMoviesList();
      const sortedMovies = result.sort((a, b) => { return new Date(b.release_date).getTime() - new Date(a.release_date).getTime(); });
      LayoutAnimator.animateNext();
      setMovies(sortedMovies);
      setFilteredMovies(sortedMovies);
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  }, []);
  // ----------------

  const onMoviePressed = useCallback(async (id: number) => {
    try {
      const result: IMovieDetails | undefined = await MovieService.getMovieDetails(id);
      if (result) {
        navigation.navigate(routes.MOVIE_DETAILS, {id: result.id, name: result.title, overview: result.overview, genres: result.genres, poster_path: result.poster_path, release_date: result.release_date, vote_average: result.vote_average});
      }
    } catch {}
  }, [navigation]);
  // ----------------

  const renderMovie = useCallback((movie: any) => {
    const props: IMovie = movie.item;
    return <Poster id={props.id} title={props.title} vote_average={props.vote_average} date={props.release_date} poster_path={props.poster_path} onPress={onMoviePressed}/>;
  }, [onMoviePressed]);
  // ----------------

  const keyExtractorMovie = useCallback((movie: IMovie) => {
    return `${movie.id}`;
  }, []);
  // ----------------

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  // ----------------

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.moviesContainer}>Movies Section</Text>
      <View style={styles.switchBtn}>
        {/* Top Rated Movies */}
        <View style={styles.topRatedMoviesContainer}>
          <Text>Show top rated movies (above 8.0)</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FF6E46' }}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setShowTopMovies}
            value={showTopMovies}
          />
        </View>
        {/* Search for Movie */}
        <View style={styles.searchContainer}>
          <InputField value={searchText} onChangeText={setSearchText} placeholder="Search For Movie .." />
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
              renderItem={renderMovie}
            />
      }
      <View style={styles.separator} />
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
});
// ------------------------------------------------------------------------------------------
