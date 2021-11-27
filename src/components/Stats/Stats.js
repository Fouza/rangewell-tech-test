import React, {useState, useEffect} from 'react';
import {List, Card} from 'antd';

const Stats = () => {

	const [stats, setStats] = useState({})

	useEffect(() => {
		fetch(`http://localhost:3001/api/deals/stats`)
			.then(response => response.json())
			.then(response => {
				setStats(response)
		});
	},[])


	const data = [
		{
			title: 'Number of deals',
			stat: Object.keys(stats).length == 0 ? 0 : stats.deals_count
		},
		{
			title: 'Total amounts',
			stat: Object.keys(stats).length == 0 ? 0 : stats.total_amounts
		},
		{
			title: 'Average of amounts',
			stat: Object.keys(stats).length == 0 ? 0 : stats.avg_amount
		}
	];

	return (
		<div className="stats_container">
			<List
				grid={{ gutter: 16, column: 3, xs:1, sm:3 }}
				dataSource={data}
				renderItem={item => (
				<List.Item>
					<Card title={item.title}>{item.stat}</Card>
				</List.Item>
				)}
			/>
		</div>
	)
}

export default Stats;