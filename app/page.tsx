import Image from "next/image";
import Header from "./layouts/components/Header.jsx"
import SidebarMenu from "./layouts/components/includes/SideNavMenu.jsx"

export default function Home() {
  return (
   <>
     <Header/>
      <SidebarMenu/>
   </>
  );
}
