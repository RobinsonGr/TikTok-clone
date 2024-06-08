"use client"
import Layout from './layouts/layout'

import Image from "next/image";
import Header from "./layouts/includes/Header"
import SideNavMenu from "./layouts/includes/SideNavMenu"
import PostBody from "./components/PostBody";



export default function Home() {
  return (
    <>
      <Layout>
        <PostBody/>
      </Layout>
    </>
  );
}
