import { Store } from 'pullstate';

const RecordsStore = new Store({

	records: [],
	center : []
});

export default RecordsStore;

export const setStore = records => {

	RecordsStore.update(state => { state.records = records.allRecords });
	RecordsStore.update(state => { state.center = records.center });
}