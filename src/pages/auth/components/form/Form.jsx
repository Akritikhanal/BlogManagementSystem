import React, { useState } from "react";
import { Link } from "react-router-dom";


const Form = ({ type, onSubmit }) => {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send only required fields depending on form type
    if (type === "Login") {
      onSubmit({
        email: data.email.trim(),
        password: data.password.trim(),
      });
    } else {
      onSubmit({
        username: data.username.trim(),
        email: data.email.trim(),
        password: data.password.trim(),
      });
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    
    <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white">

      <h2 className="text-center text-2xl font-bold text-black">
        {type === "Login" ? "Login here" : "Register here"}
      </h2>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        
        {type === "Register" && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-blue-100 text-gray-600"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-blue-100 text-gray-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-blue-100 text-gray-600"
        />

        <button className="w-full bg-black p-2 rounded text-white hover:bg-gray-800 transition">
          {type === "Login" ? "Login" : "Register"}
        </button>

      </form>

      <p className="text-center text-gray-500 mt-4">
        {type === "Login"
          ? "Don't have an account?"
          : "Already have an account?"}

        <Link
          to={type === "Login" ? "/register" : "/login"}
          className="text-black ml-2 font-semibold"
        >
          {type === "Login" ? "Register" : "Login"}
        </Link>
      </p>

    </div>

  </div>
);
};

export default Form;
