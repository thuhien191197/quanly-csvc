import React, { Component } from 'react';
import './Taisan.css';
import { withStyles } from '@material-ui/core/styles';
import Table1 from '../../../general/Table/Table'
import * as R from 'ramda';
import { Switch, Route } from 'react-router-dom'
import DieuChuyenTaiSan from '../DieuChuyenTaiSan/DieuChuyenTaiSan';
import ThanhLy from '../ThanhLy/ThanhLy';
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
import { TextField, Button } from '@material-ui/core';
import { FormattedMessage } from "react-intl";

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
		// marginBottom: '12px',
		float: 'left',
		marginTop: '17px',
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
		border: '1px solid rgb(169, 169, 169)',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		// padding: '9.5px 14px',

	},
	btnFil:{
		minHeight: '53px',
		bottom: '-17px',

	},
	filLeft:{

	}
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
			textSearch:'',
			textLoaiTaiSan:''
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
		
		if(window.confirm('Bạn có chắc muốn xóa không?')){
			console.log("[TaiSan] Im here:")
			var itemsTaisan = this.props.resource.taisan;
			const dataDeleted = R.reject((item) => selected.indexOf(item.id)!== -1, itemsTaisan);
			this.props.deleteContextTS(dataDeleted);
			
			selected.forEach(function(select, i) {
				fetch('http://localhost:5500/taisan/'+ select, {
					method: 'DELETE'
				});
			});
		}
	}


	handleClickOpen = (selected) => {
		
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
		var dataFilted = []
		dataFilted = this.state.data.filter((item, index)=> {
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
	handleChange = name => event => {
		if(event.target.value === 'all'){
			this.setState({
				data: this.handleGetListTable(this.props.resource || []),
			});
		}else 
		this.setState({
		  [name]: event.target.value,
		  data: this.handleGetListTable(this.props.resource || []),
		});

	};
	onFilterLTS = (event) =>{
		event.preventDefault();
		var dataFilted = []
		console.log("[TaiSan]  this.state.textLoaiTaiSan: ",  this.state.textLoaiTaiSan)
		dataFilted = this.state.data.filter((item, index)=> {
			if(item.id_loaitaisan === this.state.textLoaiTaiSan) return true
			return false
		})
		console.log("[TaiSan] dataFilted:", dataFilted)
		this.setState({data: dataFilted});
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
				
				{/* Search */}
				<div className={classes.search}>
					<form onSubmit={(event) => this.onSearch(event, this.state.textSearch, this.props.resource)}  noValidate autoComplete="off">
						{/* <div className={classes.searchIcon}>
						<SearchIcon />
						</div> */}
						<TextField
							label={<FormattedMessage id="search.title" defaulMesage="Search" />}
							value={this.state.textSearch}
							onChange={this.onChangeSearch}
							variant="outlined"
						/>
					</form>
				</div>
				<div className={classes.filLeft}>
					<form onSubmit={(event) => this.onFilterLTS(event, this.props.resource)}  noValidate autoComplete="off">
						<TextField
							id="outlined-select-currency-native"
							select
							label={<FormattedMessage id="taisan.filter" defaulMesage="Filter" />}
							className={classes.textField}
							value={this.state.textLoaiTaiSan}
							onChange={this.handleChange('textLoaiTaiSan')}
							SelectProps={{
								native: true,
								MenuProps: {
								className: classes.menu,
								},
							}}
							InputLabelProps={{
								shrink: true,
							}}
							// helperText="Please select your loaitaisan"
							margin="normal"
							// paddingBottom="12px"
							variant="outlined"
						>
							
							<FormattedMessage id='taisan.filter.all' defaulMesage="All Filter" >
								{(message) => <option value="all">{message}</option>}
							</FormattedMessage>
							
							{this.props.resource.loaitaisan.map((item, i) => {
								console.log("item:", item.id)
								return (
									<option key={i} value={item.name}>
										{item.name}
									</option>
								)
							})}
						</TextField>
						<Button variant="contained"
						className={classes.btnFil}
						type="submit"
						>
							Filter
						</Button>
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
	constructor(props) {
		let name = <FormattedMessage id="taisan.table.name" defaulMesage="Name" />
		let dongia = <FormattedMessage id="taisan.table.dongia" defaulMesage="Don gia" />
		let soluong = <FormattedMessage id="taisan.table.soluong" defaulMesage="so luong" />
		let ngaynhap = <FormattedMessage id="taisan.table.ngaynhap" defaulMesage="Ngay nnhap" />
		let loaitaisan = <FormattedMessage id="taisan.table.loaitaisan" defaulMesage="Loai tai san" />
		let donvi = <FormattedMessage id="taisan.table.donvi" defaulMesage="Don vi" />
		let nguoinhap = <FormattedMessage id="taisan.table.nguoinhap" defaulMesage="Nguoi nhap" />
		let functions = <FormattedMessage id="taisan.table.functions" defaulMesage="Functions" />

		super(props);
		this.state = {		
			rows : [
				{ id: 'id', numeric: true, disablePadding: false, label: 'Id' },
				{ id: 'name', numeric: false, disablePadding: false, label: name },
				{ id: 'dongia', numeric: false, disablePadding: false, label: dongia },
				{ id: 'soluong', numeric: false, disablePadding: true, label: soluong },
				{ id: 'ngaynhap', numeric: false, disablePadding: false, label: ngaynhap},
				{ id: 'id_loaitaisan', numeric: false, disablePadding: false, label: loaitaisan},
				{ id: 'id_donvi', numeric: false, disablePadding: false, label: donvi },
				{ id: 'id_user', numeric: false, disablePadding: false, label: nguoinhap},
				{ id: 'function', numeric: false, disablePadding: false, label: functions, function:['edit','dieuchuyen','thanhly', 'add','view'] },
			],
	
			navBar : {
				danhsachTS:{
					route:"/taisan",
					title: "Danh sách tài sản",
					messageId : "taisan.navBar"
					// component: "DanhSachTaiSan"
				},
			}
		}
	}

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
							title= {"taisan.title"}
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
					<Route exact path="/taisan/edit/:id" component={() => <EditTS editTs={this.editTs} />}></Route>
					<Route exact path="/taisan/view/:id" component={() => <ViewTS  />}></Route>
					{/* <Route exact path="/taisan/danhsachdieuchuyen" render={() => <DieuChuyenTS />} /> */}
				</Switch>
			</div>
		)
		
	}
}
export default withRouter(withStyles(styles)(Taisan));

