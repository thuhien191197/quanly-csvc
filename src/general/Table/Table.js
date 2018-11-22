import React, { Component } from 'react';
import './Table.css';

// import classNames from 'classnames';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Checkbox } from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// // import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import { lighten } from '@material-ui/core/styles/colorManipulator';


// const rows = [
// 	{ id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
// 	{ id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
// 	{ id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
// 	{ id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
// 	{ id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
// ];


function desc(a, b, orderBy){
	console.log('A, B', a,b, orderBy)
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
  		rowsPerPage: 5,
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

	render() {
		const {rows, items} = this.props;
		const {page, rowsPerPage, orderBy, order} = this.state;
		const emptyRows =rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);
		console.log('render', this.state)
		return (
			<div>
				<Paper>
					<Table aria-labelledby="tableTitle">
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox/>
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
								// console.log("item[id]:",item[1])
								return(
									<TableRow key={idItem}>
										<TableCell padding="checkbox">
											<Checkbox/>
										</TableCell>
										{rows.map((row, idRow) => {
											return(
												<TableCell key={idRow} component="th" scope="row" padding="none">
													{item[row.id]}
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

export default Table1;
