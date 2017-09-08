import uniqid from 'uniqid'

export const remoteGetTasks = () => {
  return window.fetch('//localhost:8080/data')
    .then(res => res.json())
}

export const remoteCreateTask = (task) => {
  task.id = uniqid()
  return window.fetch('//localhost:8080/data', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
    .then(res => res.json())
}

export const remoteUpdateTask = (task) => {
  return window.fetch(`//localhost:8080/data/${task.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
    .then(res => res.json())
}
