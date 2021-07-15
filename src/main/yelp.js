import { setStore } from "../store/RecordsStore";

export const getRecords = async (currentPoint) => {


	//	Replace lat/long with values from get current location.
	//	Allow choosing of radius?
	//	Offset could = amount loaded in an infinite scroll?
	var latitude = currentPoint.latitude, longitude = currentPoint.longitude, radius = 1000, offset = 0;
	const response = await fetch(`http://localhost:4000/get-records?latitude=${ latitude }&longitude=${ longitude }&radius=${ radius }&offset=${ offset }`);
	const data = await response.json();
	setStore(data);
	
	// return data;
}

export const getCategories = async () => {

	const response = await fetch(`http://localhost:4000/get-categories`);
	const data = await response.json();
	return data;
}