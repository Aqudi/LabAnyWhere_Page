import React from "react";
import PostDetail from "./PostDetail";
import PostSummary from "./PostSummary";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
	{ id: "name", label: "제목", minWidth: 200 },
	{ id: "category", label: "카테고리", minWidth: 100 },
	{
		id: "Created at",
		label: "등록",
		minWidth: 120,
		align: "right",
		// format: value => value.toLocaleString()
	},
	{
		id: "Updated at",
		label: "업데이트",
		minWidth: 120,
		align: "right",
		// format: value => value.toLocaleString()
	}
];

function createData(name, category, created_at, updated_at) {
	return { name, category, created_at, updated_at };
}

const rows = [
	createData("첫글", "공지", "2019/9/30", "2019/9/30"),
	createData("2", "공지", "2019/9/30", "2019/9/30"),
	createData("3", "공지", "2019/9/30", "2019/9/30"),
	createData("4", "공지", "2019/9/30", "2019/9/30"),
	createData("5", "공지", "2019/9/30", "2019/9/30"),
	createData("6", "공지", "2019/9/30", "2019/9/30"),
	createData("7", "공지", "2019/9/30", "2019/9/30"),
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

const PostList = () => {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	// let list;
	// try {
	// 	const { posts } = this.props;
	// 	list = posts.map((post, index) => {
	// 		return <Post post={post} error="" key={post.id} />;
	// 	});
	// } catch (e) {
	// 	list = <Post post={{}} key={e} error="아직 등록된 글이 없습니다." />;
	// }
	return (
		<Paper classname={classes.table}>
			<div classname={classes.tableWrapper}>
				<Table Header>
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
					<TableBody></TableBody>
				</Table>
			</div>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					"aria-label": "previous page"
				}}
				nextIconButtonProps={{
					"aria-label": "next page"
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

PostList.propTypes = {
	posts: PropTypes.array
};

export default PostList;
