import React, { useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { IPoster } from '../../store/poster/types';
import { Poster } from '../../components/poster.component';

export const FavouriteScreen = (): React.JSX.Element => {

  const posters: IPoster[] = useSelector((state: any) => state.poster).posters;
  // ----------------

  const keyExtractorPoster = useCallback((poster: IPoster) => {
    return `${poster.id}`;
  }, []);
  // ----------------

  const renderPoster = useCallback((poster: any) => {
    const props: IPoster = poster.item;
    return <Poster id={props.id} title={props.title} vote_average={props.vote_average} date={props.release_date} poster_path={props.poster_path} />;
  }, []);
  // ----------------

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.posterContainer}>Favourite Movies</Text>

      {/* Posters List */}
      <FlatList
        data={posters}
        keyExtractor={keyExtractorPoster}
        renderItem={renderPoster}
      />
      <View style={styles.separator} />
    </SafeAreaView>
  );
  // ----------------------------------------------------------------------------------------
};

// Styles ---------------------
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  posterContainer: {
    paddingVertical: 18,
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: '800',
  },
  separator: {
    paddingTop: 160,
  },
});
// ------------------------------------------------------------------------------------------
