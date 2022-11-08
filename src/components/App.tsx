import React, { useState, useEffect, ChangeEvent } from "react";
import ReactDOM from "react-dom/client";
import {
	BrowserRouter,
	Routes,
	Route,
	useParams,
	useNavigate,
	Link,
} from "react-router-dom";
import { v4 as uuid } from "uuid";

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

const DashBoard = ({ products, user, getSavedUser, getSavedProducts }: any) => {
	useEffect(() => {
		getSavedUser();
		getSavedProducts();
	}, []);

	return (
		<>
			{" "}
			{user ? (
				<div className="flex w-full flex-col p-4">
					<h2 className="text-xl font-medium text-center">
						Welcome to Your Dashboard, {user.name}
					</h2>
					<h2 className="text-xl font-medium text-center mt-6">
						Your Products
					</h2>
					{products?.length === 0 ? (
						<div className="flex items-center justify-center w-full flex-col">
							<p>You currently have no registered products</p>
							<Link
								className="mt-5 px-4 py-2 text-white bg-orange-600 cursor-pointer rounded-lg"
								to={`/addproduct`}
							>
								Add Product
							</Link>
						</div>
					) : (
						<div className="flex w-full flex-wrap mt-8 gap-2">
							{products.map((product: any) => (
								<Link
                                   key={product.id}
									to={`/product/${product.id}`}
									className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border-[1px]"
								>
									<div className="flex flex-col bg-white p-4 rounded-lg ">
										<img
											className="w-full h-40 object-cover"
											src={product.image}
											alt=""
										/>
										<p className="text-lg font-medium mt-2">{product.name}</p>
										<p className="text-lg font-medium mt-2">${product.price}</p>
										<p className="text-lg font-medium mt-2 w-full bg-orange-600 text-white flex justify-center py-1">
											View Details
										</p>
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			) : (
				<Login />
			)}
		</>
	);
};

const Login = ({ getSavedUser }: any) => {
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
			<form
				onSubmit={LoginUser}
				className="md:w-[500px] max-w-[500px] w-11/12 mx-auto"
			>
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

const AddProduct = ({ products, user, setProducts }: any) => {
	const [proDetails, setProDetails] = React.useState({
		name: "",
		category: "",
		description: "",
		image: "",
		owner: "",
		price: 0,
		date: new Date().toLocaleDateString(),
	});
	const [subStatus, setSubStatus] = useState("");

	const submitProduct = async (e: any) => {
		e.preventDefault();
		const product = {
			id: uuid(),
			name: proDetails.name,
			price: Number(proDetails.price),
			category: proDetails.category,
			image: proDetails.image,
			owner: user.name,
			description: proDetails.description,
			date: proDetails.date,
			available: true,
		};
		// save to local storage
		if (
			product.name !== "" &&
			product.price !== 0 &&
			product.category !== "" &&
			product.image !== "" &&
			product.owner !== "" &&
			product.description !== ""
		) {
			const newProducts = [...products, product];
			localStorage.setItem("products", JSON.stringify(newProducts));
			setSubStatus("Product added successfully");
			resetStates();
			setProducts(newProducts);
		} else {
			setSubStatus("Please fill all the fields");
		}
	};

	const resetStates = () => {
		setProDetails({
			name: "",
			category: "",
			description: "",
			image: "",
			owner: "",
			price: 0,
			date: new Date().toLocaleDateString(),
		});
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setProDetails({ ...proDetails, image: reader.result as string });
		};
		reader.readAsDataURL(file);
	};

	return (
		<div className="w-full justify-center px-3 mt-5 d-flex items-center flex-col py-4">
			<h3 className="text-center sm:text-2xl font-semibold">
				Add Your New Product
			</h3>
			<p className="text-yellow-500 text-center">{subStatus}</p>
			<form
				onSubmit={submitProduct}
				className="md:w-[500px] max-w-[500px] w-11/12 mx-auto"
			>
				<div className="flex flex-col mt-3">
					<label htmlFor="">Enter Product Name</label>
					<input
						onChange={(e) =>
							setProDetails({ ...proDetails, name: e.target.value })
						}
						className="w-full border focus:border-blue-700 focus:ring-1 focus:ring-sky-500 mt-1 h-[40px] px-2 rounded-md outline-none text-black"
						value={proDetails.name}
						type="text"
						placeholder="Enter your product price"
					/>
				</div>
				<div className="flex flex-col mt-3">
					<label htmlFor="">Enter Product Price in $ (dollar)</label>
					<input
						onChange={(e) =>
							setProDetails({ ...proDetails, price: Number(e.target.value) })
						}
						className="w-full border focus:border-blue-700 focus:ring-1 focus:ring-sky-500 mt-1 h-[40px] px-2 rounded-md outline-none text-black"
						value={proDetails.price}
						type="number"
						placeholder="Enter your product name"
					/>
				</div>
				<div className="flex flex-col mt-3">
					<label htmlFor="">Enter Product Category</label>
					<div className="flex items-center flex-wrap">
						<input
							onChange={(e) =>
								setProDetails({ ...proDetails, category: e.target.value })
							}
							className="ml-4 scale-[1.2] mr-2"
							type="radio"
							name="category"
						/>
						<label htmlFor="">Home appliance</label>
						<input
							onChange={(e) =>
								setProDetails({ ...proDetails, category: e.target.value })
							}
							className="ml-4 scale-[1.2] mr-2"
							type="radio"
							value="Beverages"
							name="category"
						/>
						<label htmlFor="">Beverages</label>
						<input
							onChange={(e) =>
								setProDetails({ ...proDetails, category: e.target.value })
							}
							className="ml-4 scale-[1.2] mr-2"
							type="radio"
							value="Electronics"
							name="category"
						/>
						<label htmlFor="">Electronics</label>
					</div>
					<div className="flex items-center flex-wrap">
						<input
							onChange={(e) =>
								setProDetails({ ...proDetails, category: e.target.value })
							}
							className="ml-4 scale-[1.2] mr-2"
							type="radio"
							value="Food"
							name="category"
						/>
						<label htmlFor="">Food</label>
						<input
							onChange={(e) =>
								setProDetails({ ...proDetails, category: e.target.value })
							}
							className="ml-4 scale-[1.2] mr-2"
							type="radio"
							value="accessories"
							name="category"
						/>
						<label htmlFor="">Accessories</label>
						<input
							onChange={(e) =>
								setProDetails({ ...proDetails, category: e.target.value })
							}
							className="ml-4 scale-[1.2] mr-2"
							type="radio"
							value="other"
							name="category"
						/>
						<label htmlFor="">Other</label>
					</div>
				</div>
				<div className="flex flex-col mt-3">
					<p>Upload Product Image</p>
					{proDetails.image && (
						<img
							className="mt-2 w-1/2 object-cover"
							src={proDetails.image}
							alt=""
						/>
					)}
					<label
						htmlFor="file"
						className="text-white mt-3 cursor-pointer bg-orange-600 w-fit px-3 py-2 rounded-md"
					>
						Upload Image
					</label>
					<input
						onChange={handleImageChange}
						className="w-full border focus:border-blue-700 focus:ring-1 focus:ring-sky-500 mt-1 h-[40px] px-2 rounded-md outline-none text-black"
						type="file"
						hidden
						accept="image/*"
						id="file"
					/>
				</div>
				<div className="flex flex-col mt-3">
					<p>Enter production date</p>
					<input
						onChange={(e) =>
							setProDetails({ ...proDetails, date: e.target.value })
						}
						className="py-1 px-3 outline-none"
						type="date"
					/>
				</div>
				<div className="flex flex-col mt-3">
					<label htmlFor="">Enter Product Description</label>
					<textarea
						onChange={(e) =>
							setProDetails({ ...proDetails, description: e.target.value })
						}
						value={proDetails.description}
						className="w-full border resize-none
             focus:border-blue-700 focus:ring-1 focus:ring-sky-500 mt-1 h-[140px] px-2 rounded-md outline-none text-black"
						placeholder="description here"
					/>
				</div>
				<div
					onClick={submitProduct}
					className="flex bg-orange-600 rounded-md cursor-pointer flex-col mt-3 text-white px-8"
				>
					<input className="py-2 cursor-pointer" type="submit" value="submit" />
				</div>
			</form>
		</div>
	);
};

const Product = ({ products, user }: any) => {
	const { id } = useParams();
	const [product, setProduct] = useState<any>(null);
	console.log(id);
	const navigate = useNavigate();

	const removeProduct = (id: string) => {
		const newProducts = products.filter((product: any) => product.id !== id);
		localStorage.setItem("products", JSON.stringify(newProducts));
		navigate("/");
	};

	useEffect(() => {
		const product = products.find((pro: any) => pro.id === id);
		setProduct(product);
	}, []);

	return (
		<div className="flex flex-col relative">
			{/* <BiArrowBack size={20} onClick={()=> navigate(-1)}
			className="mt-3 ml-2 backdrop cursor-pointer" /> */}
			<i
				onClick={() => navigate(-1)}
				className="mt-3 ml-2 backdrop cursor-pointer bx bx-arrow-back text-2xl"
			/>
			<h2 className="text-center font-semibold text-xl mt-4">
				Product Overview
			</h2>
			<div className="mt-5 w-full gap-y-5 px-2 flex sm:flex-row flex-col sm:items-start items-center">
				<img
					className="sm:w-1/3 object-cover w-full max-w-[400px] "
					src={product?.image}
					alt=""
				/>
				<div className="ml-2 flex flex-col w-full">
					<div className="flex items-center justify-between w-full px-4">
						<h1 className=" font-semibold">
							{product?.name}
							<span
								className={`${
									product?.available ? "bg-green-500" : "bg-red-500"
								} text-white px-3 py-1 rounded-md ml-3 text-xs`}
							>
								{product?.available ? "available" : "sold"}
							</span>
						</h1>
						<h1 className=" font-semibold"> {product?.price} $</h1>
					</div>
					<p>{product?.description} </p>
				</div>
			</div>
			<div className="flex sm:flex-row flex-col gap-y-2 w-full justify-between px-2 mt-5 items-center">
				<p className="sm:text-lg font-semibold">
					Production Date: {product?.date ?? null}
				</p>
				<button
					onClick={() => removeProduct(product?.id)}
					className="px-4 py-2 bg-orange-600 text-white rounded-lg"
				>
					Remove
				</button>
			</div>
		</div>
	);
};

const Products = ({ products, setProducts }: any) => {
	const [table, setTable] = useState(false);

	const removeProduct = (id: string) => {
		const newProducts = products.filter((product: any) => product.id !== id);
		localStorage.setItem("products", JSON.stringify(newProducts));
		setProducts(newProducts);
	};

	return (
		<div className=" w-full flex flex-col">
			<div className="flex items-center mt-3 justify-between px-2 sm:flex-row flex-col">
				<p className="text-lg font-semibold">Your Products</p>
				<div className="flex items-center gap-x-2">
					<div onClick={() => setTable(!table)} className="flex cursor-pointer">
						{table ? (
							// <BiGridAlt title="Grid View" className="text-2xl cursor-pointer" />
							<i className="bx bx-grid-alt text-2xl"></i>
						) : (
							// <BiTable title="Table View" className="text-2xl cursor-pointer" />
							<i className="bx bx-table text-2xl"></i>
						)}
					</div>
					<Link
						className=" px-4 py-2 text-white bg-orange-600 cursor-pointer rounded-lg"
						to={`/addproduct`}
					>
						Add Product
					</Link>
				</div>
			</div>
			<div className="flex w-full flex-wrap mt-8 gap-2 overflow-auto">
				{table ? (
					<table className="w-full border-2 border-collapse min-w-[600px]">
						<tr className="border-2">
							<th className="border-2">Image</th>
							<th className="border-2">Name</th>
							<th className="border-2">Price ($)</th>
							<th className="border-2">Date</th>
							<th className="border-2">Description</th>
							<th className="border-2">Action</th>
						</tr>
						{products.map((product: any) => (
							<tr className="border-2">
								<td className="border-2 p-2 m-0 w-1/6">
									<img
										className="max-w-[200px] w-fit object-cover m-0"
										src={product.image}
										alt=""
									/>{" "}
								</td>
								<td className="p-2 border-2">{product.name}</td>
								<td className="p-2 border-2">{product.price}</td>
								<td className="p-2 border-2">{product.date}</td>
								<td className="p-2 border-2">{product.description}</td>
								<td className="p-2 border-2">
									<div className="flex flex-col items-center gap-y-1">
										<Link
											className="bg-slate-400 py-1 px-3 text-white cursor-pointer"
											to={`/product/${product.id}`}
										>
											View
										</Link>
										<button
											onClick={() => removeProduct(product.id)}
											className="bg-orange-600 py-1 px-2 text-white"
										>
											Remove
										</button>
									</div>
								</td>
							</tr>
						))}
					</table>
				) : (
					products.map((product: any) => (
						<Link
							to={`/product/${product.id}`}
							key={product.id}
							className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border-[1px]"
						>
							<div className="flex flex-col bg-white p-4 rounded-lg ">
								<img
									className="w-full h-40 object-cover"
									src={product.image}
									alt=""
								/>
								<p className="text-lg font-medium mt-2">{product.name}</p>
								<p className="text-lg font-medium mt-2">${product.price}</p>
								<p className="text-lg font-medium mt-2 w-full bg-orange-600 text-white flex justify-center py-1">
									View Details
								</p>
							</div>
						</Link>
					))
				)}
			</div>
		</div>
	);
};

export default App
