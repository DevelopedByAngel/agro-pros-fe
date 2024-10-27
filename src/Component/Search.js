import React from "react";
import { backendURL } from ".././config/config.js";
import "../stylesheet/Search.css";
import { ImSearch } from "react-icons/im";

const Search = (props) => {
	const { search, profileImg } = props;
	var query = "";
	return (
		<div className="Search">
			<div className="profile">
				<img
					className="dp image"
					src={backendURL+"" + profileImg}
				/>
			</div>
			<div className="search">
				<form onSubmit={(e) => search(e, query)}>
					<input
						className="search-field"
						onChange={(e) => (query = e.target.value)}
						type="text"
						required
					/>
					<ImSearch className="search-icon" />
				</form>
			</div>
		</div>
	);
};

export default Search;
