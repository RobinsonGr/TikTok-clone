"use client"

import Image from "next/image";
import Header from "./layouts/components/Header"
import SideNavMenu from "./layouts/components/includes/SideNavMenu"


export default function Home() {
  return (
    <>
      <Header />
      <SideNavMenu />
    </>
  );
}
