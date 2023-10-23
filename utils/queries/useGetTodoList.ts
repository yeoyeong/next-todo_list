import { useQuery } from "react-query";
import { getTodoList } from "../apis/getTodoList";

export const useGetTodoList = (id: any, accessToken: any) => {
  const result = useQuery(
    ["todolist", id, accessToken],
    () => getTodoList(id, accessToken),
    {
      // cacheTime: 5 * 60 * 1000, // 5 minutes
      // initialData: initialData ? initialData : undefined,
    }
  );

  return {
    ...result,
    // contents: result.data?.data.result,
  };
};
