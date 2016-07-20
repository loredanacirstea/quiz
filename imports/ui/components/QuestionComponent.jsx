import React from 'react';
import { findDOMNode } from 'react-dom'

const AnswerComponent = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    selected: React.PropTypes.bool,
    correct: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
  },

  componentDidMount() {
    $(findDOMNode(this.refs.checkbox)).checkbox({
      onChecked: this.props.onSelect
    });
  },

  componentDidUpdate() {
    $(findDOMNode(this.refs.checkbox)).checkbox('refresh');
  },

  render() {
    const { text, onSelect, selected, correct, selectable } = this.props;
    const checked = selected ? "checked" : null;
    const className = `${ selectable ? `` : `read-only` } ${ checked ? `checked` : ``}`;
    
    return (
      <div className="field">
        <div className={ `ui radio checkbox ${ className }` } ref="checkbox">
        {
          checked 
            ? <input type="radio" defaultChecked="checked"/>
            : <input type="radio"/>
        }
          <label>{ text }</label>&nbsp;&nbsp;&nbsp;
          {
            correct 
              ? <i className="ui large teal checkmark icon"></i>
              : ( selected
                  ? <i className="ui large red remove icon"></i>
                  : ''
                )
          }
        </div>
      </div>
    );
      
  }
});

const AnswersComponent = React.createClass({
  propTypes: {
    answered: React.PropTypes.object,
    onSelect: React.PropTypes.func,
  },

  getInitialState() {
    return {
      selected: null
    }
  },
  onSelect(index, value) {
    const { onSelect, answered } = this.props;
    if(!answered) {
      this.setState({ selected: index });
      onSelect(index, value);
    }
    //else alert('You cannot change your answer');
  },
  render() {
    const { values, answered = {} } = this.props;
    const { selected = {}, correct = {} } = answered;
    
    // Render each Answer
    const output =  values.map((v, i) => {
      const onSelect = this.onSelect.bind(this, i, v);
      const chosen = (this.state.selected == i) || (selected.index == i);
      const ok = correct.index == i;

      if(ok && correct.value != v )
        alert('Something has gone wrong. The answers have been hijacked.');
      return (
        <AnswerComponent 
          key={ `answer_${i}` }
          text={ v }
          onSelect={ onSelect }
          selected={ chosen }
          selectable={ !correct.index }
          correct={ ok }
        />
      );
    });

    return (
      <div className="ui form isolated">
        <div className="grouped fields flexed alignT">
          <table><tbody><tr><td>
            { output}
          </td></tr></tbody></table>
        </div>
      </div>
    );
    
  }
});

 const QuestionComponent = React.createClass({
  getInitialState() {
    return {
      correct: null,
    }
  },

  onSelect(index, value) {
    this.props.setAnswer(this.props.data._id, index, value);
  },

  render() {
    const { data, answered } = this.props;
    return (
      <div className="">
        <div className="ui huge header">{ data.text }</div><br></br>
        <AnswersComponent 
          onSelect={ this.onSelect } 
          values={ data.answers } 
          answered={ answered }
        />
      </div>
    );
  }
});

export default QuestionComponent;
