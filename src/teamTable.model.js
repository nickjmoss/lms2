import { types } from 'mobx-state-tree';

const { string, optional, model, maybeNull, number, array } = types;

const HelloModel = model('HelloModel', {
	currentTeams: optional(array(model('TeamModel', {
		teamId: maybeNull(number),
		teamName: maybeNull(string),
		coachFirstName: maybeNull(string),
		coachLastName: maybeNull(string),
		coachPhone: maybeNull(number),
		numOfPlayers: maybeNull(number)
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
		}
	}))
	.actions((self) => ({
		setTest(value) {
			self.testValue = value;
		}
	}))

export default HelloModel;