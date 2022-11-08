import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({getSavedUser}: any) => {
	const [user, setUser] = useState({
		email: "",
		name: "",
	});
	const navigate = useNavigate();

	const LoginUser = async (e: any) => {
		e.preventDefault();
		if (user.email.trim() !== "" && user.name.trim() !== "") {
			localStorage.setItem("user", JSON.stringify(user));
			navigate("/dashboard");
			getSavedUser();
		} else {
			alert("Please enter your name and email");
		}
	};

	return (
		<div className="w-full flex flex-col items-center">
			<h2 className="text-lg font-semibold mt-7 text-center">
				Login in to access your e-Store Data
			</h2>
			<form onSubmit={LoginUser} className="md:w-[500px] max-w-[500px] w-11/12 mx-auto">
				<div className="flex flex-col mt-3">
					<label className="px-2" htmlFor="">
						Enter Your Email
					</label>
					<input
						onChange={(e) => setUser({ ...user, email: e.target.value })}
						className="w-full border focus:border-blue-700 focus:ring-1 focus:ring-sky-500 mt-1 h-[40px] px-2 rounded-md outline-none text-black"
						type="text"
						placeholder="Enter your product price"
					/>
				</div>
				<div className="flex flex-col mt-3">
					<label className="px-2" htmlFor="">
						Enter Your Name
					</label>
					<input
						onChange={(e) => setUser({ ...user, name: e.target.value })}
						className="w-full border focus:border-blue-700 focus:ring-1 focus:ring-sky-500 mt-1 h-[40px] px-2 rounded-md outline-none text-black"
						type="text"
						placeholder="Enter your product price"
					/>
				</div>
				<button
					className="w-full bg-orange-600 text-white mt-3 py-2 rounded-md"
					onClick={LoginUser}
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
