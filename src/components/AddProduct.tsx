import React, { ChangeEvent, FormEventHandler, SyntheticEvent } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

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
			available: true
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
			setProducts(newProducts)
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
    }

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
						onChange={(e) => setProDetails({ ...proDetails, date: e.target.value })}
					 className="py-1 px-3 outline-none" type="date" />
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

export default AddProduct;
