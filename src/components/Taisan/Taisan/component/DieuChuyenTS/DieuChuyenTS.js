import React, { Component } from 'react';
// import './DieuChuyenTaiSan.css';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
	  display: 'flex',
	  justifyContent: 'center',
	  flexWrap: 'wrap',
	  padding: theme.spacing.unit / 2,
	},
	chip: {
	  margin: theme.spacing.unit / 2,
	},
});

class DieuChuyenTS extends Component {
	state = {

	};

	render() {
		const { classes } = this.props;
		return (
			<>
			I'm DieuChuyenTS
			</>
		);
	}
}

export default withStyles(styles)(withRouter(DieuChuyenTS));
