import React, { Component } from 'react';
import {connect} from 'react-redux'
import Completed from '../../completed/presentation/completed'
import MadlibFormContainer from '../container/madlib_form_container'
import IntroContainer from '../../intro/container/intro_container'
import {Fade, Bounce, Zoom, Roll, Flip} from 'react-reveal'

const regex = /%&(.*?)&%/gi;

class MadlibForm extends Component {

  constructor(props) {
    super(props)
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const fields = this.getFormFieldsFromMadlib();
    const initialized = {};
    initialized[fields[0]] = true;
    return ({
      fields,
      userInput: {},
      initialized,
      flagged: false,
      errorMessage: "",
      key: 0,
      submitted: false
    })
  }

  componentWillReceiveProps = (newProps) => ((newProps.status === 1 && this.props.status === 2)
    ? this.setState(this.getInitialState()) : null)

  getFormFieldsFromMadlib = () => {
    const fields = [];
    let result = regex.exec(this.props.madlib);
    while (result) {
      // null represents value before user input
      fields.push(result[1]);
      result = regex.exec(this.props.madlib);
    }
    return fields;
  };

  submitDisabled = () => {
    const {fields, userInput} = this.state;
      // submit disabled if not all fields have been touched
    if (Object.keys(userInput).length !== fields.length) return true;
    const errorMessage = this.getErrorMessage();
    return Object.keys(errorMessage).filter(field => errorMessage[field].length).length;
  };

  validateField = (fieldName, value) => {
    let errorList = "";

    // default validation: value cannot be blank.
    if (!value || !this.state.userInput[fieldName]) {
      errorList = (
        'Field cannot be blank'
      );
    }
    switch(fieldName) {
      case "word ending with ly":
        if((!value || value.length < 3 || value.slice(-2) !== "ly") && !errorList) {
          errorList = (
            'You must enter a word ending in -"ly"'
          )
        }
      break;
      case "number":
      if(!value) {
        errorList = "You must enter a number"
      }
      default:
      break;
    }
    return errorList;
  };

  getErrorMessage = () => {
    const { fields, initialized, userInput} = this.state;
    return Object.keys(initialized).reduce(
      (acc, fieldName) =>
        acc || this.validateField(fieldName, userInput[fieldName]), ""
    );
  };

  handleKeyPress = (e, field, index) => {
    const {initialized, fields, userInput} = this.state
    if(e.key === 'Enter' || e.key === 'tab') {
      const errorMessage = this.getErrorMessage();
      console.log(errorMessage)
      if(errorMessage)
      {
        this.setState({errorMessage, flagged: true})
          return null;
      }
      if(field != fields[fields.length-1]) {
        this.setState({userInput: Object.assign(userInput,
          {[field]: e.target.value}), flagged: false
        })
        let newInitialized = {};
        newInitialized[fields[index+1]] = true;
        this.setState({
          initialized: Object.assign(initialized,
            newInitialized)
        })
      } else {
        this._onSubmit()
      }
    }
  }

  _onChange = (e, field) => {
    const {fields, userInput, errorMessage} = this.state;
    this.setState({
      userInput: Object.assign(userInput, {[field]: e.target.value}), flagged: false
    })
  }

  _onSubmit = () => {
    const {userInput, fields} = this.state;
    const errorList = this.getErrorMessage()
    if(!userInput[fields[fields.length - 1]]) {
      this.setState({errorMessage: "Please fill out last field."})
    }
    const errorsAppeared = Object.keys(errorList).reduce(
      ((acc, cur) => acc && errorList[cur].length), true
    )
    !errorsAppeared ? this.setState(errorList) : this.props.submitForm()
  }

  _initialize = () => {
    const {initialized} = this.state;
  }

  editable = (field, index) => {
    const {userInput, fields, initialized} = this.state;
    return (userInput[field] && (index < fields.length - 1) &&
      initialized[fields[index + 1]])
  }

  renderMadlibForm = () => {
    const {fields, userInput, errorMessage, key, initialized, flagged} = this.state;
    return (
      <div className='madlib-form'>
        <h1><div className="animated fadeIn">Flocabulary Madlib</div></h1>
          {
            fields.map(
              (field, index) => initialized[field] ? (
                <div className={"madlib-line " + (this.editable(field, index) ? "animated fadeIn" : "active")}key={index}>
                  <label>{field}: { this.editable(field, index) ? <span>{userInput[field]}</span> :
                    <input type={(field === "number") ? "number" : "text"}
                    ref={input => input && input.focus()}
                      value={userInput[field] || ''}
                      onClick={this._initialize}
                      onChange={  e => this._onChange(e, field) }
                      onKeyDown={ e => this.handleKeyPress(e, field, index) }
                    /> }
                  </label>
                </div>
              ) : null
            )
          }
          <span className='error'>
              <Fade bottom collapse when={flagged}>
              {errorMessage}
              </Fade>
          </span>

          <div>
            <Flip left when={!this.submitDisabled()}>
              <button className={"submit-button" + (this.submitDisabled() ? null : " pointer")}
                onClick={this._onSubmit}><b>Make your madlib</b></button>
            </Flip>
            </div>
      </div>
    );
  };



  render = () => {
    const {fields, userInput} = this.state;
    const {madlib, showForm, status} = this.props;
    return (
      (status === 2)
      ?  <Completed
        back={showForm}
        userInput={userInput}
        fields={fields}
        madlib={madlib}
        />
      : <div className="wrapper">{this.renderMadlibForm()}</div>
    );
  }
}

export default MadlibForm;
