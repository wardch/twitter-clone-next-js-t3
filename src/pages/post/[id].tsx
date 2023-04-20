import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postView";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data: post } = api.posts.getById.useQuery({
    id,
  });

  if (!post) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>{`${post.post.content} - @${post.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...post} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("id is not defined");

  await helpers.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
