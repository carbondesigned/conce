import React from 'react';
import useStore from 'src/store';

type Props = {
  children: React.ReactNode;
};

const Overlay = (props: Props) => {
  const store = useStore();
  return (
    <div
      onKeyDown={(e) => {
        e.key === 'Escape' && store.setClose();
      }}
      className='absolute inset-0 z-10 grid place-items-center bg-[rgba(0,0,0,0.5)]'
    >
      {props.children}
    </div>
  );
};

export default Overlay;
