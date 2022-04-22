import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Overlay = (props: Props) => {
  return (
    <div className='absolute inset-0 z-10 grid place-items-center bg-[rgba(0,0,0,0.5)]'>
      {props.children}
    </div>
  );
};

export default Overlay;
