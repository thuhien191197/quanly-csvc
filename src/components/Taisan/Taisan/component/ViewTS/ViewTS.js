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
const back = <FormattedMessage id="back.title" defaulMesage="Back" />
const edit = <FormattedMessage id="edit.title" defaulMesage="Edit" />
const thongtin = <FormattedMessage id="taisan.thongtin" defaulMesage="Thông tin" />
const chitiet = <FormattedMessage id="taisan.chitiet" defaulMesage="Chi tiết" />


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
				<div className="quiz-window">
					<div className="quiz-window-header">
						<div className="quiz-window-title">{name}</div>
					</div>
					<div className="quiz-window-body">
						<div className="gui-window-awards">
						<ul className="guiz-awards-row guiz-awards-header">
							<li className="guiz-awards-header-star">&nbsp;</li>
							<li className="guiz-awards-header-title">{thongtin}</li>
							<li className="guiz-awards-header-track">{chitiet}</li>
					
						</ul>
						<ul className="guiz-awards-row guiz-awards-row-even">
							<li className="guiz-awards-star"><span className="star goldstar" /></li>
							<li className="guiz-awards-title">{nguoinhap_title}</li>
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
							<li className="guiz-awards-title">{dongia_title}</li>
							<li className="guiz-awards-track">{dongia}</li>
						</ul>
						<ul className="guiz-awards-row guiz-awards-row-even">
							<li className="guiz-awards-star"><span className="star bronzestar" /></li>
							<li className="guiz-awards-title">{soluong_title}</li>
							<li className="guiz-awards-track">{soluong}</li>
						</ul>
						<ul className="guiz-awards-row">
							<li className="guiz-awards-star"><span className="star rhodiumstar" /></li>
							<li className="guiz-awards-title">{ghichu_title}</li>
							<li className="guiz-awards-track">{ghichu}</li>
						</ul>
						<ul className="guiz-awards-row guiz-awards-row-even">
							<li className="guiz-awards-star"><span className="star platinumstar" /></li>
							<li className="guiz-awards-title">{tinhtrang_title}</li>
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
							<li className="guiz-awards-title">{loaitaisan_title}</li>
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
							<li className="guiz-awards-title">{nguonkinhphi_title}</li>
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
							<li className="guiz-awards-title">{donvi_title}</li>
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
							<li className="guiz-awards-title">{phong_title}</li>
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
							<li className="guiz-awards-title">{ngaynhap_title}</li>
							<li className="guiz-awards-track">{ngaynhap}</li>
						</ul>
						<ul className="guiz-awards-row guiz-awards-row-even">
							<li className="guiz-awards-star"><span className="star bronzestar" /></li>
							<li className="guiz-awards-title">{hansudung_title}</li>
							<li className="guiz-awards-track">{hansudung}</li>
						</ul>
						</div>
						<div className="guiz-awards-buttons">
						 	<Link className="guiz-awards-but-back" to={`/taisan`} ><i className="fa fa-angle-left" />{back}</Link>
							<Link className="guiz-awards-but-back" to={`/taisan/edit/${id}`} >{edit} <i className="fa fa-angle-right" /></Link>
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
					title= {"taisan.chitiet"}
				/>
			
				<QLCSVCContext.Consumer>
					{({ resource, editContextTS }) => <ViewTS classes={classes} editTs={this.props.editTs} resource={resource} match={this.props.match} editContextTS={editContextTS} />}
				</QLCSVCContext.Consumer>
			</div>
		)
	}

}


export default withRouter(withStyles(styles)(ViewTSWrap));
