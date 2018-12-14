import React, { Component } from 'react';
// import './ThongKe.css';
import { withRouter } from "react-router";
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]
class SelectThanhLyNhieu extends Component {
	
	render() {
		const { match } = this.props
		// console.log("match :" , match)
		return (
			<div>
				{/* SelectThanhLyNhieu */}
				{/* {getParentPath(match.url)} */}
			</div>
		);
	}
}

export default withRouter(SelectThanhLyNhieu);
