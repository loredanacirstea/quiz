import { Random } from 'meteor/random';
import { db } from '../../api/api';
const questions = [
  {
    text: 'How is the weather today?',
    answers: ['sunny', 'cloudy', 'rainy'],
    value: 2
  },
  {
    text: 'What is the capital of Belgium?',
    answers: ['Berlin', 'Brussels', 'Dublin'],
    value: 1
  },
  {
    text: 'What is the capital of Germany?',
    answers: ['Brussels', 'Dublin', 'Dubai', 'Berlin'],
    value: 3
  }
];

if(!db.Questions.findOne()) {
  questions.forEach((d, i) => {
    d.order = i+1;
    db.Questions.insert(d);
  });
}