import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  align-content: center;
  align-content: space-between;
  height: 64px;
  background: #141419;
  padding: 0 20px;
`;

export const Logo = styled.TouchableOpacity`
  width: 185px;
  height: 24px;
`;

export const LogoImg = styled.Image`
  width: 185px;
  height: 24px;
`;

export const Cart = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  align-content: center;
  padding-right: 8px;
`;

export const Item = styled.Text`
  margin-bottom: -9px;
  right: -9px;
  font-size: 12px;
  background: #7159c1;
  padding: 4px 8px;
  border-radius: 16px;
  color: #fff;
`;
