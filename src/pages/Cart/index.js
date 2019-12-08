import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

import {
  Container,
  ContainerProducts,
  ListCartProducts,
  Product,
  ProductDetails,
  ProductDesc,
  ProductImage,
  ProductTitle,
  ProductPrice,
  DeleteProduct,
  ProductStatus,
  DecrementProduct,
  IncrementProduct,
  ProductAmount,
  ProductSubtotal,
  ProductUpddateAmount,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  CartEmpty,
  EmptyAlert,
  Emptytext,
} from './styles';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  Cart.propTypes = {
    removeFromCart: PropTypes.func.isRequired,
    updateAmountRequest: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
  };

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      {cart.length ? (
        <ContainerProducts>
          <ListCartProducts
            data={cart}
            keyExtractor={product => String(product.id)}
            renderItem={({ item }) => (
              <Product>
                <ProductDetails>
                  <ProductImage source={{ uri: item.image }} />
                  <ProductDesc>
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductPrice>{item.priceFormatted}</ProductPrice>
                  </ProductDesc>
                  <DeleteProduct onPress={() => removeFromCart(item.id)}>
                    <Icon name="delete" color="#7159C1" size={24} />
                  </DeleteProduct>
                </ProductDetails>
                <ProductStatus>
                  <ProductUpddateAmount>
                    <DecrementProduct onPress={() => decrement(item)}>
                      <Icon name="remove" color="#7159C1" size={24} />
                    </DecrementProduct>
                    <ProductAmount value={String(item.amount)} />
                    <IncrementProduct onPress={() => increment(item)}>
                      <Icon name="add" color="#7159C1" size={24} />
                    </IncrementProduct>
                  </ProductUpddateAmount>
                  <ProductSubtotal>{item.subtotal}</ProductSubtotal>
                </ProductStatus>
              </Product>
            )}
          />
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>{total}</TotalAmount>
            <Order>
              <OrderText>FINALIZAR PEDIDO</OrderText>
            </Order>
          </TotalContainer>
        </ContainerProducts>
      ) : (
        <ContainerProducts>
          <CartEmpty>
            <Icon name="remove-shopping-cart" color="#999" size={50} />
            <EmptyAlert>Carrinho está vazio.</EmptyAlert>
            <Emptytext>
              Aproveite nossas as ofertas para adicionar produtos ao carrinho e
              deixá-lo mais colorido!
            </Emptytext>
          </CartEmpty>
        </ContainerProducts>
      )}
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
