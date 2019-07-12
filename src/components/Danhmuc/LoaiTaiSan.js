import React, { Component } from 'react';
import { withRouter } from "react-router";
import NavBar from '../../general/NavBar/NavBar';
import { QLCSVCContext } from '../Main/Main';
import { withStyles } from '@material-ui/core/styles';
import Table1 from '../../general/Table/Table';
import { Switch, Route } from 'react-router-dom'
import * as R from 'ramda';
import { FormattedMessage } from "react-intl";

// import './LoaiTaiSan.css';
const styles = theme => ({
	appBar:{
		zIndex: "1",
		position: "fixed",
		top: "48px",
		left: "0",
		width: "100%",
		height: "4em",
		backgroundColor: "#efefef",
		/* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px, */
		color: "black",
		paddingLeft: "14%",
	},
	tabs:{
		marginTop: "4px",
		minHeight: "1px",
		// height: "38px",
	},
	titleLi:{
		// float: "left",
		fontSize: "1.0em",
		textTransform: "uppercase",
		paddingTop: "1em",
	},
	nav:{
		
	},
	nameDV:{
		marginLeft: "1em",
	}
});

const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]

class LoaiTaiSanComponent extends Component {
	constructor(props) {
		super(props);
		const data = this.handleGetListTable(props.resource, getParentPath(props.match.url) || []);
		this.state = {
			data,
			selectedTS: []
		}
	}

	componentWillReceiveProps(props, state) {
		const data = this.handleGetListTable(props.resource, getParentPath(props.match.url) || []);
		this.setState({
			data,
		})
	}

	getIDDanhMucCurrent = (resourceLTS, nameDMCurrent) =>{
		var itemsDanhMuc  = resourceLTS.danhmuc
		var lengthDM  = itemsDanhMuc.length
		var idDanhMuc = 0
		for(var j =0; j < lengthDM; j++){
			var item = itemsDanhMuc[j]
			if(item.name === nameDMCurrent){
				idDanhMuc = item.id
			}
		}
		return idDanhMuc
	}

	handleGetListTable = (resourceLTS, nameDMCurrent) =>{
		var itemsLoaiTaiSan = resourceLTS.loaitaisan
		var itemsDanhMuc  = resourceLTS.danhmuc
		// console.log("[DanhSachLTS] nameLTSCurrent:",this.getIDDanhMucCurrent(resourceLTS, nameDMCurrent))
		var idLDM = this.getIDDanhMucCurrent(resourceLTS, nameDMCurrent)
		var b =[]
		var length = itemsLoaiTaiSan.length
		for(var i = 0; i < length; i++){
			var item = itemsLoaiTaiSan[i]
			if(item.id_danhmuc === idLDM){
				var getNameDanhMuc = R.filter(R.propEq("id", item.id_danhmuc))
				const a = {
					'id' :item.id, 
					'name': item.name, 
					'id_danhmuc': item.id_danhmuc?getNameDanhMuc(itemsDanhMuc)[0].name:'', 
				};
				b.push(a);
			}

		}
		console.log("[DanhSachLTS] b:",b)

		return b
	}


	render(){
		const {rows} = this.props
		const {data} = this.state
		return(
			<div>
				{/* DanhSachTaiSan */}
				<Table1
					rows={rows} 
					items={data} 
					handleDelete = {this.handleDelete}  
				/>
			</div>
		)
	}
}

class LoaiTaiSan extends Component {

	constructor(props) {
		let name = <FormattedMessage id="loaitaisan.table.name" defaulMesage="Tên loại tài sản" />
		let danhmuc = <FormattedMessage id="loaitaisan.table.danhmuc" defaulMesage="Tên danh mục" />
		let functions = <FormattedMessage id="loaitaisan.table.functions" defaulMesage="Chức năng" />

		super(props);

		this.state = {	
			rows : [
				{ id: 'id', numeric: true, disablePadding: false, label: 'Id' },
				{ id: 'name', numeric: false, disablePadding: false, label: name },
				{ id: 'id_danhmuc', numeric: false, disablePadding: false, label: danhmuc },
				{ id: 'function', numeric: false, disablePadding: false, label: functions, function:['edit', 'add'] },
			],
	
			navBar : {
				danhsachLTS:{
					route:"/loaitaisan",
					title: "Danh sách loai tài sản",
				},
			}
		}

	}


	render() {
		const { match, classes } = this.props
		const { rows, navBar } = this.state
		const parentKey = Object.keys(navBar)
		console.log(">>>match :" , match)
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
							<LoaiTaiSanComponent 
								rows={rows} 
								resource={resource}  
								deleteContextTS={deleteContextTS} 
								match={match}
							/>
						</div>
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}
}

export default withStyles(styles)(withRouter(LoaiTaiSan))