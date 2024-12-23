import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IMovieProps {
  id: number;
  title: string;
  vote_average: number;
  date: string;
  poster_path: string;
  onPress?: (id: number) => void;
}

export const Poster = memo((props: IMovieProps) => {

  const { id, title, vote_average, date, poster_path, onPress} = props;
  // ---------------------

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress?.(id)}>

      {/* Image */}
      <Image style={styles.posterImage} src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />

      <View style={styles.contentContainer}>

        {/* Title */}
        <Text numberOfLines={1} style={styles.titleText}>{title}</Text>

        {/* Vote Average */}
        <Text numberOfLines={1} style={styles.voteAverage}>{vote_average}</Text>

        {/* Release Date */}
        <Text numberOfLines={1} style={styles.releaseDate}>{date}</Text>

      </View>

    </TouchableOpacity>
  );
  // ----------------------------------------------------------------------------------------
});

// Styles ---------------------
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    height: 140,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 8,
    alignSelf: 'center',
    padding: 8,
    gap: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
  },
  releaseDate: {
    fontSize: 11,
    color: 'gray',
  },
  voteAverage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF6E46',
  },
  posterImage: {
    alignSelf: 'center',
    height: '97%',
    borderRadius: 10,
    width: '28%',
  },
});
// ------------------------------------------------------------------------------------------
