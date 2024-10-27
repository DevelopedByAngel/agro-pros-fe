import React, { Component } from "react";
class Review extends Component {
	render() {
		return (
			<div className="Comment" id={this.props.postno}>
				<div className="Comment-div">
					<span className="user-name">{this.props.user}</span>
					<div className="details">
						<p className="comment">{this.props.comment}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Review;
