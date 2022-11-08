import React, { useEffect, useState } from "react";
import AddProduct from "./components/AddProduct";
import { BiHome, BiListOl, BiPlus, BiStore } from "react-icons/bi";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import Products from "./components/Products";
import Product from "./components/Product";

const App = () => {
	const [products, setProducts] = useState([]);
	const [user, setUser] = useState(null);

	const getSavedProducts = () => {
		const products = localStorage.getItem("products");
		if (products) {
			setProducts(JSON.parse(products));
		}
	};

	const getSavedUser = () => {
		const user = localStorage.getItem("user");
		if (user) {
			setUser(JSON.parse(user));
		}
	};

	useEffect(() => {
		getSavedUser();
		getSavedProducts();
	}, []);
	return (
		<BrowserRouter>
			<div className="h-screen w-full flex-col bg-white">
				<div className="flex items-center px-4 py-3  border-b-2 text-orange-700">
					<i className="bx bx-store text-3xl"></i>{" "}
					<h1 className="text-2xl font-bold ml-2">E-Store</h1>
				</div>
				<div className="flex w-full h-[92vh]">
					<div className="flex flex-col sm:w-[200px] h-full border-r-2 py-7 px-1">
						<Link
							className=" px-4 flex items-center w-full py-2 hover:bg-orange-600 hover:text-white duration-300 rounded-md"
							to={`/`}
						>
							<i className="bx bx-home text-2xl"></i>
							<span className="ml-2 hidden sm:flex">DashBoard</span>
						</Link>
						<Link
							className=" px-4 mt-1 flex items-center w-full py-2 hover:bg-orange-600 hover:text-white duration-300 rounded-md"
							to={`/products`}
						>
							<i className="bx bx-list-ol text-2xl"></i>
							<span className="ml-2 hidden sm:flex">Products</span>
						</Link>
						<Link
							className=" px-4 mt-1 flex items-center w-full py-2 hover:bg-orange-600 hover:text-white duration-300 rounded-md"
							to={`/addproduct`}
						>
							<i className="bx bx-plus text-2xl"></i>
							<span className="ml-2 hidden sm:flex truncate">Add products</span>
						</Link>
					</div>
					<div className="flex flex-col w-full h-[92vh] overflow-y-auto bg-slate-50">
						{user ? (
							<Routes>
								<Route
									path={"/"}
									element={
										<DashBoard
											products={products}
											user={user}
											getSavedUser={getSavedUser}
											getSavedProducts={getSavedProducts}
										/>
									}
								/>
								<Route
									path={"/dashboard"}
									element={
										<DashBoard
											products={products}
											user={user}
											getSavedUser={getSavedUser}
											getSavedProducts={getSavedProducts}
										/>
									}
								/>
								<Route
									path="/addproduct"
									element={
										<AddProduct
											user={user}
											products={products}
											setProducts={setProducts}
										/>
									}
								/>
								<Route
									path="/products"
									element={
										<Products
											user={user}
											products={products}
											setProducts={setProducts}
										/>
									}
								/>
								<Route
									path="/product/:id"
									element={<Product user={user} products={products} />}
								/>
							</Routes>
						) : (
							<Login getSavedUser={getSavedUser} />
						)}
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
