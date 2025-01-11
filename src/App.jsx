import { useState } from 'react'

import './App.css'
import Header from './componants/Header'
import Sidebar from './componants/Sidebar'
import Main from './componants/main'
import { BoardContext } from './context/BoardContext'

function App() {
const boardData={
  active:0,
  boards:[
    {
      name:'my Trello board',
      bgcolor:'#333',
      list:[
        {id:'1',title:"Panding",items:[{id:"cdrft",title:"Product discription 1"}]},
        {id:'2',title:"progress",items:[{id:"cdrfb",title:"Product discription 2"}]},
        {id:'3',title:"done",items:[{id:"cdrfv",title:"Product discription 3"}]}
      ]

    }
  ]
}
const[allboard,setAllBoard]=useState(boardData);

  return (
    <>
<Header/>
<BoardContext.Provider value={{allboard,setAllBoard}}>


<div className='content flex'>
  <Sidebar/>
  <Main/>
  </div>
</BoardContext.Provider>


    </>
  )
}

export default App
