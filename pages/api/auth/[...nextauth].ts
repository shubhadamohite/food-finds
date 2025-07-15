import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const dummyUsername = "jsmith";
        const dummyPassword = "password";

        if (
          credentials &&
          credentials.username === dummyUsername &&
          credentials.password === dummyPassword
        ) {
          // Return a user object if authentication succeeds
          return { id: "1", name: "John Smith", email: "jsmith@example.com" };
        } else {
          // Return null if authentication fails
          return null;
        }

      },
    }),
  ],

  pages: {
    signIn: "/auth/signIn",
  },
});
