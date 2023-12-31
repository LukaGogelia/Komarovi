"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function LoginForm({ words }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email: identifier,
        password,
        redirect: false,
      });

      if (res.error) {
        setErrorMessage("Invalid Credentials");
        return;
      }

      console.log("sucsess");
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const w = JSON.parse(words);
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">{w.login}</h3>

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              {successMessage && (
                <p className="text-green-500">{successMessage}</p>
              )}

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder={w.identifier}
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder={w.password}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    {w.login}
                  </button>
                </div>
                <div className="col-12">
                  <input
                    type="checkbox"
                    name="stayLoggedIn"
                    id="stayLoggedIn"
                    className="custom-checkbox"
                    checked={stayLoggedIn} // <-- Set checked attribute based on state
                    onChange={(e) => setStayLoggedIn(e.target.checked)}
                  />
                  <label htmlFor="stayLoggedIn" className="custom-label">
                    {w.stayLoggedIn}
                  </label>
                </div>
              </form>

              {/* You can uncomment the below sections if you want to use them. */}
              {/* 
              <p className="mt-10">
                Don't have an account yet?
                <Link href="/signup" className="text-purple-1">
                  Sign up for free
                </Link>
              </p>

              <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                Or sign in using
              </div>

              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <div>
                  <button className="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14">
                    Log In via Facebook
                  </button>
                </div>
                <div>
                  <button className="button -sm px-24 py-20 -outline-red-3 text-red-3 text-14">
                    Log In via Google+
                  </button>
                </div>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
