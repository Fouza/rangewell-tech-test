import express from "express";
import moment from "moment";

const routerApi = express.Router();

//mongodb models
import * as db from "./data/models";


// For big projects, it would be better to re-structure the node server project this way <<<
// You can check the folders created and left empty to have an idea about the project architecture that can
// be done.


//routes

// get all deals with possible filter using query
routerApi.get("/deals", async (req, res) => {
    db.dealsCollection.find(req.query).exec(function(err, result) {
        res.send(result)
    })
})

// get deal with specified id 
routerApi.get("/deal/:id", async (req, res) => {
	db.dealsCollection.findById(req.params.id).exec(function(err, result){
		res.send(result)
	})
})

// Get the following stats : deals count, sum of all amounts, average of all amounts
routerApi.get("/deals/stats", async (req, res) => {
	db.dealsCollection.find().exec(function(err, result) {
		var total = 0;
		var count = 0;
		result.forEach(item => {
			total += item.amountRequired
			count = count+1
		})
		var avg = total/count
		let arrayRes = [
			{
				deals_count: count,
				total_amounts: total,
				avg_amount: avg
			}
		]
		res.send(arrayRes[0])
	})
})
// Get all deals order by create date starting from most recent.
routerApi.get("/deals/latest", async (req, res) => {
	db.dealsCollection.find({}, {_id:0}).sort({ createdAt: -1}).exec(function(err, result) {
		res.send(result)
	})
})

// Get all deals created from a certain date till now
routerApi.get("/dealsfrom", async (req, res) => {
	db.dealsCollection.find(
		{
			createdAt: {
				$gte: new Date(req.query.date)
			}
		}
		).exec(function (err, result) {
			res.send(result)
	})
})

export default routerApi;
