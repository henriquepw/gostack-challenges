import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import logo from '../../asset/images/logo.png';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px;
`;

export const ButtonCart = styled(RectButton)`
  flex-direction: row;
  border-radius: 4px;

  align-items: center;
  background: transparent;

  padding: 10px;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})`
  height: 26;
  width: 200;
`;

export const CartAmount = styled.Text`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  margin-left: -10px;

  background: #7159c1;
  color: #fff;

  text-align: center;
  margin-top: -20px;
`;
