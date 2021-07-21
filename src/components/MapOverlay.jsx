import { IonBadge, IonButton, IonCardSubtitle, IonCol, IonIcon, IonNote, IonRow } from "@ionic/react";
import { arrowForward, call, callOutline, navigateOutline, phoneLandscapeOutline, phonePortraitOutline, pricetag, pricetags, pricetagsOutline } from "ionicons/icons";
import styles from "../styles/MapOverlay.module.scss";

export const MapOverlay = ({ record }) => (

	<div className={ styles.overlayContainer }>

		<IonCardSubtitle>{ record.name }</IonCardSubtitle>
		<IonNote color="medium">{ record.displayAddress }</IonNote>
		<IonBadge color="dark">{ record.rating } star rating</IonBadge>

		<p>
			<IonIcon icon={ navigateOutline } />
			&nbsp;{ record.distance } miles away
		</p>

		{ record.phone && 
			<p>
				<IonIcon icon={ call } />
				&nbsp;{ record.phone }
			</p>
		}

		<IonRow className="ion-no-padding ion-no-margin ion-margin-top">
			<IonCol size="12" className="ion-no-padding ion-no-margin">
				<IonButton color="primary" fill="solid" size="small" expand="block" routerLink={ `/list/${ record.id }` }>
					View &rarr;
				</IonButton>
			</IonCol>
		</IonRow>

		<IonRow className="ion-no-padding ion-no-margin">
			
			{ record.phone && 
				<IonCol size="6" className="ion-no-padding ion-no-margin">
					<IonButton color="primary" fill="outline" size="small" expand="block">
						<IonIcon icon={ callOutline } />
					</IonButton>
				</IonCol>
			}

			<IonCol size={ record.phone ? "6" : "12" } className="ion-no-padding ion-no-margin">
				<IonButton color="primary" fill="outline" size="small" expand="block">
					<IonIcon icon={ navigateOutline } />
				</IonButton>
			</IonCol>
		</IonRow>
	</div>
)