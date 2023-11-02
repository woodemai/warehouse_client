import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import formSchema from "./authFormSchema";
import { useCallback, useContext, useState } from "react"
import { Context } from "@/main"
import { observer } from 'mobx-react-lite'
import { Navigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

enum Action {
    LOGIN,
    REGISTRATION
}

const AuthForm = () => {
    const [action, setAction] = useState<Action>(Action.LOGIN)
    const { store } = useContext(Context);
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onError = useCallback(() => {
        if (store.error) {
            let description;
            if (store.error === 409) {
                description = 'Пользователь с такой почтой уже существует'
            } else if (store.error === 401) {
                description = 'Введен неверный пароль'
            }
            store.setError(undefined)
            toast({
                variant: 'destructive',
                title: "Ошибка!",
                description,
                duration: 2500
            })
        }
    }, [store, toast])
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const { email, password } = values;
        if (action === Action.LOGIN) {
            store.login(email, password)
                .then(() => onError())
        } else {
            store.registration(email, password)
                .then(() => onError())
        }
    }

    if (store.isAuth) {
        return <Navigate to={"/profile"} />
    }
    return (
        <div className="flex justify-center items-center h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:max-w-sm lg:max-w-lg bg-white flex flex-col gap-y-4 p-4 rounded-xl shadow-md pace-y-8 mx-4">
                    <h1 className="text-xl font-bold tracking-tight">
                        {action === Action.LOGIN
                            ? 'Войти в аккаунт'
                            : 'Создание аккаунта'}
                    </h1>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input autoComplete="username" placeholder="jhon@mail.ru" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Адрес электронной почты
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input autoComplete="current-password" type="password" placeholder="secured.Password123"{...field} />
                                </FormControl>
                                <FormDescription>
                                    Ваш супер надежный и секретный пароль
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="text-sm font-lighter text-gray-600">
                        {action === Action.LOGIN
                            ? <div>Впервые у нас?<Button type="button" variant={"link"} onClick={() => setAction(Action.REGISTRATION)}>Создать аккаунт</Button></div>
                            : <div>Уже есть аккаунт?<Button type="button" variant={"link"} onClick={() => setAction(Action.LOGIN)}>Войти в аккаунт</Button></div>
                        }
                    </div>
                    <Button type="submit" >
                        {action === Action.LOGIN
                            ? 'Войти'
                            : 'Зарегестрироваться'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default observer(AuthForm);