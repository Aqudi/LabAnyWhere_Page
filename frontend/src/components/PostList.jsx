import React, { Component } from "react";
import Post from "./Post";

import PropTypes from "prop-types";

class PostList extends Component {
	render() {
		let list;
		try {
			const { posts } = this.props;
			list = posts.map((post, index) => {
				return <Post post={post} error="" key={post.id} />;
			});
		} catch (e) {
			list = (
				<Post post={{}} key={e} error="아직 등록된 글이 없습니다." />
			);
		}
		return (
			<>
				{list}
				<hr></hr>
			</>
		);
	}
}

PostList.propTypes = {
	posts: PropTypes.array
};

export default PostList;
