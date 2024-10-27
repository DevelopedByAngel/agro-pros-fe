import React, { Component } from "react";
import { backendURL } from ".././config/config.js";
import "../stylesheet/AddProduct.css";
class Buy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qty: 0,
		};
	}
	handleQty = (qty) => {
		this.setState({ qty: qty.target.value });
	};
	submitted(e) {
		e.preventDefault();
		console.log("posting");

		fetch(backendURL+"editProduct", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: this.props.product._id,
				name: this.state.name,
				desc: this.state.desc,
				price: this.state.price,
				qty: this.state.qty,
			}),
		})
			.then((res) => res.json())
			.then((r) => {
				console.log(r);
				this.props.fun.product("");
				this.props.fun.RouteChange("review");
			});
	}
	render() {
		return (
			<div className="Buy" id={this.props.uid}>
				<div className="buy-div">
					<form
						className="form"
						id="form"
						onSubmit={(e) => this.submitted(e)}
					>
						<input
							type="number"
							min="0"
							className="qty"
							onChange={(e) => this.handleQty(e)}
						/>
						<input type="submit" className="product-submit" />
					</form>
				</div>
			</div>
		);
	}
}
export default Buy;
