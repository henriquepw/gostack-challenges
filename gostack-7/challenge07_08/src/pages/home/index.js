import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/modules/cart/actions';
import api from '../../services/api';

import {
  Container,
  ProductList,
  Product,
  ProductImage,
  Title,
  Price,
  AddButton,
  ProductAmount,
  Amount,
  ButtonText,
} from './styles';
import { formatPrice } from '../../util/format';

function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((sum, product) => {
      sum[product.id] = product.amount;
      return sum;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
      const res = await api.get('products');
      setProducts(res.data);
    }

    getProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <Container>
      <ProductList
        data={products}
        keyExtractor={product => String(product.id)}
        renderItem={({ item }) => (
          <Product>
            <ProductImage source={{ uri: item.image }} />
            <Title>{item.title}</Title>
            <Price>{formatPrice(item.price)}</Price>
            <AddButton onPress={() => handleAddProduct(item.id)}>
              <ProductAmount>
                <Icon name="add-shopping-cart" color="#FFF" size={20} />
                <Amount>{amount[item.id] || 0}</Amount>
              </ProductAmount>

              <ButtonText>Adicionar ao carrinho</ButtonText>
            </AddButton>
          </Product>
        )}
      />
    </Container>
  );
}

export default Home;
