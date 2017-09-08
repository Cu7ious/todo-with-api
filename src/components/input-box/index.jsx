import React from 'react'
import { connect } from 'react-redux'
import { addTask, taskAllDone, dispatchRemoteCreateTask } from '../../reducers/tasks'
import { capitalize } from '../../utils'

import {
  InputGroup,
  Button,
  FormControl
} from 'react-bootstrap'

import './input-box.css'

const InputBox = (props) => {
  function handleAddTask (e) {
    if (e.keyCode === 13 && e.target.value) {
      const title = capitalize(e.target.value)
      props.addTask({
        attributes: {title},
        done: false,
        editing: false
      })
      props.dispatchRemoteCreateTask({
        attributes: {title},
        done: false,
        editing: false
      })
      e.target.value = ''
    }
  }

  function renderItemsForm () {
    const completeAllButton = (props.tasks.length)
      ? <Button onClick={props.taskAllDone} className='control'>&#x025BE;</Button>
      : false
    return (
      <div className='input-form'>
        {completeAllButton}
        <FormControl
          autoFocus
          type='text'
          onKeyUp={handleAddTask}
        />
      </div>
    )
  }

  return (
    <InputGroup className='input-box'>
      {renderItemsForm()}
    </InputGroup>
  )
}

// const mapStateToProps = (state) => state
// const mapDispatchToProps = {}// actionCreatorName
export default connect(
  (state) => ({tasks: state.tasks}),
  {addTask, taskAllDone, dispatchRemoteCreateTask}
)(InputBox)
