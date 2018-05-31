import React from 'react'
import {connect} from 'react-redux'
import {showForm} from '../../../actions/app_actions'
import Intro from '../presentation/intro'

const mapStateToProps = (state, props) => ({
  initialized: state.get("madlib")
})

const mapDispatchToProps = dispatch => ({
  showForm: () => dispatch(showForm()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Intro)
