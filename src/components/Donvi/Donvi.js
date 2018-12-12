// import React, { Component } from 'react';
// import './Donvi.css';
// import PropTypes from "prop-types";
// import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom'
// import { withRouter } from "react-router";
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import DanhSachTaiSan from './component/DanhSachTaiSan/DanhSachTaiSan';
// import QuanLyPhong from './component/QuanLyPhong/QuanLyPhong';
// const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[2]

// const styles = theme => ({
// 	appBar:{
// 		zIndex: "1",
// 		position: "fixed",
// 		top: "48px",
// 		left: "0",
// 		width: "100%",
// 		height: "4em",
// 		backgroundColor: "#efefef",
// 		/* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px, */
// 		color: "black",
// 		paddingLeft: "14%",
// 	},
// 	tabs:{
// 		marginTop: "4px",
// 		minHeight: "1px",
// 		// height: "38px",
// 	},
// 	titleLi:{
// 		// float: "left",
// 		fontSize: "1.0em",
// 		textTransform: "uppercase",
// 		paddingTop: "1em",
// 	},
// 	nav:{
		
// 	},
// 	nameDV:{
// 		marginLeft: "1em",
// 	}
// });
// class TabContainer extends Component {
// 	render(){

// 		return(
// 			<Typography component="div" style={{ padding: 8 * 3 }}>
// 				ahihi
// 			</Typography>
// 		)
// 	}
// }


// class Donvi extends Component {
// 	state = {
// 		value: 0,

// 		navBar : {
// 			danhsachTS:{
// 				route:"",
// 				title: "Danh sách tài sản",
// 				component: "DanhSachTaiSan"
// 			},
// 			quanlyPhong:{
// 				route:"/quanlyphong",
// 				title: "Quản lý Phòng",
// 				component: "QuanLyPhong"
// 			}
// 		}

// 	}
// 	handleChange = (event, value) => {
// 		this.setState({ value });
// 	  };
// 	render() {
// 		const { match, classes } = this.props
// 		console.log("[Don vi] match :" , match)
// 		const { value, navBar } = this.state;
// 		// console.log("[DonVi] navBar:",navBar)
// 		const parentKey = Object.keys(navBar)
// 		return (
// 			<div>
// 				<AppBar className={classes.appBar} 
// 					position="static" color="default">
// 					<ul>
// 						<li className={classes.titleLi}>
// 							<i class="fas fa-list-ul"></i>
// 							<span className={classes.nameDV}>Khoa Công nghệ thông tin</span>
// 						</li>
// 						<li className={classes.nav}>
// 							<Tabs
								
// 								value={value}
// 								onChange={this.handleChange}
// 								indicatorColor="primary"
// 								textColor="primary"
// 								// scrollable
// 								// scrollButtons="auto"
// 							>
// 								{parentKey.map((key, i) => {
// 									return(
// 										<Link to={`${getParentPath(match.url)}${navBar[key].route}`}>
// 											<Tab className={classes.tabs} label={`${navBar[key].title}`} />
// 										</Link>
// 									)
// 								})}
								
// 							</Tabs>
// 						</li>
// 					</ul>
// 				</AppBar>
// 				<Switch>
// 					<Route path="/donvi" exact component={() => <Donvi />}></Route>
// 					<Route exact path="/donvi/:name" component={() => <DanhSachTaiSan />}></Route>
// 					<Route exact path="/donvi/:name/quanlyphong" render={() => <QuanLyPhong />} />
// 					{/* <Route exact path="/taisan/Thanh lý" render={() => <ThanhLy />} />
// 					<Route exact path="/taisan/Thống kê" render={() => <ThongKe />} />
// 					<Route exact path="/taisan/edit/:id" component={() => <EditTS editTs={this.editTs} />}></Route> */}
// 				</Switch>
			

// 			</div>
// 		);
// 	}
// }

// export default withStyles(styles)(withRouter(Donvi));



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
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[2]

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
				component: "DanhSachTaiSan"
			},
			quanlyPhong:{
				route:"/quanlyphong",
				title: "Quản lý Phòng",
				component: "QuanLyPhong"
			}
		}
	}
	render() {
		const { match, classes } = this.props
		console.log("[Don vi] match :" , match)
		const { value, navBar } = this.state;
		// console.log("[DonVi] navBar:",navBar)
		const parentKey = Object.keys(navBar)
		return (
			<div>
				<AppBar className={classes.appBar} 
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
				</AppBar>
				<Switch>
					<Route exact path="/donvi/:name/danhsachtaisan" render={() => <DanhSachTaiSan />}></Route>
// 					<Route exact path="/donvi/:name/quanlyphong" render={() => <QuanLyPhong />}></Route>
				</Switch>
				aBC
				{getParentPath(match.url)}
			</div>
		);
	}
}

export default withStyles(styles)(withRouter(Donvi))