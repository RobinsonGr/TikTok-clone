"use client"

import React from 'react'
import Header from './includes/Header'
import SideNavMenu from './includes/SideNavMenu'
import { usePathname } from 'next/navigation'


export default function AppLayout({children}: {children: React.ReactNode}){
    const pathname = usePathname()

    return (
        <>
            <Header/>
            <div className={`flex w-full gap-3 lg:px-2.5 px-0 `}>
                <SideNavMenu/>
                {children}
            </div>
        </>
        
    )

    "use client"

import React from 'react'
import Header from './includes/Header'
import SideNavMenu from './includes/SideNavMenu'
import { usePathname } from 'next/navigation'


export default function AppLayout({children}: {children: React.ReactNode}){
    const pathname = usePathname()

    return (
        <>
            <Header/>
            <div className={`flex w-full gap-3 lg:px-2.5 px-0 `}>
                <SideNavMenu/>
                {children}
            </div>
        </>
        
    )
}
    "use client"

import React from 'react'
import Header from './includes/Header'
import SideNavMenu from './includes/SideNavMenu'
import { usePathname } from 'next/navigation'


export default function AppLayout({children}: {children: React.ReactNode}){
    const pathname = usePathname()

    return (
        <>
            <Header/>
            <div className={`flex w-full gap-3 lg:px-2.5 px-0 `}>
                <SideNavMenu/>
                {children}
            </div>
        </>
        
    )
}
}
