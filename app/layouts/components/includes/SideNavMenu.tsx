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
            <div className="flex flex-col lg:w-full bg-white truncate mt-2 border-b py-2">
            <p className="text-sm pl-3 text-gray-600 font-semibold">Suggested accounts</p>

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
            <p className="text-rose-600	font-semibold text-sm pl-3 py-2">See All</p>
            </div>

            {/* Following accounts sections */}
            <div className="flex flex-col lg:w-full bg-white truncate mt-2 border-b py-2">
            <p className="text-sm pl-3 text-gray-600 font-semibold">Following accounts </p>

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
            <p className="text-rose-600	font-semibold text-sm pl-3 py-2">See More</p>
            </div>
            
            <div>
          <p>
            <span className="font-bold">Company</span>
            <br/>
            About Newsroom ContactCareers
            <br/>
            <span className="font-bold">Program</span>
            <br/>
            TikTok for Good AdvertiseT ikTok LIVE Creator Networks Developers Transparency TikTok RewardsTikTok Embeds
            <br/>
            <span className="font-bold">Terms & Policies</span>
            <br/>
            Help Safety TermsPrivacy PolicyPrivacy CenterCreator Academy Community Guidelines
            <br/>
            © 2024 TikTok
          </p>
            </div>

        </div>
    );
};