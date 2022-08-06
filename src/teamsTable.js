import { observer } from "mobx-react-lite";
import { Table, Button, Input, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Search } = Input;

const TeamsTable = observer(({ model }) => {

	const columns = [
		{
			title: 'Team Name',
			dataIndex: 'team_name',
			key: 'team_name',
			sorter: true,
			render: (text, record, index) => {
				return (
					<Tooltip
						title={`Wins: ${record.wins} Losses: ${record.losses} Place: ${record.place}`}
					>
						{text}</Tooltip>
				)
			}
		},
		{
			title: 'Coach First Name',
			dataIndex: 'coach_first_name',
			key: 'coach_first_name',
			sorter: true,
		},
		{
			title: 'Coach Last Name',
			dataIndex: 'coach_last_name',
			key: 'coach_last_name',
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
					<div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
						<Button
							type="primary"
							icon={<EditOutlined />}
							onClick={() => { model.setTest('tested') }}
							style={{ padding: "5px" }}
						/>
						<Button
							type="danger"
							icon={<DeleteOutlined />}
							onClick={() => {
								model.deleteTeam(record.team_id);
							}}
							style={{ padding: "5px" }}
						/>
					</div>
				)
			}
		},
	]
	return (
		<>
			<div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
				<Search
					placeholder="Search for a Team"
					allowClear
					onSearch={model.setSearchText}
					style={{ width: 304, padding: '2% 0 2% 0' }}
				/>
			</div>
			<Table
				columns={columns}
				dataSource={model.teams}
				loading={model.isLoading}
				onChange={(pagination, filters, sorter) => {
					const { columnKey, order } = sorter;
					model.setSorter(columnKey, order);
				}}
			/>
		</>
	);
});

export default TeamsTable;