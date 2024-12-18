import React, { useState, memo, useCallback } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';


export type ProductProps = {
  title: string;
  price: number;
  image: string;
  description: string;
};

export const Product = memo((props: ProductProps) => {

  const { title, price, image, description } = props;
  // ---------------------

  const [liked, setLiked] = useState<boolean>(false);
  // ---------------------

  const handleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  // ---------------------

  const likeBtnStyle = {
    ...styles.likeBtn,
    backgroundColor: liked ? '#FF6E46' : 'gray',
  };
  // ---------------------

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image src={image} resizeMode="cover" style={styles.image} />

      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.titleText} numberOfLines={1}>{title || 'No Title'}</Text>

        {/* Description */}
        <Text style={styles.descText} numberOfLines={2}>{description || 'No description'}</Text>

        <View style={styles.actionsContainer}>
          {/* Price */}
          <Text style={styles.priceText} numberOfLines={2}>{`${price || '-'} AED`}</Text>
          <TouchableOpacity onPress={handleLike} style={likeBtnStyle}>
            <Text style={styles.likeText}>{liked ? 'Liked' : 'Like'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  // ----------------------------------------------------------------------------------------
});

// Styles ---------------------
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: '#c7c7c7',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 8
  },
  image: {
    width: '28%',
    borderRadius: 10,
  },
  contentContainer: {
    width: '62%',
    padding: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
  },
  descText: {
    fontSize: 12,
    fontWeight: '500',
    paddingTop: 4,
    color: 'gray',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6E46',
  },
  likeBtn: {
    width: 55,
    height: 22,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
// ------------------------------------------------------------------------------------------
