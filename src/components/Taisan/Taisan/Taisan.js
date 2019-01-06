import React, { Component } from 'react';
import './Taisan.css';
import { withStyles } from '@material-ui/core/styles';
import Table1 from '../../../general/Table/Table'
import * as R from 'ramda';
import { Switch, Route } from 'react-router-dom'
import DieuChuyenTaiSan from '../DieuChuyenTaiSan/DieuChuyenTaiSan';
import ThanhLy from '../ThanhLy/ThanhLy';
import ThongKe from '../ThongKe/ThongKe';
import axios from 'axios';
import AddTS from './component/AddTS/AddTS';
import EditTS from './component/EditTS/EditTS';
import ViewTS from './component/ViewTS/ViewTS';
import { QLCSVCContext } from '../../Main/Main';
import { withRouter } from "react-router";
import SelectDieuChuyen from './component/SelectDieuChuyen/SelectDieuChuyen';
import SelectDieuChuyenNhieu from './component/SelectDieuChuyen/SelectDieuChuyenNhieu';
import SelectThanhLyNhieu from './component/SelectThanhLy/SelectThanhLyNhieu';
import NavBar from '../../../general/NavBar/NavBar';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { TextField, Button } from '@material-ui/core';

export const itemsTaisan = [];
// const getParentPathTitle = (path) => path.split('/').length > 0 && path.split('/')[1]


const styles = theme => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
		  backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
		  marginLeft: theme.spacing.unit,
		  width: 'auto',
		},
		marginBottom: '12px',
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
		  width: 120,
		  '&:focus': {
			width: 200,
		  },
		},
		border: '1px solid #3F5191',
	},
});


class TableComponent extends Component {
	constructor(props) {
		super(props);
		const data = this.handleGetListTable(props.resource || []);
		this.state = {
			data,
			openDieuChuyen: false,
			openDieuChuyenNhieu: false,
			openThanhLyNhieu: false,
			selectedTS: [],
			textSearch:''
		}
	}
	// Chọn dữ liệu của các trường cho bảng
	handleGetListTable = (resourceTS) =>{
		var itemsUser  = resourceTS.user
		var itemsTaisan = resourceTS.taisan
		var itemsLoaiTaiSan = resourceTS.loaitaisan
		var itemsDonVi  = resourceTS.donvi
		console.log("[TaiSAn] itemsUser:",itemsUser)
		var b =[]
		var length =itemsTaisan.length
		for(var i = 0; i < length; i++){
			var item = itemsTaisan[i]
			let getNameUser = R.filter(R.propEq("id", item.id_user))
			var getNameLoaiTaiSan = R.filter(R.propEq("id", item.id_loaitaisan))
			var getNameDonvi = R.filter(R.propEq("id", item.id_donvi))
			
			const a = {'id' :item.id, 
				'name': item.name, 
				'dongia': item.dongia, 
				'soluong': item.soluong, 
				'ngaynhap': item.ngaynhap, 
				'id_loaitaisan': item.id_loaitaisan?getNameLoaiTaiSan(itemsLoaiTaiSan)[0].name:'', 
				'id_donvi': item.id_donvi?getNameDonvi(itemsDonVi)[0].name:'', 
				'id_user': item.id_user?getNameUser(itemsUser)[0].fullname:'',
			};
			b.push(a);
		}
		return b
	}

	componentWillReceiveProps(props, state) {
		const data = this.handleGetListTable(props.resource || []);
		this.setState({
			data,
		})
	}

	handleDelete = (selected) => {
		var itemsTaisan = this.props.resource.taisan;
		const dataDeleted = R.reject((item) => selected.indexOf(item.id)!== -1, itemsTaisan);
		this.props.deleteContextTS(dataDeleted);
		
		selected.forEach(function(select, i) {
			fetch('http://localhost:5500/taisan/'+ select, {
				method: 'DELETE'
			});
		});
		// this.setState({selected: [] });
	}


	handleClickOpen = (selected) => {
		console.log("[TaiSan] Im here:")
		this.setState({ 
			selectedTS: selected, 
			openDieuChuyen: true 
		});
	};
	
	handleCloseDieuChuyen = () => {
		this.setState({ openDieuChuyen: false });
	};

	// mở ra điều chuyển số lượng nhiều đến nhiều Đơn vị
	handleClickOpenNhieu = (selected) => {
		console.log("[TaiSan] Im here:")
		this.setState({ 
			selectedTS: selected, 
			openDieuChuyenNhieu: true 
		});
	};
	
	handleCloseDieuChuyenNhieu = () => {
		this.setState({ openDieuChuyenNhieu: false });
	};

	// Mỏ ra cửa sổ để thanh lý tài sản vừa chọn
	handleClickOpenThanhLy = (selected) => {
		console.log("[TaiSan] Im here:")
		this.setState({ 
			selectedTS: selected, 
			openThanhLyNhieu: true 
		});
	};

	handleCloseThanhLyNhieu = () => {
		this.setState({ openThanhLyNhieu: false });
	};



	handleDeleteSelect = data => () => {
		this.setState(prev => {
		  	const selectData = [...prev.selectedTS];
		//   const chipToDelete = selectData.indexOf(data);
		//   selectData.splice(chipToDelete, 1);
			selectData.pop(data)
		  	return { selectedTS: selectData };
		});
	};

	onSearch = (event, text, resource) => {
		
		event.preventDefault();
		// event.preventDefault();
		// var dataFilted = vocabIndex.filter((key)=> {
		// 	if(vocab[key].word.toUpperCase().indexOf(text.toUpperCase())>=0) return true
		// 	return false
		// })
		var dataFilted = []
		dataFilted = this.state.data.filter((item, index)=> {
			console.log("[TaiSan] item:", item)

			if(item.name.toUpperCase().indexOf(text.toUpperCase())>=0) return true
			return false
		})
		console.log("[TaiSan] dataFilted:", dataFilted)
		this.setState({data: dataFilted});
	}
	
	onChangeSearch = (event) => {
		if(event.target.value !== ''){
			this.setState({
				textSearch: event.target.value,
			})
		} else{
			this.setState({
				data: this.handleGetListTable(this.props.resource || []),
			})
		}
	}

	render() {
		const { rows, classes} = this.props;
		const { data } = this.state;
		
		return (
			<div>
				{/* Taisan */}
				<SelectDieuChuyen 
					selectedTS= {this.state.selectedTS} 
					// resource = {this.props.resource}
					openDieuChuyen = {this.state.openDieuChuyen} 
					handleCloseDieuChuyen={this.handleCloseDieuChuyen} 
					handleDeleteSelect={this.handleDeleteSelect} 
				/>
				<SelectDieuChuyenNhieu 
					selectedTS= {this.state.selectedTS} 
					resource = {this.props.resource}
					openDieuChuyenNhieu = {this.state.openDieuChuyenNhieu} 
					handleCloseDieuChuyenNhieu ={this.handleCloseDieuChuyenNhieu} 
					handleDeleteSelect={this.handleDeleteSelect} 
				/>

				<SelectThanhLyNhieu
					selectedTS= {this.state.selectedTS} 
					resource = {this.props.resource}
					openThanhLyNhieu = {this.state.openThanhLyNhieu} 
					handleCloseThanhLyNhieu ={this.handleCloseThanhLyNhieu} 
					handleDeleteSelect={this.handleDeleteSelect} 
				/>

				<div className={classes.search}>
					
					<form onSubmit={(event) => this.onSearch(event, this.state.textSearch, this.props.resource)}  noValidate autoComplete="off">
							{/* <TextField
								defaultValue={this.state.textSearch}
								onChange={this.onChangeSearch}
							/>
							<input className={classes.input} type="submit" value="Submit" /> */}
						<div className={classes.searchIcon}>
						<SearchIcon />
						</div>
						<InputBase
						placeholder="Search…"
						defaultValue={this.state.textSearch}
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						onChange={this.onChangeSearch}
						/>
					</form>
				</div>

				<Table1 
					rows={rows} 
					items={data} 
					handleDelete = {this.handleDelete}  
					handleClickOpen = {this.handleClickOpen}
					handleClickOpenNhieu = {this.handleClickOpenNhieu}
					handleClickOpenThanhLy = {this.handleClickOpenThanhLy}
					// selectApp={selectApp}
					
				/>
			</div>
		)
	}
}

class Taisan extends Component {
	state = {
		rows : [
			{ id: 'id', numeric: true, disablePadding: false, label: 'Id' },
			{ id: 'name', numeric: false, disablePadding: false, label: 'Tên tài sản' },
			{ id: 'dongia', numeric: false, disablePadding: false, label: 'Đơn giá' },
			{ id: 'soluong', numeric: false, disablePadding: true, label: 'Số lượng' },
			{ id: 'ngaynhap', numeric: false, disablePadding: false, label: 'Ngày nhập' },
			{ id: 'id_loaitaisan', numeric: false, disablePadding: false, label: 'Loại tài sản' },
			{ id: 'id_donvi', numeric: false, disablePadding: false, label: 'Đơn vị' },
			{ id: 'id_user', numeric: false, disablePadding: false, label: 'Người nhập' },
			{ id: 'function', numeric: false, disablePadding: false, label: 'Chức năng', function:['edit','dieuchuyen','thanhly', 'add','view'] },
		],

		navBar : {
			danhsachTS:{
				route:"/taisan",
				title: "Danh sách tài sản",
				// component: "DanhSachTaiSan"
			},
		}
	}

	// handleGetListTable = (resourceTS) =>{
	// 	var itemsTaisan = resourceTS.taisan
	// 	var itemsLoaiTaiSan = resourceTS.loaitaisan
	// 	var itemsDonVi  = resourceTS.donvi
	// 	var itemsUser  = resourceTS.user
	// 	var b =[]
	// 	itemsTaisan.map(item => {
	// 		var getNameLoaiTaiSan = R.filter(R.propEq("id", item.id_loaitaisan))
	// 		var getNameDonvi = R.filter(R.propEq("id", item.id_donvi))
	// 		var getNameUser = R.filter(R.propEq("id", item.id_user))
	// 		const a = {'id' :item.id, 'name': item.name, 'dongia': item.dongia, 'soluong': item.soluong, 'ngaynhap': item.ngaynhap, 'id_loaitaisan': item.id_loaitaisan?getNameLoaiTaiSan(itemsLoaiTaiSan)[0].name:'', 'id_donvi': item.id_donvi?getNameDonvi(itemsDonVi)[0].name:'', 'id_user': item.id_user?getNameUser(itemsUser)[0].fullname:''};
	// 		b.push(a);
	// 	})
	// 	return b
	// }


	render1 = () => {
		const { match, classes } = this.props
		const { rows, navBar } = this.state
		const parentKey = Object.keys(navBar)
		return (
			<QLCSVCContext.Consumer>
				{({ resource, deleteContextTS}) => {
					
					return (
						<div>
							
							<NavBar
							match={match}
							classes={classes}
							parentKey={parentKey}
							navBar={navBar}
							title= {"Tài sản"}
							/>
							<TableComponent 
								rows={rows} 
								resource={resource}  
								deleteContextTS={deleteContextTS} 
								match={match}
								classes={classes}
							/>
						</div>
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}
	
	
	addTs = (id, name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status) => {
		axios.post(`http://localhost:5500/taisan`, { name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status})
		.then(res => {
		})
		// console.log("[TaiSan] name:",name)
	}

	editTs = ({id,name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status}) => {
		// console.log('Edit item server', id);
		axios.put(`http://localhost:5500/taisan/${id}`, {id, name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status})
		.then(res => {
			console.log("Edit done");
		})
	}
	render() {
		const { match, classes } = this.props
		const { value, navBar } = this.state;
		return (
			<div>
				
				<Switch>
					<Route path="/taisan" exact render={this.render1}></Route>
					<Route exact path="/taisan/add" component={() => <AddTS addTs={this.addTs} />}></Route>
					<Route exact path="/taisan/Danh sách điều chuyển" render={() => <DieuChuyenTaiSan />} />
					<Route exact path="/taisan/Danh sách thanh lý" render={() => <ThanhLy />} />
					<Route exact path="/taisan/Thống kê" render={() => <ThongKe />} />
					<Route exact path="/taisan/edit/:id" component={() => <EditTS editTs={this.editTs} />}></Route>
					<Route exact path="/taisan/view/:id" component={() => <ViewTS  />}></Route>
					{/* <Route exact path="/taisan/danhsachdieuchuyen" render={() => <DieuChuyenTS />} /> */}
				</Switch>
			</div>
		)
		
	}
}
export default withRouter(withStyles(styles)(Taisan));

