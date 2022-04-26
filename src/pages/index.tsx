import CreateSessionModal from '@/components/CreateSessionModal';
import Fab from '@/components/Fab';
import Layout from '@/components/Layout';
import Session from '@/components/Session';
import type { NextPage } from 'next';
import Head from 'next/head';
import useStore from 'src/store';
import { trpc } from 'src/utils/trpc';

const Home: NextPage = () => {
  const store = useStore();
  const { data: sessions, isLoading } = trpc.useQuery([
    'sessions.get-all-sessions',
  ]);
  return (
    <>
      {store.open && <CreateSessionModal />}
      <Head>
        <title>Conce | A focus app all in one</title>
        <meta
          name='description'
          content='An app that helps people stay focused with the pomodoro technique. With built-in features to help keep track of tasks and work sessions.
'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        {!store.open && <Fab />}
        <section>
          <h1 className='py-6 text-6xl font-normal uppercase text-gray-300'>
            Recent Sessions
          </h1>
          {isLoading && <p>Loading...</p>}
          <div className='flex flex-wrap gap-6'>
            {sessions?.map((session) => (
              <Session key={session.id} session={session} />
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
