import React, { Component } from "react";
import Signup from "./Signup.js";
import $ from "jquery";
import ClipLoader from "react-spinners/ClipLoader";
import "../stylesheet/Login.css";
import { HiOutlineKey } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import logo from "./../assests/logo.PNG";
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			password: "",
			loading: false,
		};
	}
	emailchange = (email) => {
		this.setState({ id: email.target.value });
	};
	passwordChange = (password) => {
		this.setState({ password: password.target.value });
	};
	onsubmit = (e) => {
		this.setState({ loading: true });
		$("#login-text").text("");
		e.preventDefault();
		this.props.fun.login(this.state.id, this.state.password);
		setTimeout(() => {
			$("#login-text").text("Login");
			this.setState({ loading: false });
		}, 4000);
	};
	ch() {
		$("ellipse").css({ opacity: "100%" });
		if ($(".login-div").css("display") === "flex") {
			$("ellipse").css({
				transform: " rotateZ(180deg)",
			});
			$("ellipse").attr({ cy: "-70%" });

			setTimeout(() => {
				$(".signup-div").css({ display: "flex" });
				$(".login-div").css({ display: "none" });
				$("ellipse").css({ opacity: "80%" });
			}, 300);
		} else {
			$("ellipse").css({
				transform: " rotateZ(-180deg)",
			});
			$("ellipse").attr({ cy: "-50%" });
			setTimeout(() => {
				$(".signup-div").css({ display: "none" });
				$(".login-div").css({ display: "flex" });
				$("ellipse").css({ opacity: "80%" });
			}, 300);
		}
	}
	choose(c) {
		if (c === "signup") {
			$(".signup-div").css({ display: "flex" });
			$(".login-div").css({ display: "none" });
		} else {
			$(".signup-div").css({ display: "none" });
			$(".login-div").css({ display: "flex" });
		}
		$(".choose").css({ display: "none" });
	}
	render() {
		return (
			<div className="Login">
				<div className="main">
					<div
						className="first"
						onLoad={() => {
							setTimeout(() => {
								$(".first").css("opacity", "0%");
							}, 2000);
							setTimeout(() => {
								$(".first").hide();
							}, 2500);
						}}
					>
						<img className="first-img" src={logo} alt="" title="Agro Pro's"/>
					</div>
					<div className="overlay">
						<svg className="circlesvg" height="40vh" width="100%">
							<defs>
								<linearGradient
									id="grad1"
									x1="0%"
									y1="100%"
									x2="0%"
									y2="0%"
								>
									<stop
										offset="0%"
										style={{
											"stopColor": "rgb(58,156,126)",
											"stopOpacity": "1",
										}}
									/>
									<stop
										offset="100%"
										style={{
											"stopColor": "rgb(176,241,0)",
											"stopOpacity": "1",
										}}
									/>
								</linearGradient>
								<filter
									id="f1"
									x="0"
									y="0"
									width="200%"
									height="200%"
								>
									<feOffset
										result="offOut"
										in="SourceBackground"
										dx="0"
										dy="10"
									/>
									<feGaussianBlur
										result="blurOut"
										in="offOut"
										stdDeviation="10"
									/>
									<feBlend
										in="SourceGraphic"
										in2="blurOut"
										mode="normal"
									/>
								</filter>
								<pattern
									id="img1"
									patternUnits="userSpaceOnUse"
									width="100"
									height="100"
								>
									<image
										href="https://i.postimg.cc/BZhScPY4/home.png"
										x="0"
										y="0"
										width="100"
										height="100"
									/>
								</pattern>
							</defs>
							<ellipse
								cx="50%"
								cy="-50%"
								rx="320"
								ry="320"
								filter="url(#f1)"
								fill="url(#grad1)"
							/>
						</svg>
					</div>
					<section className="choose div">
						<span
							className="choose-item"
							onClick={() => this.choose("signup")}
						>
							Sign up
						</span>
						<span
							className="choose-item"
							onClick={() => this.choose("login")}
						>
							Login
						</span>
					</section>
					<div className="login-div div">
						<div className="form">
							<form
								className="loginform"
								onSubmit={(e) => this.onsubmit(e)}
							>
								<span className="id-input input-span">
									<FaUserAlt className="id-svg svg" />
									<input
										className="input-field"
										type="text"
										id="email"
										placeholder="   "
										required={true}
										name="id"
										pattern="^[a-zA-Z0-9._]+$"
										spellCheck="false"
										onChange={(e) => this.emailchange(e)}
									></input>
									<label
										onClick={(e) =>
											$(e.target)
												.parent()
												.children("input")
												.focus()
										}
										className="input-label id"
										htmlFor="email"
									>
										User ID
									</label>
									<br />
								</span>
								<span className="password-input input-span">
									<HiOutlineKey className="password-svg svg" />
									<input
										className="input-field"
										type="password"
										placeholder="  "
										required={true}
										id="password"
										name="password"
										onChange={(e) => this.passwordChange(e)}
									></input>
									<label
										onClick={(e) =>
											$(e.target)
												.parent()
												.children("input")
												.focus()
										}
										className="input-label password"
										htmlFor="password"
									>
										Password
									</label>
									<br />
								</span>
								<button
									className="login-button submit"
									type="submit"
									required={true}
									value="Login"
									id="login-button"
								>
									<span
										className="inner-text"
										id="login-text"
									>
										Login
									</span>
									<ClipLoader
										className="loader"
										size="1rem"
										color="rgb(252 255 236)"
										loading={this.state.loading}
									/>
								</button>
							</form>
							<span
								style={{
									color: "rgb(58, 156, 126)",
									fontSize: "0.8rem",
								}}
							>
								Don't have an account??
							</span>
							<button
								className="signup-button submit"
								type="submit"
								value="Sign up"
								id="login-submit"
								onClick={() => this.ch()}
							>
								Sign Up
							</button>
						</div>
					</div>
					<Signup fun={this.props.fun} ch={this.ch} />
				</div>
			</div>
		);
	}
}

export default Login;
