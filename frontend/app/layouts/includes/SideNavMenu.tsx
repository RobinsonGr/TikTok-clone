import SideItemsButtons from "./SideItemButton"
import { usePathname } from "next/navigation"
import SideUserToFollow from "./SideUserToFollow";

export default function SideNavMenu() {

    const pathname = usePathname();

    return (

        //${pathname === '/' ? "lg:w-80" : "lg:w-56"} 
        <div className={`flex flex-col justify-center items-center w-20 p-2 lg:w-56 border-r lg:border-r-0 overflow-auto shadow-right lg:shadow-none`}>


            <div className="flex flex-col lg:w-full bg-white truncate mt-5 border-b pb-2">
                <SideItemsButtons iconString="For You" colorString={pathname == '/' ? '#F02C56' : ''} sizeString="25" />
                <SideItemsButtons iconString="Following" colorString="#000000" sizeString="25" />
                <SideItemsButtons iconString="LIVE" colorString="#000000" sizeString="25" />
            </div>

            {/* Suggested accounts sections */}
            <div className="flex flex-col lg:w-full bg-white truncate mt-2 border-b pb-2">
                <p className="text-sm pl-3 text-gray-600 font-semibold hidden lg:block">Suggested accounts</p>

                <SideUserToFollow user={{
                    id: "123",
                    name: "John Doe",
                    image: "https://example.com/avatar.jpg"
                }} />
                <SideUserToFollow user={{
                    id: "123",
                    name: "John Doe",
                    image: "https://example.com/avatar.jpg"
                }} />
                <p className="text-rose-600	font-semibold text-sm pl-3 py-2 hidden lg:block ">See All</p>
            </div>

            {/* Following accounts sections */}
            <div className="flex flex-col lg:w-full bg-white truncate mt-2 border-b pb-2">
                <p className="text-sm hidden lg:block pl-3 text-gray-600 font-semibold">Following accounts </p>

                <SideUserToFollow user={{
                    id: "123",
                    name: "John Doe",
                    image: "https://example.com/avatar.jpg"
                }} />
                <SideUserToFollow user={{
                    id: "123",
                    name: "John Doe",
                    image: "https://example.com/avatar.jpg"
                }} />
                <p className="text-rose-600 hidden lg:block font-semibold text-sm pl-3 py-2">See More</p>
            </div>

            <div className="text-gray-500 text-sm pt-3">
                <div>
                    <p className="font-bold focus:underline" >Company</p>
                    <p>About Newsroom Contact Careers</p>
                </div>
                <br />
                <div>
                    <p className="font-bold focus:underline" >Program</p>
                    <p>TikTok for Good Advertise TikTok LIVE Creator Networks Developers Transparency TikTok Rewards TikTok Embeds</p>
                </div>
                <br />
                <div>
                    <p className="font-bold focus:underline" >Terms & Policies</p>
                    <p>Help Safety Terms Privacy Policy Privacy Center Creator Academy Community Guidelines</p>
                </div>
                <br />
                <p>© 2024 TikTok</p>
            </div>


        </div>
    );
};