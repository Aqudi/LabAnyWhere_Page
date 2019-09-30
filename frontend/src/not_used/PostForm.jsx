import React, { Component } from "react";

class PostForm extends Component {
    state = {
        title: this.props.title,
        body: this.props.body,
    };

	render() {
        const {title, body} = this.state;
		return (
			<div className="post-form">
				<label>
					title:
					<input
						type="text"
						value={title}
						onChange={this._handleChangeTitle}
					/>
				</label>
				<label>
					body:
					<input
						type="text"
						value={body}
						onChange={this._handleChangeBody}
					/>
				</label>
				<button onClick={this._handleSubmit}>submit</button>
			</div>
		);
    }
    _handleChangeTitle = event => {
		console.log("title");
		this.setState({ title: event.target.title });
	};
	_handleChangeBody = event => {
		console.log("body");
		this.setState({ body: event.target.body });
	};

	_handleSubmit = () => {
		const { title, body } = this.state;
		axios
			.post("/post/", { title: title, body: body })
			.then(res => this._renderText());
	};
}

export default PostForm;
