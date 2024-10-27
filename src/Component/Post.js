import React, { Component } from "react";
import $ from "jquery";
import "../stylesheet/Post.css";
import { backendURL } from ".././config/config.js";
import { BiCommentEdit } from "react-icons/bi";
import { HiShare } from "react-icons/hi";
import { FcLike } from "react-icons/fc";
class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: {},
			liked: false,
		};
	}
	like = () => {
		console.log("liking");
		if (
			!this.props.likes.includes(this.props.fun.state.user.id) &&
			!this.state.liked
		) {
			this.props.fun.like(this.props.postno);
			$(".like" + this.props.postno + " .number").text(
				parseInt($(".like" + this.props.postno + " .number").text()) + 1
			);

			$(".like" + this.props.postno + " .like-svg").css({
				filter: "drop-shadow(0px 0px 2px red)",
				transform: "scale(1.5)",
				opacity: "0",
			});
			$(".like" + this.props.postno + " .liked-svg").css({
				display: "inline",
			});
			this.setState({ liked: true });
		}
	};
	comment = () => {
		this.props.fun.updatePost(this.props.post);
		this.props.fun.RouteChange("comment");
	};
	share = () => {
		this.props.fun.share(this.props.postno);
		$(".share" + this.props.postno + "  .number").text(
			parseInt($(".share" + this.props.postno + "  .number").text()) + 1
		);
	};
	re(caption) {
		var li = caption.split(" ");
		li = li.map((c) => {
			var a = c;
			if (c[0] === "#") {
				a =
					'<a className="hashtag" style="color:blue;text-decoration:none" href="/hashtag/' +
					c.replace("#", "") +
					'">' +
					c.replace("#", "") +
					"</a>";
				return a;
			} else {
				return c;
			}
		});
		return li.join(" ");
	}
	FocusPost(id) {
		
		console.log(this.props.fun.state.route)
		if(this.props.fun.state.route === "profile" || this.props.fun.state.route === "viewProfile")
		{
			$(".PostList").attr("class", "PostList");
			$(".Post").attr("class", "Post");
			$(".expand").css("display","none");
					$(".shrink").css("display","block");
		}
		setTimeout(() => {
			$("html,body").animate({
			scrollTop: $("#" + id).offset().top - 150,
		});
		},250)
		
	}
	componentDidMount() {
		if (this.props.likes.includes(this.props.fun.state.user.id)) {
			$(".like" + this.props.postno + " .like-svg").css("opacity", "0");
			$(".like" + this.props.postno + " .liked-svg").css(
				"display",
				"inline"
			);
			this.setState({ liked: true });
		}
		$(".caption" + this.props.uid + "_" + this.props.postno).html(
			this.props.caption
		);
	}
	render() {
		return (
			<div className="Post profilePost" id={this.props.postno}>
				<div className="post">
					<div className="user-name-div">
						<span className="blur-user-name">
							{this.props.user}
						</span>
						<span className="user-name">{this.props.user}</span>
					</div>
					<img
						className="post-img"
						alt=""
						src={backendURL+"" + this.props.path}
						onClick={() => this.FocusPost(this.props.postno)}
					/>
					<div className="details">
						<p
							className={
								"caption" +
								this.props.uid +
								"_" +
								this.props.postno
							}
						>
							{this.props.caption}
						</p>
						<p className="details-inner">
							<span
								className={"like" + this.props.postno}
								onClick={() => this.like()}
							>
								<FcLike
									className="liked-svg"
									style={{ display: "none" }}
								/>
								<FcLike className="like-svg" />
								<span className="number">
									{this.props.like}{" "}
								</span>{" "}
							</span>
							<span
								className={"comment" + this.props.postno}
								onClick={() => this.comment()}
							>
								<BiCommentEdit />{" "}
								<span className="number">
									{this.props.comment}{" "}
								</span>{" "}
							</span>
							<span
								className={"share" + this.props.postno}
								onClick={() => this.share()}
							>
								<HiShare />
								<span className="number">
									{this.props.share}
								</span>
							</span>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Post;
