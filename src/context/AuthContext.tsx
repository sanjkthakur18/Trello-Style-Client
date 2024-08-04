'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

interface FormData {
    fullName?: string
    email: string
    password: string
}

interface UserContextType {
    login: (formData: FormData) => Promise<void>
    signup: (formData: FormData) => Promise<void>
    logout: () => Promise<void>
    isLoggedIn: boolean
    isLoading: boolean
    loginError: string | null
    signupError: string | null
    message: string | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [message, setMessage] = useState<string | null>(null)
    const [loginError, setLoginError] = useState<string | null>(null)
    const [signupError, setSignupError] = useState<string | null>(null)

    const getToken = () => localStorage.getItem('token')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
        }
    }, [])

    const login = async (formData: FormData) => {
        setIsLoading(true)
        setLoginError(null)
        try {
            const response = await axios.post('http://127.0.0.1:3500/api/user/login', formData)
            if (response.status === 200) {
                setIsLoggedIn(true)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data._id)
            }
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                setLoginError(err.response.data.error.wrngEmail)
            } else if (err.response && err.response.status === 400) {
                setLoginError(err.response.data.error.wrngPass)
            } else {
                setLoginError('Login failed. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (formData: FormData) => {
        setIsLoading(true)
        setSignupError(null)
        setMessage(null)
        try {
            const response = await axios.post('http://127.0.0.1:3500/api/user/register', formData)
            if (response.status === 200) {
                setMessage('User registered.')
                return response.data
            }
        } catch (err: any) {
            if (err.response && err.response.status === 409) {
                setSignupError(err.response.data.error.userErr)
            } else {
                setSignupError('Signup failed. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        const token = getToken()
        try {
            await axios.patch('http://127.0.0.1:3500/api/user/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            localStorage.clear()
            setIsLoggedIn(false)
        } catch (error) {
            console.log('Logout failed:', error)
        }
    }

    return (
        <UserContext.Provider value={{ login, signup, logout, isLoggedIn, isLoading, loginError, signupError, message }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = React.useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context
}
