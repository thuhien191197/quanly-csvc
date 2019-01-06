import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import * as R from 'ramda';
import { QLCSVCContext } from '../Main/Main';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Table1 from '../../general/Table/Table';
import NavBar from '../../general/NavBar/NavBar';
// import AddKP from './component/AddKP/AddKP';
// import EditKP from './component/EditKP/EditKP';


const getParentPathTitle = (path) => path.split('/').length > 0 && path.split('/')[1]


const styles = theme => ({

	vbLeft: {
		float: "left",
		marginLeft:'2%',
		marginRight:'2%'
	},
	vbRight: {
		float: "left",
	},

});

class VanBanMauComponent extends Component {
	constructor(props) {
		super(props);
		// const data = this.handleGetListTable(props.resource || []);
		// console.log("[Danhmuc] props.resource :", props.resource )
		this.state = {
			
			selectedTS: []
		}
	}

	handleGetListTable = (resourceKP) =>{
		var itemsKinhPhi = resourceKP.nguonkinhphi
		console.log("[Kinh phi] itemsKinhPhi:", itemsKinhPhi)
		var b =[]
		var length = itemsKinhPhi.length
		for(var i = 0; i < length; i++){
			var item = itemsKinhPhi[i]
			const a = {
				'id' :item.id, 
				'name': item.name, 
				'tongngansach': item.tongngansach,
				'tongchi': item.tongchi,
				'tongthanhly': item.tongthanhly
			};
			b.push(a);
		}
		return b
	}

	// componentWillReceiveProps(props, state) {
	// 	// console.log("Next props", props);
	// 	// const data = this.handleGetListTable(props.resource || []);
	// 	// { id: 'id', numeric: false, disablePadding: false, label: 'Id' },
	// 	// 	{ id: 'name', numeric: false, disablePadding: false, label: 'Tên kế hoạch' },
	// 	// 	{ id: 'donvi', numeric: false, disablePadding: false, label: 'Đơn vị' },
	// 	// 	{ id: 'ngaynhap', numeric: false, disablePadding: false, label: 'Ngày nhập' },
	// 	// 	{ id: 'status', numeric: false, disablePadding: false, label: 'Tình trạng' },
	// 	// 	{ id: 'function', nu
	// 	this.setState({
	// 		data: [
	// 			{
	// 				id: 0,
	// 				name: "Kế hoach Sưa Chữa tài sản 2018",
	// 				donvi:"Khoa CNTT",
	// 				ngaynhap:"2018/1/1",
	// 				loaikehoach:"Kế hoạch sửa chữa",
	// 				status:"Chờ duyệt"
	// 			},
	// 			{
	// 				id: 0,
	// 				name: "Kế hoach Sưa Chữa tài sản 2018",
	// 				donvi:"Khoa CNTT",
	// 				ngaynhap:"2018/1/1",
	// 				loaikehoach:"Kế hoạch sửa chữa",
	// 				status:"Chờ duyệt"
	// 			}
	// 		],
	// 	})
	// }

	handleDelete = (selected) => {
		if(window.confirm('Bạn có chắc muốn xóa không?')){
			var itemsKinhPhi = this.props.resource.nguonkinhphi;
			const dataDeleted = R.reject((item) => selected.indexOf(item.id)!== -1, itemsKinhPhi);
			this.props.deleteContextKinhPhi(dataDeleted);
			
			selected.forEach(function(select, i) {
				fetch('http://localhost:5500/nguonkinhphi/'+ select, {
					method: 'DELETE'
				});
			});
			this.setState({selected: [] });
		}
	}
	// downloadFile = (auth) => {
	// const drive = google.drive({version: ‘v3’, auth});
	// var fileId = ‘YOUR_FILE_ID’;
	// var dest = fs.createWriteStream(‘./FILE_NAME.extension’);
	// // example code here
	// }

	render() {
		const { rows, classes } = this.props;
		const { data } = this.state;
		// const link = document.createElement('a');
		// link.href = `https://drive.google.com/file/d/1Tr-_HXIiHx68CVL-_IlUq1Z8j69iX5m6/view?usp=sharing`;
		// document.body.appendChild(link);
		// link.click();
		// document.body.removeChild(link);

		return (
			<div>
				<div className={classes.vbLeft}>
					<Button 
						download 
						href='https://drive.google.com/file/d/1BTZGTevY9BhOeNPdr6dqDyxXw1HrzhFb/preview'
						variant="contained" size="small" className={classes.button}
					>
						<SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
						Download
					</Button>
					<div style={{clear:'both'}}></div>
					<iframe src="https://drive.google.com/file/d/1BTZGTevY9BhOeNPdr6dqDyxXw1HrzhFb/preview" width="540" height="480"></iframe>
				</div>
				<div className={classes.vbRight}>
					<Button 
						download 
						href='../../store/Mau_CSVC_KeHoachSuaChuaNangCapCSVC.doc'
						variant="contained" size="small" className={classes.button}
					>
						<SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
						Download
					</Button>
					<div style={{clear:'both'}}></div>
					<iframe src="https://drive.google.com/file/d/1Tr-_HXIiHx68CVL-_IlUq1Z8j69iX5m6/preview" width="540" height="480"></iframe>
				</div>
				
			</div>
		)
	}
}

class VanBanMau extends Component {
	state = {
		rows : [
			{ id: 'id', numeric: false, disablePadding: false, label: 'Id' },
			{ id: 'name', numeric: false, disablePadding: false, label: 'Tên kế hoạch' },
			{ id: 'donvi', numeric: false, disablePadding: false, label: 'Đơn vị' },
			{ id: 'ngaynhap', numeric: false, disablePadding: false, label: 'Ngày nhập' },
			{ id: 'status', numeric: false, disablePadding: false, label: 'Tình trạng' },
			{ id: 'loaikehoach', numeric: false, disablePadding: false, label: 'Loại kế hoạch' },
			{ id: 'function', numeric: false, disablePadding: false, label: 'Chức năng', function:['edit', 'add'] },
		],

		navBar : {
			danhsachKP:{
				route:"/danhmuc",
				title: "Xem và tải các văn bản mẫu",
				// component: "DanhSachTaiSan"
			},
		}
	}

	renderVanBanMau = () => {
		const { match, classes } = this.props
		const { rows, navBar } = this.state
		const parentKey = Object.keys(navBar)
		return (
			<QLCSVCContext.Consumer>
				{({ resource, deleteContextKinhPhi}) => {
					console.log("[Danhmuc] resource:", resource)
					return (
						<div>
							<NavBar
								match={match}
								classes={classes}
								parentKey={parentKey}
								navBar={navBar}
								title= {"Các văn bản mẫu"}
							/>
							<VanBanMauComponent 
								rows={rows} 
								resource={resource}  
								classes={classes}
								deleteContextKinhPhi={deleteContextKinhPhi} 
								match={match}
							/>
						</div>
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}


	render() {
		return (
			<div>
				<Switch>
					<Route path="/kehoach/VanBanMau" exact render={this.renderVanBanMau}></Route>
					{/* <Route exact path="/danhmuc/Nguồn Kinh Phí/add" component={() => <AddKP addAPIKinhPhi={this.addAPIKinhPhi} />}></Route>
					<Route exact path="/danhmuc/Nguồn Kinh Phí/edit/:id" component={() => <EditKP editAPIKinhPhi={this.editAPIKinhPhi} />}></Route> */}
				</Switch>
			</div>
		);
	}
}

export default withRouter(withStyles(styles)(VanBanMau));
