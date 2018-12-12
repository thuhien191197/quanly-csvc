import React, { Component } from 'react';
import { withRouter } from "react-router";
import _ from 'lodash';
import './Main.css';
import axios from 'axios'
import Content from "../Content/Content";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MenuLink from "../../general/MenuLink";
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuItemAvatar from '@material-ui/core/MenuItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';

const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[1]

const styles = theme => ({
	margin: {
		margin: theme.spacing.unit * (-5),
		color: "white",
		marginBottom: '-8px'
	},
	padding: {
	  	padding: `0 ${theme.spacing.unit * 2}px`,
	},
	avatar:{
		marginTop: "-4px"
	},
	menuItems:{
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
		// position: 'relative',
		overflowX: 'auto',
		wordBreak: "break-word",
		maxHeight: 300,
		// marginLeft: '-70px'
		width: '100%',
		maxWidth: 360,
		opacity: "1",
	},
	popperUser:{
		marginLeft: '-144px'
	}
});

export const resource = {
	user:[],
	role:[],
	danhmuc:[],
	loaitaisan:[],
	donvi:[],
	phong:[],
	nguonkinhphi:[],
	taisan:[],
	chuyentaisan:[],
	thanhly:[],
}

const editContextTS = () => {};
const addContextTS = () => {};
const deleteContextTS = () => {};
const addContextDC = () => {};
const addContextUser = () => {};
const deleteContextUser = () => {};
const editContextUser = () => {};

// Creact Context
export const QLCSVCContext = React.createContext(
	resource,
	editContextTS,
	addContextTS,
	deleteContextTS,
	addContextDC,
	addContextUser,
	deleteContextUser,
	editContextUser
);



class Main extends Component {

	state = {
		resource: {
			user: resource.user,
			role: resource.role,
			danhmuc: resource.danhmuc,
			loaitaisan:resource.loaitaisan,
			donvi:resource.donvi,
			phong:resource.phong,
			nguonkinhphi:resource.nguonkinhphi,
			taisan:resource.taisan,
			chuyentaisan:resource.chuyentaisan,
			thanhly:resource.thanhly,
		},

		sidebar : {
			home:{
				id: 0,
				name: "Home",
				route: '/home',
				isOpen: false,
				icon:'fa fa-home',
				children: {}
			},
			user:{
				id: 1,
				name: "User",
				route: '/user',
				isOpen: false,
				icon:'fa fa-user',
				children: {}
			},
			donvi:{
				id: 2,
				name: "Đơn vị",
				route: '/donvi',
				isOpen: false,
				icon:'fas fa-landmark',
				children: {
					icon:'fas fa-angle-right',
				}
			},
			danhmuc:{
				id: 3,
				name: "Danh mục",
				route: '/danhmuc',
				isOpen: false,
				icon:'fas fa-list-ul',
				children: {
					icon:'fas fa-angle-right',
					quanlydanhmuc:{
						name: 'Quản Lý Danh Mục',
						route: '/quanlydanhmuc',
					},
					nguonkinhphi:{
						name: 'Nguồn Kinh Phí',
						route: '/nguonkinhphi',
					},
				}
			},
			taisan:{
				id: 4,
				name: "Tài sản",
				route: '/taisan',
				isOpen: false,
				icon:'fas fa-warehouse',
				children: {
					icon:'fas fa-angle-right',
					taisan:{
						name: 'Tài Sản',
						route: 'taisan',
					},
					dieuchinhtaisan:{
						name: 'Danh sách điều chuyển',
						route: 'Danh sách điều chuyển',
					},
					thanhly:{
						name: 'Thanh Lý',
						route: 'Thanh lý',
					},
					thongke:{
						name: 'Thống Kê',
						route: 'Thống kê',
					},
				}
			},
			kehoach:{
				id: 5,
				name: "Kế hoạch",
				route: 'kehoach',
				isOpen: false,
				icon:'fas fa-book',
				children: {}
			}
		},
		open: false,

	};
	// -------------- TÀI SẢN 
	editContextTS = (item) => {
		// console.log('Edit Item context', this.state.resource.taisan);
		this.setState(prev => {
			const newTaiSan = [...prev.resource.taisan];
			// console.log('[Main] newTaiSan:',newTaiSan );
			const changeIndex = _.findIndex(newTaiSan, {id: item.id})
			newTaiSan[changeIndex] = item;

			console.log('Edit context', {
				...prev.resource,
				taisan: newTaiSan,
			});

			return {
				resource: {
					...prev.resource,
					taisan: newTaiSan,
				}
			}
		})
	}
	
	addContextTS = (item) => {
		this.setState(prev =>{
			const newTaiSan = [...prev.resource.taisan];
			newTaiSan.push(item);
			console.log('[Main] newTaiSan:',newTaiSan );
			return {
				resource: {
					...prev.resource,
					taisan: newTaiSan
				}
			}
		})
	}

	deleteContextTS = (item) => {
		this.setState(prev =>{
			return {
				resource: {
					...prev.resource,
					taisan: item
				}
			}
		})
	}

	// -------------- ĐIỀU CHUYỂN
	addContextDC = (item) => {
		this.setState(prev =>{
			const newDieuChuyen = [...prev.resource.chuyentaisan];
			newDieuChuyen.push(item);
			console.log('[Main] newDieuChuyen:',newDieuChuyen );
			return {
				resource: {
					...prev.resource,
					chuyentaisan: newDieuChuyen
				}
			}
		})
	}
	// -------------- User
	addContextUser = (item) => {
		this.setState(prev =>{
			const newUser = [...prev.resource.user];
			newUser.push(item);
			console.log('[Main] newUser:',newUser );
			return {
				resource: {
					...prev.resource,
					user: newUser
				}
			}
		})
	}

	deleteContextUser = (item) => {
		this.setState(prev =>{
			return {
				resource: {
					...prev.resource,
					user: item
				}
			}
		})
	}

	editContextUser = (item) => {
		// console.log('Edit Item context', this.state.resource.taisan);
		this.setState(prev => {
			const newUser = [...prev.resource.user];
			// console.log('[Main] newUser:',newUser );
			const changeIndex = _.findIndex(newUser, {id: item.id})
			newUser[changeIndex] = item;

			// console.log('Edit context', {
			// 	...prev.resource,
			// 	user: newUser,
			// });

			return {
				resource: {
					...prev.resource,
					user: newUser,
				}
			}
		})
	}
	
	


	addChildren(key, children) {
		const childrenObj = Object.assign({}, children)
		this.setState(({sidebar}) => ({
			sidebar: {
				...sidebar,
				[key]: {
					...sidebar[key],
					children: {
						...sidebar[key].children,
						...childrenObj,
					},
				}
			}
		})
	)}

	addResource(key, children) {
		this.setState(({resource}) => ({
			resource: {
				...resource,
				[key]: children
			}
		})
	)}




	async componentDidMount () {
		// Handle silebar clicked
		const { location } = this.props
		const parentId = getParentPath(location.pathname)
		// console.log("location:",location)
		// console.log("parentId:",parentId)
		this.toggleDropdown(parentId)
		
		// Handle Axios
		const user = await axios.get('http://localhost:5500/user')
		const role = await axios.get('http://localhost:5500/role')
		const donvi = await axios.get('http://localhost:5500/donvi')
		const danhmuc = await axios.get('http://localhost:5500/danhmuc')
		const phong = await axios.get('http://localhost:5500/phong')
		const chuyentaisan = await axios.get('http://localhost:5500/chuyentaisan')
		const thanhly = await axios.get('http://localhost:5500/thanhly')
		const taisan = await axios.get('http://localhost:5500/taisan')
		const loaitaisan = await axios.get('http://localhost:5500/loaitaisan')
		const nguonkinhphi = await axios.get('http://localhost:5500/nguonkinhphi')
	
		
		// Add Children
		this.addChildren('donvi', donvi.data);
		this.addChildren('danhmuc', danhmuc.data);
		
		// Add Resource
		this.addResource('user', user.data);
		this.addResource('role', role.data);
		this.addResource('danhmuc', danhmuc.data);
		this.addResource('loaitaisan', loaitaisan.data);
		this.addResource('donvi', donvi.data);
		this.addResource('phong', phong.data);
		this.addResource('nguonkinhphi', nguonkinhphi.data);
		this.addResource('taisan', taisan.data);
		this.addResource('chuyentaisan', chuyentaisan.data);
		this.addResource('thanhly', thanhly.data);
	}
	
	toggleDropdown = (key) => {
		var { sidebar } = this.state
		if(!key){
			return
		}
		sidebar[key].isOpen = !sidebar[key].isOpen
		this.setState({
			sidebar: sidebar
		})
		
	}

	//---- menu user
	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	  };
	
	  handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
		  return;
		}
	
		this.setState({ open: false });
	  };
	
	render() {
		var {sidebar} = this.state;
		const {classes } = this.props
		const parentKey = Object.keys(sidebar) // ['donvi', 'danhmuc']
		
		
		return (
			<div className="s-layout">
				<div className="s-layout__sidebar">
					<div className="s-sidebar__trigger" href="#0">
						<i className="fa fa-bars"></i>
						<ul className="pull-right">
							{/* Thông báo và avatar */}
							<li className="rad-dropdown no-color bell">
								<IconButton aria-label="4 pending messages" 
									className={classes.margin}
									buttonRef={node => {
										this.anchorEl = node;
									}}
									aria-owns={this.state.open ? 'menu-list-grow' : undefined}
									aria-haspopup="true"
									onClick={this.handleToggle}
								>
									<Badge badgeContent={4} color="primary">
										<NotificationsIcon />
									</Badge>
								</IconButton>

								<Popper 
									open={this.state.open} 
									anchorEl={this.anchorEl} 
									transition disablePortal
									placement="bottom-end"
									className={classes.popperUser}
								>
									{({ TransitionProps, placement }) => (
									<Grow
										{...TransitionProps}
										id="menu-list-grow"
										className={classes.popperUser}
										style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
									>
										<Paper>
										<ClickAwayListener onClickAway={this.handleClose}>
											<List dense className={classes.menuItems}>
												<ListItem onClick={this.handleClose}>
													<ListItemAvatar>
														<Avatar
															alt={`Avatar`}
															src="https://farm2.staticflickr.com/1738/42575021701_788f8b74b0_z.jpg"
														/>
													</ListItemAvatar>
													<ListItemText primary={`Line item 1ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss`} />
												</ListItem>
												<ListItem onClick={this.handleClose}>
													<ListItemAvatar>
														<Avatar
															alt={`Avatar`}
															src="https://farm2.staticflickr.com/1738/42575021701_788f8b74b0_z.jpg"
														/>
													</ListItemAvatar>
													<ListItemText primary={`Line item 1ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss`} />
												</ListItem>
												<ListItem onClick={this.handleClose}>
													<ListItemAvatar>
														<Avatar
															alt={`Avatar`}
															src="https://farm2.staticflickr.com/1738/42575021701_788f8b74b0_z.jpg"
														/>
													</ListItemAvatar>
													<ListItemText primary={`Line item 1ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss`} />
												</ListItem>
												<ListItem onClick={this.handleClose}>
													<ListItemAvatar>
														<Avatar
															alt={`Avatar`}
															src="https://farm2.staticflickr.com/1738/42575021701_788f8b74b0_z.jpg"
														/>
													</ListItemAvatar>
													<ListItemText primary={`Line item 1ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss`} />
												</ListItem>
												<ListItem onClick={this.handleClose}>
													<ListItemAvatar>
														<Avatar
															alt={`Avatar`}
															src="https://farm2.staticflickr.com/1738/42575021701_788f8b74b0_z.jpg"
														/>
													</ListItemAvatar>
													<ListItemText primary={`Line item 1ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss`} />
												</ListItem>
											</List>
										</ClickAwayListener>
										</Paper>
									</Grow>
									)}
								</Popper>


							</li>
							<li className="rad-dropdown no-color">
								<Avatar  alt="IMG_0432 - 3x4" src="https://farm2.staticflickr.com/1738/42575021701_788f8b74b0_z.jpg" className={classes.avatar} />
							</li>
						</ul>
						
						
					</div>
					
					<nav className="s-sidebar__nav" id="style-4">
						<div className="force-overflow"></div>
						<div className="s-sidebar__nav-avartar">
							<img className="s-sidebar__nav-avartar-image" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Logo_dhbkdn.jpg"  />
							{/* style={{width:'55px', height:'55px' }} */}
							<span className="s-sidebar__nav-avartar-csvc">Quản Lý Cơ sở vật chất</span>
							
						</div>
						{/* List SideBar */}
						<ul>
							{parentKey.map((key, i) => {
								const childrenKeys = Object.keys(sidebar[key].children) //{ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…} }
								
								return(
									<li key={i}>
										<div onClick={() => this.toggleDropdown(key)}>
											<MenuLink className="s-sidebar__nav-link" to={`/${key}`} label={`${sidebar[key].name}`} nameIcon={`${sidebar[key].icon}`} />
										</div>
										{childrenKeys!== null
										?
											sidebar[key].isOpen ?
												<ul>
													{childrenKeys.map((keyChild, idChild) => {
														// console.log("[SideBar] childrenKeys:",childrenKeys);
														// console.log("[SideBar] sidebar[key][keyChild].name:",sidebar[key].children[keyChild].name);
														return (
															keyChild!=='icon'
															?
															<li className="li" key={idChild}>
																{key !== sidebar[key].children[keyChild].route
																?
																	<MenuLink className="s-sidebar__nav-linksub" to={{
																		pathname: '/'+ key + '/' + sidebar[key].children[keyChild].name,
																	}} label={`${sidebar[key].children[keyChild].name}`} nameIcon={`${sidebar[key].icon}`} />
																:
																	<MenuLink className="s-sidebar__nav-linksub" to={{
																		pathname: '/'+ key,
																	}} label={`${sidebar[key].children[keyChild].name}`} nameIcon={`${sidebar[key].icon}`} />
																}
																
															
															</li>
															:
															''
													)})}
												</ul>
											:
											''
										:
										''
										}
									</li>
								)
							})}
						</ul>
						{/* End List SideBar */}

					</nav>
				</div>

				<QLCSVCContext.Provider
					value={{
						resource: this.state.resource,
						editContextTS: this.editContextTS,
						addContextTS: this.addContextTS,
						deleteContextTS: this.deleteContextTS,
						addContextDC: this.addContextDC,
						addContextUser: this.addContextUser,
						deleteContextUser: this.deleteContextUser,
						editContextUser: this.editContextUser
					}}
				>
					<main className="s-layout__content">
						<Content />
					</main>
				</QLCSVCContext.Provider>
			</div>
			
		);
	}
}

export default withStyles(styles)(withRouter(Main));
