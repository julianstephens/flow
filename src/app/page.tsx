"use client";
import Link from "next/link";
import { RegisterButton, SignInButton } from "./_components/auth/AuthButtons";
import { AppBrand } from "./_components/Brand";

const Home = () => {
    return (
        <main>
            <div className="mt-12 px-12">
                <header className="flex w-full items-center justify-between">
                    <AppBrand linkHome className="text-3xl" />
                    <ul className="flex gap-3">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="">Features</Link>
                        </li>
                        <li>
                            <Link
                                href="https://en.wikipedia.org/wiki/Flow"
                                target="_blank"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                    <SignInButton />
                </header>
                <div className="col mt-24">
                    <div className="col text-4xl font-bold">
                        <p>Experience Effortless</p>
                        <p>Budgeting for the 21st Century</p>
                    </div>
                    <p className="my-3 text-grey-dark">
                        Meet your new financial assistant
                    </p>
                    <div className="flex items-center">
                        <RegisterButton />
                        <Link href="" className="ml-3">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
