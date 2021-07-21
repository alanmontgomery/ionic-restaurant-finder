import { IonAvatar, IonBackButton, IonBadge, IonButton, IonButtons, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonNote, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonModal, useIonViewWillEnter } from "@ionic/react";
import { callOutline } from "ionicons/icons";
import { Map, Marker } from "pigeon-maps";
import { useState } from "react";
import { useParams } from "react-router";
import { RatingStar } from "../components/RatingStar";
import { getRecord } from "../main/yelp";
import { RecordsStore } from "../store";
import { fetchRecord } from "../store/Selectors";

import styles from "../styles/ViewPlace.module.scss";

import { maptiler } from 'pigeon-maps/providers';
import { useRef } from "react";
const maptilerProvider = maptiler('d5JQJPLLuap8TkJJlTdJ', 'streets');

const ViewPlace = ({}) => {

	const pageRef = useRef();
	const [ present, dismiss ] = useIonLoading();
	const { id } = useParams();
	const record = RecordsStore.useState(fetchRecord(id));
	const [ extendedRecord, setExtendedRecord ] = useState(false);

	const MapView = () => (
		<IonContent className="ion-text-center">

			<IonHeader>
				<IonToolbar>

					<IonButtons slot="start">
						<IonButton onClick={ dismissModal }>Close</IonButton>
					</IonButtons>
					<IonTitle>Map View</IonTitle>
				</IonToolbar>
			</IonHeader>

			<Map defaultCenter={ [extendedRecord.coordinates.latitude, extendedRecord.coordinates.longitude] } defaultZoom={ 13 } provider={ maptilerProvider } touchEvents={ true }>
				<Marker color="red" width={ 50 } anchor={[ extendedRecord.coordinates.latitude, extendedRecord.coordinates.longitude] } />
			</Map>			
		</IonContent>
	);

	useIonViewWillEnter(() => {


		const getData = async () => {

			const extendedData = await getRecord(id);
			setExtendedRecord(extendedData);
			dismiss();
		}

		present("Fetching extended details...");
		getData();
	});
	
	const imageURL = record.imageURL ? record.imageURL : "/placeholder.jpeg";
	const rating = Math.floor(record.rating).toFixed(0);

	const [ presentModal, dismissModal ] = useIonModal(MapView);


	return (

		<IonPage className={ styles.page } ref={ pageRef }>
			<IonHeader>
				<IonToolbar>

					<IonButtons slot="start">
						<IonBackButton text="All places" />
					</IonButtons>
					<IonTitle>{ record.distance } miles away</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<div className={ styles.cardImage } style={{ backgroundImage: `url(${ imageURL })` }}>
							<IonRow>
								<IonCol size="8">
									<IonCardSubtitle>
										{ record.name }

										<div>
											{ Array.apply(null, { length: 5 }).map((e, i) => (

												<RatingStar key={ i } rated={ rating > i } small={ true } />
											))}
										</div>
										
										<IonNote>{ record.distance } miles away</IonNote>
									</IonCardSubtitle>
								</IonCol>
							</IonRow>
						</div>	
					</IonToolbar>
				</IonHeader>
				
				<IonGrid>
					<IonRow className={ styles.categoryContainer }>
						<IonCol size="8">
							{ (extendedRecord.categories && extendedRecord.categories.length > 0) && extendedRecord.categories.map((category, index) => {

								return (
									<IonCol key={ index } size="1">
										<IonBadge key={ `category_${ index }` } color="primary">{ category.title }</IonBadge>
									</IonCol>
								);
							})}
						</IonCol>

						<IonCol size="4" className="ion-justify-content-between">
							<a href={ record.url } target="_blank" rel="noreferrer">View on Yelp &rarr;</a>
						</IonCol>
					</IonRow>

					<IonRow className="ion-margin-top">
						<IonCol size="6">
							<a href={ `tel:${ record.phone }` }>
								<IonButton color="primary" expand="block">
									<IonIcon icon={ callOutline } />
								</IonButton>
							</a>
						</IonCol>

						<IonCol size="6">
							<IonButton color="primary" expand="block" fill="outline" onClick={ () => presentModal({

								swipetoClose: true,
								presentingElement: pageRef.current
							}) }>
								View on map
							</IonButton>
						</IonCol>
					</IonRow>

					{ (extendedRecord.photos && extendedRecord.photos.length > 0) && 
						<IonRow className="ion-margin-top">
							<IonCol size="12">
								<IonCardSubtitle>Photos ({ extendedRecord.photos.length })</IonCardSubtitle>
							</IonCol>
						</IonRow>
					}

					<IonRow>
						{ (extendedRecord.photos && extendedRecord.photos.length > 0) && extendedRecord.photos.map((photo, index) => {

							if (index < 3) {
								return (

									<IonCol key={ index } size="4">
										<div className={ styles.cardImage } style={{ backgroundImage: `url(${ photo })` }}/>
									</IonCol>
								);
							}
						})}
					</IonRow>

					{ (extendedRecord.reviews && extendedRecord.reviews.length > 0) && 
						<IonRow className="ion-margin-top">
							<IonCol size="12">
								<IonCardSubtitle>Reviews ({ extendedRecord.reviews.length })</IonCardSubtitle>
							</IonCol>
						</IonRow>
					}

					<IonRow>
						{ (extendedRecord.reviews && extendedRecord.reviews.length > 0) && extendedRecord.reviews.map((review, index) => {

							return (
								<IonCol key={ `review_${ index }`} size="12">
									<IonItem lines="full">
										<IonLabel className="ion-text-wrap">
											<IonRow className="ion-align-items-center ion-justify-content-between">
												<IonAvatar>
													<img src={ review.user.image_url } />
												</IonAvatar>
												<IonCardSubtitle>{ review.user.name }</IonCardSubtitle>

												<IonButton color="primary">Full review on Yelp &rarr;</IonButton>
											</IonRow>
											<p className="ion-padding-top">{ review.text }</p>
										</IonLabel>
									</IonItem>
								</IonCol>
							);
						})}
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
}

export default ViewPlace;