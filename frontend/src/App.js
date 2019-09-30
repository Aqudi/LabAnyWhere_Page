import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Board from "./components/Board";
import NotFound from "./components/NotFound";

import clsx from "clsx";
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
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import EcoIcon from "@material-ui/icons/Eco";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PeopleIcon from "@material-ui/icons/People";
import GetAppIcon from "@material-ui/icons/GetApp";

import axios from "axios";
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
	}
}));

const App = props => {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

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
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: mobileOpen
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerToggle}
							edge="start"
							className={clsx(
								classes.menuButton,
								mobileOpen && classes.hide
							)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Persistent drawer
						</Typography>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label="mailbox folders">
					<Hidden smUp implementation="css">
						<Drawer
							container={container}
							variant="temporary"
							anchor={
								theme.direction === "rtl" ? "right" : "left"
							}
							open={mobileOpen}
							classes={{
								paper: classes.drawerPaper
							}}
							ModalProps={{
								keepMounted: true // Better open performance on mobile.
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper
							}}
							variant="permanent"
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
				{/* <main
						className={clsx(classes.content, {
							[classes.contentShift]: open
						})}
					>
						<div className={classes.drawerHeader} /> */}
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{switchPart}
				</main>
			</div>
		</Router>
	);
};

export default App;
