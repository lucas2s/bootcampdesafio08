import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { darken } from 'polished';

export const Container = styled.View`
  flex: 1;
  background: #191920;
`;

export const ListProduct = styled.FlatList.attrs({
  showsHorizontalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Product = styled.View`
  background: #fff;
  width: 220px;
  height: 338px;
  margin-left: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #707070;
`;

export const ProductImage = styled.Image`
  height: 200px;
  width: 200px;
`;
export const ProductTitle = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 16px;
  text-align: left;
  line-height: 20px;
  font-family: Roboto;
`;
export const ProductPrice = styled.Text`
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  font-family: Roboto;
`;

export const AddCart = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  align-content: space-between;
  margin-top: auto;
  width: 200px;
  height: 42px;
  background: #7159c1;
  border-radius: 4px;
  border: 1px solid #979797;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const ProductAdd = styled.View`
  align-items: center;
  width: 150px;
`;

export const NameButton = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

export const Amount = styled.Text`
  font-size: 14px;
  color: #fff;
`;

export const ProductAmount = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${darken(0.03, '#7159c1')};
  width: 50px;
  height: 100%;
`;
