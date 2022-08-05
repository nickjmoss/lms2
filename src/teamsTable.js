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
	const GoodTable = observer(Table);
	return (
		<>
			<Button
				type="danger"
				icon={<DeleteOutlined />}
				onClick={model.updateTeams}
			/>
			<GoodTable
				columns={columns}
				dataSource={model.teams}
			/>
		</>
	);
});

export default TeamsTable;