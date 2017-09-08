import React from 'react'
import { connect } from 'react-redux'
import { filterItems } from '../../utils'
import {
  taskFilterShowAll,
  taskFilterShowRemained,
  taskFilterShowCompleted,
  taskClearAllCompleted
} from '../../reducers/tasks'
import {
  Grid,
  Row,
  Col,
  ButtonToolbar,
  Button
} from 'react-bootstrap'

import './controls.css'

const Controls = (props) => {
  const ALL = 'all'
  const REMAINED = 'remained'
  const COMPLETED = 'completed'

  function handleTaskFilterShowAll () {
    props.taskFilterShowAll()
  }

  function handleTaskFilterShowRemained () {
    props.taskFilterShowRemained()
  }

  function handleTaskFilterShowCompleted () {
    props.taskFilterShowCompleted()
  }

  function handleTaskClearAllCompleted () {
    props.taskClearAllCompleted()
  }

  function renderRemined (tasks) {
    if (tasks.length) {
      let remainedTasksNumber = filterItems(tasks, REMAINED).length || false
      if (remainedTasksNumber) {
        return (remainedTasksNumber > 1)
          ? <span>{remainedTasksNumber} items left</span>
          : <span>{remainedTasksNumber} item left</span>
      }
    }
    return false
  }

  const renderButtons = active => (
    <ButtonToolbar>
      <Button onClick={handleTaskFilterShowAll.bind(this, ALL)}
        active={active === ALL}
        >{ALL}</Button>
      <Button onClick={handleTaskFilterShowRemained.bind(this, REMAINED)}
        active={active === REMAINED}
        >{REMAINED}</Button>
      <Button onClick={handleTaskFilterShowCompleted.bind(this, COMPLETED)}
        active={active === COMPLETED}
        >{COMPLETED}</Button>
    </ButtonToolbar>
  )

  const renderClearCompleted = tasks => (
    filterItems(tasks, COMPLETED).length
      ? <Button bsStyle='link' onClick={handleTaskClearAllCompleted}>Clear completed</Button>
      : false
  )

  const renderFilters = ({tasks, filter}) => (
    <Grid className='filters-block-wrapper' fluid>
      <Row>
        <Col xs={12} md={3}>{renderRemined(tasks, filter)}</Col>
        <Col xs={12} md={6} className='filters-block center'>{renderButtons(filter)}</Col>
        <Col xs={12} md={3} className='right'>{renderClearCompleted(tasks)}</Col>
      </Row>
    </Grid>
  )

  return (
    <div>
      {renderFilters(props)}
    </div>
  )
}

export default connect(
  (state) => ({tasks: state.tasks, filter: state.filter}),
  {taskFilterShowAll, taskFilterShowRemained, taskFilterShowCompleted, taskClearAllCompleted}
)(Controls)
