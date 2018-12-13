import React, { Component } from 'react';
// import './ThongKe.css';
import { withRouter } from "react-router";
import { QLCSVCContext } from '../../../Main/Main';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]

class EditUserComponent extends Component {
	state = this.props.itemUser || {
		username: '',
		password: '',
		fullname: '',
		avatar: 'https://farm2.staticflickr.com/1738/42575021701_788f8b74b0_z.jpg',
		phone: '',
		id_donvi: 0,
		id_role: 0,
		// avatar:''
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleSubmit = (itemsUser, 
					event, 
					id,
					username,
					password,
					fullname,
					avatar,
					phone,
					id_donvi,
					id_role,) => {
		event.preventDefault();
		// console.log("clicked submit");
		// var id = parseInt(itemsTaisan[itemsTaisan.length - 1].id) + 1;

		var id_donvi = parseInt(id_donvi);
		var id_role = parseInt(id_role);


		// id,
		// 	username,
		// 	password,
		// 	fullname,
		// 	avatar,
		// 	phone,
		// 	id_donvi,
		// 	id_role,

		this.props.editContextUser({
			id,
			username,
			password,
			fullname,
			avatar,
			phone,
			id_donvi,
			id_role,
		})
		
		this.props.editAPIUser({
			id,
			username,
			password,
			fullname,
			avatar,
			phone,
			id_donvi,
			id_role,
		})
	}

	handleImageChange = (event) => {
		event.preventDefault();
		let reader = new FileReader();
		let file = event.target.files[0];
		console.log(">>>>>", event.file, file)
		const self = this
		reader.onload = function(upload) {
			self.setState({
				// avatar: upload.target.result,
				avatar: reader.result
			});
		};
		reader.readAsDataURL(file);    
	}

	render(){
		const { resource, classes } = this.props
		const {
			id,
			username,
			password,
			fullname,
			avatar,
			phone,
			id_donvi,
			id_role,
		} = this.state;
		let $imagePreview = null;
		if (avatar) {
			$imagePreview = (<img src={avatar} style={{width:'8em'}}/>);
		} else {
			$imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
		}
		return(
			<form
				noValidate autoComplete="off"
			>
				<TextField
						id="standard-name"
						label="Username"
						value={username}
						placeholder="Nhập username"
						onChange={this.handleChange('username')}
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<TextField
						id="standard-name"
						label="Password"
						value={password}
						placeholder="Nhập password"
						onChange={this.handleChange('password')}
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
					<TextField
						id="standard-name"
						label="Fullname"
						value={fullname}
						placeholder="Nhập họ và tên"
						onChange={this.handleChange('fullname')}
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<TextField
						id="standard-name"
						label="Phone"
						value={phone}
						placeholder="Nhập số điện thoại"
						onChange={this.handleChange('phone')}
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
					<TextField
						id="standard-name"
						select
						label="Đơn vị"
						value={id_donvi}
						onChange={this.handleChange('id_donvi')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						InputLabelProps={{
							shrink: true,
						}}
						style={{ marginRight: 30 }}
						helperText="Please select your currency"
						margin="normal"
					>
						{resource.donvi.map((item, i) => (
							<option key={i} value={item.id}>
								{item.name}
							</option>
						))}
					</TextField>

					<TextField
						id="standard-name"
						select
						label="Chức vụ"
						value={id_role}
						onChange={this.handleChange('id_role')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						InputLabelProps={{
							shrink: true,
						}}
						style={{ marginRight: 30 }}
						helperText="Please select your currency"
						margin="normal"
					>
						{resource.role.map((item, i) => (
							<option key={i} value={item.id}>
								{item.name}
							</option>
						))}
					</TextField>

					<div >
						{/* <Button variant="contained" color="default" >
							Upload
							<FileUpload className={classes.rightIcon} />
						</Button> */}
						<input onChange={this.handleImageChange} type="file" name="myfile" />	
					</div>
					<div className="imgPreview" > 
						{$imagePreview}
					</div>

					<br />
					<Button variant="contained" color="primary"
						onClick={(event) => this.handleSubmit(
							resource.user,
							event,
							id,
							username,
							password,
							fullname,
							avatar,
							phone,
							id_donvi,
							id_role,
						)}
						href="http://localhost:3000/user"
					>
						Sửa
					</Button>
			</form>
		)
	}
}

class Edit extends Component {
	render() {
		const { resource } = this.props;
		const itemsUser = resource.user;
		const currentId = getParentPath(this.props.match.url);
		let itemUser = itemsUser.find((item) => { return item.id == currentId });;

		return (
			<EditUserComponent 
				itemUser={itemUser} 
				editAPIUser={this.props.editAPIUser} 
				resource={resource} 
				editContextUser={this.props.editContextUser}/>
		)
	}
}

class EditUser extends Component {
	render() {
		const { match } = this.props
		// console.log("match :" , match)
		return(
			<QLCSVCContext.Consumer>
				{({ resource, editContextUser }) => <Edit 
													editAPIUser={this.props.editAPIUser} 
													resource={resource} 
													match={this.props.match} 
													editContextUser={editContextUser} 
													/>}
			</QLCSVCContext.Consumer>
		)
	}
}

export default withRouter(EditUser);
