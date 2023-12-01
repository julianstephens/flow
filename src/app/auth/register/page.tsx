"use client";
import { Form, TextField } from "~/app/_components/form";

type RegisterForm = {
    fname: string;
    lname: string;
    pname: string;
    dob: Date;
    email: string;
};

const RegisterPage = () => {
    // const [show, setShow] = useState(false);
    // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // const handleChange = (selectedDate: Date) => {
    //     setSelectedDate(selectedDate);
    //     console.log(selectedDate);
    // };
    // const handleClose = (state: boolean) => {
    //     setShow(state);
    // };
    const onSubmit = async (formValues: RegisterForm) => {
        console.log(formValues);
    };

    return (
        <>
            <Form<RegisterForm> onSubmit={onSubmit} id="registerForm">
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
                            label="Legal Surname"
                            error={formState.errors.lname}
                            registration={register("lname")}
                        />
                    </>
                )}
            </Form>
            {/* <form onSubmit={onSubmit} className="col centered h-100 md:px-4xl">
                <h1 className="mt-14 font-logo font-bold">Welcome to flow!</h1>
                <div className="my-10">
                    <p className="mb-8 md:text-left">
                        First off, let's get to know you.
                    </p>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="fname">
                                        Legal First Name
                                        <span className="color-red">*</span>
                                    </label>
                                    <input
                                        id="fname"
                                        name="fname"
                                        type="text"
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="lname">
                                        Legal Surname
                                        <span className="color-red">*</span>
                                    </label>
                                    <input
                                        id="lname"
                                        name="lname"
                                        type="text"
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="prefName">
                                        Preferred Name
                                    </label>
                                    <input
                                        id="prefName"
                                        name="prefName"
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="dob">
                                        Date of Birth
                                        <span className="color-red">*</span>
                                    </label>
                                    <Datepicker
                                        // options={options}
                                        onChange={handleChange}
                                        show={show}
                                        setShow={handleClose}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email
                                        <span className="color-red">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        className="form-control full"
                                        disabled
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="street">
                                        Street Address
                                        <span className="color-red">*</span>
                                    </label>
                                    <input
                                        id="street"
                                        type="street"
                                        name="street"
                                        className="form-control full"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="street2">
                                        Street Address 2
                                    </label>
                                    <input
                                        id="street2"
                                        type="street2"
                                        name="street2"
                                        className="form-control full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="city">
                                        City/Region
                                        <span className="color-red">*</span>
                                    </label>
                                    <input
                                        id="city"
                                        type="city"
                                        name="city"
                                        className="form-control short"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="postal">
                                        Postal Code
                                        <span className="color-red">*</span>
                                    </label>
                                    <input
                                        id="postal"
                                        type="text"
                                        name="postal"
                                        className="form-control short"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="country">
                                        Country
                                        <span className="color-red">*</span>
                                    </label>
                                    <input
                                        id="country"
                                        type="text"
                                        name="country"
                                        className="form-control short"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="submit" className="next-btn ps-lg">
                        Next{" "}
                        <span>
                            <i className="bi bi-arrow-right-short font-xl"></i>
                        </span>
                    </button>
                </div>
            </form> */}
        </>
    );
};

export default RegisterPage;
