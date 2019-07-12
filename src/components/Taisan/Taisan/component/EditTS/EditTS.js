import React, { Component } from 'react';
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { QLCSVCContext } from '../../../../Main/Main';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import NavBar from '../../../../../general/NavBar/NavBar';
import { FormattedMessage } from "react-intl";

const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]

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

const styles = theme => ({
	root: {
	  display: 'flex',
	  justifyContent: 'center',
	  flexWrap: 'wrap',
	  padding: theme.spacing.unit * 7,
	},
});


const name_title = <FormattedMessage id="taisan.table.name" defaulMesage="Name" />
const dongia_title = <FormattedMessage id="taisan.table.dongia" defaulMesage="Don gia" />
const soluong_title = <FormattedMessage id="taisan.table.soluong" defaulMesage="so luong" />
const ngaynhap_title = <FormattedMessage id="taisan.table.ngaynhap" defaulMesage="Ngay nnhap" />
const loaitaisan_title = <FormattedMessage id="taisan.table.loaitaisan" defaulMesage="Loai tai san" />
const donvi_title = <FormattedMessage id="taisan.table.donvi" defaulMesage="Don vi" />
const nguoinhap_title = <FormattedMessage id="taisan.table.nguoinhap" defaulMesage="Nguoi nhap" />
const ghichu_title = <FormattedMessage id="taisan.table.ghichu" defaulMesage="Ghi chú" />
const tinhtrang_title = <FormattedMessage id="taisan.table.tinhtrang" defaulMesage="Tình trạng" />
const nguonkinhphi_title = <FormattedMessage id="taisan.table.nguonkinhphi" defaulMesage="Nguồn kinh phí" />
const phong_title = <FormattedMessage id="taisan.table.phong" defaulMesage="Phòng" />
const hansudung_title = <FormattedMessage id="taisan.table.hansudung" defaulMesage="Hạn sử dụng" />
const cancel = <FormattedMessage id="cancel.title" defaulMesage="Hủy" />
const edit = <FormattedMessage id="edit.title" defaulMesage="Edit" />

class Child extends Component {
	state = this.props.itemTS || {
		id: 0,
		name: '',
		dongia: 0,
		soluong: 0,
		ngaynhap: '19/11/1997',
		hansudung: '19/11/2080',
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
		if(window.confirm('Bạn có chắc muốn sửa không?')){
			event.preventDefault();
			// console.log("clicked submit");
			// var id = parseInt(itemsTaisan[itemsTaisan.length - 1].id) + 1;
			var dongia = parseInt(dongia);
			var soluong = parseInt(soluong);
			var id_loaitaisan = parseInt(id_loaitaisan);
			var id_kinhphi = parseInt(id_kinhphi);
			var id_donvi = parseInt(id_donvi);
			var id_phong = parseInt(id_phong);
			var id_user = parseInt(id_user);
			var status = parseInt(status);

			this.props.editContextTS({
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
			
			this.props.editTs(
				{id,
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
				status}
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
		// console.log(">>loaitaisan: ", this.state.itemsLoaitaisan);
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
			{/* Edit tài sản */}
			<form
				noValidate autoComplete="off"
			>
				<TextField
					id="standard-name"
					label={name_title}
					value={name}
					placeholder="Nhập tên tài sản"
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
						<option key={i} value={item.id}>
							{item.fullname}
						</option>
					))}
				</TextField>
				<br />
				<TextField
					id="standard-name"
					label={dongia_title}
					value={dongia}
					placeholder="Nhập đơn giá"
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
					placeholder="Nhập Số lượng"
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
						return (
							<option key={i} value={item.id}>
								{item.name}
							</option>
						)
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
						this.props.itemTS.id,
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
				>
					<Link to="/taisan">{edit}</Link>
				</Button>
			</form>
		</Paper>
		);
	}
}


class EditTS extends Component {
	render() {
		const { resource, classes } = this.props;
		const itemsTaisan = resource.taisan;
		const currentId = getParentPath(this.props.match.url);
		let itemTS = itemsTaisan.find((item) => { return item.id == currentId });;

		return (
			<Child itemTS={itemTS} classes={classes} editTs={this.props.editTs} resource={resource} editContextTS={this.props.editContextTS}/>
		)
	}
}


class EditTSWrap extends Component {
	state ={
		navBar : {
			suataisan:{
				route:"/taisan/edit",
				title: "",
				// component: "DanhSachTaiSan"
				messageId: "taisan.title"
			},
		}
	}
	render() {	
		const { classes, match } = this.props;
		const { navBar } = this.state
		const parentKey = Object.keys(navBar)
		return(
			<div>
				<NavBar
					match={match}
					classes={classes}
					parentKey={parentKey}
					navBar={navBar}
					title= {"edit.title"}
				/>
				<QLCSVCContext.Consumer>
					{({ resource, editContextTS }) => <EditTS editTs={this.props.editTs} classes={classes} resource={resource} match={this.props.match} editContextTS={editContextTS} />}
				</QLCSVCContext.Consumer>
			</div>
		)
	}

}


export default withRouter(withStyles(styles)(EditTSWrap));
