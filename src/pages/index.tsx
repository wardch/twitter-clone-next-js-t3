import { type NextPage } from "next";
import { SignInButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Image from "next/image";
import { LoadingSpinner, LoadingPage } from "~/components/loadingSpinner";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postView";

const CreatePostsWizard = () => {
  const [input, setInput] = useState("");

  const { user } = useUser();

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const fieldErrors = e.data?.zodError?.fieldErrors.content;
      if (fieldErrors && fieldErrors[0]) {
        toast.error(fieldErrors[0]);
      } else {
        toast.error("Failed to post. Please try again later.");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full gap-3 p-4">
      <Image
        src={user.profileImageUrl}
        alt="profile image"
        className="h-14 w-14 rounded-full"
        priority
        width={56}
        height={56}
      />
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="type some emojis"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
        disabled={isPosting}
        className="grow bg-transparent outline-none"
      />
      {input !== "" && !isPosting && (
        <button
          disabled={isPosting}
          onClick={() => {
            mutate({ content: input });
          }}
        >
          Post
        </button>
      )}

      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={25} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();
  if (postsLoading) return <LoadingPage />;
  return (
    <div className="flex flex-col">
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // fetch the posts early, use react cache so that it can be referenced
  // quickly later on
  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <>
      <PageLayout>
        {!isSignedIn && (
          <div className="flex justify-center p-4">
            <SignInButton />
          </div>
        )}
        {isSignedIn && <CreatePostsWizard />}
        <div className="border-b border-slate-400"></div>
        <Feed />
      </PageLayout>
    </>
  );
};

export default Home;
