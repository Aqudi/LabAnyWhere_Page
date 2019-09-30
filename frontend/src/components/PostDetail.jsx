import React, { Component } from "react";

import PropTypes from "prop-types";

class PostDetail extends Component {
	state = {}

	componentDidMount() {
		const {
			title,
			body,
			created_at,
			updated_at,
			category
		} = this.props.post;

		this.setState({
			title: title,
			body: body,
			created_at: created_at,
			updated_at: updated_at,
			category: category
		});
	}

	render() {
		const { error } = this.props;
		if( error ) {
			return <> <h1>{error}</h1> </>
		} 

		const { title, body, created_at, updated_at, category } = this.state;
		return (
			<>
				<h3>제목: {title}</h3>
				<h4>카테고리: {category}</h4>
				<p>
					created_at: {created_at} / updated_at: {updated_at}
				</p>
				<p>내용: {body}</p>
			</>
		);
	}
}

PostDetail.propTypes = {
	post: PropTypes.object.isRequired
};

export default PostDetail;
