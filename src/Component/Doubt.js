import React, { Component } from "react";
import $ from "jquery";
import "../stylesheet/Comment.css";
import { GoReply } from "react-icons/go";
class Doubt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			answer: "",
			isReply: false,
			liked: false,
		};
	}

	handleAnswer(answer) {
		this.setState({ answer: answer.target.value });
	}
	reply() {
		this.setState({ isReply: true });
	}
	onSubmit(e) {
		e.preventDefault();
		this.props.fun.postAnswer(this.props.id, this.state.answer);
	}
	componentDidMount() {}
	render() {
		var answerTag = [];
		if (this.props.answers && !this.state.isReply) {
			this.props.answers.map((r, i) => {
				answerTag.push(
					<div className="reply-div">
						<span className="reply-user-name">
							{r.user + " - "}
						</span>
						<span className="reply">{r.answer}</span>
					</div>
				);
				return r;
			});
			answerTag.push(
				<form
					className="form"
					id="form"
					onSubmit={(e) => this.onSubmit(e)}
				>
					<span className="reply-user-name">
						{this.props.fun.state.user.id} :{" "}
					</span>
					<div className="inputs">
						<textarea
							type="text"
							className="input-reply"
							onChange={(e) => this.handleAnswer(e)}
							placeholder="Reply here"
							maxlength="100"
						></textarea>
						<input type="submit" value="Answer" />
					</div>
					<br />
				</form>
			);
		}
		return (
			<div
				className="Comment"
				id={this.props.id}
				onClick={() => {
					$(".replies").css("display", "none");
					$("#replies" + this.props.id).css("display", "block");
				}}
			>
				<div className="Comment-div">
					<span className="user-name">{this.props.user}</span>
					<div className="details">
						<p className="comment">{this.props.doubt}</p>
						<p className="details-inner">
							<span className={"reply" + this.props.id}>
								<GoReply />{" "}
								<span className="number">
									{this.props.answers.length}{" "}
								</span>
							</span>
						</p>
					</div>
				</div>
				<div className="replies" id={"replies" + this.props.id}>
					{answerTag}
				</div>
			</div>
		);
	}
}

export default Doubt;
