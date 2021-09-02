import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCol, IonGrid, IonIcon, IonNote, IonRow, IonSearchbar, IonText } from "@ionic/react";
import { RatingStar } from "./RatingStar";

import styles from "../styles/ViewAll.module.scss";
import { arrowForward, navigateOutline } from "ionicons/icons";

export const ListModal = ({ records, searchTerm, search, hideModal }) => {

	return (

		<IonGrid>

			<IonRow>
				<IonCol size="12">
					<IonSearchbar placeholder="Search for a place..." value={ searchTerm } onIonChange={ e => search(e.target.value) } />
				</IonCol>
			</IonRow>
			
			<IonRow>
				<div className={ styles.viewCardContainerModal }>
					{ records.map((record, index) => {

						const rating = Math.floor(record.rating).toFixed(0);

						return (
							<IonCard key={ `record_${ index }` } className={ `${ styles.viewCardModal } animate__animated animate__faster animate__fadeIn` } routerLink={ `/list/${ record.id }` } onClick={ hideModal }>
								<IonCardHeader>

									{ Array.apply(null, { length: 5 }).map((e, i) => (

										<RatingStar key={ i } rated={ rating > i } />
									))}

									<IonCardSubtitle>{ record.name }</IonCardSubtitle>
									<IonNote color="medium">{ record.displayAddress }</IonNote>

									<IonRow className="ion-justify-content-between ion-align-items-center">
										<IonText color="primary">
											<p>
												<IonIcon icon={ navigateOutline } />
												{ record.distance } miles away
											</p>
										</IonText>

										<IonButton size="small" color="primary">
											<IonIcon icon={ arrowForward } />
										</IonButton>
									</IonRow>
								</IonCardHeader>
							</IonCard>
						);
					})}
				</div>
			</IonRow>
		</IonGrid>
	);
}