import { types, flow } from 'mobx-state-tree';
import axios from 'axios';

const { string, optional, model, maybeNull, number, array } = types;

const HelloModel = model('HelloModel', {
	currentTeams: optional(array(model('TeamModel', {
		team_id: maybeNull(number),
		team_name: maybeNull(string),
		coach_name: maybeNull(string),
		coach_phone: maybeNull(string),
		num_of_players: maybeNull(number)
	})), []),
	state: optional(model('StateModel', {
		searchText: maybeNull(string),
		sorter: optional(model('SorterModel', {
			sortCol: maybeNull(string),
			sortDir: maybeNull(string)
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
		updateTeams() {
			self.currentTeams = [
				{ team_id: 1, team_name: "nick", coach_name: "nick moss", coach_phone: "1234567890", num_of_players: 10 },
				{ team_id: 2, team_name: "jazz", coach_name: "nick moss", coach_phone: "1234567890", num_of_players: 10 }
			]
		},
		setCurrentTeams(data) {
			self.currentTeams = data.map(row => ({
				team_id: row.team_id,
				team_name: row.team_name,
				coach_name: `${row.coach_first_name} ${row.coach_last_name}`,
				coach_phone: row.coach_phone,
				num_of_players: row.num_of_players
			}))
		},
		setTest(value) {
			self.testValue = value;
		},
		fetchTeams: flow(function* fetchTeams() {
			try {
				const { data } = yield axios.get('https://e6ry5i05te.execute-api.us-west-1.amazonaws.com/dev/teams_njm_su22');
				self.setCurrentTeams(data.data);
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		})
	}))

export default HelloModel;