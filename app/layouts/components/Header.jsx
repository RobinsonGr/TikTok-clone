
import Link from "next/link"
import { BiSearch, BiUser } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"

//It will wrapp this in a client component, just for now, i will use use client

export default function Header(){

    return (
        <div className="border-b border-grey"> 
        <div className="flex justify-between items-center py-2 mx-auto w-full max-w-screen-lg">

            {/*tiktok's logo */}
                <Link href="/">
                    <img className="max-w-36" src="/tiktok-logo.png"/>
                </Link>

            {/*search bar */}
            <div className="max-w-md px-3 py-1 flex justify-between items-center h-10  bg-gray-200 rounded-full">
                <input 
                type="text"
                placeholder="Search"
                className="w-full my-2 pl-2 mr-2 text-gray-500 bg-gray-200 border-e-2 placeholder:text-gray-400 border-gray-300 focus:outline-none"/>
                <BiSearch color="#A1A2A7" size="22"/>
            </div>

            {/*right buttons */}
                <div className="flex items-center gap-3">

                    {/* + Upload button */}
                    <button className="flex items-center px-3 py-2 border rounded-s hover:bg-gray-200">
                        <AiOutlinePlus  color="#000000" size="22" />
                        <span className="px-2 text-base font-medium">Upload</span>  
                    </button>

                    {/* + profile controls */}
                    <button >
                        <Link href='/'>
                            <img src="https://placehold.co/25" className="rounded-full size-9"/>
                        </Link>
                    </button>
                   
                </div>
        </div>
        </div>
    )
}