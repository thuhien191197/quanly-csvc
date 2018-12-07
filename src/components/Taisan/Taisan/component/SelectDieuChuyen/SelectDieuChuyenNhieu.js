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
	},
	chip: {
	  margin: theme.spacing.unit / 2,
	},
});

class ItemDieuChuyenNhieu extends Component {
	state = {
		
		ngayCTS:'2018-11-19',
		soluong: 0,
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
	
	handleAdd = (event, ngayCTS, soluong, id_taisan, id_phong, id_donvi) => {
		event.preventDefault();
		const { chuyenTS } = this.props;
		var newitem = {
			ngayCTS: ngayCTS,
			soluong:  soluong,
			id_taisan: id_taisan,
			id_phong: id_phong,
			id_donvi: id_donvi,
		}
		// var length = chuyenTS.length;
		var clone_chuyenTS = chuyenTS;
		chuyenTS.push(newitem);
		this.setState({
			chuyenTS: clone_chuyenTS,
		})
	}

	render(){
		const { 
			ngayCTS,
			soluong,
			id_taisan,
			id_phong,
			id_donvi,
			arrSoLuong
		} = this.state;

		const {
			key,
			label,
			handleDeleteSelect,
			item,
			classes,
			soluongHienTai
		} = this.props
		console.log("[SelectDieuChuyenNhieu] chuyenTs: ", this.state.chuyenTS)
		return (
			<div key={key}>
				<form noValidate autoComplete="off">	
					<Chip
						key={key}
						label={label}
						onDelete={handleDeleteSelect(item)}
						className={classes.chip}
					/>
					<TextField
						id={`standard-name${key}`}
						value={soluongHienTai}
						style={{ marginRight: 30 }}
						type="number"
						onChange={this.handleChange('soluong')}
					/>

					<TextField
						id={`standard-name${key}`}
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
						helperText="Bạn muốn chuyển đến đâu ?"
						margin="normal"
					>
						{this.props.resource.donvi.map((item, i) => (
						<option key={i} value={item.id}>
							{item.name}
						</option>
						))}
					</TextField>

					<TextField
						id={`standard-name${key}`}
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
						id={`standard-name${key}`}
						label="Ngày nhập"
						type="date"
						// defaultValue="1997-11-19"
						value={ngayCTS}
						onChange={this.handleChange('ngayCTS')}
						// fullWidth
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<Button 
						onClick={(event) => this.handleAdd(event, key, ngayCTS, soluong, id_taisan, id_phong, id_donvi)} 
						color="primary"
					>
						OK
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

	render() {
		const { classes, match } = this.props;
		
		const DieuChuyenTS = props => <Link to={`${match.url}/dieuchuyentaisan`} {...props} />
		return (
			<QLCSVCContext.Consumer>
				{({ resource}) => {
					return (
				<Dialog
					open={this.props.openDieuChuyenNhieu}
					onClose={this.props.handleCloseDieuChuyenNhieu}
					aria-labelledby="form-dialog-title"
				>
				
					<DialogTitle id="form-dialog-title">Điều chuyển tài sản</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Hãy điều chỉnh số lượng của các tài sản đến các đơn vị bạn muốn
							
								<Paper className={classes.root}>
									{this.props.selectedTS.map((item, i) => {
										return(
											<ItemDieuChuyenNhieu 
												key={i} 
												label={this.handleName(item)[0]} 
												handleDeleteSelect = {this.props.handleDeleteSelect}	
												item = {item}
												soluongHienTai = {this.handleName(item)[0]}
												resource = {resource}
												classes ={classes}
												chuyenTS = {this.state.chuyenTS}
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
			)}}
			</QLCSVCContext.Consumer>
		);
	}
}

export default withStyles(styles)(withRouter(SelectDieuChuyenNhieu));
