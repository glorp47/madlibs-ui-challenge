import React, { Component } from 'react';
import {connect} from 'react-redux'

import MadlibFormContainer from './form/container/madlib_form_container'
import IntroContainer from './intro/container/intro_container'

const regex = /%&(.*?)&%/gi;



class MadlibForm extends Component {

  constructor(props) {
    super(props)
  }

  render = () => {
    const {app, madlib} = this.props;
    return (
      app
      ? <MadlibFormContainer madlib={madlib}/>
      : <IntroContainer/>
    );
  }
}

export default connect(state => ({app: state.get("madlib")}))(MadlibForm);
