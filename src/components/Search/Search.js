import React, {useState, useEffect} from 'react';
import {DatePicker, Button} from 'antd';
import moment from 'moment';

const Search = (props) => {

//PS : In Bigger and Important projects it is necessary to minimize the number of external dependecies by reducing
//the number of packages to use >> That is why we should create our custom components like datatables and all.

	return (
	<div className="search_box">
		<DatePicker defaultValue={moment(new Date(), props.dateFormat)} 
						format={props.customFormat} 
						disabledDate={props.disabledDate}
						defaultValue={moment().add(1,'days')}
						onChange={props.handleOnChangeDate}
						className="search_box"
						style={{ marginBottom: '10px', marginRight: '5px' }}
					/>
		<Button onClick={props.handleReset} >Reset</Button>
	</div>
	)

}

export default Search;