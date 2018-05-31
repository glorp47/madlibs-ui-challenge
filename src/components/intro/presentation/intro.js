import React from 'react'
import {Fade, Bounce, Zoom, Roll, Flip} from 'react-reveal'

const Intro = ({showForm, initialized}) =>
  (<div className="wrapper"

      ref={input => input && input.focus()}
      onMouseDown={() => showForm()}
      onKeyDown={showForm}
      tabIndex="0">
      <div className="madlib-form"
      >
      <h1><Bounce right opposite >Flocabulary Madlib</Bounce></h1>
      <h2><Bounce right opposite >Fill out the form below to create your madlib</Bounce></h2>
      </div>
    </div>)


export default Intro
