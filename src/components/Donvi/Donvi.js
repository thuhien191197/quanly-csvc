import React, { Component } from 'react';
import './Donvi.css';
import PropTypes from "prop-types";
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]
class Donvi extends Component {
	
	render() {
		const { match } = this.props
		console.log("match :" , match)
		return (
			<div>
				{getParentPath(match.url)}
			</div>
		);
	}
}

export default Donvi;
