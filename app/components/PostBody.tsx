"use client"

import { useEffect } from "react"
import { PostBodyCompTypes } from "@/app/types"
import { AiFillHeart } from "react-icons/ai"
import { ImMusic } from "react-icons/im"
import Link from "next/link"
//import PostMainLikes from "./PostMainLikes"


export default function PostBody(){

    useEffect(() => {

        const video = document.getElementById(`video-1`) as HTMLVideoElement
        const postMainElement = document.getElementById(`PostMain-${1}`)

        postMainElement ? 
    
        ((entries) => {
            //if the intersection math > 60%, the video will paus
            let observer = new IntersectionObserver((entries) => {
                console.log({
                    entries,
                    observer
                })
                entries[0].isIntersecting ? video.play() : video.pause();
            }, {threshold: [0.6]})

            //This is the eleement to observe
            observer.observe(postMainElement)

        })() : null
    }, [])

    return (
        <>
            <div id={`PostMain-${1}`} className="flex border-b py-6">

                <div className="cursor-pointer">
                    <img className="rounded-full max-h-[60px]" width="60" src={'Andres'} />
                </div>

                <div className="pl-3 w-full px-4">
                    <div className="flex items-center justify-between pb-0.5">
                        {/* <Link href={`/profile/${post.profile.user_id}`}> */}
                        <Link href={`/profile/`}>
                            <span className="font-bold hover:underline cursor-pointer">
                                Are 
                                {/* {post.profile.name} */}
                            </span>
                        </Link>

                        <button className="border text-base px-5 py-0.5 border-rose-500 text-rose-500 hover:bg-[#ffeef2] font-semibold rounded-md">
                            Follow
                        </button>
                    </div>
                    {/* <p className="text-base pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{post.text}</p> */}
                    <p className="text-base pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{'hello'}</p>
                    <p className="text-sm text-gray-500 pb-0.5">#fun #cool #SuperAwesome</p>
                    <p className="text-sm pb-0.5 flex items-center font-semibold">
                        <ImMusic size="17"/>
                        <span className="px-1">original sound - AWESOME</span>
                        <AiFillHeart size="20"/>
                    </p>

                    <div className="mt-2.5 flex">
                        <div
                            className="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer"
                        >
                            <video 
                                id={`video-${1}`}
                                loop
                                controls
                                muted
                                className="rounded-xl object-cover mx-auto h-full" 
                                src="/airplane.mp4"
                            />
                            <img 
                                className="absolute right-2 bottom-10" 
                                width="90" 
                                src="/images/tiktok-logo-white.png"
                            />
                        </div>
                        
                       {/*<PostMainLikes post={post} /> */}
                    </div>
                </div>
            </div>
        </>
    )


}