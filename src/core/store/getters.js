export const getRowIdsData = state => (type) => {

	let formData = new FormData();
	let typeAction = type === 'users' ? state.users.checkedUsers : type === 'teams' ? state.teams.checkedTeams : type === 'groups' ? state.groups.checkedGroups : undefined;

	for (let i = 0; i < typeAction.length; i++) {

		type === 'users' ? formData.append('rowids', typeAction[i]) : formData.append('rowid', typeAction[i]);

	}
	return formData;

};
