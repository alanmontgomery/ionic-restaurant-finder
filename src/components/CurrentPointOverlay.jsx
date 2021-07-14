import { IonCardSubtitle, IonNote } from "@ionic/react";
import styles from "../styles/MapOverlay.module.scss";

export const CurrentPointOverlay = () => (

	<div className={ styles.overlayContainer }>

		<IonCardSubtitle>Current Location</IonCardSubtitle>
		<IonNote color="medium">Click on the lightning button then choose a new point on the map to view places around that point.</IonNote>
	</div>
)