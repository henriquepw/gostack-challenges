import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const data = await AsyncStorage.getItem('@GoMarketplace:products');

      try {
        if (data) setProducts([...JSON.parse(data)]);
      } catch (err) {
        console.log(err);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    async function saveProducts(): Promise<void> {
      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(products),
      );
    }

    saveProducts();
  }, [products]);

  const addToCart = useCallback(async (product: Omit<Product, 'quantity'>) => {
    setProducts(state => {
      const findProduct = state.find(item => item.id === product.id);

      if (findProduct) {
        findProduct.quantity += 1;

        return state.map(item => {
          if (item.id === product.id) {
            return findProduct;
          }

          return item;
        });
      }

      return [...state, { ...product, quantity: 1 }];
    });
  }, []);

  const increment = useCallback(async id => {
    setProducts(state => {
      return state.map(product => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }

        return product;
      });
    });
  }, []);

  const decrement = useCallback(async id => {
    setProducts(state => {
      return state.map(product => {
        if (product.id === id) {
          const quantity = product.quantity > 0 ? product.quantity - 1 : 0;

          return {
            ...product,
            quantity,
          };
        }

        return product;
      });
    });
  }, []);

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
