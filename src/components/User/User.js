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
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[1]


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
						'id_donvi': item.id_donvi? getNameDonvi(itemsDonVi)[0].name :'', 
						'id_role': item.id_role?getNameRole(itemsRole)[0].name:''
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

	render() {
		const { rows, match, resource} = this.props
		const { data } = this.state
		console.log("[User] match:",match)
		
		return (
			<div>
				User
				{getParentPath(match.url)}
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
	}
	renderUser = () => {
		const { match } = this.props
		const { rows } = this.state
		return (
			<QLCSVCContext.Consumer>
				{({ resource, deleteContextTS,  addContextTS}) => {
					console.log("[User] resource:",resource)
					return (
						<UserComponent 
							rows={rows} 
							match={match}
							resource={resource} 
							// deleteContextTS={deleteContextTS} 
						/>
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

export default withRouter(User);
