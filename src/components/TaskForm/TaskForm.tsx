import React, { useState, ChangeEvent, FormEvent } from 'react'
import { IoIosClose } from "react-icons/io"
import { CiShare2 } from "react-icons/ci"
import { FaRegStar } from "react-icons/fa"
import { RiLoader2Line } from "react-icons/ri"
import { CiCircleInfo } from "react-icons/ci"
import { BsGraphUp } from "react-icons/bs"
import { IoMdAdd } from "react-icons/io"
import { MdOutlineModeEdit } from "react-icons/md"
import { useTask } from '../../context/TasksContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface TaskData {
    title: string
    status: string
    priority: string
    deadline: string
    description: string
}

const TaskForm: React.FC<{ handleForm: () => void; showForm: boolean }> = ({ handleForm }) => {
    const [taskData, setTaskData] = useState<TaskData>({ title: '', status: '', priority: '', deadline: '', description: '' })
    const { createTask } = useTask()

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTaskData({ ...taskData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const { title, status, priority, deadline, description } = taskData

        try {
            createTask({
                title, status, priority, deadline: new Date(deadline), description,
                createdAt: new Date()
            })
            setTaskData({ title: '', status: '', priority: '', deadline: '', description: '' })
            toast.success('Task created successfully!')
        } catch (error) {
            toast.error('Failed to create task.')
        }
    }

    return (
        <div className='flex absolute bg-black bg-opacity-20 w-[100vw] h-[100vh]'>
            <div className='w-[50%]' onClick={handleForm}></div>
            <div className={`h-full w-1/2 bg-white px-6 py-2`}>
                <div className='flex items-center justify-between'>
                    <IoIosClose onClick={handleForm} className='text-2xl cursor-pointer' />
                    <div className='flex items-center justify-center gap-2'>
                        <button className='flex items-center justify-center gap-2 p-1 bg-gray-200 hover:bg-gray-300 rounded-sm text-gray-500'>
                            Share <CiShare2 />
                        </button>
                        <button className='flex items-center justify-center gap-2 p-1 bg-gray-200 hover:bg-gray-300 rounded-sm text-gray-500'>
                            Favorite <FaRegStar />
                        </button>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='my-6'>
                            <input type="text" placeholder='Title' className='outline-none placeholder:text-[1.5rem] border-none w-full' name='title' value={taskData.title} onChange={handleChange} />
                        </div>
                        <div className='text-gray-500 flex gap-6 items-center my-2'>
                            <div className='flex items-center gap-2 w-[6rem]'>
                                <RiLoader2Line />
                                <p>Status</p>
                            </div>
                            <select className='custom-select p-2 outline-none border-none w-[20%]' value={taskData.status} name='status' onChange={handleChange} >
                                <option value="" disabled hidden>Not Selected</option>
                                <option value="To-Do">To-Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className='text-gray-500 flex gap-6 items-center my-2'>
                            <div className='flex items-center gap-2 w-[6rem]'>
                                <CiCircleInfo />
                                <p>Priority</p>
                            </div>
                            <select className='custom-select p-2 outline-none border-none w-[20%]' value={taskData.priority} name='priority' onChange={handleChange} >
                                <option value="" disabled hidden>Not Selected</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>
                        <div className='text-gray-500 flex gap-6 items-center my-2'>
                            <div className='flex items-center gap-2 w-[6rem]'>
                                <BsGraphUp />
                                <p>Deadline</p>
                            </div>
                            <input type="date" className='outline-none border-none' value={taskData.deadline} name='deadline' onChange={handleChange} />
                        </div>
                        <div className='text-gray-500 flex gap-6 items-center my-2'>
                            <div className='flex items-center gap-2 w-[6rem]'>
                                <MdOutlineModeEdit />
                                <p>Description</p>
                            </div>
                            <input type="text" placeholder='Add Description' className='outline-none border-none' name='description' value={taskData.description} onChange={handleChange} />
                        </div>
                        <div className='text-gray-800 flex gap-2 items-center my-4'>
                            <div className='flex items-center gap-2'>
                                <IoMdAdd />
                                <p>Add custom property</p>
                            </div>
                        </div>
                        <button type='submit' className='bg-[#453691] text-white py-2 px-4 rounded mt-4 w-[50%] hover:bg-[#877CCA]'>
                            Add Task
                        </button>
                        <div className='border border-gray-400 my-8 w-full'></div>
                        <input type="text" placeholder='Start writing, or drag your own files here' className='border-none outline-none w-full' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaskForm
