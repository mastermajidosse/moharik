import dayjs from "dayjs";
import { PersonWithHeartIcon } from "../materials/icons";
import { getCurrentUser } from "../../utils/getCurrentUser";
import { client } from "../../utils/api";
import { useRouter } from "next/router";
import { getToken } from "../../utils/getToken";
import { toast } from "react-toastify";

interface CommentItemProps {
  author: string;
  authorId: string;
  createdAt: Date;
  comment: string;
  target?: "posts" | "teams";
  commentId: string;
}

export default function CommentItem({
  author,
  createdAt,
  comment,
  authorId,
  commentId,
  target = "posts",
}: CommentItemProps) {
  const { query, reload } = useRouter();
  async function handleDelete() {
    try {
      await client.delete(
        `/${target}/${
          target === "posts"
            ? (query?.projectId as string)
            : (query?.teamId as string)
        }/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      toast.success("Comment has been deleted successfully.");
      reload();
    } catch (error) {
      toast.error("Something went wrong!!!");
      console.log(error);
    }
  }
  return (
    <div className="flex gap-4">
      <figure className="w-10 h-10 bg-primary-100/50 rounded-full flex justify-center items-center">
        <PersonWithHeartIcon
          width="20"
          height="20"
          className="text-primary-500"
        />
      </figure>
      <div className="w-full flex flex-col text-dark">
        <div className="w-full flex justify-between items-center">
          <h3 className="w-fit font-bold">{author}</h3>
          {getCurrentUser()?._id === authorId && (
            <svg
              onClick={handleDelete}
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="bi bi-trash3 w-fit bg-slate-100 cursor-pointer p-1.5 rounded hover:bg-red-50 hover:text-red-500"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
          )}
        </div>
        <p className="text-sm font-medium text-lightDark">
          {dayjs(createdAt).format("DD MMM, YYYY")}
        </p>
        <p className="text-sm font-medium text-lightDark">{comment}</p>
      </div>
    </div>
  );
}
