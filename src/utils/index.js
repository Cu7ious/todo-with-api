import data from '../data'

export function capitalize (text) {
  text = (text.charAt(0) === ' ') ? text.replace(' ', '') : text
  return text.replace(
    text.charAt(0),
    text.charAt(0).toUpperCase()
  )
}

export function filterItems (tasks, filter) {
  switch (filter) {
    case data.CONSTANTS.REMAINED:
      return tasks.filter((task) => (task.done === false))
    case data.CONSTANTS.COMPLETED:
      return tasks.filter((task) => (task.done === true))
    default:
      return tasks
  }
}

export function arrayMoveItem (array, oldIndex, newIndex) {
  while (oldIndex < 0) {
    oldIndex += array.length
  }

  while (newIndex < 0) {
    newIndex += array.length
  }

  if (newIndex >= array.length) {
    var k = newIndex - array.length
    while ((k--) + 1) {
      array.push(undefined)
    }
  }

  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0])
  return array
}
