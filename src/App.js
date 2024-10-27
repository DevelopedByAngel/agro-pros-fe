import React, { Component } from "react";
import Loader from "./Component/Loader.js";
import Login from "./Component/Login.js";
import UploadDP from "./Component/UploadDP.js";
import PostList from "./Component/PostList.js";
import Add from "./Component/Add.js";
import Addcomment from "./Component/Addcomment.js";
import CommentList from "./Component/CommentList.js";
import Menu from "./Component/Menu.js";
import Search from "./Component/Search.js";
import ProfileHeader from "./Component/ProfileHeader.js";
import Settings from "./Component/Settings.js";
import UsersList from "./Component/UsersList.js";
import FriendsList from "./Component/FriendsList.js";
import Productlist from "./Component/ProductList.js";
import AddProduct from "./Component/AddProduct.js";
import EditProduct from "./Component/EditProduct.js";
import AddReview from "./Component/AddReview.js";
import ReviewList from "./Component/ReviewList.js";
import Tips from "./Component/Tips.js";
import DoubtList from "./Component/DoubtList.js";
import AddDoubt from "./Component/AddDoubt.js";
import { IoMdArrowRoundBack } from "react-icons/io";
import { backendURL } from "./config/config.js";
import "./App.css";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: "home",
      loading: false,
      user: {
        name: "",
        profileImg: "https://developedbyangel.github.io/SAS/logo.PNG",
      },
      postList: [],
      productList: [],
      users: [],
      viewProfile: {
        name: "",
        profileImg: "https://developedbyangel.github.io/SAS/logo.PNG",
      },
      post: {},
      product: {},
      prevState: {},
      doubtList: [],
    };
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  login = (id, password) => {
    console.log("log");
    fetch(backendURL+"login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r.error) {
          alert(r.error);
        } else {
          this.setState({ user: r.user });
          this.setState({ postList: r.post });
          this.RouteChange("profile");
        }
      });
  };
  signup = (id, email, password) => {
    console.log("signup");
    fetch(backendURL+"signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        this.setState({ user: r.user });
        this.setState({ postList: r.post });
        this.RouteChange("uploadDP");
      })
      .catch((err) => alert(err.message));
  };
  hashtags = (hashtag) => {
    this.loading(true);
    fetch(backendURL+"hashtags/" + hashtag, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((r) => {
        this.setState({ postList: r });
        this.RouteChange("feed");
      })
      .catch((err) => alert(err.message));
  };
  request = (requestName) => {
    fetch(backendURL+"request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID: this.state.user._id,
        userName: this.state.user.id,
        requestName: requestName,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        var state = this.state.user;
        state.pending.push(requestName);
        this.setState({ user: state });
        $(".status" + requestName).text("Request Pending");
        return r;
      })
      .catch((err) => alert(err.message));
  };
  acceptRequest = (requestName) => {
    fetch(backendURL+"acceptRequest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID: this.state.user._id,
        userName: this.state.user.id,
        requestName: requestName,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        var state = this.state.user;
        state.pending.splice(state.request.indexOf(requestName), 1);
        state.friends.push(requestName);
        this.setState({ user: state });
        $(".status" + requestName).text("Unfriend");
        return r;
      })
      .catch((err) => alert(err.message));
  };
  cancelRequest = (requestName) => {
    fetch(backendURL+"cancelRequest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID: this.state.user._id,
        userName: this.state.user.id,
        requestName: requestName,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        var state = this.state.user;
        state.pending.splice(state.pending.indexOf(requestName), 1);
        this.setState({ user: state });
        $(".status" + requestName).text("Request");
        return r;
      })
      .catch((err) => alert(err.message));
  };
  Unfriend = (friendName) => {
    fetch(backendURL+"Unfriend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID: this.state.user._id,
        userName: this.state.user.id,
        friendName: friendName,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        var state = this.state.user;
        state.friends.splice(state.pending.indexOf(friendName), 1);
        this.setState({ user: state });
        $(".status" + friendName).text("Request");
        return r;
      })
      .catch((err) => alert(err.message));
  };
  product = (product) => {
    this.loading(true);
    fetch(backendURL+"product/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        search: product,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        console.log(r);
        this.loading(false);
        this.setState({ productList: r });
      })
      .catch((err) => alert(err.message));
  };
  feeds = () => {
    this.loading(true);
    console.log("feed", this.state.user);
    fetch(backendURL+"feeds/" + this.state.user._id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((r) => {
        this.setState({ postList: r });
        $(".profilePostList").attr("class", "PostList");
        $(".profilePost").attr("class", "Post");
        this.RouteChange("feed");
      })
      .catch((err) => alert(err.message));
  };
  like = (postID) => {
    fetch(backendURL+"like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postID: postID,
        userID: this.state.user.id,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r) console.log("liked");
      })
      .catch((err) => alert(err.message));
  };
  share = (postID) => {
    fetch(backendURL+"share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postID: postID,
        userID: this.state.user.id,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r) console.log("share");
      })
      .catch((err) => alert(err.message));
  };
  comment = (cmt) => {
    fetch(backendURL+"comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postID: this.state.post._id,
        userID: this.state.user.id,
        cmt: cmt,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r) {
          var postList = this.state.postList;
          postList.map((post) => {
            var p = post;
            if (post._id === this.state.post._id) {
              p.comments.push(r);
            }
            return p;
          });
          this.setState({ postList: postList });
          $(".input-comment").val("");
          $(".Addcomment .svg").css({ "animation-name": "o" });
        }
      })
      .catch((err) => alert(err.message));
  };
  review = (cmt) => {
    fetch(backendURL+"review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.product._id,
        userID: this.state.user.id,
        cmt: cmt,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r) {
          var postList = this.state.productList;
          postList.map((post) => {
            var p = post;
            if (post._id === this.state.product._id) {
              p.comments.push(r);
            }
            return p;
          });
          this.setState({ productList: postList });
          $(".input-comment").val("");
          $(".Addcomment .svg").css({ "animation-name": "o" });
        }
      })
      .catch((err) => alert(err.message));
  };
  reply = (cmtID, reply) => {
    fetch(backendURL+"reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postID: this.state.post._id,
        userID: this.state.user.id,
        cmtID: cmtID,
        reply: reply,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r) {
          var post = this.state.post;
          post.comments.map((c) => {
            var p = c;
            if (c._id === cmtID) {
              p.replies.push(r);
            }
            return p;
          });
          this.setState({ post: post });
          $(".input-reply").val("");
        }
      })
      .catch((err) => alert(err.message));
  };
  likeComment = (cmtID) => {
    fetch(backendURL+"likeComment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postID: this.state.post._id,
        cmtID: cmtID,
        userID: this.state.user.id,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r) console.log(r);
      })
      .catch((err) => alert(err.message));
  };
  RouteChange = (route) => {
    this.loading(false);
    this.setState({ prevState: this.state });
    console.log("routing to " + route);
    this.setState({ route: route });
  };
  search = (e, q) => {
    this.loading(true);
    e.preventDefault();
    if (q[0] === "#") {
      this.hashtags(q.slice(1));
    } else {
      fetch(backendURL+"search/" + q, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((r) => {
          if (r) {
            this.setState({ users: r });
            this.RouteChange("usersList");
            $(".search-field").val("");
          }
        })
        .catch((err) => alert(err.message));
    }
  };
  viewProfile(user) {
    this.loading(true);
    console.log("going to view profile");
    fetch(backendURL+"getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r) {
          this.setState({ viewProfile: r.user });
          this.setState({ postList: r.post });
          this.RouteChange("viewProfile");
        }
      })
      .catch((err) => alert(err.message));
  }
  postDoubt(doubt) {
    fetch(backendURL+"doubt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
        doubt: doubt,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        var doubtList = this.state.doubtList;
        doubtList.push(r);
        this.setState({ doubtList: doubtList });
        this.RouteChange("tips");
      });
  }
  postAnswer(id, answer) {
    fetch(backendURL+"answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
        doubtID: id,
        ans: answer,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        var doubt = this.state.doubtList;
        doubt.map((d) => {
          var p = d;
          if (d._id === id) {
            p.answers.push(r);
          }
          return p;
        });
        this.setState({ doubtList: doubt });
        $(".input-reply").val("");
      });
  }
  getDoubts() {
    fetch(backendURL+"getdoubt", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((r) => this.setState({ doubtList: r }));
  }
  getUser = () => {
    this.loading(true);
    console.log("going to view your profile");
    fetch(backendURL+"getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r) {
          this.setState({ postList: r.post });
          this.RouteChange("profile");
        }
      })
      .catch((err) => alert(err.message));
  };
  updateuser(user) {
    this.setState({ user: user });
  }
  updateUsers(users) {
    this.setState({ users: users });
  }
  updatePost(post) {
    this.setState({ post: post });
    console.log(this.state);
  }
  updateProduct(product) {
    this.setState({ product: product });
  }
  back() {
    this.setState(this.state.prevState);
  }
  loading(check) {
    if (check) {
      $(".Loader").css("display", "flex");
      this.setState({ loading: true });
    } else {
      $(".Loader").css("display", "none");
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <div className="App">
        <div className="Screen">View on smaller(mobile) screen. </div>
        <Loader loading={this.state.loading} />
        {this.state.route === "home" ? (
          <Login fun={this} />
        ) : this.state.route === "uploadDP" ? (
          <UploadDP fun={this} />
        ) : (
          <div>
            <IoMdArrowRoundBack className="back" onClick={() => this.back()} />
            <Search search={this.search} profileImg={this.state.user.path} />
            <Menu route={this.RouteChange} fun={this} />
            {this.state.route === "viewProfile" ? (
              <div>
                <ProfileHeader user={this.state.viewProfile} fun={this} />
                <div className="PostList profilePostList">
                  <PostList
                    postList={this.state.postList}
                    user={this.state.viewProfile}
                    fun={this}
                  />
                </div>
              </div>
            ) : this.state.route === "comment" ? (
              <div className="comment-div">
                <Addcomment fun={this} />
                <CommentList fun={this} comments={this.state.post.comments} />
              </div>
            ) : this.state.route === "friends" ? (
              <div className="friendsList">
                <FriendsList users={this.state.users} />
              </div>
            ) : this.state.route === "usersList" ? (
              <div className="usersList">
                <UsersList
                  userID={this.state.user.id}
                  users={this.state.users}
                  fun={this}
                />
              </div>
            ) : this.state.route === "feed" ? (
              <div className="PostList">
                <PostList
                  postList={this.state.postList}
                  user={this.state.user}
                  fun={this}
                />
              </div>
            ) : this.state.route === "profile" ? (
              <div>
                <ProfileHeader user={this.state.user} fun={this} />
                <div className="PostList profilePostList">
                  <PostList
                    postList={this.state.postList}
                    user={this.state.user}
                    fun={this}
                  />
                </div>
              </div>
            ) : this.state.route === "settings" ? (
              <Settings />
            ) : this.state.route === "store" ? (
              <div>
                <form
                  className="filter-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.product(
                      document.getElementsByClassName("filter-query")[0].value
                    );
                  }}
                >
                  Filter:{"  "}
                  <input type="text" className="filter-query" />
                </form>
                <div className="ProductList">
                  <Productlist fun={this} list={this.state.productList} />
                </div>
                <AddProduct fun={this} />
                <EditProduct fun={this} product={this.state.product} />
              </div>
            ) : this.state.route === "review" ? (
              <div>
                <AddReview fun={this} />
                <ReviewList fun={this} reviews={this.state.product.comments} />
              </div>
            ) : (
              <div>
                <Tips fun={this} />
                <DoubtList fun={this} doubts={this.state.doubtList} />
                <AddDoubt fun={this} />
              </div>
            )}
            <Add fun={this} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
