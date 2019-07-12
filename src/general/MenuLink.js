import React, { Component } from 'react';
import './MenuLink.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";

class MenuLink extends Component {
	render() {
		const {label, to, activeOnlyWhenExact, nameIcon, className, match, location } = this.props
		// console.log('Match', match, to, location )
		const  locationPn = location && location.pathname
		const toPn = to && to.pathname
		// console.log('isEqual', locationPn === toPn)
		return (
			<div className={locationPn === toPn ? "active" : ""}>
				{/* {match ? "> " : ""} */}
				<Link className={className} to={to}>
					<i className={nameIcon}></i>
					{/* <em>{label}</em> */}
					<em><FormattedMessage id={label} defaulMesage={label} /></em>
				</Link>
			</div>
		);
	}
}

export default withRouter(MenuLink);
