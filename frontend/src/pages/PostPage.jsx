import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useLazyGetPostsQuery } from "../redux/api/posts";
import { toast } from "react-toastify";

export default function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);

  const [triggerGetPosts, { isLoading }] = useLazyGetPostsQuery();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await triggerGetPosts(`?slug=${postSlug}`);
        setPost(res.data.posts[0]);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchPost();
  }, [postSlug, triggerGetPosts]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="flex flex-col max-w-6xl min-h-screen p-3 mx-auto">
      <h1 className="max-w-2xl p-3 mx-auto mt-10 font-serif text-3xl text-center lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between w-full max-w-2xl p-3 mx-auto text-xs border-b border-slate-500">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="w-full max-w-2xl p-3 mx-auto post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
    </main>
  );
}
