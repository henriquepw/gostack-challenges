import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  padding: 16px;
`;

export const ProductList = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Product = styled.View`
  background: #fff;
  border-radius: 4px;
  width: 260px;

  padding: 20px;
  margin-right: 16px;
`;

export const ProductImage = styled.Image`
  height: 200px;
  width: 200px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: 16px;
  line-height: 20px;
  color: #333;
  margin-top: 5px;
  height: 60px;
`;

export const Price = styled.Text`
  font-size: 21px;
  font-weight: bold;
  margin: 5px 0 20px;
`;

export const AddButton = styled(RectButton)`
  flex-direction: row;
  border-radius: 4px;

  align-items: center;
  background: #7159c1;
  margin-top: auto;
`;

export const ProductAmount = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background: rgba(0, 0, 0, 0.1);
`;

export const Amount = styled.Text`
  color: #fff;
  margin-left: 5px;
`;

export const ButtonText = styled.Text`
  flex: 1;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;
