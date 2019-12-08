import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import { Container, Logo, Cart, Item, LogoImg } from './styles';
import logo from '../../assets/logo.png';

function Header({ navigation, cartSize }) {
  return (
    <Container>
      <Logo onPress={() => navigation.navigate('Main')}>
        <LogoImg source={logo} />
      </Logo>
      <Cart onPress={() => navigation.navigate('Cart')}>
        <Item>{cartSize}</Item>
        <Icon name="shopping-basket" color="#FFF" size={24} />
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
