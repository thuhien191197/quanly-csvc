import React, { Component } from 'react';
import './Donvi.css';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[2]
class Donvi extends Component {
	
	render() {
		const { match } = this.props
		console.log("[Don vi] match :" , match)
		return (
			<div>
				{getParentPath(match.url)}
				Don vi
			</div>
		);
	}
}

export default withRouter(Donvi);
