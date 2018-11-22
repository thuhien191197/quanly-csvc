import React, { Component } from 'react';
import { withRouter } from "react-router";

// import './LoaiTaiSan.css';

const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[2]

class LoaiTaiSan extends Component {
	
	render() {
		const { match } = this.props
		console.log(">>>match :" , match)
		return (
			<div>
				Loai LoaiTaiSan		
				{getParentPath(match.url)}
			</div>
		);
	}
}

export default  withRouter(LoaiTaiSan);
