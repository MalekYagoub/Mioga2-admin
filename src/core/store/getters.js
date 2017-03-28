export const getRowIdsDataUsers = state => {

	let formData = new FormData();
	for (let i = 0; i < state.users.checkedUsers.length; i++) {

		formData.append('rowids', state.users.checkedUsers[i]);

	}
	return formData;

};
