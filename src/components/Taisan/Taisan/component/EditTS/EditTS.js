import React, { Component } from 'react';
import { withRouter } from "react-router";
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]

class EditTS extends Component {
	render() {
		const { match, item } = this.props
		console.log("[Edit TS] match :" , match, item[match.params.id])
		return (
			<div>
				EditTS
				{getParentPath(match.url)}
			</div>
		);
	}
}

export default withRouter(EditTS);
