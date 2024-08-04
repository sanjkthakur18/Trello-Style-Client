'use client'
import React, { useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { CiCircleQuestion, CiSearch, CiCalendar, CiFilter, CiShare2 } from "react-icons/ci"
import { BsStars } from "react-icons/bs"
import Sidebar from '@/components/Sidebar/Sidebar'
import TaskForm from '@/components/TaskForm/TaskForm'
import Cards from '@/components/Cards/Cards'
import TodoCard from '@/components/TodoCard/TodoCard'
import ProtectedRoute from '@/components/ProtectedRoutes/ProtectedRoute'

const TaskBoard: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const toggleForm = () => {
    if (showForm) {
      setIsRemoving(true)
      setTimeout(() => {
        setShowForm(false)
        setIsRemoving(false)
      }, 300)
    } else {
      setShowForm(true)
    }
  }

  return (
    <ProtectedRoute>
      <div className='flex'>
        <Sidebar handleForm={toggleForm} />
        <div className='bg-gray-100 p-4'>
          <div className="p-6 flex-1 ">
            <div className='flex items-center justify-between'>
              <h1 className="text-2xl font-bold">Good morning, Joe!</h1>
              <p className='flex items-center gap-2 cursor-pointer'>Help & feedback <span className='text-lg'><CiCircleQuestion /></span></p>
            </div>
            <div className='flex items-center gap-4'>
              <Cards />
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className='bg-white flex items-center p-1 rounded-md'>
                <input type="text" name="" placeholder='Search' className='border-none outline-none' />
                <CiSearch />
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex items-center justify-center gap-2 bg-gray-200 p-2 rounded-md w-[10rem]'>
                  <p>Calendar view</p>
                  <CiCalendar className='text-2xl' />
                </div>
                <div className='flex items-center justify-center gap-2 bg-gray-200 p-2 rounded-md'>
                  <p>Automation</p>
                  <BsStars className='text-2xl' />
                </div>
                <div className='flex items-center justify-center gap-2 bg-gray-200 p-2 rounded-md'>
                  <p>Filter</p>
                  <CiFilter className='text-2xl' />
                </div>
                <div className='flex items-center justify-center gap-2 bg-gray-200 p-2 rounded-md'>
                  <p>Share</p>
                  <CiShare2 className='text-2xl' />
                </div>
                <button className="bg-[#453691] text-white p-2 rounded w-[10rem] flex gap-2 items-center justify-center" onClick={toggleForm}>
                  Create new <IoMdAddCircle className='text-lg' />
                </button>
              </div>
            </div>
          </div>
          <TodoCard handleForm={toggleForm} />
        </div>
      </div>
      {showForm || isRemoving ? (
        <div className={`fixed inset-0 ${isRemoving ? 'animate-slideOutFromRight' : 'animate-slideInFromRight'}`}>
          <TaskForm handleForm={toggleForm} showForm={showForm} />
        </div>
      ) : null}
    </ProtectedRoute>
  )
}

export default TaskBoard
