import { Meteor } from 'meteor/meteor';
import Questions from '../questions';

Meteor.publish('questions', function() {
  return Questions.find({}, {fields: { value: false}});
});