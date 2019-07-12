import React, { Component } from 'react';
import './AddTS.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import { QLCSVCContext } from '../../../../Main/Main';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import NavBar from '../../../../../general/NavBar/NavBar';
import { FormattedMessage } from "react-intl";


const styles = theme => ({
	root: {
	  display: 'flex',
	  justifyContent: 'center',
	  flexWrap: 'wrap',
	  padding: theme.spacing.unit * 7,
	},
});

const itemsTinhtrang = [
	{
		id: 0,
		name: 'Còn sử dụng',
	},
	{
		id: 1,
		name: 'Không còn sử dụng',
	}
];

const name_title = <FormattedMessage id="taisan.table.name" defaulMesage="Name" />
const ngaynhap_title = <FormattedMessage id="taisan.table.ngaynhap" defaulMesage="Ngay nhap" />
const dongia_title = <FormattedMessage id="taisan.table.dongia" defaulMesage="Don gia" />
const soluong_title = <FormattedMessage id="taisan.table.soluong" defaulMesage="so luong" />
const nguoinhap_title = <FormattedMessage id="taisan.table.nguoinhap" defaulMesage="Nguoi nhap" />
const hansudung_title = <FormattedMessage id="taisan.table.hansudung" defaulMesage="Hạn sử dụng" />
const ghichu_title = <FormattedMessage id="taisan.table.ghichu" defaulMesage="Ghi chú" />
const loaitaisan_title = <FormattedMessage id="taisan.table.loaitaisan" defaulMesage="Loai tai san" />
const tinhtrang_title = <FormattedMessage id="taisan.table.tinhtrang" defaulMesage="Tình trạng" />
const nguonkinhphi_title = <FormattedMessage id="taisan.table.nguonkinhphi" defaulMesage="Nguồn kinh phí" />
const donvi_title = <FormattedMessage id="taisan.table.donvi" defaulMesage="Don vi" />

const phong_title = <FormattedMessage id="taisan.table.phong" defaulMesage="Phòng" />

const cancel = <FormattedMessage id="cancel.title" defaulMesage="Hủy" />
const add = <FormattedMessage id="add.title" defaulMesage="Add" />

class Child extends Component {
	state = {
		name: '',
		dongia: 0,
		soluong: 0,
		ngaynhap: '1997-11-19',
		hansudung: '2090-11-19',
		ghichu: '',
		id_loaitaisan: '',
		id_donvi: '',
		id_kinhphi: '',
		id_phong: '',
		id_user: '',
		status: 0,

	};

	componentDidMount() {
	}


	handleSubmit = (itemsTaisan, event, id, name, dongia, soluong, ngaynhap, hansudung, ghichu, id_loaitaisan, id_donvi, id_kinhphi, id_phong, id_user, status) => {
		if(window.confirm('Bạn có chắc muốn thêm không?')){
			var dongia = parseInt(dongia);
			var soluong = parseInt(soluong);
			var id_loaitaisan = parseInt(id_loaitaisan);
			var id_kinhphi = parseInt(id_kinhphi);
			var id_donvi = parseInt(id_donvi);
			var id_phong = parseInt(id_phong);
			var id_user = parseInt(id_user);
			var status = parseInt(status);

			itemsTaisan.length!==0
			? id = parseInt(itemsTaisan[itemsTaisan.length - 1].id) + 1
			: id = 1

			this.props.addContextTS({
				id,
				name,
				dongia,
				soluong,
				ngaynhap,
				hansudung,
				ghichu,
				id_loaitaisan,
				id_donvi,
				id_kinhphi,
				id_phong,
				id_user,
				status
			})

			this.props.addTs(
				id,
				name,
				dongia,
				soluong,
				ngaynhap,
				hansudung,
				ghichu,
				id_loaitaisan,
				id_donvi,
				id_kinhphi,
				id_phong,
				id_user,
				status
			)
		}
	}


	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	render() {
		const { resource, classes } = this.props
		const {
			id,
			name,
			dongia,
			soluong,
			ngaynhap,
			hansudung,
			ghichu,
			id_loaitaisan,
			id_donvi,
			id_kinhphi,
			id_phong,
			id_user,
			status,
		} = this.state;
		return (
			<Paper className={classes.root}>
				{/* ADD tài sản */}
				<form
					noValidate autoComplete="off"
				>
					<TextField
						id="standard-name"
						label={name_title}
						value={name}
						onChange={this.handleChange('name')}
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-select-currency-native"
						select
						label={nguoinhap_title}
						value={id_user}
						onChange={this.handleChange('id_user')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						InputLabelProps={{
							shrink: true,
						}}
						style={{ marginRight: 30 }}
						margin="normal"
					>
						{/* <option disabled="disabled" selected="true" value="">Chọn tên người nhập</option> */}
						{resource.user.map((item, i) => (
							<option key={item.id} value={item.id}>
								{item.fullname}
							</option>
						))}
					</TextField>
					<br />
					<TextField
						id="standard-name"
						label={dongia_title}
						value={dongia}
						style={{ marginRight: 30 }}
						// fullWidth
						onChange={this.handleChange('dongia')}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-name"
						label={soluong_title}
						value={soluong}
						style={{ marginRight: 30 }}
						type="number"
						// fullWidth
						onChange={this.handleChange('soluong')}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="date"
						label={ngaynhap_title}
						type="date"
						// defaultValue="1997-11-19"
						value={ngaynhap}
						onChange={this.handleChange('ngaynhap')}
						// fullWidth
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="date"
						label={hansudung_title}
						type="date"
						// defaultValue="1997-11-19"
						value={hansudung}
						onChange={this.handleChange('hansudung')}
						// fullWidth
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
					<TextField
						id="standard-name"
						label={ghichu_title}
						value={ghichu}
						onChange={this.handleChange('ghichu')}
						// fullWidth
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-name"
						select
						label={tinhtrang_title}
						value={status}
						onChange={this.handleChange('status')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						margin="normal"
					>
						{itemsTinhtrang.map((option, i) => (
							<option key={i} value={option.id}>
								{option.name}
							</option>
						))}
					</TextField>
					<br />

					<TextField
						id="standard-select-currency-native"
						select
						label={loaitaisan_title}
						value={id_loaitaisan}
						onChange={this.handleChange('id_loaitaisan')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						InputLabelProps={{
							shrink: true,
						}}
						style={{ marginRight: 30 }}
						margin="normal"
					>
						{resource.loaitaisan.map((item, i) => {
							console.log("item:", item.id)
							return (
								<option key={i} value={item.id}>
									{item.name}
								</option>
							)
						})}
					</TextField>
					<TextField
						id="standard-select-currency-native"
						select
						label={nguonkinhphi_title}
						value={id_kinhphi}
						onChange={this.handleChange('id_kinhphi')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						InputLabelProps={{
							shrink: true,
						}}
						style={{ marginRight: 30 }}
						margin="normal"
					>
						{resource.nguonkinhphi.map((item, i) => (
							<option key={i} value={item.id}>
								{item.name}
							</option>
						))}
					</TextField>
					<TextField
						id="standard-name"
						select
						label={donvi_title}
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
						label={phong_title}
						value={id_phong}
						onChange={this.handleChange('id_phong')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						InputLabelProps={{
							shrink: true,
						}}
						margin="normal"
					>
						
						{resource.phong.map((item, i) => {
							// console.log("this.state.id_donvi: ",typeof this.state.id_donvi)
							// console.log("item.id_donvi: ",typeof item.id_donvi)
							return  parseInt(this.state.id_donvi) === item.id_donvi
							?
								<option key={i} value={item.id}>
									{item.name}
								</option>
							:
							''
							
						})}
					</TextField>
					<br />
					<Button 
						variant="contained" 
					>
						<Link button  to={`/taisan`} >
							{cancel}
						</Link>
					</Button>	
					<Button variant="contained" color="primary"
						onClick={(event) => this.handleSubmit(
							resource.taisan,
							event,
							id,
							name,
							dongia,
							soluong,
							ngaynhap,
							hansudung,
							ghichu,
							id_loaitaisan,
							id_donvi,
							id_kinhphi,
							id_phong,
							id_user,
							status
						)}
						href="http://localhost:3000/taisan"
					>
						<Link to="/taisan">{add}</Link>
					</Button>
				</form>
				</Paper>
	
			);
	} //aaaa
}


class Add extends Component {
	render() {
		const { resource, classes } = this.props;

		return (
			<Child  
				addTs={this.props.addTs} 
				resource={resource} 
				classes={classes}
				addContextTS={this.props.addContextTS}
			/>
		)
	}
}


class AddTS extends Component {
	state ={
		navBar : {
			themntaisan:{
				route:"/taisan/add",
				title: "",
				// component: "DanhSachTaiSan"
				messageId: "taisan.title"
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
					title= {"add.title"}
				/>
			<QLCSVCContext.Consumer>
				{({ resource, addContextTS }) => <Add addTs={this.props.addTs} classes={classes} resource={resource} match={this.props.match} addContextTS={addContextTS} />}
			</QLCSVCContext.Consumer>
			</div>
		)
	}

}
	
	export default withRouter(withStyles(styles)(AddTS));
