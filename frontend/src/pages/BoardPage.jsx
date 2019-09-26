import React, { Component } from "react";
import Board from '../components/Board'

class BoardPage extends Component {
    state = {
        category : ""
    }

    componentDidMount() {
        this.setState({category: this.props.category})
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.category !== prevState.category){
            return {category: nextProps.category}
        }
        return null;
    }
    

	render() {
        console.log("BoardPage Rendering...")
		// console.log("state > \n", this.state)
		// console.log("props > \n", this.props)
		return (
			<>
                <Board category={this.state.category}></Board>
			</>
		);
    }
}

export default BoardPage;
