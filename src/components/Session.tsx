import { Button } from './Button';
import React from 'react';
import type { ISession } from '@/types/';
import { titleToSlug } from 'src/utils/titleToSlug';
import Image from 'next/image';
import { generateRandomImage, images } from '@/utils/generateRandomImage';

type Props = {
  session: ISession;
};

const Session = ({ session }: Props) => {
  const [image] = React.useState(generateRandomImage(images));
  return (
    <div className='overflow-hidden rounded-2xl bg-white'>
      <div className='relative h-48 max-w-full'>
        <Image
          src={!session.image ? image : session.image}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          alt='session cover image'
        />
      </div>
      <div className='p-6'>
        <h2 className='text-3xl font-medium'>{session.title}</h2>
        <div className='flex flex-col gap-6'>
          <p className='truncate'>{session.description}</p>
          <Button link={titleToSlug(session.title)}>View</Button>
        </div>
      </div>
    </div>
  );
};

export default Session;
