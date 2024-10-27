import React, { Component } from "react";
import { backendURL } from ".././config/config.js";
import "../stylesheet/AddProduct.css";
class AddProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: {},
			desc: "",
			name: "",
			price: 0,
			qty: 0,
		};
	}
	handleDesc = (desc) => {
		this.setState({
			desc: desc.target.value.replaceAll("\n", " ~ "),
		});
		console.log(this.state.caption);
	};
	handleName = (name) => {
		this.setState({ name: name.target.value });
	};
	handlePrice = (price) => {
		this.setState({ price: price.target.value });
	};
	handleQty = (qty) => {
		this.setState({ qty: qty.target.value });
	};
	handleFile(file) {
		this.setState({ file: file.target });
	}
	submitted(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("imgUploader", this.state.file.files[0]);
		console.log("posting");
		fetch(backendURL+"uploadProduct", {
			method: "POST",
			body: formData,
			headers: {
				id: this.props.fun.state.user._id,
				user: this.props.fun.state.user.id,
				name: this.state.name,
				desc: this.state.desc,
				price: this.state.price,
				qty: this.state.qty,
			},
		})
			.then((res) => res.json())
			.then((r) => {
				console.log(r);
				document
					.querySelector(".AddProduct")
					.querySelector(".input-desc").value = "";
				document
					.querySelector(".AddProduct")
					.querySelector(".product-name").value = "";
				document
					.querySelector(".AddProduct")
					.querySelector(".price").value = 0;
				document
					.querySelector(".AddProduct")
					.querySelector(".qty").value = 0;
				document
					.querySelector(".AddProduct")
					.querySelector(".product-img").value = null;
				this.props.fun.product("");
				this.props.fun.RouteChange("store");
			});
	}
	render() {
		return (
			<div className="AddProduct" id={this.props.uid}>
				<div className="addproduct-div">
					<form
						className="form"
						id="form"
						onSubmit={(e) => this.submitted(e)}
					>
						<label>Name</label>
						<input
							type="text"
							className="product-input product-name"
							onChange={(e) => this.handleName(e)}
						/>
						<label>Description</label>
						<textarea
							type="text"
							className="product-input input-desc"
							onChange={(e) => this.handleDesc(e)}
							placeholder="Enter about your product"
						></textarea>
						<label>Price(per unit)</label>
						<input
							type="number"
							min="0"
							className="product-input price"
							onChange={(e) => this.handlePrice(e)}
						/>
						<label>Quantity(units)</label>
						<input
							type="number"
							min="0"
							className="product-input  qty"
							onChange={(e) => this.handleQty(e)}
						/>
						<input
							type="file"
							className="product-input product-img"
							accept="image/*"
							name="myFile"
							single="true"
							onChange={(e) => this.handleFile(e)}
						/>

						<input type="submit" className="product-submit" />
					</form>
				</div>
			</div>
		);
	}
}
export default AddProduct;
