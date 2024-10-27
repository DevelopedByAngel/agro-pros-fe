import React, { Component } from "react";
import $ from "jquery";
import "../stylesheet/UploadDP.css";
import { backendURL } from ".././config/config.js";
class UploadDP extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: {},
			caption: "",
			preview:
				"https://sites.nicholas.duke.edu/clarklab/files/2011/01/default_profile-d80441a6f25a9a0aac354978c65c8fa9.jpg",
			address: "",
			city: "",
			mobile: "",
		};
	}
	handlePreview() {
		$(".input-file").click();
	}
	handleAddress(address) {
		this.setState({ address: address.target.value });
	}
	handleCity(city) {
		this.setState({ city: city.target.value });
	}
	handleMobile(mobile) {
		this.setState({ mobile: mobile.target.value });
	}
	handleFile(file) {
		file.preventDefault();
		if (file.target.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$(".preview img").attr("src", e.target.result);
			};
			reader.readAsDataURL(file.target.files[0]);
		}
		console.log(file);
		this.setState({ file: file.target });
		console.log(this.state.file);
	}
	handleUpload() {
		$(".DPform input[type=submit]").click();
	}
	submitted(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("imgUploader", this.state.file.files[0]);
		fetch(backendURL+"uploadDP", {
			method: "POST",
			body: formData,
			headers: new Headers({
				id: this.props.fun.state.user._id,
				userID: this.props.fun.state.user.id,
				address: this.props.fun.state.address,
				city: this.props.fun.state.city,
				mobile: this.props.fun.state.mobile,
			}),
		})
			.then((res) => res.json())
			.then((r) => {
				if (r) {
					this.props.fun.updateuser(r.user);
					this.props.fun.RouteChange("profile");
				}
			})
			.catch((err) => alert(err.message));
	}
	render() {
		return (
			<div className="UploadDP " id={this.props.uid}>
				<div className="preview">
					<img
						alt="preview"
						src={this.state.preview}
						className="preview-img"
						onClick={() => this.handlePreview()}
					/>
				</div>
				<form
					className="DPform"
					id="DPform"
					onSubmit={(e) => this.submitted(e)}
				>
					<input
						type="file"
						className="input-file"
						accept="image/*"
						name="myFile"
						single="true"
						onChange={(e) => this.handleFile(e)}
					/>
					<span className="span">
						<label className="label">Address</label>
						<textarea
							name="address"
							className="address"
							onChange={(e) => this.handleAddress(e)}
						></textarea>
					</span>
					<span className="span">
						<label className="label">City</label>
						<input
							name="text"
							className="city"
							onChange={(e) => this.handleCity(e)}
						/>
					</span>
					<span className="span">
						<label className="label">Mobile</label>
						<input
							type="tel"
							className="mobile"
							onChange={(e) => this.handleMobile(e)}
						/>
					</span>
					<span className="submit-dp">
						<input type="submit" className="dp-submit" />
					</span>
				</form>

				<div className="user-details">
					<span className="id">{this.props.fun.state.user.id}</span>
				</div>
			</div>
		);
	}
}

export default UploadDP;
