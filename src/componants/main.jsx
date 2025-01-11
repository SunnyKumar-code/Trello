import React, { useContext } from "react";
import { MoreHorizontal, UserPlus, Edit2 } from "react-feather";
import CardAdd from "./CardAdd";
import { BoardContext } from "../context/BoardContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList";
import Utils from "../utils/Utils";
const Main = () => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const bdata = allboard.boards[allboard.active];


  const onDragEnd = (res) => {
    if (!res.destination) {
      console.log("No Destination");
      return;
    }
  
    const newList = [...bdata.list];
    const s_id = parseInt(res.source.droppableId);
    const d_id = parseInt(res.destination.droppableId);
  
    const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
    newList[d_id - 1].items.splice(res.destination.index, 0, removed);
  
    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };
  const cardData = (e, idx) => {
    if (!e.trim()) {
      alert("Card title cannot be empty");
      return;
    }
    let newList = [...bdata.list];
    newList[idx].items.push({ id: Utils.makeid(5), title: e });
    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };
  
  const listData = (e) => {
    if (!e.trim()) {
      alert("List title cannot be empty");
      return;
    }
    let newList = [...bdata.list];
    newList.push({ id: newList.length + 1 + "", title: e, items: [] });
    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };
  
  
  return (
    <div className="flex flex-col  w-full" style={{backgroundColor:`${bdata.bgcolor}`}}>
      <div className="p-3 bg-black flex justify-between w-full bg-opacity-50">
        <h2 className="text-lg">{bdata.name}</h2>
        <div className="flex items-center justify-center">
          <button className="bg-gray-200 text-gray-800 px-2 py-1 mr-2 h-8 rounded flex justify-center items-center">
            <UserPlus size={16} className="mr-2"></UserPlus> Share
          </button>

          <button className="hover:bg-gray-500 px-2 py-1 h-8 rounded ">
            <MoreHorizontal size={16}></MoreHorizontal>
          </button>
        </div>
      </div>
      <div className=" flex flex-col w-full flex-grow relative">
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 hover:scrollbar-thumb-gray-400 transition-all duration-200">
          <DragDropContext onDragEnd={onDragEnd}>
            {bdata.list &&
              bdata.list.map((x, i) => {
                return (
                  <div
                    key={i}
                    className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"
                  >
                    <div className="list-body">
                      <div className="flex justify-between p-1">
                        <span>{x.title}</span>
                        <button className="hover:bg-gray-500 rounded p-1">
                        
                          <MoreHorizontal size={16}></MoreHorizontal>
                        </button>
                      </div>
                    </div>
                    <Droppable droppableId={x.id}>
                      {(provided, snapshot) => (
                        <div className="py-1"
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "#222"
                              : "Transparent",
                          }}
                          {...provided.droppableProps}
                        >
                          {x.items &&
                      x.items.map((item, idx) => {
                        return <Draggable key={item.id} draggableId={item.id} index={idx}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                                <div
                            key={idx}
                            className="item flex justify-between items-center bg-zinc-700 rounded-md p-1 cursor-pointer border-2 border-zinc-900 hover:border-gray-500"
                          >
                            <span>{item.title}</span>
                            <span className="flex justify-start items-start">
                              <button  className="hover:bg-gray-600 rounded p-1">
                                <Edit2 size={16}></Edit2>
                              </button>
                            </span>
                          </div>
                          </div>
                        )}
                      </Draggable>
                     
                      })}

                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                    
                    <CardAdd getCard={(e) => cardData(e,i)}></CardAdd>
                  </div>
                );
              })}
          </DragDropContext>

          <AddList getlist ={(e)=>{
            listData(e)
          }}></AddList>
        </div>
      </div>
    </div>
  );
};

export default Main;
