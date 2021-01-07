import React, { Component } from "react";
import $ from "jquery";
import "../stylesheet/UploadDP.css";
import { BsUpload } from "react-icons/bs";
class UploadDP extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: {},
			caption: "",
			preview:
				"https://sites.nicholas.duke.edu/clarklab/files/2011/01/default_profile-d80441a6f25a9a0aac354978c65c8fa9.jpg",
		};
	}
	handlePreview() {
		$(".input-file").click();
	}
	handleFile(file) {
		file.preventDefault();
		console.log(file.target.files[0].result);
		if (file.target.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$(".preview img").attr("src", e.target.result);
			};
			reader.readAsDataURL(file.target.files[0]);
		}
		console.log(file);

		this.setState({ file: file.target });
	}
	handleUpload() {
		$(".DPform input[type=submit]").click();
	}
	submitted(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("imgUploader", this.state.file.files[0]);
		fetch("http://localhost:3000/uploadDP", {
			method: "POST",
			body: formData,
			headers: new Headers({
				id: this.props.fun.state.user._id,
				userID: this.props.fun.state.user.id,
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
					<input type="submit" />
				</form>
				<div className="upload" onClick={() => this.handleUpload()}>
					<BsUpload size="20vw" />
				</div>
				<div className="user-details">
					<span className="id">{this.props.fun.state.user.id}</span>
				</div>
			</div>
		);
	}
}

export default UploadDP;