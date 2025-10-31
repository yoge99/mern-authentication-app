import { useState, useRef } from "react";
import { checkValidData } from "../utilis/validate";

const Auth = () => {
  const [isSignin, setSignin] = useState(true);
  const email = useRef(null);
  const password = useRef(null);

  // ✅ Handles Signup / Signin button
  const handleButton = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    if (message) {
      alert(message);
      return;
    }

    // Collect input data
    const userData = {
      firstName: !isSignin
        ? document.querySelector("input[placeholder='FirstName']").value
        : "",
      lastName: !isSignin
        ? document.querySelector("input[placeholder='LastName']").value
        : "",
      username: document.querySelector("input[placeholder='UserName']").value,
      email: email.current.value,
      password: password.current.value,
    };

    const url = isSignin
      ? "http://localhost:5000/api/auth/signin"
      : "http://localhost:5000/api/auth/signup";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        alert(data.message || (isSignin ? "Signin successful" : "Signup successful"));
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Network error. Please try again later.");
    }
  };

  const toogleHandle = () => {
    setSignin(!isSignin);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-zinc-950 rounded-lg shadow-lg"
      >
        <h1 className="font-bold text-3xl py-4 text-center text-blue-50">
          {isSignin ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignin && (
          <div>
            <input
              type="text"
              placeholder="FirstName"
              className="p-4 mb-6 w-full bg-gray-700 text-white rounded-lg"
            />
            <input
              type="text"
              placeholder="LastName"
              className="p-4 mb-6 w-full bg-gray-700 text-white rounded-lg"
            />
          </div>
        )}

        <input
          type="text"
          placeholder="UserName"
          className="p-4 mb-6 w-full bg-gray-700 text-white rounded-lg"
        />
        <input
          type="text"
          ref={email}
          placeholder="email"
          className="p-4 mb-6 w-full bg-gray-700 text-white rounded-lg"
        />
        <input
          type="password"
          ref={password}
          placeholder="password"
          className="p-4 mb-6 w-full bg-gray-700 text-white rounded-lg"
        />

        <button
          type="button"
          className="w-full mb-7 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          onClick={handleButton}
        >
          {isSignin ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="py-4 text-center cursor-pointer text-blue-400 hover:underline"
          onClick={toogleHandle}
        >
          {isSignin
            ? "New to app? Sign Up"
            : "Already have an account? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Auth;
