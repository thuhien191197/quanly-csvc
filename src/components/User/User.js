import React, { Component } from 'react';
import './User.css';
import { QLCSVCContext } from '../Main/Main';
import { Switch, Route } from 'react-router-dom'
import Table1 from '../../general/Table/Table';
import * as R from 'ramda';
import { withRouter } from "react-router";
import AddUser from './component/AddUser/AddUser';
import EditUser from './component/EditUser/EditUser';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../general/NavBar/NavBar';
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[1]

const toolbarStyles = theme => ({
	rootUser:{
		// width: "100%",
		
	},
});



class UserComponent extends Component {
	constructor(props) {
		super(props);
		const data = this.handleGetListTable(props.resource || []);
		this.state = {
			data,
		}
	}
	handleGetListTable = (resourceUser) =>{
		var itemsUser  = resourceUser.user
		var itemsDonVi  = resourceUser.donvi
		console.log("[User] itemsDonVi:",itemsDonVi)
		var itemsRole  = resourceUser.role
		var b =[]
		itemsUser.map(item => {
			var getNameDonvi = R.filter(R.propEq("id", item.id_donvi))
			var getNameRole = R.filter(R.propEq("id", item.id_role))
			console.log("getNameDonvi(itemsDonVi)[0].name:",getNameDonvi(itemsDonVi)[0])

			const a = {'id' :item.id, 
						'username': item.username , 
						'fullname': item.fullname ,
						'avatar': item.avatar ,
						'phone': item.phone , 
						'id_donvi': item.id_donvi ? R.path([0,'name'],getNameDonvi(itemsDonVi)) : '', 
						'id_role': item.id_role ? R.path([0,'name'],getNameRole(itemsRole)) : ''
					};
			b.push(a);
		})
		return b
	}

	componentWillReceiveProps(props, state) {
		// console.log("Next props", props);
		const data = this.handleGetListTable(props.resource || []);
		this.setState({
			data,
		})
	}

	handleDelete = (selected) => {
		// console.log("[TaiSan] props:", this.props)
		var itemsUser = this.props.resource.user;
		const dataDeleted = R.reject((item) => selected.indexOf(item.id)!== -1, itemsUser);
		this.props.deleteContextUser(dataDeleted);
		
		
		selected.forEach(function(select, i) {
			fetch('http://localhost:5500/user/'+ select, {
				method: 'DELETE'
			});
		});
		this.setState({selected: [] });
	}

	render() {
		const { rows, match, resource} = this.props
		const { data } = this.state
		console.log("[User] match:",match)
		
		return (
			<div>
				{/* {getParentPath(match.url)} */}
				<Table1 
					rows={rows} 
					items={data} 
					handleDelete = {this.handleDelete}  
				/>
			</div>
		);
	}
}


class User extends Component {
	state = {
		rows : [
			{ id: 'id', numeric: true, disablePadding: false, label: 'Id' },
			{ id: 'username', numeric: false, disablePadding: false, label: 'Tên đăng nhập' },
			{ id: 'fullname', numeric: false, disablePadding: false, label: 'Họ và tên' },
			{ id: 'avatar', numeric: false, disablePadding: true, label: 'Avatar' },
			{ id: 'phone', numeric: false, disablePadding: false, label: 'Số điện thoại' },
			{ id: 'id_donvi', numeric: false, disablePadding: false, label: 'Đơn vị' },
			{ id: 'id_role', numeric: false, disablePadding: false, label: 'Chức vụ' },
			{ id: 'function', numeric: false, disablePadding: false, label: 'Chức năng', function:['edit'] },
		],

		navBar : {
			danhsachTS:{
				route:"/user",
				title: "Danh sách người dùng",
				// component: "DanhSachTaiSan"
			},
		}
	}
	renderUser = () => {
		const { match, classes } = this.props
		const { rows, navBar } = this.state
		const parentKey = Object.keys(navBar)
		const title = getParentPath(match.url)
		return (
			<QLCSVCContext.Consumer>
				{({ resource, deleteContextUser}) => {
					console.log("[User] resource:",resource)
					return (
						<div>
							
							<NavBar
								match={match}
								classes={classes}
								parentKey={parentKey}
								navBar={navBar}
								title= {"Users"}
							/>
							<UserComponent 
								rows={rows} 
								match={match}
								resource={resource} 
								deleteContextUser={deleteContextUser} 
							/>
						</div>
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}

	addAPIUser = (id, username,password,fullname,avatar,phone,id_donvi,id_role) => {
		axios.post(`http://localhost:5500/user`, { username,password,fullname,avatar,phone,id_donvi,id_role})
		.then(res => {
		})
		// console.log("[TaiSan] name:",name)
	}

	editAPIUser = ({id, username,password,fullname,avatar,phone,id_donvi,id_role}) => {
		// console.log('Edit item server', id);
		axios.put(`http://localhost:5500/user/${id}`, {id, username,password,fullname,avatar,phone,id_donvi,id_role})
		.then(res => {
			console.log("Edit done");
		})
      
	}

	render() {
		const { classes } = this.props
		return (
			<div>
				<Switch>
					<Route path="/user" exact render={this.renderUser}></Route>
					<Route exact path="/user/add" component={() => <AddUser addAPIUser={this.addAPIUser} />}></Route>
					<Route exact path="/user/edit/:id" component={() => <EditUser editAPIUser={this.editAPIUser} />}></Route>
				</Switch>
			</div>
		)
		
	}
}

export default withRouter(withStyles(toolbarStyles)(User));
