"use client";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { AppBrand } from "~/app/_components/Brand";
import { OauthSignInButtons } from "~/app/_components/auth";
import { Form, TextField } from "~/app/_components/form";
import { nonempty } from "~/utils/helpers";

// TODO: add additional field for preferred name and/or split name into three fields
const registerFormSchema = z
    .object({
        fname: z.string().pipe(nonempty),
        lname: z.string().pipe(nonempty),
        pname: z.string().optional(),
        email: z.string().email().pipe(nonempty),
        password: z.string().superRefine((password, ctx) => {
            const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
            const containsLowercase = (ch: string) => /[a-z]/.test(ch);
            const containsSpecialChar = (ch: string) =>
                /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(ch);
            let countOfUpperCase = 0;
            let countOfLowerCase = 0;
            let countOfNumbers = 0;
            let countOfSpecialChar = 0;

            for (let i = 0; i < password.length; i++) {
                let ch = password.charAt(i);
                if (!isNaN(Number(ch))) countOfNumbers++;
                else if (containsUppercase(ch)) countOfUpperCase++;
                else if (containsLowercase(ch)) countOfLowerCase++;
                else if (containsSpecialChar(ch)) countOfSpecialChar++;
            }

            let errObj = {
                upperCase: {
                    pass: true,
                    message: "At least 1 uppercase character required",
                },
                lowerCase: {
                    pass: true,
                    message: "At least 1 lowercase character required",
                },
                specialCh: {
                    pass: true,
                    message: "At least 1 special character required",
                },
                totalNumber: {
                    pass: true,
                    message: "At least 1 number required",
                },
            };

            if (countOfLowerCase < 1) {
                errObj = {
                    ...errObj,
                    lowerCase: { ...errObj.lowerCase, pass: false },
                };
            }
            if (countOfUpperCase < 1) {
                errObj = {
                    ...errObj,
                    upperCase: { ...errObj.upperCase, pass: false },
                };
            }
            if (countOfSpecialChar < 1) {
                errObj = {
                    ...errObj,
                    specialCh: { ...errObj.specialCh, pass: false },
                };
            }
            if (countOfNumbers < 1) {
                errObj = {
                    ...errObj,
                    totalNumber: { ...errObj.totalNumber, pass: false },
                };
            }

            if (Object.keys(errObj).some((el) => !(errObj as any)[el].pass)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: errObj as any,
                });
            }
        }),
        confirmPassword: z.string(),
    })
    .refine((values) => values.password === values.confirmPassword, {
        message: "Passwords must match!",
        path: ["confirmPassword"],
    });

type RegisterForm = z.infer<typeof registerFormSchema>;

const RegisterPage = () => {
    const onSubmit = async (formValues: RegisterForm) => {
        await signIn("credentials", {
            name: `${formValues.pname ?? formValues.fname} ${formValues.lname}`,
            email: formValues.email,
            password: formValues.password,
            callbackUrl: "/overview",
        });
    };

    return (
        <div className="col full centered">
            <h3 className="mb-10">
                Welcome to <AppBrand linkHome />!
            </h3>
            <Form<RegisterForm>
                id="registerForm"
                onSubmit={onSubmit}
                schema={registerFormSchema}
            >
                {({ register, formState }) => (
                    <>
                        <div className="row gap-2">
                            <TextField
                                label="Legal First Name"
                                error={formState.errors.fname}
                                registration={register("fname")}
                            />
                            <TextField
                                label="Legal Surname"
                                error={formState.errors.lname}
                                registration={register("lname")}
                            />
                        </div>
                        <TextField
                            label="Preferred Name"
                            error={formState.errors.pname}
                            registration={register("pname")}
                        />
                        <TextField
                            isEmail
                            label="Email"
                            error={formState.errors.email}
                            registration={register("email")}
                        />
                        <div className="row gap-2">
                            <TextField
                                isPassword
                                label="Password"
                                error={formState.errors.password}
                                registration={register("password")}
                            />
                            <TextField
                                isPassword
                                label="Confirm Password"
                                error={formState.errors.confirmPassword}
                                registration={register("confirmPassword")}
                            />
                        </div>
                        <button className="button mx-auto" type="submit">
                            Create account
                        </button>
                        <OauthSignInButtons />
                    </>
                )}
            </Form>
        </div>
    );
};

export default RegisterPage;
