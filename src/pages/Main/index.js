import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/modules/cart/actions';
import {
  Container,
  ListProduct,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddCart,
  NameButton,
  ProductAdd,
  ProductAmount,
  Amount,
} from './styles';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

class Main extends Component {
  state = {
    products: [],
    loading: false,
  };

  static propTypes = {
    addToCartRequest: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products, loading } = this.state;

    const { amount } = this.props;

    return (
      <Container>
        <ListProduct
          horizontal
          data={products}
          keyExtractor={product => String(product.id)}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image }} />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>{item.priceFormatted}</ProductPrice>
              <AddCart
                loading={loading}
                onPress={() => this.handleAddProduct(item.id)}
              >
                <ProductAmount>
                  <Icon name="add-shopping-cart" color="#FFF" size={16} />
                  <Amount> {amount[item.id] || 0} </Amount>
                </ProductAmount>
                <ProductAdd loading={loading} onPress={this.handleAddUser}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <NameButton>ADICIONAR</NameButton>
                  )}
                </ProductAdd>
              </AddCart>
            </Product>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
