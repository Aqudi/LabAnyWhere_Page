import React, { Component } from "react";
import { MarkdownPreview } from "react-marked-markdown";

import PropTypes from "prop-types";

class PostDetail extends Component {
	render() {
		const { post } = this.props;
		return (
			<div>
				<h1>{post.title}</h1>
				<MarkdownPreview value={post.body} />
			</div>
		);
	}
}

PostDetail.propTypes = {
	post: PropTypes.object.isRequired
};

export default PostDetail;
