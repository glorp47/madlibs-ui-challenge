import React, { Component } from 'react';
const regex = /%&(.*?)&%/gi;

class MadlibForm extends Component {
  state = {
    fields: this.getFormFieldsFromMadlib(),
    submitted: false
  };

  getFormFieldsFromMadlib() {
    const fields = {};
    let result = regex.exec(this.props.madlib);
    while (result) {
      fields[result[1]] = '';
      result = regex.exec(this.props.madlib);
    }
    return fields;
  };

  initializeMadlibForm = () => {
    this.setState({
      fields: this.getFormFieldsFromMadlib(),
      submitted: false
    })
  };

  submitDisabled() {
    const {fields} = this.state;
    return Object.keys(fields).filter(key => !fields[key]).length
  };

  renderMadlibForm() {
    const {fields} = this.state;
    return (
      <div className='madlib-form'>
        <h2>Fill out the form below to create your madlib</h2>
        <form onSubmit={e => this.setState({submitted: true})}>
          {
            Object.keys(fields).map(
              field => (
                <label>
                  {field}: <input
                    value={fields[field]}
                    onChange={
                      e => this.setState({
                        fields: Object.assign({}, fields, {[field]: e.target.value})
                      })
                    }
                  />
                </label>
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
