"use client";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useInterval } from "usehooks-ts";
import { AppBrand } from "~/app/_components/Brand";
import { OauthSignInButtons } from "~/app/_components/auth";
import type { SessionWrapper } from "~/types";
import { Form, TextField } from "~/app/_components/form";
import { z } from "zod";

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

type LoginForm = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
    const router = useRouter();

    const validateSession = async () => {
        const session = (await getSession()) as unknown as SessionWrapper;
        if (session.authenticated) {
            router.refresh();
            router.push("/overview");
        }
    };

    const onSubmit = async (formValues: LoginForm) => {
        await signIn("credentials", {
            email: formValues.email,
            password: formValues.password,
            callbackUrl: "/overview",
        });
    };

    useInterval(() => {
        validateSession();
    }, 1000);

    return (
        <div className="col full centered">
            <h3 className="mb-10">
                Sign In To <AppBrand linkHome />
            </h3>
            <Form<LoginForm>
                id="loginForm"
                onSubmit={onSubmit}
                schema={loginFormSchema}
            >
                {({ register, formState }) => (
                    <>
                        <TextField
                            label="Email"
                            error={formState.errors.email}
                            registration={register("email")}
                        />
                        <TextField
                            label="Password"
                            error={formState.errors.password}
                            registration={register("password")}
                        />
                        <button className="button mx-auto" type="submit">
                            Login
                        </button>
                        <OauthSignInButtons />
                    </>
                )}
            </Form>
        </div>
    );
};

export default LoginPage;
