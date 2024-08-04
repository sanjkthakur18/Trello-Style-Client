import React from 'react'
import Image from 'next/image'
import { IoMdAddCircle } from "react-icons/io"
import { FaHome } from "react-icons/fa"
import { CiViewBoard } from "react-icons/ci"
import { CiSettings } from "react-icons/ci"
import { LuUsers2 } from "react-icons/lu"
import { BsGraphUp } from "react-icons/bs"
import { VscBellDot } from "react-icons/vsc"
import { RiLoader2Line } from "react-icons/ri"
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import { useUserContext } from '@/context/AuthContext'
import Img1 from '@/assests/Frame 330.png'

const Sidebar: React.FC<{ handleForm: () => void }> = ({handleForm}) => {
    const { logout } = useUserContext()

    const handleLogout = async () => {
        await logout()
        // window.location.href = '/login'
    }

    return (
        <div className="bg-white text-gray-500 w-[30%] h-full p-6">
            <div className="mb-4 flex items-center justify-start gap-2">
                <Image src={Img1} alt="Avatar" className="rounded-full w-12 h-12" />
                <h2 className="">Joe Gardner</h2>
            </div>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center justify-center gap-4'>
                    <VscBellDot />
                    <RiLoader2Line />
                    <MdOutlineKeyboardDoubleArrowRight />
                </div>
                <button onClick={handleLogout} className='bg-gray-200 hover:bg-gray-300 p-1 rounded-sm'>Logout</button>
            </div>
            <ul>
                <li className="mb-2 flex items-center justify-start rounded-sm hover:bg-gray-200 active:bg-gray-200 w-full"><a href="#" className="py-2 px-4 flex items-center justify-center gap-2"><FaHome /> Home</a></li>
                <li className="mb-2 flex items-center justify-start rounded-sm hover:bg-gray-200 active:bg-gray-200 w-full"><a href="#" className="py-2 px-4 flex items-center justify-center gap-2"><CiViewBoard /> Boards</a></li>
                <li className="mb-2 flex items-center justify-start rounded-sm hover:bg-gray-200 active:bg-gray-200 w-full"><a href="#" className="py-2 px-4 flex items-center justify-center gap-2"><CiSettings /> Settings</a></li>
                <li className="mb-2 flex items-center justify-start rounded-sm hover:bg-gray-200 active:bg-gray-200 w-full"><a href="#" className="py-2 px-4 flex items-center justify-center gap-2"><LuUsers2 /> Teams</a></li>
                <li className="mb-2 flex items-center justify-start rounded-sm hover:bg-gray-200 active:bg-gray-200 w-full"><a href="#" className="py-2 px-4 flex items-center justify-center gap-2"><BsGraphUp /> Analytics</a></li>
            </ul>
            <button onClick={handleForm} className="bg-[#453691] text-white py-2 px-4 rounded mt-4 w-full flex gap-2 items-center justify-center">Create new task <IoMdAddCircle className='text-lg' /></button>
        </div>
    );
};

export default Sidebar
