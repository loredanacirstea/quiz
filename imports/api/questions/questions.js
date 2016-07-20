import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Questions = new Mongo.Collection('Questions');

Questions.schema = new SimpleSchema({
  _id: {
    type: String
  },
  order: {
    type: Number
  },
  text: {
    type: String
  },
  answers: {
    type: [String]
  },
  value: {
    type: Number
  }
});

Questions.attachSchema(Questions.schema);

export default Questions;