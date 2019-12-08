import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
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

export default function Main() {
  const [products, setProducts] = useState([]);
  const [loading] = useState();

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;
      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

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
              onPress={() => handleAddProduct(item.id)}
            >
              <ProductAmount>
                <Icon name="add-shopping-cart" color="#FFF" size={16} />
                <Amount> {amount[item.id] || 0} </Amount>
              </ProductAmount>
              <ProductAdd loading={loading}>
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
