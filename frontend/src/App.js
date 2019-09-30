import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Board from "./components/Board";
import NotFound from "./components/NotFound";

import clsx from "clsx";

// material ui components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import EcoIcon from "@material-ui/icons/Eco";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PeopleIcon from "@material-ui/icons/People";
import GetAppIcon from "@material-ui/icons/GetApp";

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
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const pageList = [
		["Home", <HomeIcon />, "/"],
		["Posts", <DescriptionIcon />, "/posts"],
		["Notice", <AnnouncementIcon />, "/posts/notice"],
		["envs", <EcoIcon />, "/posts/envs"],
		["lecture", <MenuBookIcon />, "/posts/lecture"],
		["people", <PeopleIcon />, "/posts/people"],
		["etc", <GetAppIcon />, "/posts/etc"]
	];

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{pageList.map((page, index) => (
					// 0 : text, 1 : icon, 2 : path
					<ListItem
						button
						key={page[0]}
						component={Link}
						to={page[2]}
						onClick={handleDrawerToggle}
					>
						<ListItemIcon>{page[1]}</ListItemIcon>
						<ListItemText primary={page[0]} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const switchPart = (
		<Switch>
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
