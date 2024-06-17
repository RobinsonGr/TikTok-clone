"use client"

import { useEffect, useState } from "react"

export default function ClientRender({children}: {children: React.ReactNode}){

    const [isClient, setIsClient] = useState(false);

    //this hooks or anyother other, executes only in the client context, if it does, it means that it is in the client and it sets client to true
    useEffect(() => {setIsClient(true)}, []);

    return (<> {isClient ? <div>{children}</div> : null} </>);

}