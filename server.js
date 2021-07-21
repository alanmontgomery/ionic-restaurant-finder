const axios = require("axios");
const express = require('express');
const app = express();
var session = require('express-session');
var cors = require('cors');

//	Use session
app.use(session({ secret: 'Ionic Rocks!', cookie: { maxAge: 86400000 }, resave: true, saveUninitialized: true }));
app.use(cors( {origin: '*'} ));

app.listen(process.env.PORT || 4000, function() {
	
	console.log('server is running...');
});

//	DON'T LEAVE THIS API KEY IN YOUR PRODUCTION APPS
//	This is a test account of mine, so i've left this in for demo purposes.
//	Secure your nodejs server and API key when building real things!
let API_KEY = "d02MG5N6GCJ0Y6GN5OHYCIW7XBHCbuu0O0w6sxtZmHMuhn-tgvOK1NaFIgST-4r8E3CQp6APMNMjKs0sZV3UHtQO-e32ysCBY-3nGqxJGsvjTCZ_eEM5jE14H-XuYHYx";

//	REST API for Yelp
let yelpAPI = axios.create({

	baseURL: "https://api.yelp.com/v3/",
	headers: {
		Authorization: `Bearer ${API_KEY}`,
		"Content-type": "application/json",
	}
});

app.get('/get-record', function(req, res) {

	const { id } = req.query;

	yelpAPI(`/businesses/${ id }`).then(({ data }) => {

		res.send(JSON.stringify(data));
	});
});

app.get('/get-reviews', function(req, res) {

	const { id } = req.query;

	yelpAPI(`/businesses/${ id }/reviews`).then(({ data }) => {

		res.send(JSON.stringify(data));
	});
});

app.get('/get-categories', function(req, res) {

	yelpAPI("/categories").then(({ data }) => {

		res.send(JSON.stringify(data));
	});
});

app.get('/get-records', function(req, res) {

	const { latitude, longitude, radius } = req.query;
	const categories = "restaurant,takeaway";

	const params = {

		latitude,
		longitude,
		radius,
		categories
	};

	yelpAPI("/businesses/search", { params: params }).then(({ data }) => {

		const allRecords = parseDetails(data);
		res.send(JSON.stringify({ allRecords, center: data.region.center }));
	});
});

const parseDetails = info => {

	console.log("Parsing details...");
	var records = [];

	var parsedInfo = info;
	var businesses = parsedInfo.businesses;
	var total = parsedInfo.total;

	var distance = 0;
	var distanceMiles = 0;

	for (var i = 0; i < businesses.length; i++) {

		var id = businesses[i].id;
		var url = businesses[i].url;
		var imageURL = businesses[i].image_url;
		var name = businesses[i].name;
		var alias = businesses[i].alias;
		var phone = businesses[i].display_phone;
		var price = businesses[i].price;
		var rating = businesses[i].rating;	

		var isClosed = businesses[i].is_closed;
		var isOpen = (isClosed == true) ? false : true;

		var coordinates = businesses[i].coordinates;
		var latitude = coordinates.latitude;
		var longitude = coordinates.longitude;

		var displayAddress = "";

		if (businesses[i].location) {

			var addressDetails = businesses[i].location;

			if (addressDetails.display_address) {
				
				var displayAddressArr = addressDetails.display_address;

				if (Array.isArray(displayAddressArr)) {
					
					for (var j = 0; j < displayAddressArr.length; j++) {

						var displayAddressPart = displayAddressArr[j];
						displayAddress = displayAddress + displayAddressPart;

						if (j != displayAddressArr.length-1) {

							displayAddress = displayAddress + ", ";
						}
					}
				} else {

					displayAddress = displayAddressArr;
				}
			}
		}

		if (businesses[i].distance) {

			var distance = businesses[i].distance;
			var distanceMiles = (distance * 0.000621371192).toFixed(2);
		}

		if (isClosed != true) {
			
			records.push({
				
				id,
				alias,
				url,
				imageURL,
				name,
				phone,
				price,
				rating, 
				latitude, 
				longitude, 
				displayAddress, 
				isOpen, 
				distance: distanceMiles
			});
		}
	}

	return records;
}