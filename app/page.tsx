"use client";
import { getSession, useSession } from "next-auth/react";
import SignInButton from "./components/SignInButton";
import WriteButton from "./components/WriteButton";
import { useEffect, useState } from "react";
import { useGetTodoList } from "@/utils/queries/useGetTodoList";
import DeleteButton from "./components/DeleteButton";
import EditButton from "./components/EditButton";
import styles from "./styles/home.module.css";
import MoveItem from "./components/MoveItem";
// async function getData() {
//   const res = await fetch(`http://localhost:3000/api/user/1`);
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }
// export default async function Home() {
//   const session = await getServerSession();
//   const data = await getData();
//   return <>s</>;
// }
export default function Home() {
  // const [userPosts, setUserPosts] = useState([]);
  const { data } = useSession();

  const { data: todoListData, isSuccess } = useGetTodoList(
    data?.user.id,
    data?.user.accessToken
  );

  const [editModeList, setEditModeList] = useState<number[]>([]);
  const [editValue, setEditValue] = useState<{ [key: string]: string }>({});
  const valueOnChange = (e: any) => {
    setEditValue({ ...editValue, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <WriteButton />
      <SignInButton />
      <div className="flex gap-x-20">
        <section className={styles.todolist_before_wrap}>
          {isSuccess &&
            todoListData.userPosts &&
            todoListData.userPosts.map((el: any, idx: number) => {
              if (!el.published) {
                return (
                  <div key={el.id} className={styles.todo_item}>
                    <div>
                      {editModeList.includes(el.id) ? (
                        <input
                          type="text"
                          defaultValue={el.title}
                          id={el.id}
                          onChange={valueOnChange}
                        />
                      ) : (
                        <span>{el.title}</span>
                      )}
                      <EditButton
                        postId={el.id}
                        editModeList={editModeList}
                        setEditModeList={setEditModeList}
                        editValue={editValue}
                      />
                    </div>
                    <div className={styles.button_wrap}>
                      <DeleteButton postId={el.id} />
                      <MoveItem itemState={el.published} postId={el.id} />
                    </div>
                  </div>
                );
              }
            })}
        </section>
        <section className={styles.todolist_success_wrap}>
          {isSuccess &&
            todoListData.userPosts &&
            todoListData.userPosts.map((el: any, idx: number) => {
              if (el.published) {
                return (
                  <div key={el.id} className={styles.todo_item}>
                    <div>
                      {editModeList.includes(el.id) ? (
                        <input
                          type="text"
                          defaultValue={el.title}
                          id={el.id}
                          onChange={valueOnChange}
                        />
                      ) : (
                        <span>{el.title}</span>
                      )}
                      <EditButton
                        postId={el.id}
                        editModeList={editModeList}
                        setEditModeList={setEditModeList}
                        editValue={editValue}
                      />
                    </div>
                    <div className={styles.button_wrap}>
                      <DeleteButton postId={el.id} />
                      <MoveItem itemState={el.published} postId={el.id} />
                    </div>
                  </div>
                );
              }
            })}
        </section>
      </div>
    </div>
  );
}
