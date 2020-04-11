import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  padding: 16px;
  margin: 16px;
`;

export const ProductList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  max-height: 300px;
`;

export const Total = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  padding: 0px 16px;
  padding-top: 16px;
`;

export const TotalText = styled.Text`
  color: #999;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 3px;
`;

export const TotalPrice = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;

export const OrderButton = styled(RectButton)`
  justify-content: center;
  align-items: center;

  background: #7159c1;
  border-radius: 4px;
  height: 36px;
  margin-top: 16px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const Product = styled.View`
  flex-direction: row;
`;

export const ProductImage = styled.Image`
  width: 90px;
  height: 90px;
  margin: 10px;
`;

export const ProductView = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ProductTitle = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 16px;
  color: #333;
`;

export const ProductPrice = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const RemoveButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  margin-right: 10px;
`;

export const Amount = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: #eee;
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 10px;
`;

export const Buttons = styled.View`
  flex-direction: row;
`;

export const AmountText = styled.Text`
  border: 1px solid rgba(0, 0, 0, 0.03);
  border-radius: 4px;

  font-weight: bold;
  text-align: center;
  margin: auto 5px;
  padding: 3px 15px;
  background: #fff;
  color: #333;
`;

export const UpdateButton = styled.TouchableOpacity`
  background: transparent;
  margin: 5px;
  border-radius: 10px;
`;

export const Subtotal = styled.Text`
  background: transparent;
  margin: 5px;
  font-size: 18px;
  font-weight: bold;
`;
