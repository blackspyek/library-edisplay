import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {db} from "@/lib/db";
import {compare} from "bcrypt";
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Nazwa Uzytkownika", type: "text", placeholder: "filia" },
                password: { label: "Hasło", type: "password" }
            },
            async authorize(credentials, req) {

                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                const user = await db.user.findUnique({
                    where: {
                        username: credentials?.username
                    }
                }
                );
                if (!user) {
                    return null;
                }
                const isValid = await compare(credentials.password, user.password);
                if (!isValid) {
                    return null;
                }
                return {
                    id: `${user.id}`,
                    username: user.username
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user}) {
            if (user) {
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            }
        },
    }
}