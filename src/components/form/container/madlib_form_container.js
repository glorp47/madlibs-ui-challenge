import React from 'react'
import {connect} from 'react-redux'
import {showForm, submitForm} from '../../../actions/app_actions'
import MadlibForm from '../presentation/madlib_form'

const mapStateToProps = (state, props) => ({
  status: state.get("madlib")
})

const mapDispatchToProps = dispatch => ({
  showForm: () => dispatch(showForm()),
  submitForm: () => dispatch(submitForm())
})

export default connect(mapStateToProps, mapDispatchToProps)(MadlibForm)
