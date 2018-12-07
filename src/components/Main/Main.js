import React, { Component } from 'react';
import { withRouter } from "react-router";

import _ from 'lodash';

import './Main.css';
import axios from 'axios'
import Content from "../Content/Content";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MenuLink from "../../general/MenuLink";

const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[1]


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

// Creact Context
export const QLCSVCContext = React.createContext(
	resource,
	editContextTS,
	addContextTS,
	deleteContextTS
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
						route: '/taisan',
					},
					dieuchinhtaisan:{
						name: 'Điều Chuyển Tài Sản',
						route: '/dieuchinhtaisan',
					},
					thanhly:{
						name: 'Thanh Lý',
						route: '/thanhly',
					},
					thongke:{
						name: 'Thống Kê',
						route: '/thongke',
					},
				}
			},
			kehoach:{
				id: 5,
				name: "Kế hoạch",
				route: '/kehoach',
				isOpen: false,
				icon:'fas fa-book',
				children: {}
			}
		}
	};

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

	render() {
		var {sidebar} = this.state;
		const parentKey = Object.keys(sidebar) // ['donvi', 'danhmuc']
		// console.log('Rerender', this.state.resource.taisan);
		// console.log("addResource", this.state.resource);
		
		// console.log("[Main] sidebar:",sidebar)
		return (
			<div className="s-layout">
				<div className="s-layout__sidebar">
					<div className="s-sidebar__trigger" href="#0">
						<i className="fa fa-bars"></i>
						<ul className="pull-right">
							<li className="rad-dropdown no-color bell">
								<a href="#">
									<i className="fas fa-bell"></i>
								</a>
							</li>
							<li className="rad-dropdown no-color">
								<a href="#">
									<img className="rad-list-img sm-img" alt="IMG_0432 - 3x4" src="https://farm2.staticflickr.com/1738/42575021701_788f8b74b0_z.jpg"/>
								</a>
							</li>
							<li className="rad-dropdown no-color">
								<a href="#">
									<i className="fa fa-cog"></i>
								</a>
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
																<MenuLink className="s-sidebar__nav-linksub" to={{
																	pathname: '/'+ key + '/' + sidebar[key].children[keyChild].name,
																}} label={`${sidebar[key].children[keyChild].name}`} nameIcon={`${sidebar[key].icon}`} 
															/>
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
						deleteContextTS: this.deleteContextTS
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

export default withRouter(Main);
