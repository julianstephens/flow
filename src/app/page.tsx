import Link from "next/link";
import { SignInButton } from "./_components/authButtons";

const Home = async () => {
    return (
        <main>
            <div className="mt-12 px-12">
                <header className="flex w-full items-center justify-between">
                    <a href="/" className="logo font-logo text-3xl font-bold">
                        f<span className="highlight">l</span>ow
                    </a>
                    <ul className="flex gap-3">
                        <li>
                            <Link href="">Home</Link>
                        </li>
                        <li>
                            <Link href="">Features</Link>
                        </li>
                        <li>
                            <Link href="">About</Link>
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
                        <SignInButton />
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
