import React from "react";
import Product from "./Product.js";
const ProductList = (props) => {
	console.log(props);
	return props.list.map((d) => {
		console.log(d);
		return (
			<Product
				fun={props.fun}
				product={d}
				uid={props.fun.state.user._id}
			/>
		);
	});
};

export default ProductList;
