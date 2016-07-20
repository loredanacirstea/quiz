import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Questions from './questions';


export const getAnswer = new ValidatedMethod({
  name: 'questions.getAnswer',
  validate: new SimpleSchema({
    questionId: { type: String },
  }).validator(),
  run({ questionId }) {
    const q = Questions.findOne(questionId);
    if(!q)
      throw new Meteor.Error('questions.getAnswer.null',
        'There is no question with _id=' + questionId);
    return {
      index: q.value,
      value: q.answers[q.value]
    };
  }
});
