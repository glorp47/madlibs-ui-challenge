import React, { Component } from 'react';
const regex = /%&(.*?)&%/gi;

class MadlibForm extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      // initialize error messages object with default value so
      // form cannot be submitted before user input
      fields: this.getFormFieldsFromMadlib(),
      errorMessages: {},
      fieldsTouched: [],
      submitted: false
    };
  };

  getFormFieldsFromMadlib() {
    const fields = {};
    let result = regex.exec(this.props.madlib);
    while (result) {
      // null represents value before user input
      fields[result[1]] = '';
      result = regex.exec(this.props.madlib);
    }
    return fields;
  };

  initializeMadlibForm() {
    this.setState(this.getInitialState());
  };

  submitDisabled() {
    const {errorMessages, fields, fieldsTouched} = this.state;
    return (
      // submit disabled if not all fields have been touched
      fieldsTouched.length !== Object.keys(fields).length ||
      // or there are error messages for fields
      Object.keys(errorMessages).filter(field => errorMessages[field].length).length
    );
  };

  validateField(fieldName, value) {
    const {fieldsTouched} = this.state;
    // don't validate untouched fields
    if (fieldsTouched.indexOf(fieldName) === -1) return;

    const errors = [];

    // default validation: value cannot be blank.
    if (!value) {
      errors.push(
        'Field cannot be blank'
      );
    }
    return errors;
  };

  setErrorMessages() {
    const {fields} = this.state;
    this.setState({
      errorMessages: Object.keys(fields).reduce(
        (errors, fieldName) => Object.assign(
          errors,
          {[fieldName]: this.validateField(fieldName, fields[fieldName])}
        ),
        {}
      )
    });
  };

  renderMadlibForm() {
    const {errorMessages, fields, fieldsTouched} = this.state;
    return (
      <div className='madlib-form'>
        <h2>Fill out the form below to create your madlib</h2>
        <form onSubmit={e => this.setState({submitted: true})}>
          {
            Object.keys(fields).map(
              field => (
                <div key={field}>
                  <label>
                    {field}: <input
                      value={fields[field]}
                      onChange={
                        e => this.setState({
                          fields: Object.assign({}, fields, {[field]: e.target.value}),
                          fieldsTouched: fieldsTouched.filter(
                            touchedField => touchedField !== field
                          ).concat([field])
                        }, this.setErrorMessages)
                      }
                    />
                  </label>
                  {
                    errorMessages[field] && errorMessages[field].map(
                      error => error && (
                        <span key={error} className='error'>
                          {error}
                        </span>
                      )
                    )
                  }
                </div>
              )
            )
          }
          <button type='submit' disabled={this.submitDisabled()}>submit</button>
        </form>
      </div>
    );
  };

  renderFilledInMadlib() {
    const {fields} = this.state;
    const {madlib} = this.props;
    return (
      <div className='madlib-filled-in'>
        {
          madlib.split('\n').map(
            (line, i) => (
              <span
                key={`madlibline${i}`}
                className='madlib-line'
              >
                {
                  line.split(regex).map(
                    chunk => (
                      <span
                        key={`${chunk}${i}`}
                        className={
                          fields[chunk]
                          ? 'user-submitted-value'
                          : ''
                        }
                      >
                        {fields[chunk] || chunk}
                      </span>
                    )
                  )
                }
              </span>
            )
          )
        }
        <button onClick={this.initializeMadlibForm}>submit</button>
      </div>
    )
  };

  render() {
    const {submitted} = this.state;
    return (
      submitted
      ? this.renderFilledInMadlib()
      : this.renderMadlibForm()
    );
  }
}

export default MadlibForm;
