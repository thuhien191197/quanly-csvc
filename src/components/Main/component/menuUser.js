
import React, { Component } from 'react';
// import './VanBanMau.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class menuUser extends Component {
	state = {
		anchorEl: null,
    	mobileMoreAnchorEl: null,
	};
	render() {
		const { anchorEl, mobileMoreAnchorEl } = this.state;
		const isMenuOpen = Boolean(anchorEl);
		return (
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}
			>
				<MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
				<MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
			</Menu>
		);
	}
}

export default menuUser;
