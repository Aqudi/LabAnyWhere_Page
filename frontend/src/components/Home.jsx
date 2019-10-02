import React, { useState, useEffect } from "react";

import PostDetail from "./PostDetail";

import axios from "axios";
import { textAlign } from "@material-ui/system";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const Home = () => {
	const [post, setPost] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:8000/post/Introduction")
			.then(res => {
				let data = res.data;
				data.title = "";
				setPost(data);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<div style={{textAlign:"center", lineHeight:"30pt"}}>
			<PostDetail post={post}/>
		</div>
	);
};

export default Home;
