import AppLayout from './layouts/AppLayout'
import ClientRender from './ClientRender'

import Image from "next/image";
import Header from "./layouts/includes/Header"
import SideNavMenu from "./layouts/includes/SideNavMenu"
import PostBody from "./components/PostBody";



export default function Home() {
  return (
    <>
      <AppLayout>
        <div className='w-full'>
            <PostBody/>
        </div>
      </AppLayout>
    </>
  );
}
