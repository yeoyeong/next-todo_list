import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  name: string;
  email: string;
}

//Credentials Provider
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "이메일", type: "text", placeholder: "name" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // 로그인 성공 시 user 정보가 전달됩니다.
        token = { ...user };
        token.accessToken = user.accessToken; // 이 때 accessToken을 token에 추가합니다.
      }
      console.log(token);
      return token;
      // return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    // async jwt({ user, token }) {
    //   const newToken = { ...token };
    //   if (user?.role) {
    //     newToken.role = user.role;
    //   }
    //   if (user?.id) {
    //     newToken.id = user.id;
    //   }
    //   return newToken;
    // },
  },
  pages: {
    signIn: "/signin",
  },
});
export { handler as GET, handler as POST };
//이렇게 해야지, 나중에 GET, POST로 핸들러 함수를 실행시킬 수 있습니다.
//왜냐하면 Next.js 13에서는 GET, POST 방식으로 export 하라고 권장하기 때문입니다.
