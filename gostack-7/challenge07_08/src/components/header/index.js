import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Logo, ButtonCart, CartAmount } from './styles';

function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#191920" />
      <Container>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Logo />
        </TouchableOpacity>
        <ButtonCart onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#FFF" size={26} />
          <CartAmount>{cartSize || 0}</CartAmount>
        </ButtonCart>
      </Container>
    </>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Header;
