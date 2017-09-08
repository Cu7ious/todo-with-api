import uniqid from 'uniqid'

import data from '../data'
import {
  remoteGetTasks,
  remoteCreateTask,
  remoteUpdateTask
} from '../lib/tasksServices'
/**
 * Ducks
 *
 * MUST export default a function called reducer()
 * MUST export its action creators as functions
 * MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
 * MAY export its action types as UPPER_SNAKE_CASE
 *
 * @link: https://github.com/erikras/ducks-modular-redux
 */

// ??????????????????????????????????????????
const TASKS_REMOTE_LOAD = 'todo/tasks/TASKS_REMOTE_LOAD'
const loadTodos = (tasks) => ({
  type: TASKS_REMOTE_LOAD,
  payload: tasks
})
export const dispatchRemoteFetchTasks = () => {
  return dispatch => {
    remoteGetTasks()
      .then(tasks => dispatch(loadTodos(tasks)))
  }
}
// ??????????????????????????????????????????
const TASK_REMOTE_CREATE = 'TASK_REMOTE_CREATE'
const makeTaskRemote = (tasks) => ({
  type: TASK_REMOTE_CREATE,
  payload: tasks
})
export const dispatchRemoteCreateTask = (task) => {
  return dispatch => {
    remoteCreateTask(task)
      .then(dispatch(makeTaskRemote(task)))
  }
}
// ??????????????????????????????????????????
const TASK_REMOTE_UPDATE = 'TASK_REMOTE_UPDATE'
const updateTaskRemote = (tasks) => ({
  type: TASK_REMOTE_UPDATE,
  payload: tasks
})
export const dispatchRemoteUpdateTask = (id) => {
  return (dispatch, getState) => {
    const tasks = getState().tasks
    console.log('tasks', tasks)
    // const taskID = tasks.find(t => t.id === id)
    // console.log('taskID', taskID)
    // remoteUpdateTask(taskID)
    //   .then(res => {
    //     console.log('res', res)
    //     // dispatch(updateTaskRemote(taskID))
    //   })
  }
}
// ??????????????????????????????????????????
window.remoteUpdateTask = remoteUpdateTask

// Actions
const TASK_ADD = 'todo/tasks/TASK_ADD'
const TASK_UPDATE = 'todo/tasks/TASK_UPDATE'
const TASK_DELETE = 'todo/tasks/TASK_DELETE'

const TASK_IS_DONE = 'todo/tasks/TASK_IS_DONE'

const TASK_EDIT = 'todo/tasks/TASK_EDIT'
const TASK_IS_EDITING = 'todo/tasks/TASK_IS_EDITING'
const TASK_SAVE_EDITS = 'todo/tasks/TASK_SAVE_EDITS'

const TASK_ALL_DONE = 'todo/tasks/TASK_ALL_DONE'

const TASK_FILTER_SHOW_ALL = 'todo/tasks/TASK_FILTER_SHOW_ALL'
const TASK_FILTER_SHOW_REMAINED = 'todo/tasks/TASK_FILTER_SHOW_REMAINED'
const TASK_FILTER_SHOW_COMPLETED = 'todo/tasks/TASK_FILTER_SHOW_COMPLETED'

const TASK_CLEAR_ALL_COMPLETED = 'todo/tasks/TASK_CLEAR_ALL_COMPLETED'

let initialState = data

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_ADD:
      action.payload.id = uniqid()
      return {
        ...state,
        tasks: [action.payload].concat(state.tasks)
      }
    case TASK_EDIT:
    case TASK_SAVE_EDITS:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          return (task.id === action.payload.id)
            ? { ...task, attributes: {title: action.payload.title} }
            : task
        })
      }
    case TASK_IS_EDITING:
      let editables = []
      state.tasks.forEach(task => {
        task.editing = (task.id === action.payload.idx)
          ? !task.editing
          : task.editing
        editables.push(task)
      })
      return {
        ...state,
        tasks: editables
      }
    case TASK_DELETE:
      return {
        ...state,
        tasks: state.tasks.filter(task => (task.id !== action.payload.idx))
      }
    case TASK_IS_DONE:
      let lol = []
      state.tasks.forEach(task => {
        task.done = (task.id === action.payload.idx)
          ? !task.done
          : task.done
        lol.push(task)
      })
      return {
        ...state,
        tasks: lol
      }
    case TASK_ALL_DONE:
      let l = []
      const allDone = !state.allDone
      state.tasks.forEach(task => {
        task.done = allDone
        l.push(task)
      })
      return {
        ...state,
        allDone,
        tasks: l
      }
    case TASK_FILTER_SHOW_ALL:
    case TASK_FILTER_SHOW_REMAINED:
    case TASK_FILTER_SHOW_COMPLETED:
      return {
        ...state,
        filter: action.payload.filter
      }
    case TASK_CLEAR_ALL_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.filter(({done}) => (!done))
      }
    case TASKS_REMOTE_LOAD:
      return {
        ...state,
        tasks: action.payload
      }
    default:
      return state
  }
}

// Action Creators
export const addTask = (val) => ({
  type: TASK_ADD,
  payload: val
})

export const editTask = (id, title) => ({
  type: TASK_EDIT,
  payload: {id, title}
})

export const updateTask = (idx, text) => ({
  type: TASK_UPDATE,
  payload: {idx, text}
})

export const deleteTask = idx => ({
  type: TASK_DELETE,
  payload: {idx}
})

export const taskIsEditing = idx => ({
  type: TASK_IS_EDITING,
  payload: {idx}
})

export const taskSaveEdits = (id, title) => ({
  type: TASK_SAVE_EDITS,
  payload: {id, title}
})

export const taskIsDone = idx => ({
  type: TASK_IS_DONE,
  payload: {idx}
})

export const taskAllDone = () => ({
  type: TASK_ALL_DONE
})

export const taskFilterShowAll = () => ({
  type: TASK_FILTER_SHOW_ALL,
  payload: {filter: data.CONSTANTS.ALL}
})

export const taskFilterShowRemained = () => ({
  type: TASK_FILTER_SHOW_REMAINED,
  payload: {filter: data.CONSTANTS.REMAINED}
})

export const taskFilterShowCompleted = () => ({
  type: TASK_FILTER_SHOW_COMPLETED,
  payload: {filter: data.CONSTANTS.COMPLETED}
})

export const taskClearAllCompleted = () => ({
  type: TASK_CLEAR_ALL_COMPLETED
})

export default reducer
