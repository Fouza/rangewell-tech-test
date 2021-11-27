import React, { useState, useEffect} from 'react';
import { Table, DatePicker, Button } from 'antd';
import moment from 'moment';
import './Deals.css';

const Deals = (props) => {

	const columns = [
		{
			title : 'Title',
			dataIndex : 'title',
			key : 'title',
			width: 80,
		},
		{
			title : 'Amount Required (£)',
			dataIndex : 'amountRequired',
			key : 'amountRequired',
			width: 25,
			sorter: (a, b) => a.amountRequired - b.amountRequired,
		},
		{
			title : 'Date of creation',
			dataIndex : 'createdAt',
			key : 'createdAt',
			width: 20,
			fixed: 'right',
			render : (record) => (
				<span>
					{moment(record).format('MMMM Do, YYYY')}
				</span>
			)
		}
	]

//PS : In Bigger and Important projects it is necessary to minimize the number of external dependecies by reducing
//the number of packages to use >> That is why we should create our custom components like datatables and all.
	return (
		<div className="deals_container">
			<Table dataSource={props.deals} 
					columns={columns} 
					pagination={{ position: 'bottomRight', pageSize:3 }}
					scroll={{ x: 1000 }} 
					className="table_deals"
					/>
		</div>
	)
}

export default Deals