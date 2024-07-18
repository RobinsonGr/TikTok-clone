import AppLayout from '@/app/layouts/AppLayout'
import ClientRender from './ClientRender'
import { getClient } from '@/lib/apollo-client';
import { SIGN_IN } from '@/graphql/mutations';

import PostBody from "./components/PostBody";



export default async function Home() {
  const { data } = await getClient().query({ query: SIGN_IN });
  console.log(data)

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
