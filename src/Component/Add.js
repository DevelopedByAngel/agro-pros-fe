import React, { Component } from "react";
import { backendURL } from ".././config/config.js";
import $ from "jquery";
import "../stylesheet/Add.css";
class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: {},
			caption: "",
		};
	}
	handleCaptions = (caption) => {
		this.setState({
			caption: caption.target.value.replaceAll("\n", " ~ "),
		});
		console.log(this.state.caption);
	};
	handleFile(file) {
		this.setState({ file: file.target });
	}
	submitted(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("imgUploader", this.state.file.files[0]);
		console.log("posting");
		fetch(backendURL+"upload", {
			method: "POST",
			body: formData,
			headers: {
				id: this.props.fun.state.user._id,
				user: this.props.fun.state.user.id,
				caption: this.state.caption,
			},
		})
			.then((res) => res.json())
			.then((r) => {
				console.log(r.path);
				document
					.querySelector(".Add")
					.querySelector(".input-caption").value = "";
				document
					.querySelector(".Add")
					.querySelector(".post-img").value = null;
				$(".Menu .add-button-before").css("background", "#fcffec");
				$(".Add").css({ height: "0vh", background: "rgba(0,0,0,0)" });
				this.props.fun.feeds();
				// this.props.fun.RouteChange("profile");
			});
	}
	render() {
		return (
			<div className="Add" id={this.props.uid}>
				<div className="add-div">
					<form
						className="form"
						id="form"
						onSubmit={(e) => this.submitted(e)}
					>
						<textarea
							type="text"
							className="input-caption"
							onChange={(e) => this.handleCaptions(e)}
							placeholder="Enter about your post"
						></textarea>
						<input
							type="file"
							className="post-img"
							accept="image/*"
							name="myFile"
							single="true"
							onChange={(e) => this.handleFile(e)}
						/>

						<input type="submit" className="post-submit" />
					</form>
				</div>
			</div>
		);
	}
}
export default Add;
