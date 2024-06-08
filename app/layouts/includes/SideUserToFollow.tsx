
import { UserToFollowTypes } from "@/app/types"
import { MdVerified } from "react-icons/md";

export default function SideUserToFollow({ user }: UserToFollowTypes) {

    ////https://placehold.co/40

    return (
        <div className="flex justify-center items-center lg:justify-start hover:bg-gray-200 mt-3 px-2 py-1npm r">
            <img src="https://placehold.co/40"  width="35"  className="rounded-full"></img>
            //like the all elements in the sideBar, when it is below bg, it will hide the text and only the logos will stay
            <div className="flex flex-col ml-3 hidden ml-2 lg:flex">
                <div className="flex items-center">
                    <p className="font-bold">{user.name}</p>
                    <span>
                        <MdVerified color='25f4ee' width={'35'} className="relative p-1" size="30" />
                    </span>
                </div>
                <p className="text-sm">Idk what's</p>
            </div>

        </div>
    )


};