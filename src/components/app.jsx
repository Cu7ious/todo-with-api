import React, { Component } from 'react'
import InputBox from './input-box/index'
import TodoList from './todo-list/index'
import Controls from './controls/index'

import './app.css'

class App extends Component {
  componentWillMount () {
    this.sidebarCloseButton = document.querySelector('#main-sidebar button')
    this.sidebarCloseButton.addEventListener('click', this.handleCloseSidebar, false)
    this.magnetOverlay = document.getElementById('magnet-overlay')
    this.magnetOverlay.addEventListener('click', this.handleCloseSidebar, false)
    document.addEventListener('keyup', this.handleCloseSidebar, false)

    this.navButton = document.getElementById('app-main-nav-button')
    this.navButton.addEventListener('click', (e) => {
      e.preventDefault()
      document.body.classList.toggle('active-left-place')
    }, false)

    document.body.style.display = 'block'
  }

  handleCloseSidebar (e) {
    if (e.type === 'keyup' && e.keyCode === 27) {
      if (document.body.classList.length) {
        document.body.classList.toggle('active-left-place')
      }
    } else if (e.type === 'click') {
      document.body.classList.toggle('active-left-place')
    }
  }

  render () {
    return (
      <div>
        <div className='panel'>
          <h3>Things to achieve</h3>
        </div>
        <div className='todo-app'>
          <section className='dynamic-block'>
            <InputBox />
            <TodoList />
            <Controls />
          </section>
        </div>
      </div>
    )
  }
}

export default App
