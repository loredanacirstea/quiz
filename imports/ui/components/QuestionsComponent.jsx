import React from 'react';
import { Link } from 'react-router';
import ConnectionIssueComponent from './ConnectionIssueComponent.jsx';
import NavigationComponent from './NavigationComponent.jsx';
import QuestionComponent from './QuestionComponent.jsx';
import { getAnswer } from '../../api/questions/methods';

const CONNECTION_ISSUE_TIMEOUT = 10000;

const QuestionsFinished = React.createClass({
  propTypes: {
    ok: React.PropTypes.number,
    maxNo: React.PropTypes.number,
  },

  render() {
    return (
      <div>
        Test finished.
        <QuestionStatsComponent ok={ this.props.ok} maxNo={ this.props.maxNo} />
        <div>
          <Link className="ui massive button" to='/1?refresh=true'>Try again?</Link>
        </div>
      </div>
    );
  }
});

const QuestionStatsComponent = React.createClass({
  propTypes: {
    ok: React.PropTypes.number,
    maxNo: React.PropTypes.number,
    answered: React.PropTypes.number,
  },

  render() {
    const { ok, maxNo, answered } = this.props;
    return (
      <div className="isolated">
        <div>
          { 
            Number.isInteger(answered) 
              ? <span>{ `${ answered }/${ maxNo }` }&nbsp;&nbsp;Answered</span>
              : ''
          }
        </div>
        <div>
          <span>{ ok + '/' + maxNo }</span>&nbsp;&nbsp;&nbsp;
          <span className='correct'>{ (ok*100/maxNo).toFixed(2) }%</span>&nbsp;&nbsp;&nbsp;
          <span>Correct</span>
          
        </div>
      </div>
    );
  }
})

const QuestionsComponent = React.createClass({
  propTypes: {
    questions: React.PropTypes.array,
    notEmpty: React.PropTypes.bool,
    no: React.PropTypes.number,
    maxNo: React.PropTypes.number,
    refresh: React.PropTypes.bool,
    connect: React.PropTypes.bool,
  },

  initialState() {
    return {
      answered: {},
      ok: 0,
      finish: false,
      showConnectionIssue: false
    }
  },

  getInitialState() {
    return this.initialState();
  },

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  },

  componentWillReceiveProps(props) {
    if(props.refresh)
      this.setState(this.initialState());
  },

  finishWait() {
    setTimeout(() => {
      this.setState({finish: true});
    }, 1500);
  },

  setAnswer(questionId, index, value) {
    // We are calling the client&server method that retrieves the correct answer
    getAnswer.call({
      questionId
    }, (err, correct) => {
      if(err) {
        alert(err);
      }
      else {
        let { answered, ok } = this.state;
        answered[questionId] = { correct, selected: { index, value } };
        if(index == correct.index && value == correct.value)
          ok ++;
        this.setState({ answered, ok });
      }
    });
  },

  render() {
    const { connected, loading, questions, notEmpty, no, maxNo} = this.props;
    const { answered, ok, finish, showConnectionIssue } = this.state;
    const answeredNo = Object.keys(answered).length;
    let output;

    // Questions are not loaded
    if(!notEmpty)
      return null;

    // The user has finished the test. We wait a bit until rendering QuestionsFinished
    if(!finish && answeredNo == maxNo) {
      this.finishWait();
    }

    // If '/', we show the start button
    if(!no) {
      output = (
        <Link className="ui massive button" to='/1'>Start</Link>
      );
    }
    else if(finish) {
      output = (
        <QuestionsFinished ok={ ok } maxNo={ maxNo } wait={ 3000 }/>
      );
    }
    else {
      const q = questions.find((q, i) => i == no-1);
      output = (
        <div>
          <QuestionComponent 
            key={ q._id } 
            data={ q }
            answered={ answered[q._id] }
            setAnswer= { this.setAnswer }
          />
          <NavigationComponent no={ no } maxNo={ maxNo } />
          <QuestionStatsComponent 
            maxNo={ maxNo }
            answered={ answeredNo }
            ok={ ok }
          />
          { showConnectionIssue && !connected ? <ConnectionIssueComponent /> : ''}
        </div>
      );
    }

    return (
      <div className="ui column">
        { output }
      </div>
    );
  }
});

export default QuestionsComponent;
