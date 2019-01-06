import React, { Component } from 'react';
import './ViewKH.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withRouter } from "react-router";
import { QLCSVCContext } from '../../../Main/Main';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import NavBar from '../../../../general/NavBar/NavBar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
const getParentPath = (path) => path.split('/').length > 0 && path.split('/')[3]

const styles = theme => ({
	root: {
	  display: 'flex',
	  justifyContent: 'center',
	  flexWrap: 'wrap',
	  padding: theme.spacing.unit * 5,
	  width: '90%',
	},

	  backButton: {
		marginRight: theme.spacing.unit,
	  },
	  instructions: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
	  },
});
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

function getSteps() {
	return ['Chờ duyệt', 'Đã duyệt', 'Chờ ký', 'Được thông qua'];
  }
  
  function getStepContent(stepIndex) {
	switch (stepIndex) {
	  case 0:
		return 'Select campaign settings...';
	  case 1:
		return 'What is an ad group anyways?';
	  case 2:
		return 'This is the bit I really care about!';
	  default:
		return 'Unknown stepIndex';
	}
  }

class Child extends Component {
	state = this.props.itemTS || {
		id: 0,
		name: '',
		dongia: 0,
		soluong: 0,
		ngaynhap: '19/11/1997',
		hansudung: '19/11/2080',
		ghichu: '',
		id_loaitaisan: '',
		id_donvi: '',
		id_kinhphi: '',
		id_phong: '',
		id_user: '',
		status: 0,

	};

	componentDidMount() {
	}

	handleSubmit = (itemsTaisan, event, id, name, dongia, soluong, ngaynhap, hansudung, ghichu, id_loaitaisan, id_donvi, id_kinhphi, id_phong, id_user, status) => {
		event.preventDefault();
		// console.log("clicked submit");
		// var id = parseInt(itemsTaisan[itemsTaisan.length - 1].id) + 1;
		var dongia = parseInt(dongia);
		var soluong = parseInt(soluong);
		var id_loaitaisan = parseInt(id_loaitaisan);
		var id_kinhphi = parseInt(id_kinhphi);
		var id_donvi = parseInt(id_donvi);
		var id_phong = parseInt(id_phong);
		var id_user = parseInt(id_user);
		var status = parseInt(status);

		this.props.editContextTS({
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
		})
		
		this.props.editTs(
			{id,
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
			status}
		)
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleNext = () => {
		this.setState(state => ({
		  activeStep: state.activeStep + 1,
		}));
	  };
	
	  handleBack = () => {
		this.setState(state => ({
		  activeStep: state.activeStep - 1,
		}));
	  };
	
	  handleReset = () => {
		this.setState({
		  activeStep: 0,
		});
	  };
	render() {
		const { resource, classes } = this.props
		// console.log(">>loaitaisan: ", this.state.itemsLoaitaisan);
		const {
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
			status,
			activeStep
		} = this.state;
		const steps = getSteps();
		return (
			<div className={classes.root}>
				<div className="quiz-window">
					<div className="quiz-window-header">
						<div className="quiz-window-title">Kế hoách sữa chữa- khoa CNTT - 2018</div>
					</div>
					<div className="quiz-window-body">
						<div className="gui-window-awards">
						<ul className="guiz-awards-row guiz-awards-header">
							<li className="guiz-awards-header-star">&nbsp;</li>
							<li className="guiz-awards-header-title">Thông tin</li>
							<li className="guiz-awards-header-track">Chi tiết</li>
					
						</ul>
						<ul className="guiz-awards-row guiz-awards-row-even">
							<li className="guiz-awards-star"><span className="star goldstar" /></li>
							<li className="guiz-awards-title">Tên đơn vị</li>
							{resource.user.map((item, i) => {
								return(
									item.id === id_user
									?
									<li className="guiz-awards-track">Khoa CNTT</li>
									:''
								)
							})}
							{/* <li className="guiz-awards-track">8</li> */}
						</ul>
						<ul className="guiz-awards-row">
							<li className="guiz-awards-star"><span className="star silverstar" /></li>
							<li className="guiz-awards-title">Ngày nhập</li>
							<li className="guiz-awards-track">2018/1/1</li>
						</ul>
						<ul className="guiz-awards-row guiz-awards-row-even">
							<li className="guiz-awards-star"><span className="star bronzestar" /></li>
							<li className="guiz-awards-title">Tình Trạng</li>
							<li className="guiz-awards-track">Chưa duyệt
							<Stepper activeStep={activeStep} alternativeLabel>
							{steps.map(label => {
								return (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
								);
							})}
							</Stepper>
							

							</li>
						</ul>
						<ul className="guiz-awards-row">
							<li className="guiz-awards-star"><span className="star rhodiumstar" /></li>
							<li className="guiz-awards-title">Loại kế hoạch</li>
							<li className="guiz-awards-track">Kế hoạch Sửa chữa</li>
						</ul>
						</div>
						<div className="guiz-awards-buttons">
						 	<Link className="guiz-awards-but-back" to={`/kehoach`} ><i className="fa fa-angle-left" />Back</Link>
							<Link className="guiz-awards-but-back" to={`/taisan/edit/${id}`} >Edit <i className="fa fa-angle-right" /></Link>
						</div>
					</div>
					</div>
					<div style={{clear: 'both'}}></div>
			
		</div>
		);
	}
}


class ViewKH extends Component {
	render() {
		const { resource, classes } = this.props;
		const itemsTaisan = resource.taisan;
		const currentId = getParentPath(this.props.match.url);
		let itemTS = itemsTaisan.find((item) => { return item.id == currentId });;

		return (
			<Child itemTS={itemTS} classes={classes} editTs={this.props.editTs} resource={resource} editContextTS={this.props.editContextTS}/>
		)
	}
}


class ViewKHWrap extends Component {
	state ={
		navBar : {
			viewtaisan:{
				route:"/user/view/:id",
				title: "",
				// component: "DanhSachTaiSan"
			},
		}
	}
	render() {
		const { match, classes } = this.props
		const { navBar } = this.state
		const parentKey = Object.keys(navBar)
		return(
			<div>
				<NavBar
					match={match}
					classes={classes}
					parentKey={parentKey}
					navBar={navBar}
					title= {"Chi tiết tài sản"}
				/>
			
				<QLCSVCContext.Consumer>
					{({ resource, editContextTS }) => <ViewKH classes={classes} editTs={this.props.editTs} resource={resource} match={this.props.match} editContextTS={editContextTS} />}
				</QLCSVCContext.Consumer>
			</div>
		)
	}

}


export default withRouter(withStyles(styles)(ViewKHWrap));
