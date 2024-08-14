import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  useDeleteCommentMutation,
  useLazyGetCommentsQuery,
} from "../redux/api/comments";
import { toast } from "react-toastify";

export default function DashComments() {
  const { userInfo } = useSelector(state => state.auth);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  const [toggleGetComments] = useLazyGetCommentsQuery();
  const [deleteComment] = useDeleteCommentMutation();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await toggleGetComments();
        setComments(res.data.comments);
        if (res.data.comments.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    if (userInfo.isAdmin) {
      fetchComments();
    }
  }, [toggleGetComments, userInfo._id, userInfo.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await toggleGetComments(`?startIndex=${startIndex}`);
      setComments(prev => [...prev, ...res.data.comments]);
      if (res.data.comments.length <= 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      await deleteComment(commentIdToDelete);

      setComments(prev =>
        prev.filter(comment => comment._id !== commentIdToDelete)
      );

      if (showMore) {
        const startIndex = comments.length - 1;
        const res = await toggleGetComments(
          `?startIndex=${startIndex}&limit=1`
        );

        if (res.data.comments.length > 0) {
          setComments(prev => [...prev, ...res.data.comments]);
        } else {
          setShowMore(false);
        }
      }

      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-3 overflow-x-scroll table-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {userInfo.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map(comment => (
              <Table.Body className="divide-y" key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 cursor-pointer hover:underline"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="self-center w-full text-sm text-teal-500 py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no comments yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
