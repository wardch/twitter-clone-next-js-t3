import { type NextPage } from "next";
import Head from "next/head";

const SinglePostPage: NextPage = () => {
  // if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>POST</title>
      </Head>
      <main className="flex h-screen justify-center">
        {/* the code below makes the content full, unless its medium or large
        in which case it is 2xl max */}
        <div>POST VIEW</div>
      </main>
    </>
  );
};

export default SinglePostPage;
