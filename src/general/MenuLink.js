import React, { Component } from 'react';
import './MenuLink.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class MenuLink extends Component {
	render() {
		const {label, to, activeOnlyWhenExact, nameIcon, className } = this.props
		return (
			<Route
				path={to}
				exact={activeOnlyWhenExact}
				children={({ match }) => (
				<div className={match ? "active" : ""}>
					{/* {match ? "> " : ""} */}
					<Link className={className} to={to}>
						<i className={nameIcon}></i>
						<em>{label}</em>
					</Link>
				</div>
				)}
				
		  	/>
		);
	}
}

export default MenuLink;
