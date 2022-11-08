import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

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
								to={`/product/${product.id}`} className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border-[1px]">
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

export default DashBoard;
