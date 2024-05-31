
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
            <div className=" flex justify-between items-center h-10 px-3 bg-gray-200 rounded-full">
                <input className="bg-gray-200"/>
                <BiSearch/>
            </div>

            {/*right buttons upload and profile */}
                <div>
                    <div>Upload</div>
                    <AiOutlinePlus/>

                    <Link href='/'>
                        <img src="https://placehold.co/25"/>
                    </Link>
                </div>
        </div>
        </div>
    )
}