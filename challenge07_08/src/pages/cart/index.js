import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';

import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  ProductList,
  Total,
  TotalText,
  TotalPrice,
  OrderButton,
  ButtonText,
  Product,
  ProductImage,
  ProductView,
  ProductTitle,
  ProductPrice,
  RemoveButton,
  Amount,
  Buttons,
  AmountText,
  UpdateButton,
  Subtotal,
} from './styles';

function Cart({ cart, total, updateAmountRequest, removeFromCart }) {
  function increment(product, qtd = 1) {
    updateAmountRequest(product.id, product.amount + qtd);
  }

  return (
    <Container>
      <ProductList
        data={cart}
        keyExtractor={product => String(product.id)}
        renderItem={({ item }) => (
          <>
            <Product>
              <ProductImage source={{ uri: item.image }} />
              <ProductView>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPrice>{item.priceFormatted}</ProductPrice>
              </ProductView>
              <RemoveButton onPress={() => removeFromCart(item.id)}>
                <MaterialIcon
                  name="remove-shopping-cart"
                  size={20}
                  color="#7159c1"
                />
              </RemoveButton>
            </Product>
            <Amount>
              <Buttons>
                <UpdateButton onPress={() => increment(item, -1)}>
                  <AntIcon name="minuscircleo" size={20} color="#7159c1" />
                </UpdateButton>
                <AmountText>{item.amount}</AmountText>
                <UpdateButton onPress={() => increment(item)}>
                  <AntIcon name="pluscircleo" size={20} color="#7159c1" />
                </UpdateButton>
              </Buttons>
              <Subtotal>{item.subtotal}</Subtotal>
            </Amount>
          </>
        )}
      />
      <Total>
        <TotalText>TOTAL</TotalText>
        <TotalPrice>{total}</TotalPrice>
      </Total>
      <OrderButton>
        <ButtonText>FINALIZAR PEDIDO</ButtonText>
      </OrderButton>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.amount * product.price),
  })),
  total: formatPrice(
    state.cart.reduce((total, next) => total + next.amount * next.price, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
