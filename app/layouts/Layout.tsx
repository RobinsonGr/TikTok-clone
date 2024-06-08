import React from 'react'
import Header from './includes/Header'
import SideNavMenu from './includes/SideNavMenu'
import { usePathname } from 'next/navigation'


export default function Layout({children}: {children: React.ReactNode}){
    const pathname = usePathname()

    return (
        <>
            <header/>
            <div className={`flex justify-between mx-auto w-full lg:px-2.5 px-0 ${pathname == '/' ? 'max-w-[1140px]' : ''}`}>
                <SideNavMenu/>
                {children}
            </div>
        </>
        
    )
}