import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import Button from '@material-ui/core/Button';


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

class AppTS extends Component {
	state = {


    name: '',
    dongia: 0,
    soluong: 0,
    ngaynhap: '19/11/1997',
    hansudung: '23/7/2021',
    ghichu: '',
    id_loaitaisan: '',
    id_donvi: '',
    id_kinhphi: '',
    id_phong: '',
    id_user: '',
    status: 0,


    multiline: 'Controlled',
    itemsDonvi:[],
		itemsLoaitaisan:[],
		itemsKinhphi:[],
		itemsPhong:[],
		itemsUser:[]
		
	};

	componentDidMount(){
		axios.get('http://localhost:5500/donvi')
		.then((res) => {
			this.setState({itemsDonvi: res.data});
		});
		axios.get('http://localhost:5500/loaitaisan')
		.then((res) => {
			this.setState({itemsLoaitaisan: res.data});
		});
		axios.get('http://localhost:5500/nguonkinhphi')
		.then((res) => {
			this.setState({itemsKinhphi: res.data});
		});
		axios.get('http://localhost:5500/nguonkinhphi')
		.then((res) => {
			this.setState({itemsKinhphi: res.data});
		});
		axios.get('http://localhost:5500/phong')
		.then((res) => {
			this.setState({itemsPhong: res.data});
		});
		axios.get('http://localhost:5500/user')
		.then((res) => {
			this.setState({itemsUser: res.data});
		});
	}


  	handleSubmit = (event,name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status) => {
		event.preventDefault();
		console.log("clicked submit");
		// console.log(">> [ADDTS] itemsTaisan: ", this.props.itemsTaisan);
		var id = parseInt(this.props.itemsTaisan[this.props.itemsTaisan.length - 1].id) + 1;
		// console.log(">> [ADDTS] item handle submit: ", name,dongia,soluong,ngaynhap,hansudung,ghichu,id_loaitaisan,id_donvi,id_kinhphi,id_phong,id_user,status);
		
		var dongia = parseInt(dongia);
		
		this.props.addTs(
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
		)
	}


	handleChange = name => event => {
		this.setState({
		  [name]: event.target.value,
		});
	};

	render() {
		// console.log(">>loaitaisan: ", this.state.itemsLoaitaisan);
    const {
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
      itemsUser, 
      itemsDonvi, 
      itemsKinhphi, 
      itemsLoaitaisan, 
      itemsPhong
    } = this.state;
		return ( 
			<div>
				{/* APP tài sản */}
				<from
					noValidate autoComplete="off"
				>
					<TextField
						id="standard-name"
						label="Tên tài sản"
						value={name}
						placeholder="Nhập tên tài sản"
						onChange={this.handleChange('name')}
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-select-currency-native"
						select
						label="Tên người nhập"
						value={id_user}
						onChange={this.handleChange('id_user')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
            }}
            InputLabelProps={{
							shrink: true,
						}}
						style={{ marginRight: 30 }}
						helperText="Please select your name"
						margin="normal"
					>
            {/* <option disabled="disabled" selected="true" value="">Chọn tên người nhập</option> */}
						{itemsUser.map((item,i) => (
							<option key={i} value={item.id}>
							{item.fullname}
							</option>
						))}
					</TextField>
					<br />
					<TextField
						id="standard-name"
						label="Đơn giá"
						value={dongia}
						placeholder="Nhập đơn giá"
						style={{ marginRight: 30 }}
						// fullWidth
						helperText="số tiền!"
						onChange={this.handleChange('dongia')}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-name"
						label="Số lượng"
						value={soluong}
						style={{ marginRight: 30 }}
						type="number"
						placeholder="Nhập Số lượng"
						// fullWidth
						helperText="tổng số lượng!"
						onChange={this.handleChange('soluong')}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					 <TextField
						id="date"
						label="Ngày nhập"
						type="date"
						// defaultValue="1997-11-19"
						value={ngaynhap}
						onChange={this.handleChange('ngaynhap')}
						// fullWidth
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
						shrink: true,
						}}
					/>
					<TextField
						id="date"
						label="Hạn sử dụng"
						type="date"
						// defaultValue="1997-11-19"
						value={hansudung}
						onChange={this.handleChange('hansudung')}
						// fullWidth
						margin="normal"
						InputLabelProps={{
						shrink: true,
						}}
					/>
					<br />
					<TextField
						id="standard-name"
						label="Ghi chú"
						value={ghichu}
						placeholder="Nhập tên Ghi chú"
						onChange={this.handleChange('ghichu')}
						// fullWidth
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-name"
						select
						label="Tình trạng"
						value={status}
						onChange={this.handleChange('status')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						helperText="Please select your currency"
						margin="normal"
					>
						{itemsTinhtrang.map((option, i) => (
							<option key={i} value={option.id}>
							{option.name}
							</option>
						))}
					</TextField>
					<br />

					<TextField
						id="standard-select-currency-native"
						select
						label="Lọai tài sản"
						value={id_loaitaisan}
						onChange={this.handleChange('id_loaitaisan')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
            }}
            InputLabelProps={{
							shrink: true,
						}}
						style={{ marginRight: 30 }}
						helperText="Please select your currency"
						margin="normal"
					>
            {itemsLoaitaisan.map((item, i) => {
            //   console.log("item:",item.id)
              return(
                <option key={i} value={item.id}>
                {item.name}
                </option>
              )
            })}
					</TextField>

					
					<TextField
						id="standard-select-currency-native"
						select
						label="Nguồn Kinh phí"
						value={id_kinhphi}
						onChange={this.handleChange('id_kinhphi')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
            }}
            InputLabelProps={{
							shrink: true,
						}}
						style={{ marginRight: 30 }}
						helperText="Please select your currency"
						margin="normal"
					>
						{itemsKinhphi.map((item, i) => (
							<option key={i} value={item.id}>
							{item.name}
							</option>
						))}
					</TextField>
					<TextField
						id="standard-name"
						select
						label="Đơn vị"
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
						helperText="Please select your currency"
						margin="normal"

						
					>
						{itemsDonvi.map((item, i) => (
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
            {itemsPhong.map((item, i) => {
              // console.log("phòng: ", item.id)
            return(
							<option key={i} value={item.id}>
							{item.name}
							</option>
						)})}
					</TextField>
					<br />
					<Button variant="contained" color="primary" 
            onClick={(event) => this.handleSubmit(
              event,
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
            )}
					>
						Thêm 
					</Button>
				</from>
			</div>
		);
	}
}

export default AppTS;
