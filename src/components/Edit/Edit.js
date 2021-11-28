import React, {useState, useEffect, useContext} from 'react'
import {Modal, Button, Input} from 'antd'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';	

import './Edit.css';
import axios from 'axios';

import {Context} from '../../Context';

const Edit = (props) => {

	const {setDeals, dateSearched} = useContext(Context)
	const [title, setTitle] = useState('')
	const [amount, setAmount] = useState('10')

	const handleOnChange = (value,name) => {
		if(name=="title"){
			setTitle(value)
		}else if(name=="amountRequired"){
			setAmount(value)
		}
	}

	const handleOk = () => {
		const regNumber = /^[1-9]\d*(\.\d+)?$/
		if(!title && title.length === 0){
			toast.error("Please specify a title")
		}else if(amount === 0 || !regNumber.test(amount)){
			toast.error("A valid amount must be specified (like : 12500)")
		}else{
			axios.post("http://localhost:3001/api/deal/edit",{
				id: props.deal._id,
				title: title,
				amountRequired: typeof amount !== 'number' ? amount.replace(/\D/g,'') : amount
			}).then(response => {
			//This way it takes a lot of time because of the array mapping
				// let dealsUpdated = deals
				// dealsUpdated.map(item => (item._id === props.deal._id 
				// 	? Object.assign(item, {title:title, amountRequired:amount})
				// 	: item))
				// setDeals(dealsUpdated)

			//So we should use an api call to update the list of deals in context according to the update
				if(dateSearched.length > 0){
					axios.get(`http://localhost:3001/api/dealsfrom?date=${dateSearched}`)
						.then(response => {
							setDeals(response.data)
					});
				}else{
					axios.get(`http://localhost:3001/api/deals/latest`)
						.then(response => {
							setDeals(response.data)
					});
				}

				setTitle('')
				setAmount('')
				toast.success('Deal updated successfully !')
			})
			props.handleCancel()
		}
	}

	const handleEnter = (e) => {
		if(e.keyCode === 13){
			handleOk()
		}
	}

	return (
		<div>
			<ToastContainer />
			<Modal title={`Edit deal`} 
				visible={props.isVisible}
				onCancel={props.handleCancel}
				footer={[
					<Button key="back" onClick={props.handleCancel}>
						Return
					</Button>,
					<Button
						type="primary"
							// loading={loading && loadingPart==="create-user"}
						onClick={handleOk}
					>Ok</Button> ]} 
				>
					<div className="input_edit">
						<Input size="large" placeholder={`Title : ${props.deal.title}`} 
								value={title}
								onChange={e => handleOnChange(e.currentTarget.value,'title')} />
					</div>
					<div className="input_edit">
						<Input size="large" placeholder={`Amount Required : ${props.deal.amountRequired}`}
								value={amount}
								onKeyDown={e => handleEnter(e)}
								onChange={e => handleOnChange(e.currentTarget.value,'amountRequired')} />
					</div>
			</Modal>
		</div>
	)
}

export default Edit