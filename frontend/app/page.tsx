import AppLayout from '@/app/layouts/AppLayout'
import ClientRender from './ClientRender'

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
