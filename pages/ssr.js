import { getSession } from 'next-auth/client'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'

export default function Page ({ session }) {
  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p><strong>Welcome {session.user.name}</strong></p>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}