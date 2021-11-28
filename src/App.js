import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import Deals from "./components/Deals/Deals";
import Search from "./components/Search/Search";
import Stats from "./components/Stats/Stats";
import NewDeal from "./components/NewDeal/NewDeal";
import moment from 'moment';
import axios from 'axios';
import {Context} from "./Context";
import {Button} from 'antd';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'



const App = () => {

	// const [deals, setDeals] = useState([])

	const {deals, setDeals, dateSearched, setDateSearched} = useContext(Context)
	const [isAddVisible, setIsAddVisible] = useState(false)
	const dateFormat = 'YYYY/MM/DD';
	const customFormat = value => `From : ${value.format(dateFormat)}`;

	useEffect(() => {
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
	}, [dateSearched])

	const disabledDate = (current) => {
		// In case we need to not select days before today and today
		// return current && current < moment().endOf('day');

		// No disabledDate for now
		return current && current > moment().toDate();
	}
	
	const handleOnChangeDate = (date, dateString) => {
		setDateSearched(moment(date).format(dateFormat))
	}

	const handleReset = () => {
		setDateSearched('')
	}

	const showAddModal = () => {
		setIsAddVisible(true)
	}

	const handleAddCancel = () => {
		setIsAddVisible(false)
	}

	// We use encodeURIComponent to pass query params in case of values like 'titl&e' or 'ti?tle' 
	// const title = encodeURIComponent('123')
	// const amountRequired = encodeURIComponent(3000)

	return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
				</header>

				<main className="BodyContent">
					<h1>Stats</h1>
					<Stats/>
					<h1>Deals <small className="text-muted">({deals.length})</small></h1>
					<div className="container">
						<Search customFormat={customFormat} 
								dateFormat={dateFormat}
								disabledDate={disabledDate}
								handleOnChangeDate={handleOnChangeDate}
								handleReset={handleReset}
						/>
						<Button className="add_button" type="primary" onClick={showAddModal} >Add Deal</Button>
						<NewDeal isAddVisible={isAddVisible} handleAddCancel={handleAddCancel} />
						<Deals />
					</div>
				</main>
			</div>
	)
}
export default App;
