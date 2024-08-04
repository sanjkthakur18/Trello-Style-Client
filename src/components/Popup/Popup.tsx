'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { IoIosClose } from "react-icons/io"
import { RiLoader2Line } from "react-icons/ri"
import { CiCircleInfo } from "react-icons/ci"
import { BsGraphUp } from "react-icons/bs"
import { MdOutlineModeEdit } from "react-icons/md"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTask } from '@/context/TasksContext'

interface TaskData {
    _id?: string
    title: string
    status: string
    priority: string
    deadline: string
    description: string
}

const Popup: React.FC<{ handlePopup: () => void; showForm: boolean; task: TaskData | null }> = ({ handlePopup, showForm, task }) => {
    const [taskData, setTaskData] = useState<TaskData>({
        title: task?.title || '',
        status: task?.status || '',
        priority: task?.priority || '',
        deadline: task?.deadline || '',
        description: task?.description || '',
        _id: task?._id
    })
    const { updateTask } = useTask()

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = evt.target
        setTaskData({ ...taskData, [name]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (taskData._id) {
            const updatedTask = {
                ...taskData,
                deadline: new Date(taskData.deadline)
            }
            updateTask(taskData._id, updatedTask)
            toast.success('Task updated successfully!')
            handlePopup()
        }
    }

    if (!showForm) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-black">Update Task</h2>
                <button onClick={handlePopup} className="absolute top-2 right-2 z-10">
                    <IoIosClose className="text-red-500 font-bold hover:text-red-700 text-[2rem]" />
                </button>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="sr-only">Title</label>
                        <input type="text" name="title" value={taskData.title} onChange={handleChange} placeholder="Title" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#453691]" />
                    </div>
                    <div className="text-gray-500 flex gap-6 items-center my-2">
                        <div className='flex items-center gap-2 w-[6rem]'>
                            <RiLoader2Line />
                            <p>Status</p>
                        </div>
                        <select className="custom-select p-2 outline-none border-none w-[50%]" value={taskData.status} name="status" onChange={handleChange} required >
                            <option value="" disabled hidden>Not Selected</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="text-gray-500 flex gap-6 items-center my-2">
                        <div className='flex items-center gap-2 w-[6rem]'>
                            <CiCircleInfo />
                            <p>Priority</p>
                        </div>
                        <select className="custom-select p-2 outline-none border-none w-[50%]" value={taskData.priority} name="priority" onChange={handleChange} required >
                            <option value="" disabled hidden>Not Selected</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </div>
                    <div className="text-gray-500 flex gap-6 items-center my-2">
                        <div className='flex items-center gap-2 w-[6rem]'>
                            <BsGraphUp />
                            <p>Deadline</p>
                        </div>
                        <input type="date" name="deadline" value={taskData.deadline} onChange={handleChange} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#453691]" />
                    </div>
                    <div>
                        <label className="sr-only">Description</label>
                        <textarea name="description" value={taskData.description} onChange={handleChange} placeholder="Description" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#453691]" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 text-white bg-[#453691] rounded hover:bg-[#877CCA]" >
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Popup
