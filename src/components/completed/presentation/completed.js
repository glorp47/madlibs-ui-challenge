import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import {Fade, Bounce, Zoom, Roll, Flip} from 'react-reveal'

const regex = /%&(.*?)&%/gi;

const FilledInMadlib = ({fields, userInput, madlib, back}) => (

  <Grid>
    <div className='madlib-filled-in'>
      <div className="filled-in-header">
        <Col xs={6} sm={6} md={6} lg={6} className=" centered-text">
          <h1>Flocabulary Mad Libs!</h1>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className=" centered-text">
          <button onClick={back} className="start-button pointer">Start over</button>
        </Col>
      </div>

      <div className="madlib-filled-container">
        {
          madlib.split('\n').map(
            (line, index1) => (
              <span
                key={index1}
                className='madlib-filled-line'
              >
                {
                  line.split(regex).map(
                    (chunk, index2) => (
                      <span
                        key={index2}
                        className={
                          fields.find(field => field === chunk)
                          ? 'user-submitted-value'
                          : ''
                        }
                      >
                        {userInput[chunk] || chunk}
                      </span>
                    )
                  )
                }
              </span>
            )
          )
        }
      </div>
    </div>
  </Grid>
)

export default FilledInMadlib
