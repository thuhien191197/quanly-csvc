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
		id_taisan: '',
		id_phong:'',
		id_donvi:'',
		arrSoLuong:[]
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
						label="Số lượng"
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
						label="Đơn vị nhận"
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
						helperText="Nơi muốn chuyển"
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
						label="Phòng"
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
						helperText="Chọn phòng"
						// margin="normal"
					>
						<option  value="">
							-- Chọn phòng --
						</option>
						{this.props.resource.phong.map((item, i) => {
							// console.log("phòng: ", item.id)
							return (
								<option key={i} value={item.id}>
									{item.name}
								</option>
							)
						})}
					</TextField>

					<TextField
						id={`standard-name${keyTS}`}
						label="Ngày nhập"
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
						onClick={(event) => this.props.handleAdd(event, keyTS, ngayCTS, soluong, this.props.idTaiSan, id_phong, id_donvi)} 
						color="primary"
					>
						<i style={{ fontSize: 30 }} class="fas fa-arrow-alt-circle-right"></i>
					</Button>
				</form>
			</div>
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
		event.preventDefault();
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
		const DieuChuyenTS = props => <Link to={`${match.url}/dieuchuyentaisan`} {...props} />
		return (
			<QLCSVCContext.Consumer>
				{({ resource}) => {
					return (
				<div >
				<Dialog
					open={this.props.openDieuChuyenNhieu}
					onClose={this.props.handleCloseDieuChuyenNhieu}
					aria-labelledby="max-width-dialog-title"
					maxWidth='xl'
				>
				
					<DialogTitle id="form-dialog-title">Điều chuyển tài sản</DialogTitle>
					<DialogContent
					
					>
						<DialogContentText>
							Hãy điều chỉnh số lượng của các tài sản đến các đơn vị bạn muốn
							
								<Paper className={classes.root} >
									{this.props.selectedTS.map((item, i) => {
										return(
											<ItemDieuChuyenNhieu 
												keyTS={i} 
												label={this.handleName(item)[0]} 
												handleDeleteSelect = {this.props.handleDeleteSelect}	
												idTaiSan = {item}
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
							<DialogActions>
								<Button 
									// onClick={this.props.handleCloseDieuChuyen} 
									color="primary"
									component={DieuChuyenTS}
								>
									Chuyển
								</Button>
								<Button onClick={this.props.handleCloseDieuChuyenNhieu} color="primary">
									Cancel
								</Button>
							</DialogActions>
						</DialogContent>
					
				</Dialog>	
				</div>
			)}}
			</QLCSVCContext.Consumer>
		);
	}
}

export default withStyles(styles)(withRouter(SelectDieuChuyenNhieu));
