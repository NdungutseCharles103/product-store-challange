import React, { useState } from "react";
import { BiGrid, BiGridAlt, BiTable } from "react-icons/bi";
import { Link } from "react-router-dom";

const Products = ({ products, setProducts }: any) => {
	const [table, setTable] = useState(false);

	const removeProduct = (id: string) => {
		const newProducts = products.filter((product: any) => product.id !== id);
		localStorage.setItem("products", JSON.stringify(newProducts));
		setProducts(newProducts)
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

export default Products;
