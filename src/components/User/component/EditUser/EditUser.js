import React, { Component } from 'react';
// import './ThongKe.css';
import { withRouter } from "react-router";
import { QLCSVCContext } from '../../../Main/Main';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import NavBar from '../../../../general/NavBar/NavBar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormattedMessage } from "react-intl";
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]

const styles = theme => ({
	root: {
	  display: 'flex',
	  justifyContent: 'center',
	  flexWrap: 'wrap',
	  padding: theme.spacing.unit * 5,
	},
	form:{
	}
});

class EditUserComponent extends Component {
	state = this.props.itemUser || {
		username: '',
		password: '',
		fullname: '',
		avatar: 'https://farm2.staticflickr.com/1738/42575021701_788f8b74b0_z.jpg',
		phone: '',
		id_donvi: 0,
		id_role: 0,

		showPassword: false,
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
		// event.preventDefault();
		// console.log("clicked submit");
		// var id = parseInt(itemsTaisan[itemsTaisan.length - 1].id) + 1;

		var id_donvi = parseInt(id_donvi);
		var id_role = parseInt(id_role);

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

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
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
			<Paper className={classes.root}>
				<form
					className={classes.form}
					noValidate autoComplete="off"
				>
					<TextField
						id="standard-name"
						label={<FormattedMessage id="user.table.username" defaulMesage="Username" />}
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
						id="filled-adornment-password"
						label={<FormattedMessage id="user.table.password" defaulMesage="Password" />}
						// variant="filled"
						type={this.state.showPassword ? 'text' : 'password'}
						value={password}
						onChange={this.handleChange('password')}
						InputProps={{
						endAdornment: (
							<InputAdornment position="end">
							<IconButton
								edge="end"
								aria-label="Toggle password visibility"
								onClick={this.handleClickShowPassword}
							>
								{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
							</InputAdornment>
						),
						}}
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
					<TextField
						id="standard-name"
						label={<FormattedMessage id="user.table.fullname" defaulMesage="Fullname" />}
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
						label={<FormattedMessage id="user.table.phone" defaulMesage="Phone"  />}
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
						label={<FormattedMessage id="user.table.donvi" defaulMesage="Don vi"  />}
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
						label={<FormattedMessage id="user.table.role" defaulMesage="Role" />}
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
					<Button 
						variant="contained" 
					>
						<Link button  to={`/user`} >
							<FormattedMessage id="cancel.title" defaulMesage="Cancel"  />
						</Link>
					</Button>		
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
						href="http://csvc.com/user"
					>
						<FormattedMessage id="edit.title" defaulMesage="Edit"  />
					</Button>
				</form>
			</Paper>
		)
	}
}

class Edit extends Component {
	render() {
		const { resource, classes } = this.props;
		const itemsUser = resource.user;
		const currentId = getParentPath(this.props.match.url);
		let itemUser = itemsUser.find((item) => { return item.id == currentId });;

		return (
			<EditUserComponent 
				itemUser={itemUser} 
				editAPIUser={this.props.editAPIUser} 
				resource={resource} 
				editContextUser={this.props.editContextUser}
				classes={classes}
			/>
				
		)
	}
}

class EditUser extends Component {
	state ={
		navBar : {
			suanguoidung:{
				route:"/user/edit/:id",
				title: "",
				messageId : "user.edit.title"
				// component: "DanhSachTaiSan"
			},
		}
	}
	render() {
		const { match, classes } = this.props
		const { navBar } = this.state
		const parentKey = Object.keys(navBar)
		return(
			<div>
				<NavBar
					match={match}
					classes={classes}
					parentKey={parentKey}
					navBar={navBar}
					title= {"user.title"}
				/>
				<QLCSVCContext.Consumer>
					{({ resource, editContextUser }) => <Edit 
														editAPIUser={this.props.editAPIUser} 
														resource={resource} 
														match={this.props.match} 
														editContextUser={editContextUser} 
														classes={classes}
														/>}
				</QLCSVCContext.Consumer>
			</div>
		)
	}
}

export default withRouter(withStyles(styles)(EditUser));
