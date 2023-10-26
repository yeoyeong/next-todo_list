import { usePatchStateTodo } from "@/utils/queries/usePatchStateTodo";
import { usePatchTodoList } from "@/utils/queries/usePatchTodoList";
import { useSession } from "next-auth/react";
import React from "react";

interface Props {
  postId: number;
  editModeList: number[];
  setEditModeList: React.Dispatch<React.SetStateAction<number[]>>;
  editValue: { [key: string]: string };
}
const EditButton = (props: Props) => {
  const { data } = useSession();
  const { editModeList, setEditModeList } = props;
  const { editValue } = props;
  const { postId } = props;
  const { mutate: patchTodoListMutation } = usePatchTodoList();

  const editChangeHandler = (postId: number) => {
    if (editModeList.includes(postId))
      return setEditModeList((prev) => prev.filter((item) => item !== postId));
    setEditModeList((prev) => [...prev, postId]);
  };

  const editSubmitHandler = (postId: number) => {
    if (!data) return;
    const fetchData: {
      value: string;
      id: number;
      postId: number;
      accessToken: string;
    } = {
      value: editValue[postId],
      id: data.user.id,
      postId: postId,
      accessToken: data.user.accessToken,
    };
    dataFetchFnc(fetchData);
  };

  const dataFetchFnc = async (fetchData: {
    value: string;
    id: number;
    postId: number;
    accessToken: string;
  }) => {
    if (!data) return;
    await patchTodoListMutation(
      { fetchData },
      {
        onSuccess: () => {
          setEditModeList((prev) =>
            prev.filter((item) => item !== fetchData.postId)
          );
        },
      }
    );
  };

  return (
    <div>
      {editModeList.includes(postId) ? (
        <span>
          <button onClick={() => editSubmitHandler(postId)}>수정</button>
          <button onClick={() => editChangeHandler(postId)}>취소</button>
        </span>
      ) : (
        <button onClick={() => editChangeHandler(postId)}>관리</button>
      )}
    </div>
  );
};

export default EditButton;
