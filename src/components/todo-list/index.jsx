import React from 'react'
import uniqid from 'uniqid'
// import { Modal, Button, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { onComponentDidMount } from 'react-redux-lifecycle'
import Sortable from 'react-sortablejs'
import { filterItems } from '../../utils'

import {
  editTask,
  deleteTask,
  taskIsEditing,
  taskIsDone,
  taskSaveEdits,

  dispatchRemoteFetchTasks,
  dispatchRemoteUpdateTask,
  dispatchRemoteDeleteTask,

  dispatchRemoteFetchTags
} from '../../reducers/tasks'

import TodoItem from './todo-item/index'

const TodoList = (props) => {
  function handleEditTask (id, evt) {
    props.editTask(id, evt.target.value)
  }

  function handleDeleteTask (id) {
    props.deleteTask(id)
    props.dispatchRemoteDeleteTask(id)
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
        props.taskIsEditing(null)
      }
    } else {
      props.taskSaveEdits(id, evt.target.value)
      props.dispatchRemoteUpdateTask(id, evt.target.value)
      props.taskIsEditing(null)
    }
  }

  // function stringifyTags (tags) {
  //   return tags.toString()
  // }
  //
  // let modal = true
  //
  // function handleModalOpen () {
  //   modal = true
  // }
  //
  // function handleModalClose () {
  //   modal = false
  // }
  //
  // function renderModal (tags) {
  //   return (
  //   <Modal show={modal} >
  //     <Modal.Header closeButton>
  //       <Modal.Title>Edit Tags</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body>
  //       <FormControl
  //         autoFocus
  //         value={stringifyTags(tags)}
  //         type='text'
  //       />
  //     </Modal.Body>
  //     <Modal.Footer>
  //       <Button onClick={handleModalClose(modal)}>Close</Button>
  //     </Modal.Footer>
  //   </Modal>
  //   )
  // }

  const renderItems = tasks => (
    tasks.map(({id, done, attributes}) => (
      <TodoItem
        key={id || uniqid()}
        id={id}
        text={attributes.title}
        done={done}
        editing={id === props.editing}
        tags={['tag', 'another tag']}
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
      {/* {renderModal(['tag', 'another tag'])} */}
    </Sortable>
  )
}

export default connect(
  (state) => ({tasks: state.tasks, filter: state.filter, editing: state.editing}),
  {
    editTask,
    deleteTask,
    taskIsEditing,
    taskIsDone,
    taskSaveEdits,
    dispatchRemoteUpdateTask,
    dispatchRemoteDeleteTask
  }
)(onComponentDidMount(dispatchRemoteFetchTasks)(TodoList))
