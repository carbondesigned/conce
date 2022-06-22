import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const IndexPage: NextPageWithLayout = () => {
  const sessionSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(1).max(32),
    description: z.string().optional(),
    cover: z.string().optional(),
    tags: z.string().array().optional(),
    location: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sessionSchema),
  });
  const utils = trpc.useContext();
  const postsQuery = trpc.useQuery(['session.all']);
  const addPost = trpc.useMutation('session.add', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(['session.all']);
    },
  });
  console.log(errors);

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);
  const onSubmit = handleSubmit((data) => {
    return addPost.mutate(data as any);
  });
  return (
    <>
      <h1>Welcome to your tRPC starter!</h1>
      <p>
        Check <a href="https://trpc.io/docs">the docs</a> whenever you get
        stuck, or ping <a href="https://twitter.com/alexdotjs">@alexdotjs</a> on
        Twitter.
      </p>

      <h2>
        Posts
        {postsQuery.status === 'loading' && '(loading)'}
      </h2>
      {postsQuery.data?.map((item) => (
        <article key={item.id}>
          <h3>{item.title}</h3>
          <Link href={`/post/${item.id}`}>
            <a>View more</a>
          </Link>
        </article>
      ))}
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            {...register('title')}
            name="title"
            placeholder="Title"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            {...register('description')}
            name="description"
            placeholder="description"
          />
        </div>
        <div>
          <label htmlFor="cover">Cover</label>
          <input {...register('cover')} name="cover" type="file" />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input
            {...register('tags')}
            name="tags"
            placeholder="Tags"
            type="text"
          />
        </div>
        <button>Create</button>
      </form>
    </>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
