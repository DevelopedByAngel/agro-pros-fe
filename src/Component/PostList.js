import React, { Component } from "react";
import Post from "./Post.js";
import $ from "jquery";
class PostList extends Component {
	componentDidMount() {
		if (this.props.fun.state.route === "profile" || this.props.fun.state.route === "viewProfile") {
			$(".PostList").attr("class", "PostList profilePostList");
			$(".Post").attr("class", "Post profilePost");
		} else {
			$(".PostList").attr("class", "PostList");
			$(".Post").attr("class", "Post");
		}
	}
	render() {
		return this.props.postList.reverse().map((d) => {
			console.log(d.path);
			var li = d.caption.split(" ");
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
			var caption = li.join(" ");
			return (
				<Post
					fun={this.props.fun}
					post={d}
					path={d.path}
					key={d._id}
					user={d.user}
					postno={d._id}
					uid={this.props.user.id}
					caption={caption.replaceAll("~","\n")}
					like={d.likes.filter(this.props.fun.onlyUnique).length}
					likes={d.likes}
					comment={d.comments.length}
					comments={d.comments}
					share={d.noOfShare}
				/>
			);
		});
	}
}

export default PostList;
