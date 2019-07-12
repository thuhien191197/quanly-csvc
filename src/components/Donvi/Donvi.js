

import React, { Component } from 'react';
import './Donvi.css';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom'
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import DanhSachTaiSan from './component/DanhSachTaiSan/DanhSachTaiSan';
import QuanLyPhong from './component/QuanLyPhong/QuanLyPhong';
import NavBar from '../../general/NavBar/NavBar';
import AddPhong from './component/QuanLyPhong/component/AddPhong/AddPhong';
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[2]
const getParentPathTitle = (path) => path.split('/').length > 0 && path.split('/')[1]
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

class Donvi extends Component {
	state = {
		value: 0,
		navBar : {
			danhsachTS:{
				route:"/danhsachtaisan",
				title: "Danh sách tài sản",
				component: "DanhSachTaiSan",
				messageId : "donvi.navBar.danhsachtaisan"
			},
			quanlyPhong:{
				route:"/quanlyphong",
				title: "Quản lý Phòng",
				component: "QuanLyPhong",
				messageId : "donvi.navBar.quanlyphong"
			}
		}
	}
	render() {
		const { match, classes } = this.props
		console.log("[Don vi] match :" , match)
		const { value, navBar } = this.state;
		// console.log("[DonVi] navBar:",navBar)
		const parentKey = Object.keys(navBar)

		const title = getParentPath(match.url)
		console.log("[DonVi] getParentPathTitle(match.url):",getParentPathTitle(match.url))
		// if(title !== ""){
		// 	title = getParentPathTitle(match.url)
		// }
		return (
			<div>
				{/* <AppBar className={classes.appBar} 
					position="static" color="default">
					<ul>
						<li className={classes.titleLi}>
							<i class="fas fa-list-ul"></i>
							<span className={classes.nameDV}>Khoa Công nghệ thông tin</span>
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
									return(
										<Link to={`${getParentPath(match.url)}${navBar[key].route}`}>
											<Tab className={classes.tabs} label={`${navBar[key].title}`} />
										</Link>
									)
								})}
								
							</Tabs>
						</li>
					</ul>
				</AppBar> */}
				<NavBar 
					match={match}
					classes={classes}
					value={value}
					parentKey={parentKey}
					navBar={navBar}
					title= {title}

				/>
				{/* aBC
				{getParentPath(match.url)} */}
				{/* const { match, classes, value, parentKey } = this.props */}
				<Switch>
					<Route exact path="/donvi/:name/danhsachtaisan" render={() => <DanhSachTaiSan />}></Route>
 					<QuanLyPhong />
				</Switch>
				
			</div>
		);
	}
}

export default withStyles(styles)(withRouter(Donvi))