
import Link from "next/link"
import { BiSearch, BiUser } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import Upload from "@/app/upload/page"
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '@/graphql/mutations';

//It will wrapp this in a client component, just for now, i will use use client

export default function Header() {

  
    const [signIn, { data, loading, error }] = useMutation(SIGN_IN);
    // Test the signIn mutation
    const handleSignIn = async () => {
      try {
        const response = await signIn({
          variables: {
            email: 'alicejohnson@example.com', // Replace with actual email
            password: '123456Aa', // Replace with actual password
          },
        });
        console.log('SignIn response:', JSON.stringify(response.data, null, 2));
    } catch (err) {
        console.error('Error signing in:', err);
      }
    };


    handleSignIn()


    return (
        <div className="border-b border-grey">
            <div className="flex justify-between items-center py-2 mx-auto w-full px-5">

                {/*tiktok's logo */}
                <Link href="/">
                    <img className="max-w-32" src="/tiktok-logo.png" />
                </Link>

                {/*search bar */}
                <div className="relative hidden md:flex w-96 px-3 py-1 flex justify-between items-center h-10 bg-gray-200 rounded-full">

                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full my-2 pl-2 mr-2 text-gray-500 bg-gray-200 border-e-2 placeholder:text-gray-400 border-gray-300 focus:outline-none" />
                    <BiSearch color="#A1A2A7" size="22" />

                    {/* dropdown search users  */}
                    <div className="absolute bg-white w-full h-auto flex justify-between left-0 z-20 top-10 py-2  border">
                        <Link
                            href='/'
                            className="w-full cursor-pointer hover:bg-[#F12B56] p-1 px-2 hover:text-white"
                        >
                            <div className="flex items-center">
                                <img src="https://placehold.co/40" className="rounded-md" />
                                <div className="truncate ml-2">Su puta madre</div>
                            </div>
                        </Link>
                    </div>
                </div>

                <Upload></Upload>
                {/*right buttons */}
                <div className="relative flex items-center gap-3">

                    {/* + Upload button */}
                    <button className="flex items-center px-3 py-2 border rounded-s hover:bg-gray-200">
                        <AiOutlinePlus color="#000000" size="22" />
                        <span className="px-2 text-base font-medium">Upload</span>
                    </button>

                    {0 ? (
                        /*user auth profile menu */
                        <div>
                            <button >
                                <Link href='/'>
                                    <img src="https://placehold.co/25" className="rounded-full size-9" />
                                </Link>
                            </button>

                            {/* dropdown profile options */}
                            <div className="absolute w-52 flex flex-col rounded-lg bg-white w-full h-auto  right-0 z-20 top-10 border shadow-xl py-1.5">

                                <button
                                    className="flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <div className="flex items-center">
                                        <BiUser />
                                        <div className="truncate ml-2">Profile</div>
                                    </div>
                                </button>

                                <button
                                    className="flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <div className="flex items-center">
                                        <FiLogOut />
                                        <div className="truncate ml-2">Sign out</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <button className="flex items-center px-3 py-1.5 bg-[#F12B56] border rounded-md ">
                                <span className="whitespace-nowrap mx-4 text-white font-medium">Log in</span>
                            </button>
                            <BsThreeDotsVertical color="#161724" size="25" />
                        </div>
                    )

                    }

                </div>
            </div>
        </div>
    )
}