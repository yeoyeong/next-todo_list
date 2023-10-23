import { useDeleteTodoList } from "@/utils/queries/useDeleteTodoList";
import { useSession } from "next-auth/react";

const DeleteButton = ({ postId }: { postId: number }) => {
  const { data } = useSession();
  const { mutate: deleteTodoListMutation } = useDeleteTodoList();

  const deleteHandler = async (postId: number) => {
    if (!data) return;
    const fetchData: { id: number; postId: number; accessToken: string } = {
      id: data.user.id,
      postId: postId,
      accessToken: data.user.accessToken,
    };
    dataFetchFnc(fetchData);
  };
  const dataFetchFnc = async (fetchData: {
    id: number;
    accessToken: string;
    postId: number;
  }) => {
    if (!data) return;
    await deleteTodoListMutation(
      { fetchData },
      {
        onSuccess: () => {},
      }
    );
  };
  return <button onClick={() => deleteHandler(postId)}>삭제</button>;
};

export default DeleteButton;
