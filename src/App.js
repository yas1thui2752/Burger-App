import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';


class  App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        
          {/* <BurgerBuilder />
          <Checkout /> */}
        </Layout>
      </div>
    );
  }
}

export default App;
