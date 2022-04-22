import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { trpc } from 'src/utils/trpc';

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['sessions.get-all-sessions']);
  console.log(data);
  return (
    <div>
      <Head>
        <title>Conce | A focus app all in one</title>
        <meta
          name='description'
          content='An app that helps people stay focused with the pomodoro technique. With built-in features to help keep track of tasks and work sessions.
'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        {isLoading ? <p>Loading...</p> : <p>{JSON.stringify(data)}</p>}
      </main>
    </div>
  );
};

export default Home;
