import { AiOutlineHome } from "react-icons/ai"
import { RiGroupLine } from "react-icons/ri"
import { BsCameraVideo } from "react-icons/bs"
import { MenuItemTypes } from "@/app/types"

export default function SideItemButton({iconString, colorString, sizeString}: MenuItemTypes) {


    //it will set the icon dinamically, so in the future more icons can be added without so mucho boilerplate

    const renderIcon = () => {
        switch(iconString) {
            case 'For You':
                return <AiOutlineHome size={sizeString} color={colorString}/>
            case 'Following':
                return <RiGroupLine size={sizeString} color={colorString}/>
            case 'LIVE':
                return <BsCameraVideo size={sizeString} color={colorString}/>        
            default:
                return null;
        }
    };

    return (
        <div className="flex justify-center lg:justify-start hover:bg-gray-200 p-3">
            {renderIcon()}

            <span className="hidden lg:flex ml-2 text-lg font-bold">{iconString}</span>
        </div>
    )

}