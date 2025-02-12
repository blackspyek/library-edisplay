'use client';
import React from 'react'
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
const FormSchema = z.object({
    username: z.string().min(1, "Nazwa użytkownika jest wymagana"),
    password: z.string().min(1, "Hasło jest wymagane"),
})


const LoginForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {
            username: values.username,
            password: values.password,
            redirect: false,
        })
        if (signInData?.error) {
            toast({
                title: "Błąd logowania",
                description: "Nieprawidłowa nazwa użytkownika lub hasło",
                variant: 'destructive'
            })
        }
        else{
            router.refresh()
            router.push('/admin')
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className='space-y-2'>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nazwa Użytkownika</FormLabel>
                                <FormControl>
                                    <Input placeholder="filia39" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hasło</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Wprowadź hasło" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className='w-full mt-6' type="submit">Zaloguj</Button>
            </form>
        </Form>
    )
}
export default LoginForm
