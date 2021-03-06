// import uniqid from 'uniqid'
import store from '../store'
import { addTask } from '../reducers/tasks'

export const remoteGetTasks = () => {
  return window.fetch('//dev3.showsofa.com:3010/api/v1/tasks')
    .then(res => res.json())
}

export const remoteCreateTask = (task) => {
  // task.id = uniqid()
  task.type = 'tasks'
  return window.fetch('//dev3.showsofa.com:3010/api/v1/tasks', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: task})
  })
    .then(res => {
      if (res.status === 200) { return res.json() }
    })
    .then(res => (store.dispatch(addTask(res.data))))
}

export const remoteUpdateTask = (task) => {
  task.type = 'tasks'
  // return window.fetch(`//localhost:8080/data/${task.id}`, {
  return window.fetch(`//dev3.showsofa.com:3010/api/v1/tasks/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: task})
  })
    .then(res => res.json())
}

export const remoteDeleteTask = (id) => {
  return window.fetch(`//dev3.showsofa.com:3010/api/v1/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.status === 200) { return res }
    })
}
