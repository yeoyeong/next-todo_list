import axios from "axios";

export const statePatchTodoList = async (payload: any) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Accept", "application/json");
  requestHeaders.set("Authorization", payload.fetchData.accessToken);

  const res = await fetch(
    `http://localhost:3000/api/user/success/${payload.fetchData.id}?id=${payload.fetchData.postId}`,
    {
      method: "PATCH",
      headers: requestHeaders,
      body: JSON.stringify({ state: payload.fetchData.state }),
      // cache: "no-store",
    }
  ).then((res) => res.json());
  return res;
};
