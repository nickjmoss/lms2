import { observer } from "mobx-react-lite";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const TeamsTable = observer(({ model }) => {
	const columns = [
		{
			title: 'Team Name',
			dataIndex: 'team_name',
			key: 'team_name',
			sorter: true,
		},
		{
			title: 'Coach',
			dataIndex: 'coach_name',
			key: 'coach',
			sorter: true,
		},
		{
			title: 'Coach Phone',
			dataIndex: 'coach_phone',
			key: 'coach_phone'
		},
		{
			title: 'Number Of Players',
			dataIndex: 'num_of_players',
			key: 'num_of_players',
			sorter: true,
			render: (text, record, index) => {
				return (
					<div>{model.testValue}</div>
				)
			}
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actions',
			render: (text, record, index) => {
				return (
					<>
						<Button
							type="primary"
							icon={<EditOutlined />}
							onClick={() => { model.setTest('tested') }}
						/>
						<Button
							type="danger"
							icon={<DeleteOutlined />}
							onClick={() => { model.setTest('untested') }}
						/>
					</>
				)
			}
		},
	]
	return (
		<>
			<Table
				columns={columns}
				dataSource={[{ key: 1, team_name: "nick", coach_name: "nick moss", coach_phone: "1234567890", num_of_players: 10 }]}
			/>
		</>
	);
});

export default TeamsTable;