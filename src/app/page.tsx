"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const redirectSignin = async () => {
    await signIn("discord", {
      redirect: false,
    });
  };

  return (
    <main>
      <div className="mt-12 px-12">
        <header className="flex w-full items-center justify-between">
          <a href="/" className="font-logo logo text-3xl font-bold">
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
          <button
            onClick={redirectSignin}
            className="button border-blue hover:bg-blue border-4 text-base hover:text-white"
          >
            Sign Up{" "}
            <span className="icon-right">
              <FaArrowRight />
            </span>
          </button>
        </header>
        <div className="col mt-24">
          <div className="col text-4xl font-bold">
            <p>Experience Effortless</p>
            <p>Budgeting for the 21st Century</p>
          </div>
          <p className="text-grey-dark my-3">
            Meet your new financial assistant
          </p>
          <div className="flex items-center">
            <button
              onClick={redirectSignin}
              className="button bg-blue hover:bg-bg hover:border-blue text-white hover:border-4 hover:text-black"
            >
              Sign Up
            </button>
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
