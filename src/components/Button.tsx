import React from 'react';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  link: string;
};

export function Button(props: Props) {
  return (
    <Link href={props.link}>
      <a className='w-fit rounded-2xl bg-black py-4 px-12 text-xl font-medium text-white duration-75 hover:scale-105'>
        {props.children}
      </a>
    </Link>
  );
}
