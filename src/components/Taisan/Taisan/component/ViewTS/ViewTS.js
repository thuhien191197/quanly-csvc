import React, { Component } from 'react';
import './ViewTS.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withRouter } from "react-router";
import { QLCSVCContext } from '../../../../Main/Main';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import NavBar from '../../../../../general/NavBar/NavBar';
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
		<div className={classes.root}>
			{/* Edit tài sản */}
			{/* <form
				noValidate autoComplete="off"
			>
				<TextField
					id="standard-name"
					label="Tên tài sản"
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
					label="Tên người nhập"
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
					helperText="Please select your name"
					margin="normal"
				>
					{resource.user.map((item, i) => (
						<option key={i} value={item.id}>
							{item.fullname}
						</option>
					))}
				</TextField>
				<br />
				<TextField
					id="standard-name"
					label="Đơn giá"
					value={dongia}
					placeholder="Nhập đơn giá"
					style={{ marginRight: 30 }}
					helperText="số tiền!"
					onChange={this.handleChange('dongia')}
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="standard-name"
					label="Số lượng"
					value={soluong}
					style={{ marginRight: 30 }}
					type="number"
					placeholder="Nhập Số lượng"
					helperText="tổng số lượng!"
					onChange={this.handleChange('soluong')}
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="date"
					label="Ngày nhập"
					type="date"
					value={ngaynhap}
					onChange={this.handleChange('ngaynhap')}
					style={{ marginRight: 30 }}
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="date"
					label="Hạn sử dụng"
					type="date"
					value={hansudung}
					onChange={this.handleChange('hansudung')}
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<br />
				<TextField
					id="standard-name"
					label="Ghi chú"
					value={ghichu}
					placeholder="Nhập tên Ghi chú"
					onChange={this.handleChange('ghichu')}
					style={{ marginRight: 30 }}
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="standard-name"
					select
					label="Tình trạng"
					value={status}
					onChange={this.handleChange('status')}
					SelectProps={{
						native: true,
						MenuProps: {
						},
					}}
					helperText="Please select your currency"
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
					label="Lọai tài sản"
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
					helperText="Please select your currency"
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
					label="Nguồn Kinh phí"
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
					helperText="Please select your currency"
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
					label="Phòng"
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
					helperText="Please select your currency"
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
					Sửa
				</Button>
			</form> */}
			
			
				<div className="quiz-window">
					<div className="quiz-window-header">
						<div className="quiz-window-title">{name}</div>
					</div>
					<div className="quiz-window-body">
						<div className="gui-window-awards">
						<ul className="guiz-awards-row guiz-awards-header">
							<li className="guiz-awards-header-star">&nbsp;</li>
							<li className="guiz-awards-header-title">Thông tin</li>
							<li className="guiz-awards-header-track">Chi tiết</li>
					
						</ul>
						<ul className="guiz-awards-row guiz-awards-row-even">
							<li className="guiz-awards-star"><span className="star goldstar" /></li>
							<li className="guiz-awards-title">Tên người nhập</li>
							{resource.user.map((item, i) => {
								return(
									item.id === id_user
									?
									<li className="guiz-awards-track">{item.fullname}</li>
									:''
								)
							})}
							{/* <li className="guiz-awards-track">8</li> */}
						</ul>
						<ul className="guiz-awards-row">
							<li className="guiz-awards-star"><span className="star silverstar" /></li>
							<li className="guiz-awards-title">Đơn giá</li>
							<li className="guiz-awards-track">{dongia}</li>
						</ul>
						<ul className="guiz-awards-row guiz-awards-row-even">
							<li className="guiz-awards-star"><span className="star bronzestar" /></li>
							<li className="guiz-awards-title">Số lượng</li>
							<li className="guiz-awards-track">{soluong}</li>
						</ul>
						<ul className="guiz-awards-row">
							<li className="guiz-awards-star"><span className="star rhodiumstar" /></li>
							<li className="guiz-awards-title">Ghi chú</li>
							<li className="guiz-awards-track">{ghichu}</li>
						</ul>
						<ul className="guiz-awards-row guiz-awards-row-even">
							<li className="guiz-awards-star"><span className="star platinumstar" /></li>
							<li className="guiz-awards-title">Tình trạng</li>
							{itemsTinhtrang.map((item, i) => {
								return(
									item.id === status
									?
									<li className="guiz-awards-track">{item.name}</li>
									:''
								)
							})}
						</ul>
						<ul className="guiz-awards-row">
							<li className="guiz-awards-star"><span className="star" /></li>
							<li className="guiz-awards-title">Loại tài sản</li>
							{resource.loaitaisan.map((item, i) => {
								return(
									item.id === id_loaitaisan
									?
									<li className="guiz-awards-track">{item.name}</li>
									:''
								)
							})}
						</ul>
						<ul className="guiz-awards-row guiz-awards-row-even">
							<li className="guiz-awards-star"><span className="star goldstar" /></li>
							<li className="guiz-awards-title">Nguồn kinh phí</li>
							{resource.nguonkinhphi.map((item, i) => {
								return(
									item.id === id_kinhphi
									?
									<li className="guiz-awards-track">{item.name}</li>
									:''
								)
							})}
						</ul>
						<ul className="guiz-awards-row">
							<li className="guiz-awards-star"><span className="star silverstar" /></li>
							<li className="guiz-awards-title">Đơn vị</li>
							{resource.donvi.map((item, i) => {
								return(
									item.id === id_donvi
									?
									<li className="guiz-awards-track">{item.name}</li>
									:''
								)
							})}
						</ul>
						<ul className="guiz-awards-row guiz-awards-row-even">
							<li className="guiz-awards-star"><span className="star bronzestar" /></li>
							<li className="guiz-awards-title">Phòng</li>
							{resource.phong.map((item, i) => {
								return(
									item.id === id_phong
									?
									<li className="guiz-awards-track">{item.name}</li>
									:''
								)
							})}
						</ul>
						<ul className="guiz-awards-row">
							<li className="guiz-awards-star"><span className="star silverstar" /></li>
							<li className="guiz-awards-title">Ngày nhập</li>
							<li className="guiz-awards-track">{ngaynhap}</li>
						</ul>
						<ul className="guiz-awards-row guiz-awards-row-even">
							<li className="guiz-awards-star"><span className="star bronzestar" /></li>
							<li className="guiz-awards-title">Hạn sử dụng</li>
							<li className="guiz-awards-track">{hansudung}</li>
						</ul>
						</div>
						<div className="guiz-awards-buttons">
						 	<Link className="guiz-awards-but-back" to={`/taisan`} ><i className="fa fa-angle-left" />Back</Link>
							<Link className="guiz-awards-but-back" to={`/taisan/edit/${id}`} >Edit <i className="fa fa-angle-right" /></Link>
						</div>
					</div>
					</div>
					<div style={{clear: 'both'}}></div>
			
		</div>
		);
	}
}


class ViewTS extends Component {
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


class ViewTSWrap extends Component {
	state ={
		navBar : {
			viewtaisan:{
				route:"/user/view/:id",
				title: "",
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
					title= {"Chi tiết tài sản"}
				/>
			
				<QLCSVCContext.Consumer>
					{({ resource, editContextTS }) => <ViewTS classes={classes} editTs={this.props.editTs} resource={resource} match={this.props.match} editContextTS={editContextTS} />}
				</QLCSVCContext.Consumer>
			</div>
		)
	}

}


export default withRouter(withStyles(styles)(ViewTSWrap));
