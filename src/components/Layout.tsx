import React from 'react';
import Navbar from './Navbar';

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <main className='flex'>
      <Navbar />

      <section className='flex-[3]'>{props.children}</section>
    </main>
  );
};

export default Layout;
