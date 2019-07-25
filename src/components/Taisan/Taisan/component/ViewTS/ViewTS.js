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
