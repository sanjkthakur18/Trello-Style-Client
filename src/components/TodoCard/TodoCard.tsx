import React, { useEffect, useState } from 'react'
import { CiClock2 } from "react-icons/ci"
import { IoMdAdd } from "react-icons/io"
import { MdOutlineDeleteForever } from "react-icons/md"
import { GoPencil } from "react-icons/go"
import { HiBars3BottomLeft } from "react-icons/hi2"
import { formatDistanceToNow } from 'date-fns'
import Popup from '@/components/Popup/Popup'
import { useTask } from '@/context/TasksContext'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const TodoCard: React.FC<{ handleForm: () => void }> = ({ handleForm }) => {
  const { tasks, getAllTasks, deleteTask, updateTaskStatus } = useTask()
  const [popup, setPopup] = useState(false)
  const [currentTask, setCurrentTask] = useState<any>(null)

  useEffect(() => {
    getAllTasks()
  }, [getAllTasks])

  // useEffect(() => {
  //   console.log('Fetched tasks:', tasks)
  // }, [tasks])

  const handleDelete = (id: string) => {
    deleteTask(id)
  }

  const handleEdit = (task: any) => {
    setCurrentTask(task)
    setPopup(true)
  }

  const togglePopup = () => {
    setPopup(!popup)
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result
    const updatedTasks = [...tasks]

    const [movedTask] = updatedTasks.splice(source.index, 1)
    movedTask.status = destination.droppableId
    updatedTasks.splice(destination.index, 0, movedTask)

    updateTaskStatus(movedTask._id, movedTask.status)
  }

  const columns = ['To-Do', 'In Progress', 'Under Review', 'Completed'].map(status => ({
    id: status,
    status,
    items: tasks.filter(task => task.status === status)
  }))

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-tasks" direction="horizontal">
          {(provided) => (
            <div
              className="flex gap-4 bg-white rounded-lg"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map((column) => (
                <Droppable key={column.id} droppableId={column.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="w-1/4 p-4"
                    >
                      <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
                        {column.status}
                        <HiBars3BottomLeft className="transform rotate-180" />
                      </h2>
                      {column.items.length > 0 ? (
                        column.items.map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-gray-100 p-4 mb-4 rounded-lg shadow"
                              >
                                <h3 className="text-lg font-semibold">{task.title}</h3>
                                <p className="text-gray-600">{task.description}</p>
                                <div className="flex flex-col mt-4">
                                  <span
                                    className={`px-2 py-1 rounded w-fit text-white ${task.priority === 'Urgent'
                                      ? 'bg-red-500'
                                      : task.priority === 'Medium'
                                        ? 'bg-yellow-500'
                                        : 'bg-green-500'
                                      }`}
                                  >
                                    {task.priority}
                                  </span>
                                  <span className="text-gray-500 flex gap-2 items-center my-2">
                                    <CiClock2 /> {task.deadline?.toString().split('T')[0]}
                                  </span>
                                </div>
                                <div className='flex items-center justify-between'>
                                  <span className="text-gray-400 text-sm">{task.createdAt ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true }) : 'No creation time'}</span>
                                  <div className='flex gap-2 text-lg'>
                                    <GoPencil onClick={() => { handleEdit(task); togglePopup() }} className='text-green-500 cursor-pointer' />
                                    <MdOutlineDeleteForever onClick={() => handleDelete(task._id)} className='text-rose-600 cursor-pointer' />
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <p>No tasks available</p>
                      )}
                      <button className="w-full bg-black text-gray-300 flex items-center justify-between p-2 mt-2 rounded-lg" onClick={handleForm}>
                        <span>Add new</span>
                        <IoMdAdd />
                      </button>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {popup && <Popup handlePopup={togglePopup} showForm={popup} task={currentTask} />}
    </>
  )
}

export default TodoCard
