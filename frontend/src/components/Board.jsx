import React, { Component } from "react";
import PostList from "./PostList";

import PropTypes from "prop-types";
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const isIterable = variable => {
	return variable !== null && Symbol.iterator in Object(variable);
};

class Board extends Component {
	state = {
		textList: [],
		category: ""
	};

	componentDidMount() {
		console.log("Board ComponentDidMount");
		this._getPosts(this.props.match.params.category);
	}

	componentDidUpdate(prevProps) {
		console.log("Board ComponentDidUpdate");
		if (
			this.props.match.params.category !== prevProps.match.params.category
		) {
			this._getPosts(this.props.match.params.category);
		}
	}

	componentWillUnmount() {
		console.log("Board ComponentWillUnMount");
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		console.log("Board getDerivedStateFromProps");
		if (nextProps.match.params.category !== prevState.category) {
			return {
				category: nextProps.match.params.category
			};
		}
		return null;
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log("Board shouldComponentUpdate");
		if (nextProps.match.params.category === nextState.category) {
			return true;
		}
		return false;
	}

	render() {
		console.log("Board Rendering...");
		// console.log("state > \n", this.state);
		// console.log("props > \n", this.props);
		const { textList } = this.state;
		console.log("textList", textList)
		const { category } = this.props.match.params;
		return (
			<>
				<div>
					<h1>게시판 : {category ? category : "All"}</h1>
				</div>
				<PostList posts={textList}></PostList>
			</>
		);
	}

	_getPosts = (category = "") => {
		console.log("get Post Method 실행");
		let URL;
		if (category) {
			URL = `/posts/${category}`;
		} else {
			URL = `/posts/`;
		}
		let data = [];
		axios
			.get(URL)
			.then(res => {
				console.log("End Point: ", URL);
				console.log(data);
				if (!isIterable(res.data)) {
					data = [res.data];
				} else {
					data = [...res.data];
				}
				// console.log(data);
				this.setState({ textList: data });
			})
			.catch(err => console.log(err));

		return data;
	};
}

Board.propTypes = {
	category: PropTypes.string
};

export default Board;
