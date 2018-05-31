import {SHOW_FORM, SUBMIT_FORM} from '../actions/app_actions'
import {Map, List} from 'immutable'

export default function(state = Map({madlib: 0}), action) {
  switch(action.type) {
    case SHOW_FORM:
      return state.set("madlib", 1)
    case SUBMIT_FORM:
      return state.set("madlib", 2)
    default:
      return state
  }
}
