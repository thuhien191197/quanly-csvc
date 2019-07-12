import React, { Component } from 'react';
import { withRouter } from "react-router";

class Message extends Component {
	constructor(props) {
		super(props);
		this.state = {
			en: {
				'nav.dashboard' : "Hiền"
			},
			ja: {
				'nav.dashboard' : "TEO"
			}
		};
	}
	render() {
		return (
			<div>
			</div>
		);
	}
}

export default withRouter(Message);
