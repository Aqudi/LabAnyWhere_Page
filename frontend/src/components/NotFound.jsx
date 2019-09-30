import React, {Component} from "react";
import { Link } from  "react-router-dom";

class NotFound extends Component {
	render() {
		return (
			<>
				<h1>404 Not Found</h1>
				<Link to="/">Back to home</Link>
			</>
		);
	}
}

export default NotFound;