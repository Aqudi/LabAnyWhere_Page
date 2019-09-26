import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class MenuBar extends Component {
	activeStyle = {
		color: "green",
		fontSize: "1.5rem"
	};
	
	state = {
		categoryInfo: []
	};

	componentDidMount() {
		this._getCategories();
	}

	render() {
		const { categoryInfo } = this.state;
		let list = categoryInfo.map((category, index) => {
			return (
				<li key={category.id}>
					<NavLink
						exact to={"/posts/" + category.category}
						activeStyle={this.activeStyle}
					>
						{category.category} ({category.total_post})
					</NavLink>
				</li>
			);
		});
		return (
			<div>
				<ul>
					<li>
						<NavLink exact to="/" activeStyle={this.activeStyle}>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/posts"
							activeStyle={this.activeStyle}
						>
							posts
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/posts/category"
							activeStyle={this.activeStyle}
						>
							category
						</NavLink>
					</li>
					{list}
				</ul>
				<hr />
			</div>
		);
	}

	_getCategories = () => {
		axios
			.get("/posts/category/")
			.then(res => {
				this.setState({
					categoryInfo: res.data.category_info
				});
			})
			.catch(e => console.log(e));
	};
}

export default MenuBar;
