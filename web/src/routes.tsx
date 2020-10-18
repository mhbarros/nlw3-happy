import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Landing from './pages/Landing';
import Home from './pages/Home';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path={'/'} component={Landing} exact />
      <Route path={'/home'} component={Home} />
    </Switch>
  </BrowserRouter>
)

export default Routes;