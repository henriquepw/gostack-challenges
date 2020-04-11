import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

// import { Container } from './styles';

const Repository = ({ navigation }) => {
  const repo = navigation.getParam('repository');

  return <WebView source={{ uri: repo.html_url }} style={{ flex: 1 }} />;
};

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

Repository.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repository').name,
});

export default Repository;
