import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import About from './routes/About';
import Home from './routes/Home';
import Ability from './routes/Ability';
import ServerList from './routes/ServerList';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about/:id" component={About} />
        <Route path="/ability/:id" component={Ability} />
        <Route path="/serverList" component={ServerList} />

      </Switch>
    </Router>
  );
}

export default RouterConfig;
