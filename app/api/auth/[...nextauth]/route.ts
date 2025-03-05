// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Custom Login",
//       credentials: {},
//       async authorize(credentials) {
//         // Simulasi login otomatis berdasarkan role yang dipilih
//         const user = {
//           id: "1",
//           name: "Operator", // Default role
//           role: credentials?.role || "operator",
//         };

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user.role = token.role;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: "/role-selection", // Halaman pemilihan role
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
