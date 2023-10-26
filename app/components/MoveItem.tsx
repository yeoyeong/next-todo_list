import { usePatchStateTodo } from "@/utils/queries/usePatchStateTodo";
import { useSession } from "next-auth/react";
import React from "react";

interface Props {
  itemState: boolean;
  postId: number;
}
const MoveItem = (props: Props) => {
  const { itemState, postId } = props;
  const { data } = useSession();
  const { mutate: patchStateTodoMutation } = usePatchStateTodo();

  const editStateHandler = (postId: number) => {
    if (!data) return;
    console.log(itemState);
    const fetchData: {
      state: boolean;
      id: number;
      postId: number;
      accessToken: string;
    } = {
      state: !itemState ? true : false,
      id: data.user.id,
      postId: postId,
      accessToken: data.user.accessToken,
    };
    stateFetchFnc(fetchData);
  };

  const stateFetchFnc = async (fetchData: {
    state: boolean;
    id: number;
    postId: number;
    accessToken: string;
  }) => {
    if (!data) return;
    await patchStateTodoMutation(
      { fetchData },
      {
        onSuccess: () => {
          //   setEditModeList((prev) =>
          //     prev.filter((item) => item !== fetchData.postId)
          //   );
        },
      }
    );
  };

  if (!itemState) {
    return <button onClick={() => editStateHandler(postId)}>완료</button>;
  } else {
    return <button onClick={() => editStateHandler(postId)}>보류</button>;
  }
};

export default MoveItem;
