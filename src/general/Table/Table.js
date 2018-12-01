import React, { Component } from 'react';
import './Table.css';

import classNames from 'classnames';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Checkbox, Icon } from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
// import { lighten } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router";
import AppTS from '../../components/Taisan/Taisan/component/App/AppTS'



const toolbarStyles = theme => ({
	btnAdd: {
		position: 'inherit',
	},
	btnEdit: {
		height: '10px',
		width:'35px'
	},

});
function desc(a, b, orderBy){
	//console.log('A, B', a,b, orderBy)
	if(b[orderBy] <  a[orderBy]){
		return -1;
	}
	if(b[orderBy] >  a[orderBy]){
		return 1;
	}
	return 0;
}

function getSorting(order, orderBy){
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy); 
} 


function stableSort(items, cmp) {
	const stabilizedThis = items.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
	  const order = cmp(a[0], b[0]);
	  if (order !== 0) return order;
	  return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

class Table1 extends Component {
	state={
		order: 'asc',
		orderBy: '',
		page: 0,
		rowsPerPage: 10,
		selected: [],
	}

	handleRequestSort = (event, property) => {
		const orderBy = property;
		console.log('Property', property)
		let order = this.state.order === 'asc' ? 'desc' : 'asc'; 
	
		// if (this.state.orderBy === property && this.state.order === 'desc') {
		//   order = 'asc';
		// }
	
		this.setState({ order, orderBy });
	};

	createSortHandler = property => event => {
		console.log('Sorting')
		this.handleRequestSort(event, property);
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	handleSelectAllClick = event => {
		const { items } = this.props;
		const { selected } = this.state;
		if (event.target.checked) {
		 	var idArray = items.map((n) => n.id);
		  	this.setState(state => ({ selected: idArray }));
			// console.log("selected:",idArray)
		  return;
		}
		this.setState({ selected: [] });
		
	};


	isSelected = id => this.state.selected.indexOf(id) !== -1;
	
	handleClick = (event, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];
	
		if (selectedIndex === -1) {
		  newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
		  newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
		  newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
		  newSelected = newSelected.concat(
			selected.slice(0, selectedIndex),
			selected.slice(selectedIndex + 1),
		  );
		}
	
		this.setState({ selected: newSelected });
	};

	
	
	render() {
		const {rows, items, numSelected, classes, selectApp} = this.props;
		const {page, rowsPerPage, orderBy, order, selected} = this.state;
		const emptyRows =rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);
		// console.log('render', this.state)
		const { match } = this.props
		// console.log(">>>match:",match)
		// console.log("items:"+ items);


		const App = props => <Link to={`${match.url}/add`} {...props} />

		return (
			<div>
				<div className="divAdd">
					<Tooltip title="Add" className={classes.btnAdd}>
						<Button 
							variant="fab" 
							color="primary" 
							aria-label="Add"
							component={App}
						>
							<AddIcon  />
						</Button>
					</Tooltip>
				</div>
				<Paper>
					<Toolbar>
						<div >
						{selected.length > 0 
						? 
						(
							<Typography color="inherit" variant="subtitle1">
								{selected.length} selected
							</Typography>
						)
						:
						(
							<Typography variant="h7" id="tableTitle">
							Danh sách
							</Typography>
						)
						}

						</div>
						<div/>
						<div>
							{selected.length > 0 ? (
							<Tooltip title="Delete">
								<IconButton aria-label="Delete">
									<DeleteIcon 
										onClick = {() => this.props.handleDelete(selected)}
									/>
								</IconButton>
							</Tooltip>
							) : (
							<Tooltip title="Filter list">
								<IconButton aria-label="Filter list">
								
								<FilterListIcon />
								</IconButton>
							</Tooltip>
							)}
						</div>
					</Toolbar>
					<Table aria-labelledby="tableTitle">
						
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										indeterminate={numSelected > 0 && selected.length < items.length}
										checked={selected.length === items.length}
										onChange={this.handleSelectAllClick}
									/>
								</TableCell>
								{rows.map((row, idRow) => {
									return(
										<TableCell
											key={row.id}
											numeric={row.numeric}
											padding={row.disablePadding ? 'none' : 'default'}
											sortDirection={orderBy === row.id ? order : false}
										>
											<Tooltip
												title="Sort"
												placement={row.numeric ? 'bottom-end' : 'bottom-start'}
												enterDelay={300}
											>
												<TableSortLabel
													active={orderBy === row.id}
													direction={order}
													onClick={this.createSortHandler(row.id)}
												>
													{row.label}
												</TableSortLabel>
											</Tooltip>
								
										</TableCell>
								)},this)}
							</TableRow>
						</TableHead>
						
						<TableBody>
						{stableSort(items, getSorting(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((item, idItem) => {

							// {items.map((item, idItem) => {
								//console.log("items:", items)
								const isSelected = this.isSelected(item.id);
							//	console.log(">>>>isSelected:", isSelected)
								return(
									<TableRow 
										hover
										key={item.id}
										aria-checked={isSelected}
										selected={isSelected}
										role="checkbox"
										tabIndex={-1}
										onClick={event => this.handleClick(event, item.id)}
									>
										<TableCell padding="checkbox">
											<Checkbox
												checked={isSelected}
											/>
										</TableCell>
										{rows.map((row, idRow) => {
											console.log("[Table] row: ", row.function);
											var funcs = row.function;
											return(
												<TableCell key={idRow} component="th" scope="row" padding="none">
													{row.id !== "function"
													?
													item[row.id]
													
													:
													funcs.map((func, i) => {
														console.log("func:",func)
															return(
																func === "edit"
																?
																	<Button 
																		className={classes.btnEdit}
																		variant="fab" 
																		// color="secondary" 
																		aria-label="Add"
																		component={App}
																	>
																		
																		<EditIcon />
																	</Button>
																:
																	''
																
																
															)
														})
														
													}
												</TableCell>
											)})}
									</TableRow>
								// )})}
							)})}

							{emptyRows > 0 && (
								<TableRow style={{ height: 49 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={items.length}
						rowsPerPage={rowsPerPage}
						page={page}
						backIconButtonProps={{
							'aria-label': 'Previous Page',
						}}
						nextIconButtonProps={{
							'aria-label': 'Next Page',
						}}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
						/>
				
				</Paper>
			</div>
		);
	}
}

export default withRouter(withStyles(toolbarStyles)(Table1));

