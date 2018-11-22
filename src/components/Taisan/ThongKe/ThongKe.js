import React, { Component } from 'react';
import './ThongKe.css';
import { withRouter } from "react-router";
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]
class ThongKe extends Component {
	
	render() {
		const { match } = this.props
		// console.log("match :" , match)
		return (
			<div>
				ThongKe
				{getParentPath(match.url)}
			</div>
		);
	}
}

export default withRouter(ThongKe);
