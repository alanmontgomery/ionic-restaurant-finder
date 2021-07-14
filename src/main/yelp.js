export const getRecords = async (currentPoint) => {


	//	Replace lat/long with values from get current location.
	//	Allow choosing of radius?
	//	Radius could = amount loaded in an infinite scroll?
	var latitude = currentPoint.latitude, longitude = currentPoint.longitude, categories = "restaurant,takeaway", radius = 1000, offset = 0;
	const response = await fetch(`http://localhost:4000/get-records?latitude=${ latitude }&longitude=${ longitude }&categories=${ categories }&radius=${ radius }&offset=${ offset }`);
	const data = await response.json();
	return data;
}