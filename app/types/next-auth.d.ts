// nextauth 타입 커스텀 accessToken 넣기
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      accessToken: string;
    };
  }
  interface User extends NextAuthUser {
    accessToken: string;
  }
}
