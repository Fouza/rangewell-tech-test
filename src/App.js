import React, { useState, useEffect } from "react";
import fetch from "isomorphic-fetch";
import logo from "./logo.svg";
import "./App.css";
import Deals from "./components/Deals/Deals";
import Search from "./components/Search/Search";
import Stats from "./components/Stats/Stats";
import moment from 'moment';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const App = ()=>{
	const [deals, setDeals] = useState([])
	const [stats,setStats] = useState()

	const [dateSearched, setDateSearched] = useState('')
	const dateFormat = 'YYYY/MM/DD';
	const customFormat = value => `From : ${value.format(dateFormat)}`;

	useEffect(() => {
		if(dateSearched.length > 0){
			fetch(`http://localhost:3001/api/dealsfrom?date=${dateSearched}`)
				.then(response => response.json())
				.then(response => {
					setDeals(response)
			});
		}else{
			fetch(`http://localhost:3001/api/deals/latest`)
				.then(response => response.json())
				.then(response => {
					setDeals(response)
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

	const title = encodeURIComponent('123')
	const amountRequired = encodeURIComponent(3000)

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>

			<main className="BodyContent">
				<h1>Stats</h1>
				<Stats />
				<h1>Deals <small className="text-muted">({deals.length})</small></h1>
				<div className="container">
					<Search customFormat={customFormat} 
							dateFormat={dateFormat}
							disabledDate={disabledDate}
							handleOnChangeDate={handleOnChangeDate}
							handleReset={handleReset}
					/>
					<Deals deals={deals} />
				</div>
			</main>
      </div>
	)
}
export default App;
