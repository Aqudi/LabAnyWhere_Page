import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Peoples from "./components/Peoples"
import Board from "./components/Board";
import NotFound from "./components/NotFound";

// material ui components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import axios from "axios";
import HeaderAndSideBar from "./components/HeaderAndSideBar";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none"
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	}
}));

const App = props => {
	const classes = useStyles();
	// const theme = useTheme();

	const switchPart = (
		<Switch>
			<Route exact path="/people" component={Peoples}/>
			<Route exact path="/" component={Home} />
			<Route path="/posts/:category" component={Board} />
			<Route path="/posts" component={Board} />
			<Route component={NotFound} />
		</Switch>
	);

	return (
		<Router>
			<div className={classes.root}>
				<CssBaseline />
				<HeaderAndSideBar useStyles={useStyles} />
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{switchPart}
				</main>
			</div>
		</Router>
	);
};

export default App;
