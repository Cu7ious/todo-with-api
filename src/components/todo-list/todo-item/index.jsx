import React from 'react'

import {
  FormControl
} from 'react-bootstrap'
import CheckBox from './svg-checkbox'

export default class TodoItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      edit_tags: false,
      tags: props.tags
    }
  }

  handleTagsEdit () {
    this.setState({edit_tags: !this.state.edit_tags})
  }

  handleTagsChange (e) {
    this.setState({tags: e.target.value})
  }

  handleSaveEditedTags (e) {
    if (e.type === 'keyup') {
      if (e.keyCode === 13 || e.keyCode === 27) {
        const tags = e.target.value.slice(',')
        this.setState({tags})
        this.handleTagsEdit()
      }
    } else {
      const tags = e.target.value.slice(',')
      this.setState({tags})
      this.handleTagsEdit()
    }
  }

  handleRemoteCreateTags () {

  }
  handleRemoteUpdateTags () {

  }

  renderTagItems (tags) {
    if (typeof tags !== 'string') {
      return tags.map((tag, idx) => (<i key={idx}>{tag}</i>))
    } else {
      return tags.split(',').map((tag, idx) => (<i key={idx}>{tag}</i>))
    }
  }

  renderTags (tags) {
    if (this.state.edit_tags) {
      return (
        <FormControl
          autoFocus
          value={tags}
          type='text'
          onChange={this.handleTagsChange.bind(this)}
          onKeyUp={this.handleSaveEditedTags.bind(this)}
          onBlur={this.handleSaveEditedTags.bind(this)}
        />
      )
    } else {
      return (
        <b onClick={this.handleTagsEdit.bind(this)}>{this.renderTagItems(tags)}</b>
      )
    }
  }

  render () {
    const {
      id, text, editing, done,
      handleTaskIsEditing, handleTaskIsDone, handleDeleteTask,
      handleEditTask, handleSaveEditedTask
    } = this.props

    if (editing) {
      return (
        <FormControl
          autoFocus
          value={text}
          type='text'
          onChange={handleEditTask.bind(this, id)}
          onKeyUp={handleSaveEditedTask.bind(this, id)}
          onBlur={handleSaveEditedTask.bind(this, id)}
        />
      )
    } else {
      const classes = done ? 'item-is-done' : null
      return (
        <li key={id} data-id={id}
          className={classes}
          onDoubleClick={handleTaskIsEditing.bind(this, id)}
        >
          <CheckBox id={id} done={done} handler={handleTaskIsDone.bind(this, id)} />
          <span>
            {text}
            {this.renderTags(this.state.tags)}
          </span>
          <i className='control remove' onClick={handleDeleteTask.bind(this, id)}>&#x000D7;</i>
        </li>
      )
    }
  }
}

// export default (props) => {
//   const {
//     id, text, editing, done, tags,
//     handleTaskIsEditing, handleTaskIsDone, handleDeleteTask,
//     handleEditTask, handleSaveEditedTask
//   } = props
//
//   function renderTagItems (tags) {
//     return tags.map((tag, idx) => (<i key={idx}>{tag}</i>))
//   }
//
//   function renderTags (tags) {
//
//     return (
//       <b>{renderTagItems(tags)}</b>
//     )
//   }
//
//   if (editing) {
//     return (
//       <FormControl
//         autoFocus
//         value={text}
//         type='text'
//         onChange={handleEditTask.bind(this, id)}
//         onKeyUp={handleSaveEditedTask.bind(this, id)}
//         onBlur={handleSaveEditedTask.bind(this, id)}
//       />
//     )
//   } else {
//     const classes = done ? 'item-is-done' : null
//     return (
//       <li key={id} data-id={id}
//         className={classes}
//         onDoubleClick={handleTaskIsEditing.bind(this, id)}
//       >
//         <CheckBox id={id} done={done} handler={handleTaskIsDone.bind(this, id)} />
//         <span>
//           {text}
//           {renderTags(tags)}
//         </span>
//         <i className='control remove' onClick={handleDeleteTask.bind(this, id)}>&#x000D7;</i>
//       </li>
//     )
//   }
// }
