import React, { Component } from "react";
import { backendURL } from ".././config/config.js";
import $ from "jquery";
import "../stylesheet/Product.css";
class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	buy() {
		this.props.fun.updateProduct(this.props.product);
		var qty = prompt("Quantity:");
		if (qty == undefined) {
			console.log("none");
		} else {
			fetch(backendURL+"editProduct", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: this.props.product._id,
					user: this.props.fun.state.user.id,
					desc: this.props.product.desc,
					name: this.props.product.name,
					price: this.props.product.price,
					qty: this.props.product.qty - qty,
					qtyBought: qty,
					isBuy: true,
				}),
			})
				.then((res) => res.json())
				.then((r) => {
					console.log(r);
					this.props.fun.product("");
					this.props.fun.RouteChange("review");
				});
		}
	}
	view() {
		fetch(backendURL+"getBuyers", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: this.props.product._id,
			}),
		})
			.then((res) => res.json())
			.then((r) => {
				this.props.fun.updateUsers(r);
				this.props.fun.RouteChange("friends");
			});
	}
	edit() {
		this.props.fun.updateProduct(this.props.product);
		$(".EditProduct").css("display", "flex");
	}
	review() {
		this.props.fun.updateProduct(this.props.product);
		this.props.fun.RouteChange("review");
	}
	render() {
		var edit = [];
		console.log(this.props.product.date);
		console.log(this.props.product.id, this.props.fun.state.user._id);
		if (this.props.product.id === this.props.fun.state.user._id) {
			edit.push(
				<button
					type="button"
					className="edit-product"
					onClick={() => this.edit()}
				>
					Edit
				</button>
			);
			edit.push(
				<button
					type="button"
					className="edit-product"
					onClick={() => this.view()}
				>
					View Buyers
				</button>
			);
		} else {
			edit.push(
				<button
					type="button"
					className="buy-product"
					onClick={() => this.buy()}
				>
					Buy
				</button>
			);
		}
		return (
			<div className="Product" id={this.props.product._id}>
				<div className="product">
					<div className="product-name-div">
						<span className="blur-product-name">
							{this.props.product.name}
						</span>
						<span className="product-name">
							{this.props.product.name}
						</span>
					</div>
					<img
						className="product-img"
						alt=""
						src={backendURL+"" + this.props.product.path}
					/>
					<div className="details">
						<p className="desc">{this.props.product.desc}</p>
					</div>
					<div className="user-name">{this.props.product.user}</div>
					<div className="date">
						{this.props.product.date[0]}-
						{this.props.product.date[1]}-
						{this.props.product.date[2] - 100}
					</div>
					<div className="price">
						Price: {"  "}
						{this.props.product.price}
					</div>
					<div className="qty">
						Quantity: {"  "}
						{this.props.product.qty}
					</div>
					<div className="btn">
						{edit}
						<button
							className="review-btn"
							onClick={() => this.review()}
							value="review"
						>
							Review
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Product;
