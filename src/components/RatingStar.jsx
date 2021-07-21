import { IonIcon } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import styles from "../styles/RatingStar.module.scss";

export const RatingStar = ({ rated = false, small = false }) => (

	<IonIcon className={ rated ? styles.star : styles.outlineStar } icon={ star } style={ small ? { fontSize: "0.6rem" } : {} } />
);