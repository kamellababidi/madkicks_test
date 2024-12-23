import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IMovieGenre } from '../../types/movie';
import { store } from '../../store';
import { addPoster, removePoster } from '../../store/poster/slice';
import { useSelector } from 'react-redux';
import { IPoster } from '../../store/poster/types';

export type MovieDetailsScreenProps = {
  movieId: number;
};

export const MovieDetailsScreen = ({ route }: any): React.JSX.Element => {

  const posters: IPoster[] = useSelector((state: any) => state.poster).posters;
  // ----------------

  const { id, name, poster_path, overview, genres, release_date, vote_average } = route.params;
  // ---------------------

  const addPosterToFavourite = useCallback(() => {
    store.dispatch(addPoster({
      id: id,
      title: name,
      vote_average: vote_average,
      release_date: release_date,
      poster_path: poster_path,
    }));
  }, [id, name, poster_path, release_date, vote_average]);
  // ---------------------

  const deletePosterFromFavourite = useCallback(() => {
    store.dispatch(removePoster(id));
  }, [id]);
  // ---------------------

  const isPostierBookmarked = () => {
    for (const poster of posters) {
      if (poster.id === id) {
        return true;
      }
    }
    return false;
  };
  // ---------------------

  const bookmarkBtnStyle = {backgroundColor: isPostierBookmarked() ? 'gray' : '#FF6E46'};

  return (
    <React.Fragment>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Poster Image */}
        <Image style={styles.posterImage} src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.titleText}>{name}</Text>
          {/* Overview */}
          <Text style={styles.decText}>{overview}</Text>
          {/* genres */}
          <View style={styles.rowContainer}>
            <Text style={styles.name}>Genres: </Text>
            <Text style={styles.text}>{genres.map((genre: IMovieGenre) => genre.name).join(', ')}</Text>
          </View>
          {/* vote_average */}
          <View style={styles.rowContainer}>
            <Text style={styles.name}>Vote Average: </Text>
            <Text style={styles.text}>{vote_average} / 10</Text>
          </View>
          {/* Release Date */}
          <View style={styles.rowContainer}>
            <Text style={styles.name}>Release Date: </Text>
            <Text style={styles.text}>{release_date}</Text>
          </View>
        </View>
      </ScrollView>
      {/* Add To Favourite Btn */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={[styles.btn, bookmarkBtnStyle]} onPress={() => isPostierBookmarked() ? deletePosterFromFavourite() : addPosterToFavourite()}>
          <Text style={styles.btnText}>{isPostierBookmarked() ? 'Rmove From Favourite' : 'Add To Favourite'}</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
  // ----------------------------------------------------------------------------------------
};

// Styles ---------------------
const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('screen').height,
  },
  posterImage: {
    width: '100%',
    height: 280,
    borderRadius: 14,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    paddingVertical: 16,
  },
  decText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'gray',
    paddingVertical: 2,
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
  },
  name: {
    fontSize: 14,
    color: '#FF6E46',
    fontWeight: '600',
  },
  text: {
    fontSize: 14,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 24,
  },
  btn: {
    width: '90%',
    height: 48,
    alignSelf: 'center',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
  },
});
// ------------------------------------------------------------------------------------------
