import React, { Component } from 'react';
// import './QuanLyPhong.css';
import { withRouter } from "react-router";
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]
class QuanLyPhong extends Component {
	
	render() {
		const { match } = this.props
		// console.log("match :" , match)
		return (
			<div>
				QuanLyPhong
				{getParentPath(match.url)}
			</div>
		);
	}
}

export default withRouter(QuanLyPhong);
