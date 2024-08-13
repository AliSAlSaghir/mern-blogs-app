import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { useLazyGetPostsQuery } from "../redux/api/posts";
import { toast } from "react-toastify";

export default function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

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

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await triggerGetPosts("?limit=3");

        setRecentPosts(res.data.posts);
      };
      fetchRecentPosts();
    } catch (error) {
      toast.error(error.message);
    }
  }, [triggerGetPosts]);

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
      <div className="w-full max-w-4xl mx-auto">
        <CallToAction />
      </div>
      <CommentSection postId={post?._id} />

      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="mt-5 text-xl">Recent articles</h1>
        <div className="flex flex-wrap justify-center gap-5 mt-5">
          {recentPosts &&
            recentPosts.map(post => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
