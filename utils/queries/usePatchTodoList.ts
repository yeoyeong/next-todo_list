import { useMutation, useQueryClient } from "react-query";
import { patchTodoList } from "../apis/patchTodoList";

export const usePatchTodoList = () => {
  const queryClient = useQueryClient();

  return useMutation(patchTodoList, {
    onSuccess: (payload) => {
      queryClient.invalidateQueries({ queryKey: ["todolist"] });
    },
    onError(err: any) {
      if (err.response.data.errorCode === "9999") {
        alert("예외처리 하지 못한 에러입니다. 관리자에게 문의해주세요.");
      } else if (err.response.data.errorCode) {
        return alert(err.response.data.message);
      }
      if (!err.response.data.message || !err.response.data.errorCode)
        return alert("예외처리 하지 못한 에러입니다. 관리자에게 문의해주세요.");
    },
  });
};
