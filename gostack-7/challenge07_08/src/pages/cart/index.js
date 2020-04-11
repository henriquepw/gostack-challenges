import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

function Cart() {
  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((final, next) => final + next.price * next.amount, 0)
    )
  );

  const dispatch = useDispatch();

  function increment(product, qtd = 1) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + qtd));
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
              <RemoveButton
                onPress={() => dispatch(CartActions.removeFromCart(item.id))}
              >
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

export default Cart;
