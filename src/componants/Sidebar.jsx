import React, { useContext, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "react-feather";
import { Popover } from "react-tiny-popover";
import { BoardContext } from "../context/BoardContext";

const Sidebar = () => {
    const blankBoard={
        name:'',
        bgcolor:"#06000",
        list:[]
    }
    const [boardData,setBoarddata]=useState(blankBoard)
  const [collapsed, setCollapsed] = useState(false);
  const [showpop, setShowpop] = useState(false);
  const { allboard, setAllBoard } = useContext(BoardContext);
  const setActiveboard=(i)=>{
    let newBoard = {...allboard}
    newBoard.active=i;
    setAllBoard(newBoard)
  }
const addBoard=()=>{
    let newB = {...allboard};
    newB.boards.push(boardData);
    setAllBoard(newB)
    setBoarddata(blankBoard)
    setShowpop(!showpop)
}
  return (
    <div
      className={`bg-[#121417] h-[calc(100vh-3rem)] transition-all linear duration-500 flex-shrink-0 ${
        collapsed ? "w-[40px]" : "w-[280px]"
      } border-r border-r-[#ebecee29]`}
    >
      {collapsed && (
        <div className="p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-slate-600 rounded-sm"
          >
            <ChevronRight size={18}></ChevronRight>
          </button>
        </div>
      )}
      {!collapsed && 
        
        <div>
          <div className="workspase p-3 flex justify-between border-b border-b-[#9fadbc29]">
            <h4> Coding Nation Workspace</h4>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-slate-600 p-1 rounded-sm"
            >
              <ChevronLeft size={18}></ChevronLeft>
            </button>
          </div>
          <div className="boardlist ">
            <div className="flex justify-between px-3 py-2 ">
              <h6>Your Board</h6>

              <Popover
                isOpen={showpop}
                align="start"
                positions={["right", "top", "bottom", "left"]} // preferred positions by priority
                content={
                  <div className="ml-2 p-2 w-60 flex flex-col justify-center items-center bg-slate-500 text-white rounded">
                    <button onClick={()=>setShowpop(!showpop)} className="absolute right-2 top-2 hover:bg-slate-500 p-1 rounded">
                      <X size={16}></X>
                    </button>
                    <h4 className="py-3">Create Board</h4>
                    <img src="https://placehold.co/200x120/png" alt="" />
                    <div className=" mt-3 flex flex-col w-full items-start">
                      <label   htmlFor="title">
                        Board Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="h-8 mb-2 px-2 w-full bg-gray-700"
                        value={boardData.name}
                        onChange={(e)=>setBoarddata({...boardData,name:e.target.value})}
                      />
                      <label   htmlFor="title">Board Color </label>
                      <input
                        type="color"
                        className="h-8 mb-2 px-2 w-full bg-gray-700"
                        value={boardData.bgcolor}
                        onChange={(e)=>setBoarddata({...boardData,bgcolor:e.target.value})}
                        
                      />
                      <button onClick={()=>addBoard()} className="w-full rounded h-8 bg-slate-700 mt-2  hover:bg-gray-500 ">
                        Create
                      </button>
                    </div>
                  </div>
                }
              >
                <button
                  onClick={() => setShowpop(!showpop)}
                  className="hover:bg-slate-600 p-1 rounded-sm"
                >
                  <Plus size={16}></Plus>
                </button>
              </Popover>
            </div>
          </div>
          <ul>
          { allboard.boards && allboard.boards.map((x,i)=>{

            
          return  <li key={i}>
              <button onClick={()=>setActiveboard(i)} className="px-2 py-2 text-sm flex justify-start align-baseline w-full hover:bg-gray-500">
                <span className="w-6 h-max rounded-sm mr-2" style={{backgroundColor:`${x.bgcolor}`}}>
                  &nbsp;
                </span>
                <span>{x.name}</span>
              </button>
            </li>
          }) 
            }
          </ul>
        </div>
      }
    </div>
  );
};

export default Sidebar;
