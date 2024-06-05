import SideItemsButtons from "./SideItemButton"
import { usePathname } from "next/navigation"

export default function SideNavMenu() {

    const pathname = usePathname();

    return (

        //${pathname === '/' ? "lg:w-80" : "lg:w-56"} 
        <div className={`flex justify-center items-center w-20 px-2 py-2 lg:w-56 border-r lg:border-r-0 overflow-auto shadow-right lg:shadow-none`}>
             <div className="flex flex-col lg:w-full bg-white truncate mt-5">
                <SideItemsButtons iconString="For You"  colorString={pathname == '/' ? '#F02C56' : ''} sizeString="25" />
                <SideItemsButtons iconString="Following" colorString="#000000" sizeString="25"/>
                <SideItemsButtons iconString="LIVE" colorString="#000000" sizeString="25"/>
            </div>
        </div>
    );   
};