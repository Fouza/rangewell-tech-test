import React, {useState, useContext} from 'react';
import {Modal, Button, Input} from 'antd'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';	
import axios from 'axios';
import {Context} from '../../Context';

const NewDeal = (props) => {

	const {setDeals, dateSearched} = useContext(Context)

	const [title, setTitle] = useState('')
	const [amount, setAmount] = useState('10')

	const handleOnChange = (value,name) => {
		if(name==="title"){
			setTitle(value)
		}else if(name==="amountRequired"){
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
			axios.post("http://localhost:3001/api/deal/add",{
				title:title,
				amountRequired: typeof amount !== 'number' ? amount.replace(/\D/g,'') : amount
			}).then(response => {
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
				setAmount(0)
				toast.success('Deal added successfully !')
			})
			props.handleAddCancel()
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
			<Modal title={`Add new deal`} 
				visible={props.isAddVisible}
				onCancel={props.handleAddCancel}
				footer={[
					<Button key="back" onClick={props.handleAddCancel}>
						Return
					</Button>,
					<Button
						type="primary"
							// loading={loading && loadingPart==="create-user"}
						onClick={handleOk}
					>Ok</Button> ]} 
				>
					<div className="input_edit">
						<Input size="large" placeholder={`Title`} 
								value={title}
								onChange={e => handleOnChange(e.currentTarget.value,'title')} />
					</div>
					<div className="input_edit">
						<Input size="large" placeholder={`Amount Required`}
								value={amount}
								type="number"
								onKeyDown={e => handleEnter(e)}
								onChange={e => handleOnChange(e.currentTarget.value,'amountRequired')} />
					</div>
			</Modal>
		</div>
	)
}

export default NewDeal