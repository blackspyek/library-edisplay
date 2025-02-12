import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {ApiErrors} from "@/app/(auth)/errors";
import { hash } from "bcrypt";
import * as z from "zod";
const userSchema = z.object(
    {
        username: z.string().min(1, "Nazwa użytkownika jest wymagana"),
        password: z.string().min(1, "Hasło jest wymagane")
    }
)

export async function POST(req: Request, res: NextResponse) {
    try{
        const body = await req.json();
        const {username, password} = userSchema.parse(body);

        const existingUser = await db.user.findUnique(
            {
                where: {
                    username
                }
            }
        )

        if (existingUser) {
            return ApiErrors.sendError("USER_ALREADY_EXISTS");
        }

        const newUser = await db.user.create({
            data: {
                username,
                password: await hash(password, 10)
            }
        });

        const { password: _, ...newuserWithoutPassword } = newUser;


        return NextResponse.json(
            {
                user: newuserWithoutPassword,
                message: "Użytkownik został utworzony"
            },
            {
                status: 201
            }
        );

    }
    catch (e) {
        return ApiErrors.sendError("INTERNAL_ERROR", e);
    }
}