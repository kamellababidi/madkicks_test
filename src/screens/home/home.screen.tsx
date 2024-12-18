import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets, EdgeInsets } from 'react-native-safe-area-context';

import { Product } from '../../components/product.component';

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export type HomeScreenProps = {};

export const HomeScreen = (): React.JSX.Element => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [laoding, setLoading] = useState<boolean>(true);
  // ---------------------

  const safeAreaInsets: EdgeInsets = useSafeAreaInsets();
  // ---------------------

  useEffect(() => {
    fetProducts();
  });
  // ---------------------

  const fetProducts = useCallback(async () => {
    try {
      // Fetch products from API
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result: IProduct[] = await response.json();
      setProducts(result);
      setLoading(false);
    } catch {
      setLoading(false);
      setShowError(true);
    }
  }, []);
  // ---------------------

  const renderItem = useCallback((item: any) => {
    const productItem: IProduct = item.item as IProduct;
    return <Product title={productItem.title} description={productItem.description} price={productItem.price} image={productItem.image} />
  }, []);
  // ---------------------

  const keyExtractor = useCallback((item: IProduct) => {
    return `${item.id}`;
  }, []);
  // ---------------------

  const containerStyle = {
    ...styles.container,
    paddingTop: safeAreaInsets.top,
  };
  // ---------------------

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>PSI Test</Text>
      {
        showError ?
          // Error
          <View>
            <Text style={styles.errorText}>Error fetching products ...</Text>
          </View>
          :
          laoding ?
            // Loading
            <View>
              <ActivityIndicator size={'large'} />
            </View>
            :
            // Products List
            <FlatList
              data={products}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
      }

    </View>
  );
  // ----------------------------------------------------------------------------------------
};

// Styles ---------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    paddingVertical: 16,
  },
  errorText: {
    fontSize: 18,
    paddingVertical: 16,
  },
});
// ------------------------------------------------------------------------------------------
