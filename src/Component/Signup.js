import React, { Component } from "react";
import "../stylesheet/Login.css";
import "../stylesheet/Signup.css";
import ClipLoader from "react-spinners/ClipLoader";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi";
import { BiCheckDouble } from "react-icons/bi";
import $ from "jquery";
class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			id: "",
			password: "",
			loading: false,
		};
	}
	emailchange = (email) => {
		this.setState({ email: email.target.value });
	};
	idchange = (id) => {
		this.setState({ id: id.target.value });
	};
	passwordchange = (password) => {
		this.setState({ password: password.target.value });
	};
	onsubmit = (e) => {
		this.setState({ loading: true });
		$("#signup-text").text("");
		e.preventDefault();
		this.props.fun.signup(
			this.state.id,
			this.state.email,
			this.state.password
		);
		setTimeout(() => {
			$("#signup-text").text("Sign Up");
			this.setState({ loading: false });
		}, 4000);
	};

	render() {
		return (
			<div className="Signup">
				<div className="signup-div div">
					<div className="form">
						<form
							className="signupform"
							onSubmit={(e) => this.onsubmit(e)}
						>
							<span className="id-input input-span">
								<FaUserAlt className="id-svg svg" />
								<input
									className="input-field"
									type="text"
									required={true}
									placeholder="   "
									name="id"
									pattern="^[a-zA-Z0-9_.]+$"
									spellCheck="false"
									onChange={(e) => this.idchange(e)}
									title="ID contains only alphabet, numbers, underscore(_) and dot(.)"
								></input>
								<label
									onClick={(e) =>
										$(e.target)
											.parent()
											.children("input")
											.focus()
									}
									className="input-label id"
									htmlFor="name"
								>
									user ID
								</label>
							</span>
							<span className="email-input input-span">
								<MdEmail className="email-svg svg" />
								<input
									className="input-field"
									placeholder="   "
									required={true}
									type="email"
									name="email"
									onChange={(e) => this.emailchange(e)}
								></input>
								<label
									onClick={(e) =>
										$(e.target)
											.parent()
											.children("input")
											.focus()
									}
									className="input-label email"
									htmlFor="email"
								>
									Email
								</label>
							</span>
							<span className="password-input input-span">
								<HiOutlineKey className="password-svg svg" />
								<input
									className="input-field"
									placeholder="   "
									required={true}
									type="password"
									name="password"
									onChange={(e) => this.passwordchange(e)}
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
							</span>
							<span className="check-password-input input-span">
								<BiCheckDouble className="check-svg svg" />
								<input
									className="input-field"
									pattern={"^" + this.state.password}
									required={true}
									placeholder="   "
									type="password"
									name="password"
									title="Password does not match"
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
									Confirm Password
								</label>
							</span>
							<button
								className="signup-button submit"
								type="submit"
								value="Sign Up"
								id="signup-button"
							>
								<span className="inner-text" id="signup-text">
									Sign Up
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
							Already have an account??
						</span>
						<button
							className="login-button submit"
							type="signup-submit"
							value="Sign up"
							id="submit"
							onClick={() => this.props.ch()}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Signup;
