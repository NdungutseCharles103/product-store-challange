import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";

const Product = ({ products, user }: any) => {
	const { id } = useParams();
	const [product, setProduct] = useState<any>(null);
	console.log(id);
	const navigate = useNavigate()

	const removeProduct = (id: string) => {
		const newProducts = products.filter((product: any) => product.id !== id);
		localStorage.setItem("products", JSON.stringify(newProducts));
		navigate('/')
	};

	useEffect(() => {
        const product = products.find((pro: any) => pro.id === id);
        setProduct(product)
    }, []);

	return (
		<div className="flex flex-col relative">
			{/* <BiArrowBack size={20} onClick={()=> navigate(-1)}
			className="mt-3 ml-2 backdrop cursor-pointer" /> */}
			<i onClick={()=> navigate(-1)}
			className="mt-3 ml-2 backdrop cursor-pointer bx bx-arrow-back text-2xl" />
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
						<h1 className=" font-semibold">{product?.name}
						<span className={`${product?.available?'bg-green-500':'bg-red-500'} text-white px-3 py-1 rounded-md ml-3 text-xs`}>
							{product?.available?'available':'sold'}
						</span>
						</h1>
						<h1 className=" font-semibold"> {product?.price} $</h1>
					</div>
                    <p>{product?.description} </p>
				</div> 
			</div>
			<div className="flex sm:flex-row flex-col gap-y-2 w-full justify-between px-2 mt-5 items-center">
				<p className="sm:text-lg font-semibold">Production Date: {product?.date??null}</p>
				<button
				onClick={() => removeProduct(product?.id)}
					className="px-4 py-2 bg-orange-600 text-white rounded-lg"
				>Remove</button>
			</div>
		</div>
	);
};

export default Product;
