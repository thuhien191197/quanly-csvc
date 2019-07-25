import React, { Component } from 'react';
import { withRouter } from "react-router";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { QLCSVCContext } from '../../../Main/Main';
import Paper from '@material-ui/core/Paper';
import NavBar from '../../../../general/NavBar/NavBar';

const styles = theme => ({
	root: {
	  display: 'flex',
	  justifyContent: 'center',
	  flexWrap: 'wrap',
	  padding: theme.spacing.unit * 15,
	  marginTop: "-8em",
	},
});

const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[4]



class EditKPComponent extends Component {
	state = this.props.itemKinhPhi || {
		id : 0,
		name: '',
		tongngansach: 0,
		tongchi: 0,
		tongthanhly: 0
	};

	componentDidMount() {
	}

	handleSubmit = (itemsKinhPhi, event, id, name, tongngansach, tongchi, tongthanhly) => {
		// event.preventDefault();
		// console.log("clicked submit");

		this.props.editContextKinhPhi({
			id,
			name,
			tongngansach,
			tongchi,
			tongthanhly
		})
		
		this.props.editAPIKinhPhi({
			id,
			name,
			tongngansach,
			tongchi,
			tongthanhly
		})
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	render() {
		const { resource } = this.props
		// console.log(">>loaitaisan: ", this.state.itemsLoaitaisan);
		const {
			id,
			name,
			tongngansach,
			tongchi,
			tongthanhly
		} = this.state;
		
		return (
		<div>
			{/* Edit tài sản */}
			<form
				noValidate autoComplete="off"
			>
				<TextField
						id="standard-name"
						label="Tên danh mục"
						value={name}
						placeholder="Nhập tên danh mục"
						onChange={this.handleChange('name')}
						style={{ marginRight: 30 }}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-name"
						label="Số lượng"
						value={tongngansach}
						style={{ marginRight: 30 }}
						type="number"
						placeholder="Nhập tổng ngân sách"
						// fullWidth
						helperText="tổng ngân sách!"
						onChange={this.handleChange('tongngansach')}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
					<TextField
						id="standard-name"
						label="Tổng chi"
						value={tongchi}
						style={{ marginRight: 30 }}
						type="number"
						placeholder="Nhập tổng chi"
						// fullWidth
						helperText="tổng chi!"
						onChange={this.handleChange('tongchi')}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-name"
						label="Tổng thanh lý"
						value={tongthanhly}
						style={{ marginRight: 30 }}
						type="number"
						placeholder="Nhập tổng thanh lý"
						// fullWidth
						helperText="ổng thanh lý!"
						onChange={this.handleChange('tongthanhly')}
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
				<Button variant="contained" color="primary"
					onClick={(event) => this.handleSubmit(
						resource.nguonkinhphi,
						event,
						this.props.itemKinhPhi.id,
						name,
						tongngansach,
						tongchi,
						tongthanhly
					)}
					href="http://localhost:3000/Nguồn%20Kinh%20Phí"
				>
					Sửa
				</Button>
			</form>
		</div>
		);
	}
}


class Edit extends Component {
	
	render() {
		const { resource } = this.props;
		const itemsKinhPhi = resource.nguonkinhphi;
		const currentId = parseInt(getParentPath(this.props.match.url))
		let itemKinhPhi = itemsKinhPhi.find((item) => { return item.id === currentId });;
		console.log("currentId:", currentId)
		return (
			<EditKPComponent itemKinhPhi={itemKinhPhi} editAPIKinhPhi={this.props.editAPIKinhPhi} resource={resource} editContextKinhPhi={this.props.editContextKinhPhi}/>
		)
	}
}


class EditKP extends Component {
	render() {
		return(
			<QLCSVCContext.Consumer>
				{({ resource, editContextKinhPhi }) => <Edit 
							editAPIKinhPhi={this.props.editAPIKinhPhi} 
							resource={resource} 
							match={this.props.match} 
							editContextKinhPhi={editContextKinhPhi} />}
			</QLCSVCContext.Consumer>
		)
	}

}


export default withRouter(EditKP);
