import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
const platform = Capacitor.getPlatform();

export const getLocation = async () => {

	const permission = await Geolocation.checkPermissions();
	var coordinates;

	if (permission.location === "granted") {

		var options = {
		
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: Infinity
		};
		
		coordinates = await Geolocation.getCurrentPosition(options);
	} else {

		if (platform === "web") {

			console.log("Permission Denied.");
		} else {

			await Geolocation.requestPermissions();
			coordinates = await Geolocation.getCurrentPosition(options);
		}
	}

	return {

		currentLocation: {

			latitude: coordinates.coords.latitude,
			longitude: coordinates.coords.longitude
		}
	}
}