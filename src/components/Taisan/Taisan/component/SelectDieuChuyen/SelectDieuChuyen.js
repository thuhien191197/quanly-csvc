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

class SoLuongComponent extends Component {
	state={
		soluong: 0
	}
	render(){
		const { 
			soluong
		} = this.state;

		const {
			i,
			item,
			handleName,
			handleDeleteSelect,
			arrSoLuong,
			classes,
		} = this.props
		return(
			<div key={i}>
				<Chip
					key={i}
					label={handleName(item)[0]}
					onDelete={handleDeleteSelect(item) }
					className={classes.chip}
				/>
				<TextField
					id="standard-name"
					value={arrSoLuong[i]}
					// value={this.handleName(item)[1]}
					style={{ marginRight: 30 }}
					type="number"
					// onChange={this.handleChangeSoluong('soluong')}
				/>
			</div>
		)
	}
}

class SelectDieuChuyenComponent extends Component {
	constructor(props) {
		super(props);
		const arrSoLuong = this.handleGetListSoLuong(props.selectedTS, props.resource || []);
		console.log("[SelectDieuChuyen] arrSoLuong: ", arrSoLuong)
		
		
		console.log("[SelectDieuChuyen]this props.resource: ", this.props.resource)
		this.state = {
			chuyenTS:[],
			ngayCTS:'2018-11-19',
			soluong: 0,
			id_taisan: '',
			id_phong:'',
			id_donvi:'',
			arrSoLuong
		}
	}
	handleGetListSoLuong = (selected, resourceTS) =>{
		var arr = []
		// const {selectedTS, resource} = this.props
		var  lengthSelect = selected.length
		var itemsTaiSan = resourceTS.taisan
		var lengthTS = itemsTaiSan.length
		for(var i = 0; i< lengthSelect; i++){
			for(var j = 0; j< lengthTS; j++){
				if(selected[i] === itemsTaiSan[j].id){
					arr.push(itemsTaiSan[j].soluong)
				}
			}
		}
		return arr;
	}

	handleChange = (name) => event => {
		 this.setState({
			[name]: event.target.value
		})
	};

	handleChangeSoluong = (item, i) => event => {

		this.setState({
		   arrSoLuong: event.target.value
	   })
   };


	handleName = (item) => {
		var getTaiSan = []
		this.props.resource.taisan.map(data => {
			return data.id === item? getTaiSan.push(data.name, data.soluong) : ''
		})
		
		return getTaiSan
	}

	render() {
		const { classes, match } = this.props;
		const { 
			chuyenTS,
			ngayCTS,
			soluong,
			id_taisan,
			id_phong,
			id_donvi,
			arrSoLuong
		} = this.state;
		const DieuChuyenTS = props => <Link to={`${match.url}/dieuchuyentaisan`} {...props} />
		console.log("[SelectDieuChuyen] arrSoLuong:",arrSoLuong)
		return (

			<Dialog
				open={this.props.openDieuChuyen}
				onClose={this.props.handleCloseDieuChuyen}
				aria-labelledby="form-dialog-title"
			>
			<form noValidate autoComplete="off">
				<DialogTitle id="form-dialog-title">Điều chuyển tài sản</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Hãy điều chỉnh số lượng của các tài sản
						
							<Paper className={classes.root}>
								{this.props.selectedTS.map((item, i) => {
									return(
										// <div key={i}>
										// 	<Chip
										// 		key={i}
										// 		label={this.handleName(item)[0]}
										// 		onDelete={this.props.handleDeleteSelect(item) }
										// 		className={classes.chip}
										// 	/>
										// 	<TextField
										// 		id="standard-name"
										// 		value={arrSoLuong[i]}
										// 		// value={this.handleName(item)[1]}
										// 		style={{ marginRight: 30 }}
										// 		type="number"
										// 		onChange={this.handleChangeSoluong(item, i)}
										// 	/>
										// </div>
										<SoLuongComponent 
											i={i} 
											item={item}
											handleName={this.handleName} 
											handleDeleteSelect={this.props.handleDeleteSelect}
											arrSoLuong = {this.state.arrSoLuong}
											// soluong = {this.state.soluong}
											classes ={classes}
										/>
									)
								})}
							</Paper>
							<TextField
								id="standard-name"
								select
								label="Đơn vị nhận"
								value={
									id_donvi
								}
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
								id="date"
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

						
						</DialogContentText>
						<DialogActions>
							<Button 
								// onClick={this.props.handleCloseDieuChuyen} 
								color="primary"
								component={DieuChuyenTS}
							>
								Chuyển
							</Button>
							<Button onClick={this.props.handleCloseDieuChuyen} color="primary">
								Cancel
							</Button>
						</DialogActions>
					</DialogContent>
				</form>
			</Dialog>	
		);
	}
}
class SelectDieuChuyen extends Component {
	render(){
		const { classes, match } = this.props;
		console.log("[SelectDieuChuyen]this props.selectedTS: ", this.props.selectedTS)
		return (
			<QLCSVCContext.Consumer>
				{({ resource, deleteContextTS,  addContextTS}) => {
					return (
						<SelectDieuChuyenComponent 
							resource={resource} 
							classes = {classes} 
							match = {match}
							selectedTS= {this.props.selectedTS} 
							openDieuChuyen = {this.props.openDieuChuyen} 
							handleCloseDieuChuyen={this.props.handleCloseDieuChuyen} 
							handleDeleteSelect={this.props.handleDeleteSelect} 
						 />
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}
}
export default withStyles(styles)(withRouter(SelectDieuChuyen));

