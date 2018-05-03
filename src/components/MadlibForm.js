import React, { Component } from 'react';

class MadlibForm extends Component {
  state = {
    fields: (
      regex => {
        const fields = {};
        let result;
        while (result = regex.exec(this.props.madlib)) {
          fields[result[1]] = '';
        }
        return fields;
      }
    )(/%&(.*?)&%/gi)
  }

  render() {
    return (
      <div className='madlib-form'>
        <h2>Fill out the form below to create your madlib</h2>
        <form onSubmit={this.onSubmit}>
          {
            Object.keys(this.state.fields).map(
              field => (
                <label>
                  {field}: <input
                    value={this.state.fields[field]}
                    onChange={e => this.setState({fields: Object.assign(this.state.fields, {[field]: e.target.value})})}
                  />
                </label>
              )
            ) 
          }
        </form>
      </div>
    );
  }
}

export default MadlibForm;
