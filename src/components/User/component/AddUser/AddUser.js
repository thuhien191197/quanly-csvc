import React, { Component } from 'react';
// import './ThongKe.css';
import { withRouter } from "react-router";
import { QLCSVCContext } from '../../../Main/Main';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]

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

class AddUserComponent extends Component {
	state = {
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

	handleSubmit = (itemsUser, event, id, username,password,fullname,avatar,phone,id_donvi, id_role) => {
		// event.preventDefault();
		// console.log("clicked submit");
		// var dongia = parseInt(dongia);
		// var soluong = parseInt(soluong);
		// var id_loaitaisan = parseInt(id_loaitaisan);
		// var id_kinhphi = parseInt(id_kinhphi);
		var id_donvi = parseInt(id_donvi);
		var id_role = parseInt(id_role);
		// var id_user = parseInt(id_user);
		// var status = parseInt(status);

		itemsUser.length!==0
		? id = parseInt(itemsUser[itemsUser.length - 1].id) + 1
		: id = 1

		this.props.addContextUser({
			id,
			username,
			password,
			fullname,
			avatar,
			phone,
			id_donvi,
			id_role,
		})

		this.props.addAPIUser(
			id,
			username,
			password,
			fullname,
			avatar,
			phone,
			id_donvi,
			id_role,
		)
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
		// let {avatar} = this.state;

		let $imagePreview = null;
		if (avatar) {
			$imagePreview = (<img src={avatar} />);
		} else {
			$imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
		}
		
		console.log("avatar: ", avatar)
		console.log("imagePreview:  ",  $imagePreview)

		return(
			<div>
				{/* ADD user */}
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
					<div className="imgPreview">
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
						Thêm
					</Button>
				</form>
			</div>
		)
	}
}

class Add extends Component {
	render() {
		const { resource, classes, match } = this.props;

		return (
			<AddUserComponent  
				addAPIUser={this.props.addAPIUser} 
				resource={resource} 
				addContextUser={this.props.addContextUser}
				match={match} 
				// classes= {classes}
			/>
		)
	}
}

class AddUser extends Component {
	
	render() {
		const { match, classes } = this.props
		// console.log("match :" , match)
		return (
			<QLCSVCContext.Consumer>
				{({ resource, addContextUser }) => 
					<Add 
						addAPIUser={this.props.addAPIUser} 
						resource={resource} 
						match={match} 
						// classes= {classes}
						addContextUser={addContextUser} />
			}
			</QLCSVCContext.Consumer>
		);
	}
}

export default withRouter(AddUser)