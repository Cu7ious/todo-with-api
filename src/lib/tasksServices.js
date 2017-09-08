export const getTasks = () => {
  return window.fetch('//localhost:8080/data')
    .then(res => res.json())
}

export const createTask = () => {
  return window.fetch('//localhost:8080/data', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {'id': '4', 'attributes': {'title': 'Fetch is cool'}, 'editing': false, 'done': false}
    )
  })
    .then(res => res.json())
}
