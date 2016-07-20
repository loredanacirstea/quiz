import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import QuestionsContainer from '../../ui/components/QuestionsContainer.jsx';
import QuestionComponent from '../../ui/components/QuestionComponent.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={QuestionsContainer}>
      <Route path=":no" component={QuestionComponent}/>
    </Route>
  </Router>
);