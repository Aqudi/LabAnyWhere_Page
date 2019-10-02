import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";

// material ui components
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
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
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const HeaderAndSideBar = memo(props => {
	const { container } = props;
	const classes = props.useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [categoryInfo, setCategoryInfo] = useState([]);

	const iconPathList = [
		[<HomeIcon />, "/"],
		[<DescriptionIcon />, "/posts"],
		[<AnnouncementIcon />, "/posts/notice"],
		[<EcoIcon />, "/posts/envs"],
		[<MenuBookIcon />, "/posts/lecture"],
		[<PeopleIcon />, "/people"],
		[<GetAppIcon />, "/posts/etc"]
	];

	const handleDrawerToggle = e => {
		setMobileOpen(!mobileOpen);
	};
	const handleDrawerClose = e => {
		setMobileOpen(false);
	};

	const getCategoryInfo = () => {
		axios
			.get("http://localhost:8000/posts/category")
			.then(res => {
				let data = [];
				["Home", "Posts"]
					.concat(res.data.category_list)
					.map((info, index) => {
						return data = [...data, [info, ...iconPathList[index]]];
					});
				setCategoryInfo(() => {
					console.log("set!");
					return data;
				});
			})
			.catch(e => {
				console.log(e);
			});
	};

	useEffect(() => {
		getCategoryInfo();
	}, [0]);

	const drawer = (
		<div>
			<Hidden xsDown implementation="css">
				<div className={classes.toolbar} />
			</Hidden>
			<Hidden smUp implementation="css">
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
			</Hidden>
			<Divider />
			<List>
				{categoryInfo.map((page, index) => (
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
	return (
		<>
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
						anchor={theme.direction === "rtl" ? "right" : "left"}
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
		</>
	);
});

export default HeaderAndSideBar;
