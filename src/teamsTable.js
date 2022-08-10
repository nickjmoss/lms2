import { observer } from "mobx-react-lite";
import { Table, Button, Input, Tooltip, Modal, Form } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Search } = Input;

const TeamsTable = observer(({ model }) => {
	const [form] = Form.useForm();
	const [form2] = Form.useForm();

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
							onClick={() => {
								form.resetFields();
								model.openModal(record);
								form.setFieldsValue(model.modalContents);
							}}
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
			<div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignContent: "center" }}>
				<div style={{ width: 150, padding: '2% 0 2% 0' }}>
					<Button
						type="primary"
						onClick={() => {
							form2.resetFields();
							model.openModal2();
						}}
					>
						Create A Team
					</Button>
				</div>
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
				pagination={model.state.pagination}
				onChange={(pagination, filters, sorter) => {
					const { columnKey, order } = sorter;
					model.setState(columnKey, order, pagination);
				}}
			/>
			<Modal
				title="Update Team"
				visible={model.isModalVisible}
				onOk={async () => {
					const values = await form.validateFields();
					model.submitForm(values);
					form.resetFields();
				}}
				onCancel={model.closeModal}
				okText={"Update Team"}
			>
				<Form
					form={form}
					layout="vertical"
					name="form"
				>
					<Form.Item name="team_name" label="Team Name" rules={[{
						required: true,
						message: 'Please input the team name',
					},]}>
						<Input />
					</Form.Item>
					<Form.Item name="coach_first_name" label="Coach First Name" rules={[{
						required: true,
						message: "Please input the coach's first name"
					}]}>
						<Input />
					</Form.Item>
					<Form.Item name="coach_last_name" label="Coach Last Name" rules={[{
						required: true,
						message: "Please input the coach's last name"
					}]}>
						<Input />
					</Form.Item>
					<Form.Item name="coach_phone" label="Coach Phone Number" rules={[{
						required: true,
						message: "Please input the coach's phone number"
					}]}>
						<Input />
					</Form.Item>
					<Form.Item name="num_of_players" label="Number of Players" rules={[{
						required: true,
						message: "Please input the number of players on the team"
					}]}>
						<Input />
					</Form.Item>
					<Form.Item name="wins" label="Wins" rules={[{
						required: true,
						message: "Please input the number of wins"
					}]}>
						<Input />
					</Form.Item>
					<Form.Item name="losses" label="Losses" rules={[{
						required: true,
						message: "Please input the number of losses"
					}]}>
						<Input />
					</Form.Item>
					<Form.Item name="place" label="Place" rules={[{
						required: true,
						message: "Please input the team's place"
					}]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				title="Create A Team"
				visible={model.isModal2Visible}
				onOk={async () => {
					const values = await form2.validateFields();
					model.submitForm2(values);
					form2.resetFields();
				}}
				onCancel={model.closeModal2}
				okText={"Create Team"}
			>
				<Form
					form={form2}
					layout="vertical"
					name="form2"
				>
					<Form.Item name="team_name" label="Team Name" rules={[{
						required: true,
						message: 'Please input the team name',
					},]}>
						<Input />
					</Form.Item>
					<Form.Item name="coach_first_name" label="Coach First Name" rules={[{
						required: true,
						message: "Please input the coach's first name"
					}]}>
						<Input />
					</Form.Item>
					<Form.Item name="coach_last_name" label="Coach Last Name" rules={[{
						required: true,
						message: "Please input the coach's last name"
					}]}>
						<Input />
					</Form.Item>
					<Form.Item name="coach_phone" label="Coach Phone Number" rules={[{
						required: true,
						message: "Please input the coach's phone number"
					}]}>
						<Input />
					</Form.Item>
					<Form.Item name="num_of_players" label="Number of Players" rules={[{
						required: true,
						message: "Please input the number of players on the team"
					}]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
});

export default TeamsTable;