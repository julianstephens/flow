"use client";
import { z } from "zod";
import { AppBrand } from "~/app/_components/Brand";
import { Form, TextField } from "~/app/_components/form";
import { nonempty } from "~/utils/helpers";

const registerFormSchema = z.object({
    fname: z.string().pipe(nonempty),
    lname: z.string().pipe(nonempty),
    pname: z.string().optional(),
    email: z.string().email().pipe(nonempty),
});
type RegisterForm = z.infer<typeof registerFormSchema>;

const RegisterPage = () => {
    const onSubmit = async (formValues: RegisterForm) => {
        console.log(formValues);
    };

    return (
        <div className="col full centered">
            <h3 className="mb-10">
                Welcome to <AppBrand />!
            </h3>
            <Form<RegisterForm>
                id="registerForm"
                onSubmit={onSubmit}
                schema={registerFormSchema}
            >
                {({ register, formState }) => (
                    <>
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
                        <TextField
                            label="Preferred Name"
                            error={formState.errors.pname}
                            registration={register("pname")}
                        />
                        <TextField
                            label="Email"
                            error={formState.errors.email}
                            registration={register("email")}
                        />
                        <button
                            className="button mx-auto border-2 border-blue hover:bg-blue hover:text-white"
                            type="submit"
                        >
                            Create account
                        </button>
                    </>
                )}
            </Form>
        </div>
    );
};

export default RegisterPage;
