import React, { Component } from 'react';
// import './DieuChuyenTaiSan.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router";
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { QLCSVCContext } from '../../../../Main/Main';
import { FormattedMessage } from "react-intl";
import axios from 'axios';

const styles = theme => ({
	root: {
	  display: 'flex',
	  justifyContent: 'center',
	  flexWrap: 'wrap',
	  padding: theme.spacing.unit / 2,
	  width: '840px',
	},
	chip: {
	  margin: theme.spacing.unit / 2,
	},
	soluong: {
		width: '15%',
	},
	form1: {
		width: '840px',
		// backgroundColor: 'red'
	}
});

class ItemDieuChuyenNhieu extends Component {
	state = {
		
		ngayCTS:'2018-11-19',
		soluong: this.props.soluongHienTai || 0,
		id_taisan: 0,
		id_phong:0 ,
		id_donvi:0 ,
	};

	handleChange = (name) => event => {
		this.setState({
		   [name]: event.target.value
	   })
	};
	
	

	render(){
		const { 
			ngayCTS,
			soluong,
			id_taisan,
			id_phong,
			id_donvi,
		} = this.state;

		const {
			keyTS,
			label,
			handleDeleteSelect,
			item,
			classes,
		} = this.props
		
		return (
			<div key={keyTS}>
				<form noValidate autoComplete="off">	
					<Chip
						key={keyTS}
						label={label}
						onDelete={handleDeleteSelect(item)}
						className={classes.chip}
					/>
					<br />
					<TextField
						id={`standard-name${keyTS}`}
						label={<FormattedMessage id="taisan.dieuchuyen.table.soluong" defaulMesage="Số lượng" />}
						helperText="Tổng số lượng"
						className={classes.soluong}
						value={soluong <= this.props.soluongHienTai&& soluong > 0 ? soluong: this.props.soluongHienTai}
						style={{ marginRight: 30 }}
						type="number"
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={this.handleChange('soluong')}
					/>

					<TextField
						id={`standard-name${keyTS}`}
						select
						label={<FormattedMessage id="taisan.dieuchuyen.table.donvinhan" defaulMesage="Đơn vị nhận" />}
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
						// margin="normal"
					>
						<option  value="">
							-- Chọn đơn vị --
						</option>
						{this.props.resource.donvi.map((item, i) => (
						<option key={i} value={item.id}>
							{item.name}
						</option>
						))}
					</TextField>

					<TextField
						id={`standard-name${keyTS}`}
						select
						label={<FormattedMessage id="taisan.dieuchuyen.table.phongnhan" defaulMesage="Phòng nhận" />}
						value={id_phong}
						onChange={this.handleChange('id_phong')}
						style={{ marginRight: 30 }}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						InputLabelProps={{
							shrink: true,
						}}
						// margin="normal"
					>
						{this.props.resource.phong.map((item, i) => {
							// console.log("phòng: ", item.id)
							return   parseInt(this.state.id_donvi) === item.id_donvi
							? <option key={i} value={item.id}>
								{item.name}
							</option>
							: 
							''
						
						})}
					</TextField>

					<TextField
						id={`standard-name${keyTS}`}
						label={<FormattedMessage id="taisan.dieuchuyen.table.ngaychuyen" defaulMesage="Ngày chuyển" />}
						type="date"
						// defaultValue="1997-11-19"
						value={ngayCTS}
						onChange={this.handleChange('ngayCTS')}
						// fullWidth
						style={{ marginRight: 30 }}
						// margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<Button 
						id="teoteo"
						onClick={(event) => this.props.handleAdd(event, keyTS, ngayCTS, soluong, this.props.item, id_phong, id_donvi)} 
						color="primary"
					>
						<i style={{ fontSize: 30 }} class="fas fa-arrow-alt-circle-right"></i>
					</Button>
				</form>
			</div>
		)
	}
}

class ButtonDieuChuyenNhieu extends Component {

	handleDieuChuyen = (event, resource, addContextDC) =>{
		event.preventDefault();
		const { chuyenTS, editContextTS, addContextTS } = this.props;
		let sumSoLuong = 0
		let idTS = 0
		// const itemsChuyenTaiSan = resource.chuyentaisan
		// var clone_chuyenTS = chuyenTS
		// clone_chuyenTS = itemsChuyenTaiSan.concat()
		// this.setState({
		// 	chuyenTS: clone_chuyenTS,
		// })
		const itemsTaiSan = resource.taisan
		var count = 0;
		for(var i =0; i < chuyenTS.length; i++){
			
			console.log("[SelectDieuChuyenNhieu] i: ", i)
			for(var j =0; j < itemsTaiSan.length; j++){
				var item = itemsTaiSan[j]
				// console.log("[SelectDieuChuyenNhieu] i: ", i)
				// console.log("[SelectDieuChuyenNhieu] item.id: ", item.id)
				// console.log("[SelectDieuChuyenNhieu] chuyenTS[i].id_taisan: ",  chuyenTS[i].id_taisan)
				var newItemEditTS = {}
				var newItemAddTS = {}
				if(chuyenTS[i].id_taisan === item.id ){
					// sửa item đó trong bản Tài sản, giảm số lượng lại
					var id = item.id
					var name = item.name
					var dongia = (item.dongia / item.soluong)*(item.soluong - chuyenTS[i].soluong)
					var soluong = (item.soluong - chuyenTS[i].soluong)
					var ngaynhap = item.ngaynhap
					var hansudung =  item.hansudung
					var ghichu = item.ghichu
					var id_loaitaisan= item.id_loaitaisan
					var id_donvi =item.id_donvi
					var id_kinhphi = item.id_kinhphi
					var id_phong = item.id_phong
					var id_user=  item.id_user
					var status= item.status
					newItemEditTS = {
						id : id,
						name: name,
						dongia: dongia,
						soluong:soluong,
						ngaynhap: ngaynhap,
						hansudung: hansudung,
						ghichu:ghichu,
						id_loaitaisan: id_loaitaisan,
						id_donvi: id_donvi,
						id_kinhphi: id_kinhphi,
						id_phong: id_phong,
						id_user: id_user,
						status: status
					}
					// console.log("[Select điều chuyển nhiều] newItem:",newItemEditTS);
					editContextTS(newItemEditTS)
					axios.put(`http://localhost:5500/taisan/${id}`, newItemEditTS)
					.then(res => {
						console.log("Edit done");
					})

					// vì tài sản đó được tách ra cho đơn vị khác nữa, nên phải thêm vào
					id = parseInt(parseInt(itemsTaiSan[itemsTaiSan.length - 1].id) + 1 + count)
					console.log("[Diều chuyển nhiều]>>>> parseInt(itemsTaiSan[itemsTaiSan.length - 1].id) + 1 +count:", parseInt(itemsTaiSan[itemsTaiSan.length - 1].id)+ 1+ count)
					name = item.name
					dongia = (item.dongia / item.soluong)*chuyenTS[i].soluong
					soluong = chuyenTS[i].soluong
					ngaynhap = item.ngaynhap
					hansudung =  item.hansudung
					ghichu = item.ghichu
					id_loaitaisan= item.id_loaitaisan
					id_donvi = chuyenTS[i].id_donvi
					id_kinhphi = item.id_kinhphi
					id_phong = chuyenTS[i].id_phong
					id_user=  item.id_user
					status= item.status
					newItemAddTS = {
						id : id,
						name: name,
						dongia: dongia,
						soluong:soluong,
						ngaynhap: ngaynhap,
						hansudung: hansudung,
						ghichu:ghichu,
						id_loaitaisan: id_loaitaisan,
						id_donvi: id_donvi,
						id_kinhphi: id_kinhphi,
						id_phong: id_phong,
						id_user: id_user,
						status: status
					}

					// console.log("[Select điều chuyển nhiều] newItemAddTS:",newItemAddTS);
					addContextTS(newItemAddTS)
					axios.post(`http://localhost:5500/taisan`, newItemAddTS)
					.then(res => {
						console.log("Add done");
					})
					idTS = chuyenTS[i].id_taisan
					sumSoLuong = item.soluong
					++count;
				}
			}
		
			// addContextDC
			axios.post(`http://localhost:5500/chuyentaisan`, chuyenTS[i])
			.then(res => {
			})

			//
			let name = "Tài sản "+ name + " được chuyển cho đơn vị " + id_donvi + " với số lượng " +  chuyenTS[i].soluong + " / " + sumSoLuong
			let link = "/taisan"
			let count1 = 0
			this.props.addContextThongBao({name, link,count1})
			axios.post(`http://localhost:5500/thongbao`, {name, link,count1})
			.then(res => {
			})
		}
		
	}

	render() {
		const {
			// handleDieuChuyen,
			DieuChuyenTS,
			handleCloseDieuChuyenNhieu,
			resource,
			addContextDC,
			editContextTS
		} = this.props
		return (
			<DialogActions>
				<Button 
					onClick={(event) => this.handleDieuChuyen(event, resource, addContextDC)} 
					color="primary"
					component={DieuChuyenTS}
					id="teo"
				>
					<FormattedMessage id="taisan.dieuchuyen" defaulMesage="Điều chuyển tài sản" />
				</Button>
				<Button onClick={handleCloseDieuChuyenNhieu} color="primary">
					<FormattedMessage id="cancel.title" defaulMesage="Cancel" />
				</Button>
			</DialogActions>
		)
	}
}

class SelectDieuChuyenNhieu extends Component {
	state ={
		chuyenTS:[],
	}
	handleName = (item) => {
		var getTaiSan = []
		this.props.resource.taisan.map(data => {
			return data.id === item? getTaiSan.push(data.name, data.soluong) : ''
		})
		
		return getTaiSan
	}


	handleAdd = (event, keyTS, ngayCTS, soluong, id_taisan, id_phong, id_donvi) => {
		// event.preventDefault();
		const { chuyenTS } = this.state;
		var soluong = parseInt(soluong);
		var id_phong = parseInt(id_phong);
		var id_donvi = parseInt(id_donvi);
		var newitem = {
			ngayCTS: ngayCTS,
			soluong:  soluong,
			id_taisan: id_taisan,
			id_phong: id_phong,
			id_donvi: id_donvi,
		}
		// var length = chuyenTS.length;
		var clone_chuyenTS = chuyenTS;

		clone_chuyenTS[keyTS] =  newitem;

		
		this.setState({
			chuyenTS: clone_chuyenTS,
		})
	}

	

	render() {
		const { classes, match } = this.props;
		console.log("[SelectDieuChuyenNhieu] chuyenTs: ", this.state.chuyenTS)
		const DieuChuyenTS = props => <Link to={`${match.url}/Danh sách điều chuyển`} {...props} />
		return (
			<QLCSVCContext.Consumer>
				{({ resource, addContextDC, editContextTS, addContextTS, addContextThongBao}) => {
					return (
				<div >
					<Dialog
						open={this.props.openDieuChuyenNhieu}
						onClose={this.props.handleCloseDieuChuyenNhieu}
						aria-labelledby="max-width-dialog-title"
						maxWidth='xl'
					>
						<DialogTitle id="form-dialog-title">
							<FormattedMessage id="taisan.dieuchuyen" defaulMesage="Điều chuyển tài sản" />
						</DialogTitle>
						<DialogContent>
							<DialogContentText>
								<FormattedMessage id="dieuchinhsoluong.title" defaulMesage="Hãy điều chỉnh số lượng của tài sản này" />
								<Paper className={classes.root} >
									{this.props.selectedTS.map((item, i) => {
										return(
											<ItemDieuChuyenNhieu 
												keyTS={i} 
												label={this.handleName(item)[0]} 
												handleDeleteSelect = {this.props.handleDeleteSelect}	
												item = {item}
												soluongHienTai = {this.handleName(item)[1]}
												resource = {resource}
												classes ={classes}
												chuyenTS = {this.state.chuyenTS}
												handleAdd ={this.handleAdd}
											/>
										)
									})}
								</Paper>
							</DialogContentText>
							<ButtonDieuChuyenNhieu 
								handleDieuChuyen={this.handleDieuChuyen} 
								DieuChuyenTS={DieuChuyenTS}
								handleCloseDieuChuyenNhieu= {this.props.handleCloseDieuChuyenNhieu}
								resource = {resource}
								addContextDC ={addContextDC}
								chuyenTS={this.state.chuyenTS}
								editContextTS={editContextTS}
								addContextTS={addContextTS}
								addContextThongBao={addContextThongBao}
							/>
						</DialogContent>
					
					</Dialog>	
				</div>
			)}}
			</QLCSVCContext.Consumer>
		);
	}
}

export default withStyles(styles)(withRouter(SelectDieuChuyenNhieu));
