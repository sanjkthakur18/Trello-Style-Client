'use client'
import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

interface Task {
  createdAt: any
  _id: string
  title: string
  description?: string
  status: string
  priority?: string
  deadline?: Date
  user?: string
}

interface TaskContextType {
  tasks: Task[]
  task: Task | null
  getAllTasks: () => void
  getTask: (id: string) => void
  createTask: (task: Omit<Task, '_id' | 'user'>) => void
  updateTask: (id: string, updates: Partial<Omit<Task, '_id' | 'user'>>) => void
  deleteTask: (id: string) => void
  updateTaskStatus: (id: string, status: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [task, setTask] = useState<Task | null>(null)

  const getToken = () => localStorage.getItem('token')

  const getAllTasks = async () => {
    try {
      const token = getToken()
      const response = await axios.get('http://127.0.0.1:3500/api/tasks/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const getTask = async (id: string) => {
    try {
      const token = getToken()
      const response = await axios.get(`http://127.0.0.1:3500/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTask(response.data)
    } catch (error) {
      console.error('Error fetching task:', error)
    }
  }

  const createTask = async (task: Omit<Task, '_id' | 'user'>) => {
    try {
      const token = getToken()
      const response = await axios.post('http://127.0.0.1:3500/api/tasks/', task, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks((prevTasks) => [...prevTasks, response.data])
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const updateTask = async (id: string, updates: Partial<Omit<Task, '_id' | 'user'>>) => {
    try {
      const token = getToken()
      const response = await axios.put(`http://127.0.0.1:3500/api/tasks/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response.data : task))
      )
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const token = getToken()
      await axios.delete(`http://127.0.0.1:3500/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const updateTaskStatus = async (id: string, status: string) => {
    try {
      const token = getToken();
      const response = await axios.patch(`http://127.0.0.1:3500/api/tasks/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response.data : task))
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, task, getAllTasks, getTask, createTask, updateTask, deleteTask, updateTaskStatus }} >
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context
}
