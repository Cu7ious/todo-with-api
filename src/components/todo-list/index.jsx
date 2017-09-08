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
  dispatchRemoteFetchTasks,
  dispatchRemoteUpdateTask
} from '../../reducers/tasks'
import TodoItem from './todo-item/index'

const TodoList = (props) => {
  function handleEditTask (id, evt) {
    props.editTask(id, evt.target.value)
  }

  function handleDeleteTask (id, evt) {
    props.deleteTask(id, evt.target.value)
  }

  function handleTaskIsEditing (id) {
    props.taskIsEditing(id)
  }

  function handleTaskIsDone (id) {
    props.taskIsDone(id)
  }

  function handleSaveEditedTask (id, evt) {
    if (evt.type === 'keyup') {
      if (evt.keyCode === 13 || evt.keyCode === 27) {
        props.taskSaveEdits(id, evt.target.value)
        props.dispatchRemoteUpdateTask(id, evt.target.value)
        props.taskIsEditing(id)
      }
    } else {
      props.taskSaveEdits(id, evt.target.value)
      props.dispatchRemoteUpdateTask(id, evt.target.value)
      props.taskIsEditing(id)
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
      {renderItems(filterItems(props.tasks, props.filter))}
    </Sortable>
  )
}

export default connect(
  (state) => ({tasks: state.tasks, filter: state.filter}),
  {
    editTask,
    deleteTask,
    taskIsEditing,
    taskIsDone,
    taskSaveEdits,
    dispatchRemoteFetchTasks,
    dispatchRemoteUpdateTask
  }
)(TodoList)
