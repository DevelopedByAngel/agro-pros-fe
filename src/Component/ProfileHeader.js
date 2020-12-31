import React, { Component } from "react";
import $ from "jquery";
import "../stylesheet/ProfileHeader.css";
const ProfileHeader = (props) => {
	const { user, fun } = props;
	var add = [];
	var img;
	if (user.path) {
		img = "http://localhost:3000/" + user.path;
	} else {
		img = "https://i.postimg.cc/t4LMTMx4/blue-user-head-png-18-1.png";
	}

	var postsLength, friendsLength, requestLength, pendingLength;
	user.post.length > 1000
		? (postsLength = user.post.length.toFixed(1) + "K")
		: (postsLength = user.post.length);
	user.friends.length >= 1000
		? (friendsLength = (user.friends.length / 1000).toFixed(1) + "K")
		: (friendsLength = user.friends.length);
	user.request.length >= 1000
		? (requestLength = (user.request.length / 1000).toFixed(1) + "K")
		: (requestLength = user.request.length);
	user.pending.length >= 1000
		? (pendingLength = (user.pending.length / 1000).toFixed(1) + "K")
		: (pendingLength = user.pending.length);
	if (fun.state.route === "profile") {
		add.push(
			<span
				className="pending"
				onClick={() => pending(fun, user.pending)}
			>
				Pending <span className="number">{pendingLength}</span>
			</span>
		);
		add.push(
			<span className="accept" onClick={() => accept(fun, user.request)}>
				Accept
				<span className="number">{requestLength}</span>
			</span>
		);
	}
	return (
		<div className="ProfileHeader">
			<span className="id">{user.id}</span>
			<div className="profile-pic">
				<div className="profile-circle">
					<div className="profile-mask">
						<img src={img} />
					</div>
				</div>
			</div>
			<div className="people">
				<div className="common">
					<span
						className="friends"
						onClick={() => friends(fun, user.friends)}
					>
						Friends
						<span className="number">{friendsLength}</span>
					</span>
					<span className="posts">
						Posts
						<span className="number">{postsLength}</span>
					</span>
				</div>
				<div className="self">{add}</div>
			</div>
		</div>
	);
};
const friends = (fun, user) => {
	if (user.length > 0) {
		console.log("friends");
		console.log(user);
		fun.updateUsers(user);
		fun.RouteChange("friends");
	}
};
const pending = (fun, user) => {
	if (user.length > 0) {
		console.log("pending");
		fun.updateUsers(user);
		fun.RouteChange("friends");
	}
};
const accept = (fun, user) => {
	if (user.length > 0) {
		console.log("accept");
		fun.updateUsers(user);
		fun.RouteChange("friends");
	}
};
export default ProfileHeader;
