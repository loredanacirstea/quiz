import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router'
import Questions from '../../api/questions/questions.js';
import { createContainer } from 'meteor/react-meteor-data';
import QuestionsComponent from './QuestionsComponent.jsx';
import './QuestionsContainer.less';

export default QuestionsContainer = createContainer(({ params, location }) => {
  const qHandle = Meteor.subscribe('questions');
  const loading = !qHandle.ready();
  const questions = Questions.find({}, {sort: {order: 1}}).fetch();
  const notEmpty = !loading && questions.length > 0;
  const no = parseInt(params.no || 0);
  const refresh = location.query.refresh ? true : false;
  const maxNo = questions.length;
  if(!no && no != 0)
    browserHistory.push('/');
  return {
    questions,
    notEmpty,
    no,
    maxNo,
    refresh,
    connected: Meteor.status().connected,
  };
}, QuestionsComponent);
