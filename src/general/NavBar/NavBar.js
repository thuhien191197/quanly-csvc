
import React, { Component } from 'react';
// import './ThongKe.css';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom'
import { withRouter } from "react-router";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
const getParentPath = (path) => path.split('/').length > 0 && path.split('/').slice(0,3).join('/')

const styles = theme => ({
	appBar:{
		zIndex: "1",
		position: "fixed",
		top: "48px",
		left: "0",
		width: "100%",
		height: "4em",
		backgroundColor: "#efefef",
		/* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px, */
		color: "black",
		paddingLeft: "14%",
	},
	tabs:{
		marginTop: "4px",
		minHeight: "1px",
		// height: "38px",
	},
	titleLi:{
		// float: "left",
		fontSize: "1.0em",
		textTransform: "uppercase",
		paddingTop: "1em",
	},
	nav:{
		
	},
	nameDV:{
		marginLeft: "1em",
	}
});

class NavBar extends Component {
	 
	render() {
		const { match, classes, value, parentKey, navBar, title } = this.props
		// console.log("match :" , match)
		return (
			// <div>
			// 	NavBar
			// 	{getParentPath(match.url)}
			// </div>
			<AppBar className={classes.appBar} 
					position="static" color="default">
					<ul>
						<li className={classes.titleLi}>
							<i class="fas fa-list-ul"></i>
							<span className={classes.nameDV}>{title}</span>
						</li>
						<li className={classes.nav}>
							<Tabs
								
								value={value}
								onChange={this.handleChange}
								indicatorColor="primary"
								textColor="primary"
								// scrollable
								// scrollButtons="auto"
							>
								{parentKey.map((key, i) => {
									console.log("getParentPath(match.url):", getParentPath(match.url))
									return(
										<Link to={`${getParentPath(match.url)}${navBar[key].route}`}>
											<Tab className={classes.tabs} label={`${navBar[key].title}`} />
										</Link>
									)
								})}
								
							</Tabs>
						</li>
					</ul>
			</AppBar>
		);
	}
}

export default withStyles(styles)(NavBar)
