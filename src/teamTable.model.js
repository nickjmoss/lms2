import { types, flow } from 'mobx-state-tree';
import axios from 'axios';
import { message } from 'antd';

message.config({
	top: 100
})

const { string, optional, model, maybeNull, number, array, boolean } = types;

const HelloModel = model('HelloModel', {
	isLoading: maybeNull(boolean),
	isModalVisible: optional(boolean, false),
	isModal2Visible: optional(boolean, false),
	modalContents: optional(model('ModalContentsModel', {
		team_id: maybeNull(number),
		team_name: maybeNull(string),
		coach_first_name: maybeNull(string),
		coach_last_name: maybeNull(string),
		coach_phone: maybeNull(string),
		num_of_players: maybeNull(number),
		wins: maybeNull(number),
		losses: maybeNull(number),
		place: maybeNull(number)
	}), {}),
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
		}), {}),
		pagination: optional(model('PaginationModel', {
			total: optional(number, 0),
			current: optional(number, 1),
			pageSize: optional(number, 15),
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
		setState(columnKey, order, pagination) {
			self.state.sorter.sortCol = columnKey;
			self.state.sorter.sortDir = order;
			self.state.pagination = pagination;
			self.fetchTeams();
		},
		openModal(obj) {
			self.isModalVisible = true;
			self.modalContents.team_id = obj.team_id;
			self.modalContents.team_name = obj.team_name;
			self.modalContents.coach_first_name = obj.coach_first_name;
			self.modalContents.coach_last_name = obj.coach_last_name;
			self.modalContents.coach_phone = obj.coach_phone;
			self.modalContents.num_of_players = obj.num_of_players;
			self.modalContents.wins = obj.wins;
			self.modalContents.losses = obj.losses;
			self.modalContents.place = obj.place;
		},
		closeModal() {
			self.isModalVisible = false;
		},
		submitForm(obj) {
			self.closeModal();
			self.updateTeam({ ...obj, team_id: self.modalContents.team_id });
		},
		openModal2() {
			self.isModal2Visible = true;
		},
		closeModal2() {
			self.isModal2Visible = false;
		},
		submitForm2(obj) {
			self.closeModal2();
			self.createTeam(obj);
		},
		fetchTeams: flow(function* fetchTeams() {
			self.setIsLoading(true);
			try {
				const { data } = yield axios.get(`https://e6ry5i05te.execute-api.us-west-1.amazonaws.com/dev/teams_njm_su22?search=${self.state.searchText}&sortCol=${self.state.sorter.sortCol}&sortDir=${self.state.sorter.sortDir}&pageSize=${self.state.pagination.pageSize}&current=${self.state.pagination.current}`);
				self.state.pagination.total = data.count;
				self.setCurrentTeams(data.data);
				self.setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		}),
		createTeam: flow(function* createTeam(body) {
			self.setIsLoading(true);
			try {
				const { data: { success } } = yield axios.post(`https://e6ry5i05te.execute-api.us-west-1.amazonaws.com/dev/teams_njm_su22`, JSON.stringify(body));
				if (success) {
					message.success("Successfully created team");
					self.fetchTeams();
				}
				else {
					message.error("Could not create team");
				}
				self.setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		}),
		updateTeam: flow(function* updateTeam(body) {
			self.setIsLoading(true);
			try {
				const { data: { success } } = yield axios.put(`https://e6ry5i05te.execute-api.us-west-1.amazonaws.com/dev/teams_njm_su22`, JSON.stringify(body));
				if (success) {
					message.success("Successfully updated team");
					self.fetchTeams();
				}
				else {
					message.error("Could not update team");
				}
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