import React, { Component } from 'react';
// import './ThongKe.css';
import { withRouter } from "react-router";
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]
class EditUser extends Component {
	
	render() {
		const { match } = this.props
		// console.log("match :" , match)
		return (
			<div>
				EditUser
				{getParentPath(match.url)}
			</div>
		);
	}
}

export default withRouter(EditUser);
