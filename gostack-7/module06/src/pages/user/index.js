import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {
  static navigationOptions = {
    title: 'Perfil',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    refreshing: false,
    page: 1,
  };

  async componentDidMount() {
    this.load(1);
  }

  load = async page => {
    const { stars } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const res = await api.get(`/users/${user.login}/starred?page=${page}`);

    if (res.data.length > 0) {
      this.setState({
        stars: [...stars, ...res.data],
        page: page + 1,
        loading: false,
        refreshing: false,
      });
    }
  };

  loadMore = async () => {
    const { page } = this.state;
    this.load(page);
  };

  handleRepository = repository => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { repository });
  };

  refreshList = async () => {
    await this.setState({ refreshing: true, stars: [] });
    this.load(1);
  };

  render() {
    const { stars, loading, refreshing } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <Loading />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleRepository(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
