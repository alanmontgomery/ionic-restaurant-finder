import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonNote, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { arrowForward, navigateOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import RecordsStore from '../store/RecordsStore';
import { fetchRecords } from '../store/Selectors';

import styles from "../styles/ViewAll.module.scss";

const Tab2 = () => {

	const records = RecordsStore.useState(fetchRecords);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>View all</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">View all</IonTitle>
					</IonToolbar>
				</IonHeader>

				{ records.map((record, index) => {

					return (
						<IonCard className={ styles.viewCard }>
							<IonCardHeader>
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
				
				{/* <ExploreContainer name="Tab 2 page" /> */}
			</IonContent>
		</IonPage>
	);
};

export default Tab2;
