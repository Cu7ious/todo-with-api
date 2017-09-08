import React from 'react'

import {
  FormControl
} from 'react-bootstrap'
import CheckBox from './svg-checkbox'

export default (props) => {
  const {
    id, text, editing, done,
    handleTaskIsEditing, handleTaskIsDone, handleDeleteTask,
    handleEditTask, handleSaveEditedTask
  } = props
  if (editing) {
    return (
      <FormControl
        autoFocus
        value={text}
        type='text'
        onChange={handleEditTask.bind(this, id)}
        onKeyUp={handleSaveEditedTask.bind(this, id)}
        onBlur={handleSaveEditedTask.bind(this, id)}
      />
    )
  } else {
    const classes = done ? 'item-is-done' : null
    return (
      <li key={id} data-id={id}
        className={classes}
        onDoubleClick={handleTaskIsEditing.bind(this, id)}
      >
        <CheckBox id={id} done={done} handler={handleTaskIsDone.bind(this, id)} />
        <span>{text}</span>
        <i className='control remove' onClick={handleDeleteTask.bind(this, id)}>&#x000D7;</i>
      </li>
    )
  }
}
