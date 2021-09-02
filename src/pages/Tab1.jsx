import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonModal, IonPage, IonSearchbar, IonToolbar, isPlatform, useIonViewWillEnter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getRecords } from '../main/yelp';

import styles from "../styles/Map.module.scss";

import { Map, Marker, Overlay } from "pigeon-maps";
import { maptiler } from 'pigeon-maps/providers';

import { MapOverlay } from "../components/MapOverlay";
import { CurrentPointOverlay } from "../components/CurrentPointOverlay";
import { flashOffOutline, flashOutline, list } from 'ionicons/icons';

import RecordsStore from '../store/RecordsStore';
import { fetchRecords } from '../store/Selectors';
import { getLocation } from '../main/utils';
import { ListModal } from '../components/ListModal';

const maptilerProvider = maptiler('d5JQJPLLuap8TkJJlTdJ', 'streets');

const Tab1 = () => {

	const web = isPlatform("web" || "pwa" || "mobileweb" || "");

	//	UNCOMMENT THESE TO USE CURRENT LOCATION.

	// const [ currentPoint, setCurrentPoint ] = useState(false);

	// useEffect(() => {

	// 	const getCurrentLocation = async () => {

	// 		const fetchedLocation = await getLocation();
	// 		setCurrentPoint(fetchedLocation.currentLocation);
	// 	}

	// 	getCurrentLocation();
	// }, []);

	useIonViewWillEnter(() => {

		getRecords(currentPoint);
	});

	const [ currentPoint, setCurrentPoint ] = useState({ latitude: 40.8264691, longitude: -73.9549618 });

	const [ showCurrentPointInfo, setShowCurrentPointInfo ] = useState(false);

	const records = RecordsStore.useState(fetchRecords);
	const center = RecordsStore.useState(s => s.center);

	const [ results, setResults ] = useState(false);
	const [ zoom, setZoom ] = useState(14);

	const [ searchTerm, setSearchTerm ] = useState("");
	const [ moveMode, setMoveMode ] = useState(false);

	const [ showListModal, setShowListModal ] = useState(false);

	useEffect(() => {

		const getData = async () => {

			await getRecords(currentPoint);
		}

		getData();
	}, [ currentPoint ]);

	useEffect(() => {

		setResults([...records]);
	}, [ records ]);

	useEffect(() => {

		const search = searchTerm.toLowerCase();
		var searchResults = [];

		if (searchTerm !== "") {
			
			records.forEach(record => {

				if (record.name.toLowerCase().includes(search)) {

					searchResults.push(record);
				}
			});

			setResults(searchResults);
		} else {

			setResults([...records]);
		}

	}, [ searchTerm ]);

	const showMarkerInfo = (e, index) => {

		const tempRecords = JSON.parse(JSON.stringify(results));

		//	Hide all current marker infos
		setShowCurrentPointInfo(false);
		!tempRecords[index].showInfo && tempRecords.forEach(tempRecord => tempRecord.showInfo = false);
		tempRecords[index].showInfo = !tempRecords[index].showInfo;

		setResults(tempRecords);
	}

	const hideMarkers = () => {

		const tempRecords = JSON.parse(JSON.stringify(results));
		tempRecords.forEach(tempRecord => tempRecord.showInfo = false);
		setResults(tempRecords);
		setShowCurrentPointInfo(false);
	}

	const handleMapClick = e => {

		const clickedPoint = e.latLng;
		setCurrentPoint({ latitude: clickedPoint[0], longitude: clickedPoint[1] });
		setMoveMode(false);
	}

	const handleShowCurrentPointInfo = () => {

		hideMarkers();
		setShowCurrentPointInfo(!showCurrentPointInfo);
	}

	return (
		<IonPage>
			<IonContent fullscreen>
				{ (center && center.latitude && center.longitude) && results &&
					<>

						<div className={ styles.overlaySearch } style={{ marginTop: web ? "0.5rem" : "3.5rem" }}>
							<IonSearchbar placeholder="Search plotted points" animated={ true } value={ searchTerm } onIonChange={ e => setSearchTerm(e.target.value) } />
						</div>

						<Map onClick={ e => moveMode ? handleMapClick(e) : hideMarkers(e) } defaultCenter={ [center.latitude, center.longitude] } defaultZoom={ zoom } provider={ maptilerProvider } touchEvents={ true }>

							<Marker onClick={ handleShowCurrentPointInfo } color="red" width={ 50 } anchor={ currentPoint ? [ currentPoint.latitude, currentPoint.longitude] : [ center.latitude, center.longitude] } />

							{ results.map((record, index) => {

								return <Marker onClick={ e => showMarkerInfo(e, index) } key={ index } color="#3578e5" width={ 50 } anchor={ [ record.latitude, record.longitude ] } />
							})}

							{ results.map((record, index) => {

								if (record.showInfo) {
									
									return (
										<Overlay key={ index } anchor={ [ record.latitude, record.longitude ] } offset={[95, 304]}>
											<MapOverlay record={ record } />
										</Overlay>
									);
								}
							})}

							{ showCurrentPointInfo && 
								
								<Overlay anchor={ [ currentPoint.latitude, currentPoint.longitude ] } offset={[95, 153]}>
									<CurrentPointOverlay /> 
								</Overlay>
							}
						</Map>

						<IonFab vertical="bottom" horizontal="end" slot="fixed" onClick={ () => setMoveMode(!moveMode) }>
							<IonFabButton>
								<IonIcon icon={ moveMode ? flashOffOutline : flashOutline } />
							</IonFabButton>
						</IonFab>

						<IonFab vertical="bottom" horizontal="start" slot="fixed" onClick={ () => setShowListModal(!showListModal) }>
							<IonFabButton>
								<IonIcon icon={ list } />
							</IonFabButton>
						</IonFab>

						<IonModal isOpen={ showListModal } onDidDismiss={ () => setShowListModal(false) } swipeToClose={ true } initialBreakpoint={ 0.6 } breakpoints={ [0, 0.6, 1] } backdropBreakpoint={ 0.6 }>
							<ListModal hideModal={ () => setShowListModal(false) } searchTerm={ searchTerm } search={ setSearchTerm } records={ results } />
						</IonModal>
					</>
				}
			</IonContent>
		</IonPage>
	);
};

export default Tab1;