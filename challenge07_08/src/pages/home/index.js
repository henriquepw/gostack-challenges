import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

function Home({ addToCartRequest, amount }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function get() {
      const res = await api.get('products');
      setProducts(res.data);
    }

    get();
  }, []);

  function handleAddProduct(id) {
    addToCartRequest(id);
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

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
