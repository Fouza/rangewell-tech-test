import express from "express";
import mongoose from 'mongoose'

const routerApi = express.Router();

//mongodb models
import * as db from "./data/models";


// For bigger projects, it would be better to re-structure the node server project this way <<<
// The project architecture would be this way (Folders) :
// models, controllers, routes, storage, middlewares, helpers


//routes

// get all deals with possible filter using query
routerApi.get("/deals", async (req, res) => {
    db.dealsCollection.find(req.query).exec(function(err, result) {
		if (err) throw err;
        res.send(result)
    })
})

// get deal with specified id 
routerApi.post("/deal", (req, res) => {
	db.dealsCollection.findById(req.body.id).exec(function(err, result){
		if (err) throw err;
		res.send(result)
	})
})

// Get the following stats : deals count, sum of all amounts, average of all amounts
routerApi.get("/deals/stats", async (req, res) => {
	db.dealsCollection.find().exec(function(err, result) {
		if (err) throw err;
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
	db.dealsCollection.find().sort({ createdAt: -1}).exec(function(err, result) {
		if (err) throw err;
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
		).sort({ createdAt: -1}).exec(function (err, result) {
			if (err) throw err;
			res.send(result)
	})
})

routerApi.post("/deal/edit", async (req, res) => {
	db.dealsCollection.updateOne({_id:req.body.id},{
		$set : {title:req.body.title, amountRequired: req.body.amountRequired}
	}, (err, result) => {
		if (err) throw err;
		//console.log("updated")
		res.sendStatus(200)
	})
})

routerApi.post("/deal/add", async (req, res) => {
	console.log(req.body)
	db.dealsCollection.create({_id: new mongoose.Types.ObjectId(),title:req.body.title, amountRequired:req.body.amountRequired}, (err, result) => {
		if (err) throw err;
		res.send(result)
	})
})

export default routerApi;
