import React, { Component } from 'react';
import './ThanhLy.css';
import { withRouter } from "react-router";
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]
class ThanhLy extends Component {
	
	render() {
		const { match } = this.props
		// console.log("match :" , match)
		return (
			<div>
				ThanhLy
				{getParentPath(match.url)}
			</div>
		);
	}
}

export default withRouter(ThanhLy);
