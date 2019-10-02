import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const columns = [
	{ id: "number", label: "글번호", minWidth: 80, align: "left" },
	{ id: "name", label: "제목", minWidth: 200 },
	{ id: "category", label: "카테고리", minWidth: 100 },
	{
		id: "Created at",
		label: "등록",
		minWidth: 120,
		align: "right"
		// format: value => value.toLocaleString()
	},
	{
		id: "Updated at",
		label: "업데이트",
		minWidth: 120,
		align: "right"
		// format: value => value.toLocaleString()
	}
];

const date_to_format = data => {
	let format = new Date(data);
	// console.log(format);
	let year = format.getFullYear();
	let month = format.getMonth() + 1;
	if (month < 10) month = "0" + month;
	let date = format.getDate();
	if (date < 10) date = "0" + date;
	let hour = format.getHours();
	if (hour < 10) hour = "0" + hour;
	let min = format.getMinutes();
	if (min < 10) min = "0" + min;
	let sec = format.getSeconds();
	if (sec < 10) sec = "0" + sec;
	return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
};

function createData(id, name, category, c, u) {
	// let created_at = date_to_format(c);
	// let updated_at = date_to_format(u);
	let created_at = c;
	let updated_at = u;
	return { id, name, category, created_at, updated_at };
}

const rows = [
	createData(1, "첫글", "공지", "2019-9-30", "2019-9-30"),
	createData(2, "2", "공지", "2019-9-30", "2019-9-30"),
	createData(3, "3", "공지", "2019-9-30", "2019-9-30"),
	createData(4, "4", "공지", "2019-9-30", "2019-9-30"),
	createData(5, "5", "공지", "2019-9-30", "2019-9-30"),
	createData(6, "6", "공지", "2019-9-30", "2019-9-30"),
	createData(7, "7", "공지", "2019-9-30", "2019-9-30")
];

const useStyles = makeStyles({
	table: {
		width: "100%"
	},
	tableWrapper: {
		maxHeight: 407,
		overflow: false
	}
});

const PostList = props => {
	const classes = useStyles();

	const transformDataSet = () => {
		return props.posts.map((post, index) => {
			return createData(
				index,
				post.id,
				post.title,
				post.category,
				post.body,
				post.created_at,
				post.updated_at
			);
		});
	}

	const posts = useMemo(()=> {
		let list = transformDataSet();
		console.log(list);
		return list;
	} ,[props.posts])


	return (
		<>
			<div className={classes.tableWrapper}>
				<Paper className={classes.table}>
					<Table>
						<TableHead>
							<TableRow>
								{columns.map(column => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{posts.map(row => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.id}
									>
										{columns.map(column => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													align={column.align}
												>
													{column.format &&
													typeof value === "number"
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Paper>
			</div>
		</>
	);
};

PostList.propTypes = {
	posts: PropTypes.array
};

export default PostList;
