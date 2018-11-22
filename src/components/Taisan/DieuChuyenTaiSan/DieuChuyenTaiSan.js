import React, { Component } from 'react';
import './DieuChuyenTaiSan.css';
import { withRouter } from "react-router";
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]
class DieuChuyenTaiSan extends Component {
	
	render() {
		const { match } = this.props
		// console.log("match :" , match)
		return (
			<div>
				DieuChuyenTaiSan
				{getParentPath(match.url)}
			</div>
		);
	}
}

export default withRouter(DieuChuyenTaiSan);
