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
import { FormattedMessage } from "react-intl";
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
		let roleadd = true
		let roleedit = true
		let roledel = true
		if(props.sessionUser.role === 3 ||props.sessionUser.role === 2 ){
			roleadd = false
			roleedit = false
			roledel = false
		}
		this.state = {
			data,
			roleAdd: roleadd,
			roleEdit: roleedit,
			roleDel: roledel
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
			const a = {
				'id' :item.id, 
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
		let roleadd = this.state.roleAdd
		let roleedit = this.state.roleEdit
		let roledel = this.state.roleDel
		if(props.sessionUser.role === 3){
			roleadd = false
			roleedit = false
			roledel = false
		}
		this.setState({
			data,
			roleAdd: roleadd,
			roleEdit: roleedit,
			roleDel: roledel
		})
	}

	handleDelete = (selected) => {
		// console.log("[TaiSan] props:", this.props)
		if(window.confirm('Bạn có chắc muốn xóa không?')){
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
	}

	render() {
		const { rows, match, resource, sessionUser} = this.props
		const { data } = this.state
		console.log("[User] match:",match)
		
		return (
			<div>
				{/* {getParentPath(match.url)} */}
				<Table1 
					rows={rows} 
					items={data} 
					handleDelete = {this.handleDelete}  
					roleAdd={this.state.roleAdd}
					roleEdit={this.state.roleEdit}
					roleDel={this.state.roleDel}
				/>
			</div>
		);
	}
}


class User extends Component {
	constructor(props) {
		let username = <FormattedMessage id="user.table.username" defaulMesage="title" />
		let fullname = <FormattedMessage id="user.table.fullname" defaulMesage="title" />
		let avatar = <FormattedMessage id="user.table.avatar" defaulMesage="title" />
		let phone = <FormattedMessage id="user.table.phone" defaulMesage="title"  />
		let donvi = <FormattedMessage id="user.table.donvi" defaulMesage="title"  />
		let role = <FormattedMessage id="user.table.role" defaulMesage="title"  />
		let functions = <FormattedMessage id="user.table.functions" defaulMesage="title"  />

		super(props);
		this.state = {		
			rows : [
				{ id: 'id', numeric: true, disablePadding: false, label: 'Id' },
				{ id: 'username', numeric: false, disablePadding: false, label: username },
				{ id: 'fullname', numeric: false, disablePadding: false, label: fullname },
				{ id: 'avatar', numeric: false, disablePadding: true, label: avatar },
				{ id: 'phone', numeric: false, disablePadding: false, label: phone },
				{ id: 'id_donvi', numeric: false, disablePadding: false, label: donvi},
				{ id: 'id_role', numeric: false, disablePadding: false, label: role},
				{ id: 'function', numeric: false, disablePadding: false, label: functions, function:['edit', 'add','del'] },
			],

			navBar : {
				danhsachTS:{
					// route:"/user",
					title: "Danh sách người dùng",
					messageId : "user.navBar"
				},
			}
		}
	}

	renderUser = () => {
		const { match, classes } = this.props
		const { rows, navBar } = this.state
		const parentKey = Object.keys(navBar)
		// const title = getParentPath(match.url)
		return (
			<QLCSVCContext.Consumer>
				{({ resource, deleteContextUser, sessionUser}) => {
					console.log("[User] resource:",resource)
					return (
						<div>
							
							<NavBar
								match={match}
								classes={classes}
								parentKey={parentKey}
								navBar={navBar}
								title= {"user.title"}
							/>
							<UserComponent 
								rows={rows} 
								match={match}
								resource={resource} 
								deleteContextUser={deleteContextUser} 
								sessionUser={sessionUser}
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
