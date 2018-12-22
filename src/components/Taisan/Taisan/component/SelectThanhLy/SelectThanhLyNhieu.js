import React, { Component } from 'react';
// import './ThongKe.css';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import { QLCSVCContext } from '../../../../Main/Main';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]

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


class SelectThanhLyNhieuComponent extends Component {
	constructor(props) {
		super(props);
		const arrSoLuong = this.handleGetListSoLuong(props.selectedTS, props.resource || []);
		
		this.state = {
			thanhlyTS:[],
			ngayTL:'2018-11-19',
			lydo: '',
			soluong: 0,
			image:'https://farm2.staticflickr.com/1738/42575021701_788f8b74b0_z.jpg',
			status:0,
			id_taisan: '',
			arrSoLuong
		}
	}
	componentWillReceiveProps(props, state) {
		const arrSoLuong = this.handleGetListSoLuong(props.selectedTS, props.resource|| []);
		this.setState({
			arrSoLuong,
		})
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
					var idTS = itemsTaiSan[j].id
					var soluong = itemsTaiSan[j].soluong
					var newItem = {
						id_taisan : idTS,
						soluong
					}
					arr.push(newItem)
				}
			}
		}
		console.log("[SelectDieuChuyen] >>>>> arr: ", arr[0])
		return arr;
	}

	handleChange = (name) => event => {
		this.setState({
		   [name]: event.target.value
	   })
	};
	   
	handleChangeSoluong = (event, soluong, i) => {
		var arr = []
		arr = this.state.arrSoLuong
		arr[i].soluong = parseInt(event.target.value)
		this.setState({
			arrSoLuong: arr
	   })
	};
	   
	handleName = (item) => {
		var getTaiSan = []
		this.props.resource.taisan.map(data => {
			return data.id === item? getTaiSan.push(data.name, data.soluong) : ''
		})
		return getTaiSan
	}

	// up ảnh
	handleImageChange = (event) => {
		event.preventDefault();
		let reader = new FileReader();
		let file = event.target.files[0];
		// console.log(">>>>>", event.file, file)
		const self = this
		reader.onload = function(upload) {
			self.setState({
				image: reader.result
			});
		};
		reader.readAsDataURL(file); 
	}

	// thêm vào danh sách thanh lý
	handleThanhLy= (event, resource, addContextTL) =>{
		event.preventDefault();
		const { editContextTS, addContextTS } = this.props;
		const { 
			ngayTL,
			lydo,
			arrSoLuong, 
			image,
			status,
			id_taisan
		} = this.state;
		var newItemEditTS = {}
		var newItemAddTS = {}
		
		const itemsTaiSan = resource.taisan
		for(var i= 0; i < arrSoLuong.length; i++){
			for(var j = 0; j < itemsTaiSan.length; j++){
				var item = itemsTaiSan[j]
				console.log("[SelectDieuChuyen] >>>>> arrSoLuong[i].id_taisan: ", arrSoLuong[i].id_taisan)
				console.log("[SelectDieuChuyen] >>>>> item.id: ", item.id)
				if(arrSoLuong[i].id_taisan === item.id){
					// sửa item đó trong bản tài sản, giảm số lượng xuống
					var id = item.id
					var name = item.name
					var dongia = (item.dongia / item.soluong)*(item.soluong - arrSoLuong[i].soluong)
					var soluong = (item.soluong - arrSoLuong[i].soluong)
					var ngaynhap = item.ngaynhap
					var hansudung =  item.hansudung
					var ghichu = item.ghichu
					var id_loaitaisan= item.id_loaitaisan
					var id_donvi =item.id_donvi
					var id_kinhphi = item.id_kinhphi
					var id_phong = item.id_phong
					var id_user=  item.id_user
					var status1= 0
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
						status: status1
					}
					console.log("[SelectDieuChuyen] >>>>> newItemEditTS: ", newItemEditTS)
					editContextTS(newItemEditTS)
					axios.put(`http://localhost:5500/taisan/${id}`, newItemEditTS)
					.then(res => {
						console.log("Edit done");
					})
				}
			}
			// thêm vào danh sách thanh lý
			const itemsThanhLy = resource.thanhly
			var id
			itemsThanhLy.length!==0
			? id = parseInt(itemsThanhLy[itemsThanhLy.length - 1].id) + 1
			: id = 1
			var ngayTL1 = "2018-5-1"
			var lydo1 = lydo
			var soluong1 = arrSoLuong[i].soluong
			var image1 = image
			var status1 =  1
			var id_taisan1 = arrSoLuong[i].id_taisan
			var newThanhLy = {
				id,
				ngayTL :ngayTL1,
				lydo: lydo1,
				soluong: soluong1 ,
				image: image1,
				status: status1,
				id_taisan: id_taisan1
			}
			addContextTL(newThanhLy)
			axios.post(`http://localhost:5500/thanhly`, newThanhLy)
			.then(res => {
			})
		}
		
		
	}

	render() {
		const { classes, match, resource, addContextTL } = this.props;
		const { 
			thanhlyTS,
			ngayTL,
			lydo,
			soluong,
			image,
			status,
			id_taisan,
			arrSoLuong
		} = this.state;

		// ảnh 
		let $imagePreview = null;
		if (image) {
			$imagePreview = (<img src={image} style={{width:'8em'}}/>);
		} else {
			$imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
		}

		console.log("[SelectDieuChuyen] >>> arrSoLuong: ", arrSoLuong)
		return (
			<Dialog
				open={this.props.openThanhLyNhieu}
				onClose={this.props.handleCloseThanhLyNhieu}
				aria-labelledby="form-dialog-title"
			>
				<form noValidate autoComplete="off">
					<DialogTitle id="form-dialog-title">Thanh lý tài sản</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Hãy điều chỉnh số lượng của các tài sản
							<Paper className={classes.root}>
								{this.props.selectedTS.map((item, i) => {
									// số lượng ban đầu của item đó
									var soluongHienTai
									for(let i=0 ; i < resource.taisan.length; i++){
										if(resource.taisan[i].id === item){
											soluongHienTai = resource.taisan[i].soluong
										}
									}
									//console.log("[ thanh ly] resource.taisan[item].soluong:", soluongHienTai)
									return(
										<div>
											<Chip
												key={i}
												label={this.handleName(item)[0]}
												onDelete={this.props.handleDeleteSelect(item) }
												className={classes.chip}
											/>
											<TextField
												id="standard-name"
												value={0<arrSoLuong[i].soluong&& arrSoLuong[i].soluong< soluongHienTai ? arrSoLuong[i].soluong: soluongHienTai}
												style={{ marginRight: 30 }}
												type="number"
												onChange={(event) => this.handleChangeSoluong(event,soluong, i)}
											/>
										</div>
									)
								})}
							</Paper>
							<TextField
								id="date"
								label="Ngày thanh lý"
								type="date"
								value={ngayTL}
								onChange={this.handleChange('ngayTL')}
								// fullWidth
								style={{ marginRight: 30 }}
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								id="standard-name"
								label="Lý do"
								value={lydo}
								placeholder="Nhập lý do"
								onChange={this.handleChange('lydo')}
								style={{ marginRight: 30 }}
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<div >
								<input onChange={(event) => this.handleImageChange(event)} type="file" name="myfile" />	
							</div>
							<div className="imgPreview" > 
								{$imagePreview}
							</div>
						</DialogContentText>
						<DialogActions>
							<Button 
								onClick={(event) => this.handleThanhLy(event, resource, addContextTL)} 
								color="primary"
								// component={DieuChuyenTS}
								id="teo"
							>
								Chuyển
							</Button>
							<Button onClick={this.props.handleCloseThanhLyNhieu} color="primary">
								Cancel
							</Button>
						</DialogActions>
					</DialogContent>
				</form>
			</Dialog>
		);
	}
}

class SelectThanhLyNhieu extends Component {
	render() {
		const { classes, match } = this.props;
		// console.log("[SelectThanhLyNhieuComponent]this props.selectedTS: ", this.props.selectedTS)
		return (
			<QLCSVCContext.Consumer>
				{({ resource, addContextTL, editContextTS, addContextTS }) => {
					return (
						<SelectThanhLyNhieuComponent 
							addContextTL = {addContextTL}
							resource={resource} 
							classes = {classes} 
							match = {match}
							selectedTS= {this.props.selectedTS} 
							openThanhLyNhieu = {this.props.openThanhLyNhieu} 
							handleCloseThanhLyNhieu={this.props.handleCloseThanhLyNhieu} 
							handleDeleteSelect={this.props.handleDeleteSelect} 
							editContextTS = {editContextTS}
							addContextTS ={addContextTS}
						/>
					)
				}}
			</QLCSVCContext.Consumer>
		);
	}
}

export default withStyles(styles)(withRouter(SelectThanhLyNhieu));
