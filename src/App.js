import React from 'react'
import Header from './Components/Header/header'
import TaskList from './Components/TasksList/taskslist'
import './global.css'

function App() {
  return (
    <div className="App">
      <Header />
      <TaskList />
    </div>
  )
}

export default App
