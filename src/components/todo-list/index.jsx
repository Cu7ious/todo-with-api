import React from 'react'
import { connect } from 'react-redux'
import Sortable from 'react-sortablejs'
import { filterItems } from '../../utils'
import {
  editTask,
  deleteTask,
  taskIsEditing,
  taskIsDone,
  taskSaveEdits,
  remoteFetchTasks
} from '../../reducers/tasks'
import TodoItem from './todo-item/index'

const TodoList = (props) => {
  function handleEditTask (idx, evt) {
    props.editTask(idx, evt.target.value)
  }

  function handleDeleteTask (idx, evt) {
    props.deleteTask(idx, evt.target.value)
  }

  function handleTaskIsEditing (idx) {
    props.taskIsEditing(idx)
  }

  function handleTaskIsDone (idx) {
    props.taskIsDone(idx)
  }

  function handleSaveEditedTask (idx, evt) {
    if (evt.type === 'keyup') {
      if (evt.keyCode === 13 || evt.keyCode === 27) {
        props.taskSaveEdits(idx, evt.target.value)
        props.taskIsEditing(idx)
      }
    } else {
      props.taskSaveEdits(idx, evt.target.value)
      props.taskIsEditing(idx)
    }
  }

  const renderItems = tasks => (
    tasks.map(({id, done, editing, attributes}) => (
      <TodoItem
        key={id}
        id={id}
        text={attributes.title}
        done={done}
        editing={editing}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleTaskIsDone={handleTaskIsDone}
        handleTaskIsEditing={handleTaskIsEditing}
        handleSaveEditedTask={handleSaveEditedTask}
      />
    ))
  )

  return (
    <Sortable
      tag='ul'
      className='list-items'
    >
      {props.remoteFetchTasks()}
      {renderItems(filterItems(props.tasks, props.filter))}
    </Sortable>
  )
}

export default connect(
  (state) => ({tasks: state.tasks, filter: state.filter}),
  {editTask, deleteTask, taskIsEditing, taskIsDone, taskSaveEdits, remoteFetchTasks}
)(TodoList)
