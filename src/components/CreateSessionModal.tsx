import Overlay from './Overlay';
import { generateRandomImage, images } from '@/utils/generateRandomImage';
import Image from 'next/image';
import useStore from 'src/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSessionValidator } from 'src/shared/create-session-validator';
import { trpc } from '@/utils/trpc';
import { ISession } from '@/types/*';

/* type Props = {} */

const CreateSessionModal = () => {
  const createSessionMutation = trpc.useMutation(['sessions.create-session']);
  const store = useStore();
  const utils = trpc.useContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISession>({
    resolver: zodResolver(createSessionValidator),
  });
  const onSubmit = handleSubmit((data) => {
    createSessionMutation.mutate(data, {
      onSuccess: () => {
        store.setClose();
        utils.invalidateQueries('sessions.get-all-sessions');
      },
    });
  });

  if (errors) {
    console.log(errors);
  }

  return (
    <Overlay>
      <div className='relative mx-auto flex max-w-screen-xl flex-col overflow-hidden rounded-2xl bg-white lg:w-[50%]'>
        <div
          className='absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-white bg-opacity-75 p-2'
          onClick={() => store.setClose()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <div className='relative h-72 w-full'>
          <div className='absolute inset-0 z-10 grid h-full w-full place-items-center bg-black bg-opacity-50'>
            <input
              type='file'
              accept='image/*'
              className='ml-3 w-fit rounded-lg bg-white px-5 py-3 text-sm font-medium text-black'
            />
          </div>
          <Image
            src={generateRandomImage(images)}
            alt='default session cover image'
            layout='fill'
            objectFit='cover'
            objectPosition='center'
          />
        </div>
        <div className='px-4 py-16 sm:px-6 lg:px-32'>
          <div className='mx-auto max-w-md'>
            <h1 className='text-2xl font-bold sm:text-3xl'>Create Session</h1>
          </div>
          <form
            className='mx-auto mt-8 mb-0 max-w-md space-y-4'
            onSubmit={onSubmit}
          >
            <div>
              <label htmlFor='title' className='sr-only'>
                Title
              </label>
              <div className='relative'>
                <input
                  {...register('title')}
                  type='text'
                  className='w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm'
                  placeholder='Enter Title'
                  name='title'
                />
              </div>
            </div>
            <div>
              <label htmlFor='description' className='sr-only'>
                Description
              </label>
              <div className='relative'>
                <textarea
                  {...register('description', { required: true })}
                  className='w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm'
                  placeholder='Enter Description'
                  rows={5}
                  name='description'
                />
              </div>
            </div>
            <div className='flex flex-col items-center justify-between gap-2'>
              <button
                type='submit'
                className='ml-3 w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white'
              >
                Create
              </button>
              <p className='text-sm text-gray-500'>
                No account?
                <a className='underline' href=''>
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Overlay>
  );
};

export default CreateSessionModal;
