import { types, flow } from 'mobx-state-tree';
import axios from 'axios';
import { message } from 'antd';

const { string, optional, model, maybeNull, number, array, boolean } = types;

const HelloModel = model('HelloModel', {
	isLoading: maybeNull(boolean),
	currentTeams: optional(array(model('TeamModel', {
		team_id: maybeNull(number),
		team_name: maybeNull(string),
		coach_first_name: maybeNull(string),
		coach_last_name: maybeNull(string),
		coach_phone: maybeNull(string),
		num_of_players: maybeNull(number),
		wins: maybeNull(number),
		losses: maybeNull(number),
		place: maybeNull(number)
	})), []),
	state: optional(model('StateModel', {
		searchText: optional(string, ''),
		sorter: optional(model('SorterModel', {
			sortCol: optional(string, ''),
			sortDir: optional(string, '')
		}), {})
	}), {}),
	testValue: optional(string, "test")
})
	.views((self) => ({
		get test() {
			return self.testValue;
		},
		get teams() {
			return self.currentTeams.slice();
		}
	}))
	.actions((self) => ({
		afterCreate() {
			self.fetchTeams();
		},
		setCurrentTeams(data) {
			self.currentTeams = data.map(row => ({
				team_id: row.team_id,
				team_name: row.team_name,
				coach_first_name: row.coach_first_name,
				coach_last_name: row.coach_last_name,
				coach_phone: row.coach_phone,
				num_of_players: row.num_of_players,
				wins: row.wins,
				losses: row.losses,
				place: row.place
			}))
		},
		setSearchText(text) {
			self.state.searchText = text;
			self.fetchTeams();
		},
		setIsLoading(loading) {
			self.isLoading = loading;
		},
		setSorter(columnKey, order) {
			self.state.sorter.sortCol = columnKey;
			self.state.sorter.sortDir = order;
			self.fetchTeams();
		},
		fetchTeams: flow(function* fetchTeams() {
			self.setIsLoading(true);
			try {
				const { data } = yield axios.get(`https://e6ry5i05te.execute-api.us-west-1.amazonaws.com/dev/teams_njm_su22?search=${self.state.searchText}&sortCol=${self.state.sorter.sortCol}&sortDir=${self.state.sorter.sortDir}`);
				self.setCurrentTeams(data.data);
				self.setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		}),
		deleteTeam: flow(function* deleteTeam(id) {
			self.setIsLoading(true);
			try {
				const { data: { success } } = yield axios.delete(`https://e6ry5i05te.execute-api.us-west-1.amazonaws.com/dev/teams_njm_su22?teamId=${id}`);
				if (success) {
					message.success("Successfully deleted team");
					self.fetchTeams();
				}
				else {
					message.error("Could not delete team");
				}
				self.setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		})
	}))

export default HelloModel;