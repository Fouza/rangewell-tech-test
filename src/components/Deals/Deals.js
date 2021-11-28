import React, {useState, useContext} from 'react';
import { Table, Button } from 'antd';
import Edit from '../Edit/Edit';

import moment from 'moment';
import './Deals.css';

import {Context} from '../../Context';

const Deals = (props) => {
	
	const {deals, setDeals} = useContext(Context)

	const [isEditModalVisible, setIsEditModalVisible] = useState(false)
	const [dealToEdit, setDealToEdit] = useState({})
	const columns = [
		{
			title : 'Title',
			dataIndex : 'title',
			key : 'title',
			width: '40%',
		},
		{
			title : 'Amount required (£)',
			dataIndex : 'amountRequired',
			key : 'amountRequired',
			width: '25%',
			sorter: (a, b) => a.amountRequired - b.amountRequired,
		},
		{
			title : 'Date of creation',
			dataIndex : 'createdAt',
			key : 'createdAt',
			width: '25%',
			// fixed: 'right',
			render : (record) => (
				<span>
					{moment(record).format('MMMM Do, YYYY')}
				</span>
			)
		},
		{
			title:'Actions',
			dataIndex:'actions',
			width:'5%',
			render : (text, record, index) => {
				return (
					<Button onClick={() => showEditModal(record)}>Edit</Button>
				)
			}
		}
	]

	const showEditModal = (record) => {
		setDealToEdit(record)
		setIsEditModalVisible(true)
	}

	const handleCancel = () => {
		setIsEditModalVisible(false)
	}

console.log(deals)
//PS : In Bigger and Important projects it is necessary to minimize the number of external dependecies by reducing
//the number of packages to use >> That is why we should create our custom components like datatables and all.
	return (
		<div className="deals_container">
			<Edit isVisible={isEditModalVisible} 
					deal={dealToEdit} 
					handleCancel={handleCancel}
					 />
			<Table dataSource={deals} 
					columns={columns} 
					pagination={{ position: 'bottomRight', pageSize:5 }}
					scroll={{ x: 400 }} 
					className="table_deals"
					/>
		</div>
	)
}

export default Deals