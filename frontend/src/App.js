import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Board from "./components/Board";
import MenuBar from "./components/MenuBar";

import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<>
					<MenuBar />
					<Route exact path="/" component={Home} />
					<Route exact path="/posts" component={Board} />
					<Switch>
						<Route
							exact
							path="/posts/:category"
							render={props => {
								// console.log(props.match.params.category);
								return (
									<Board
										category={props.match.params.category}
									/>
								);
							}}
						/>
					</Switch>
				</>
			</BrowserRouter>
		);
	}
}

export default App;
