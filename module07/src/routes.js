import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import Cart from './pages/cart';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/cart" component={Cart} />
  </Switch>
);
