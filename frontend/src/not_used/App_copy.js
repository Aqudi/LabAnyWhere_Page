import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Home from "./pages/Home";
import Board from "./components/Board";
import HeaderAndSideBar from "./components/HeaderAndSideBar";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/styles";
import clsx from "clsx";
// import styles from "./style/styles";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";

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
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	hide: {
		display: "none"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	}
}));

const App = props => {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
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
						onClick={handleDrawerClose}
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
			<Route component={NoutFound} />
		</Switch>
	);

	return (
		<Router>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(
								classes.menuButton,
								open && classes.hide
							)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Persistent drawer
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					{drawer}
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					<Typography paragraph>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Rhoncus dolor purus non enim praesent
						elementum facilisis leo vel. Risus at ultrices mi tempus
						imperdiet. Semper risus in hendrerit gravida rutrum
						quisque non tellus. Convallis convallis tellus id
						interdum velit laoreet id donec ultrices. Odio morbi
						quis commodo odio aenean sed adipiscing. Amet nisl
						suscipit adipiscing bibendum est ultricies integer quis.
						Cursus euismod quis viverra nibh cras. Metus vulputate
						eu scelerisque felis imperdiet proin fermentum leo.
						Mauris commodo quis imperdiet massa tincidunt. Cras
						tincidunt lobortis feugiat vivamus at augue. At augue
						eget arcu dictum varius duis at consectetur lorem. Velit
						sed ullamcorper morbi tincidunt. Lorem donec massa
						sapien faucibus et molestie ac.
					</Typography>
				</main>
			</div>
		</Router>
	);
};

// class App extends Component {
// 	constructor(props) {
// 		super(props);
// 	}

// 	state = {
// 		mobildOpen: false
// 	};

// 	handleDrawerToggle = () => {
// 		this.setState(prevState => {
// 			return { mobileOpen: !prevState.mobileOpen };
// 		});
// 	};

// 	closeDrawer = () => {
// 		this.setState({ mobileOpen: false });
// 	};

// 	pageList = [
// 		["Home", <HomeIcon />, "/"],
// 		["Posts", <DescriptionIcon />, "/posts"],
// 		["Notice", <AnnouncementIcon />, "/posts/notice"],
// 		["envs", <EcoIcon />, "/posts/envs"],
// 		["lecture", <MenuBookIcon />, "/posts/lecture"],
// 		["people", <PeopleIcon />, "/posts/people"],
// 		["etc", <GetAppIcon />, "/posts/etc"]
// 	];

// 	drawer = (
// 		<div>
// 			<div className={this.props.classes.toolbar} />
// 			<Divider />
// 			<List>
// 				{this.pageList.map((page, index) => (
// 					// 0 : text, 1 : icon, 2 : path
// 					<ListItem
// 						button
// 						key={page[0]}
// 						component={Link}
// 						to={page[2]}
// 						onClick={this.closeDrawer}
// 					>
// 						<ListItemIcon>{page[1]}</ListItemIcon>
// 						<ListItemText primary={page[0]} />
// 					</ListItem>
// 				))}
// 			</List>
// 		</div>
// 	);

// 	render() {
// 		const { classes, theme, container } = this.props;
// 		const { mobileOpen } = this.state;
// 		return (
// 			<Router>
// 				<div className={classes.root}>
// 					{/* <HeaderAndSideBar /> */}
// 					<CssBaseline />
// 					<AppBar position="fixed" className={classes.appBar}>
// 						<Toolbar>
// 							<IconButton
// 								color="inherit"
// 								aria-label="open drawer"
// 								edge="start"
// 								onClick={this.handleDrawerToggle}
// 								className={classes.menuButton}
// 							>
// 								<MenuIcon />
// 							</IconButton>
// 							<Typography variant="h6" noWrap>
// 								Responsive drawer
// 							</Typography>
// 						</Toolbar>
// 					</AppBar>
// 					<nav
// 						className={classes.drawer}
// 						aria-label="mailbox folders"
// 					>
// 						{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
// 						<Hidden smUp implementation="css">
// 							<Drawer
// 								container={container}
// 								variant="temporary"
// 								anchor="left"
// 								open={mobileOpen}
// 								onClose={this.handleDrawerToggle}
// 								classes={{
// 									paper: classes.drawerPaper
// 								}}
// 								ModalProps={{
// 									keepMounted: true // Better open performance on mobile.
// 								}}
// 							>
// 								{this.drawer}
// 							</Drawer>
// 						</Hidden>
// 						<Hidden xsDown implementation="css">
// 							<Drawer
// 								classes={{
// 									paper: classes.drawerPaper
// 								}}
// 								variant="permanent"
// 								open
// 							>
// 								{this.drawer}
// 							</Drawer>
// 						</Hidden>
// 					</nav>
// 					<div className={clsx(classes.content, {
//           [classes.contentShift]: mobileOpen
// 	        })}>
// 						<div className={classes.toolbar} />
// 						<Switch>
// 							<Route exact path="/" component={Home} />
// 							<Route path="/posts/:category" component={Board} />
// 							<Route path="/posts" component={Board} />
// 							<Route component={NoutFound} />
// 						</Switch>
// 					</div>
// 				</div>
// 			</Router>
// 		);
// 	}
// }

export default App;
