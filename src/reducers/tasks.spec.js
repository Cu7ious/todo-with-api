import reducer from './tasks'

describe('Todo Reducer', function () {
  test('returns a state object', () => {
    const result = reducer(undefined, {type: 'SOMETHING'})
    expect(result).toBeDefined()
  })

  test('adds a todo', () => {
    const startState = {
      items: [
        { text: 'Wake Up', done: false, editing: false },
        { text: 'Drink coffee', done: false, editing: true },
        { text: 'Check https://angel.co', done: true, editing: false }
      ]
    }
    const expectedState = {
      items: [
        { text: 'Wake Up', done: false, editing: false },
        { text: 'Drink coffee', done: false, editing: true },
        { text: 'Check https://angel.co', done: true, editing: false },
        { text: 'Report for duty', done: false, editing: false }
      ]
    }

    const action = {
      type: 'TASK_ADD',
      payload: {
        text: 'Report for duty',
        done: false,
        editing: false
      }}

    const result = reducer(startState, action)
    expect(result).toEqual(expectedState)
  })
})
