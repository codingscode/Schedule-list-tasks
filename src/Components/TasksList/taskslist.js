import React, {useState} from 'react'
import './style_taskslist.css'

import {FiPlusSquare, FiPlusCircle, FiX} from 'react-icons/fi'

function TaskList() {
    const [list, setList] = useState(JSON.parse(localStorage.getItem('list')) || [])
    const [itemlist, setItemlist] = useState('')
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [])
    const [newitemlist, setNewitemlist] = useState('')
    const [newtask, setNewtask] = useState('')
    
    
    function addItemList() {
        console.log('current', {itemTitle: newitemlist})
        console.log('itemTitle: ', newitemlist)
                                
        if (list.some((each) => each.itemTitle === newitemlist)) {  
           setList([...list])   
           setNewitemlist('')
           alert('There can not be list item equal')
        }
        else {
           setList([...list, {itemTitle: newitemlist}])
           setNewitemlist('')
           save()
        }
    }

    function addTask() {
        if (tasks.some(each => each.taskTitle === newtask)) {
           setTasks([...tasks])
           setNewtask('')
           alert('There can not be equal tasks')
        }
        else {
           setTasks([...tasks, {taskTitle: newtask, fromItem: itemlist}])
           setNewtask('')
           save()
        }
    }
    
    function showList(nameitemlist) {
        setItemlist(nameitemlist)
    }

    function deleteList(itemTitle) {
        var new_itemlist = []
        var new_task = []

        for (var each_item of list) {
           if (each_item.itemTitle !== itemTitle) {
              new_itemlist.push(each_item)
           }
           else {
              console.log('repeated')
           }
        }

        for (var each_task of tasks) {
            if (each_task.fromItem !== itemTitle) {
               new_task.push(each_task)
            }
        }

        setList(new_itemlist)
        setTasks(new_task)
        save()
    }

    function checkTask(fromitem_list, title_task) {
        var new_task = []

        for (var each_task of tasks) {
            if (each_task.fromItem !== tasks.fromitem_list && each_task.taskTitle !== title_task) {
               new_task.push(each_task)
            }
            
        }

        setTasks(new_task)
        save()
    }

    function save() {
        localStorage.setItem('list', JSON.stringify(list))
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    save()

    return (
        <div className="side-by-side">
            <div className="list">
                 <h1 className="feature">List</h1>
                 <ul className="content">
                    {list.map(eachitem => {
                        return (
                            <li key={eachitem.itemTitle}> 
                                <button className="itembutton" onClick={showList.bind(this, eachitem.itemTitle)}>
                                    {eachitem.itemTitle}
                                </button>
                                <button onClick={deleteList.bind(this, eachitem.itemTitle)}>
                                    <FiX />
                                </button>
                            </li>
                        )
                    })}
                 </ul>
                 <div className="field1">
                     <input placeholder="New item" value={newitemlist} onChange={(e) => setNewitemlist(e.target.value)}/>
                     <button >
                         <FiPlusSquare size={30} color="darkslateblue" onClick={addItemList}/>
                     </button>
                 </div>
            </div>

            <div className="tasks">
                 <h1 className="feature">{itemlist === '' ? 'My Tasks' : itemlist}</h1>
                 <ul className="content">
                     {itemlist === '' ? <li>Select an item or create other</li> :
                      // eslint-disable-next-line 
                      tasks.map(eachtask => {
                          if (eachtask.fromItem === itemlist) {
                              return (
                                  <li key={eachtask.taskTitle}> 
                                      <span className="itemtasks">{eachtask.taskTitle}</span>
                                      <button  onClick={checkTask.bind(this, eachtask.fromItem, eachtask.taskTitle)}>
                                          <FiX size={30}/>
                                      </button>
                                  </li>
                              )
                          }
                      }) 
                      }
                 </ul>
                 <div className="field2">
                     <input placeholder="New Task" value={newtask} onChange={(e) => setNewtask(e.target.value)}/>
                     <button >
                         <FiPlusCircle size={30} color="purple" onClick={addTask}/>
                     </button>
                 </div>
            </div>
            
        </div>
    )
}

export default TaskList