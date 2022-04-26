import React from 'react';
import useStore from 'src/store';

/* type Props = {}; */

const Fab = () => {
  const store = useStore();
  return (
    <div
      className='absolute bottom-10 right-10 cursor-pointer'
      onClick={() => store.setOpen()}
    >
      <div className='grid h-16 w-16 place-items-center rounded-full bg-black'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-8 w-8 fill-white'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    </div>
  );
};

export default Fab;
