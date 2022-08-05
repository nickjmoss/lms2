import React from 'react';
import ReactDOM from 'react-dom/client';
import TeamsTable from './teamsTable.js';
import TeamsTableModel from './teamTable.model.js';
import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<TeamsTable model={TeamsTableModel.create({})} />
);
