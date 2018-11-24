import React, { Component } from 'react';
// import './Taisan.css';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';


const currencies = [
	{
	  value: 'USD',
	  label: '$',
	},
	{
	  value: 'EUR',
	  label: '€',
	},
	{
	  value: 'BTC',
	  label: '฿',
	},
	{
	  value: 'JPY',
	  label: '¥',
	},
  ];


class AppTS extends Component {
	state = {
		name: '',
		dongia: '',
		soluong:'',
		ngaynhap:'1997-11-19',
		hansudung:'1997-11-19',
		ghichu: '',
		loaitaisan:'',
		multiline: 'Controlled',
		currency: 'EUR',
	};
	handleChange = name => event => {
		this.setState({
		  [name]: event.target.value,
		});
	};
	render() {
		return (
			<div>
				{/* APP tài sản */}
				<from
					noValidate autoComplete="off"
				>
					<TextField
						id="standard-name"
						label="Tên tài sản"
						value={this.state.name}
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
						value={this.state.currency}
						onChange={this.handleChange('currency')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						style={{ marginRight: 30 }}
						helperText="Please select your currency"
						margin="normal"
					>
						{currencies.map(option => (
							<option key={option.value} value={option.value}>
							{option.label}
							</option>
						))}
					</TextField>
					<br />
					<TextField
						id="standard-name"
						label="Đơn giá"
						value={this.state.dongia}
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
						value={this.state.soluong}
						type="number"
						placeholder="Nhập Số lượng"
						
						style={{ marginRight: 30 }}
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
						defaultValue="1997-11-19"
						// value={this.state.ngaynhap}
						// onChange={this.handleChange('ngaynhap')}
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
						defaultValue="1997-11-19"
						// value={this.state.ngaynhap}
						// onChange={this.handleChange('ngaynhap')}
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
						value={this.state.ghichu}
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
						value={this.state.currency}
						onChange={this.handleChange('currency')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						helperText="Please select your currency"
						margin="normal"
					>
						{currencies.map(option => (
							<option key={option.value} value={option.value}>
							{option.label}
							</option>
						))}
					</TextField>
					<br />

					<TextField
						id="standard-select-currency-native"
						select
						label="Lọai tài sản"
						value={this.state.currency}
						onChange={this.handleChange('currency')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						style={{ marginRight: 30 }}
						helperText="Please select your currency"
						margin="normal"
					>
						{currencies.map(option => (
							<option key={option.value} value={option.value}>
							{option.label}
							</option>
						))}
					</TextField>

					
					<TextField
						id="standard-select-currency-native"
						select
						label="Nguồn Kinh phí"
						value={this.state.currency}
						onChange={this.handleChange('currency')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						style={{ marginRight: 30 }}
						helperText="Please select your currency"
						margin="normal"
					>
						{currencies.map(option => (
							<option key={option.value} value={option.value}>
							{option.label}
							</option>
						))}
					</TextField>
					<TextField
						id="standard-name"
						select
						label="Đơn vị"
						value={this.state.currency}
						onChange={this.handleChange('currency')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						style={{ marginRight: 30 }}
						helperText="Please select your currency"
						margin="normal"

						
					>
						{currencies.map(option => (
							<option key={option.value} value={option.value}>
							{option.label}
							</option>
						))}
					</TextField>
					<TextField
						id="standard-name"
						select
						label="Phòng"
						value={this.state.currency}
						onChange={this.handleChange('currency')}
						SelectProps={{
							native: true,
							MenuProps: {
							},
						}}
						helperText="Please select your currency"
						margin="normal"
					>
						{currencies.map(option => (
							<option key={option.value} value={option.value}>
							{option.label}
							</option>
						))}
					</TextField>
					<br />
					
				</from>
			</div>
		);
	}
}

export default AppTS;
