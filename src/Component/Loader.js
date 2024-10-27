import React, { Component } from "react";
import "../stylesheet/Loader.css";
import PuffLoader from "react-spinners/PuffLoader";
class Loader extends Component {
	render() {
		return (
			<div className="Loader">
				<PuffLoader color="#ffffff" loading={this.props.loading} />
			</div>
		);
	}
}

export default Loader;
