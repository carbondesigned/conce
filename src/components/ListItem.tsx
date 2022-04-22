import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
  active: boolean;
  link: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export const ListItem = (props: Props) => {
  return (
    <li
      onClick={props.onClick}
      className={`w-full gap-6 rounded-xl ${
        props.active ? 'bg-black text-white' : 'bg-gray-50 text-gray-400'
      } px-6 py-2 `}
    >
      <Link href={props.link}>
        <a className='flex w-full items-center gap-6'>
          <span className='justify-self-start'>{props.icon}</span>
          <span className='text-2xl font-bold'>{props.children}</span>
        </a>
      </Link>
    </li>
  );
};
