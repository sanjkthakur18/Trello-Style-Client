import React from 'react'
import Image from 'next/image'
import Img1 from '@/assests/undraw_opinion_re_jix4 1.png'
import Img2 from '@/assests/undraw_share_link_re_54rx 1.png'
import Img3 from '@/assests/undraw_undraw_posts_givd_-1-_5vi7 1.png'

const Cards = () => {
    return (
        <div className='flex gap-2 my-4'>
            <div className='rounded-md bg-white flex items-center justify-center gap-2 p-4'>
                <Image src={Img1} alt="dummy" />
                <div className=''>
                    <h1 className='text-gray-500'>Introducing tags</h1>
                    <p className='text-gray-400 text-[.8rem]'>Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</p>
                </div>
            </div>
            <div className='rounded-md bg-white flex items-center justify-center gap-2 p-4'>
                <Image src={Img2} alt="dummy" />
                <div className=''>
                    <h1 className='text-gray-500'>Share notes Instantly</h1>
                    <p className='text-gray-400 text-[.8rem]'>Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</p>
                </div>
            </div>
            <div className='rounded-md bg-white flex items-center justify-center gap-2 p-4'>
                <Image src={Img3} alt="dummy" />
                <div className=''>
                    <h1 className='text-gray-500'>Access Anywhere</h1>
                    <p className='text-gray-400 text-[.8rem]'>Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.</p>
                </div>
            </div>
        </div>
    )
}

export default Cards