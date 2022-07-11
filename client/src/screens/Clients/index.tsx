import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';
import RolesTab from './RolesTab/index'
import ClientsTab from './ClientsTab/index';
import { RoleListType } from '../../helpers/types';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

const a11yProps = (index: number) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const Clients = () => {

	const [tabIndex, setTabIndex] = useState<number>(0);
	const [currentRole, setCurrentRole] = useState<RoleListType | null>(null);

	const _tabChangeHandler = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	}

	return (
		<div className='m-5 w-full h-full'>
			<Tabs
				value={tabIndex}
				onChange={_tabChangeHandler}
			>
				<Tab
					label='Roles'
					value={0}
					{...a11yProps(0)}
				/>

				<Tab
					label='Clients'
					value={1}
					{...a11yProps(1)}
				/>
			</Tabs>

			<TabPanel value={tabIndex} index={0}>
				<RolesTab
					setTabIndex={setTabIndex}
					setCurrentRole={setCurrentRole}
				/>
			</TabPanel>

			<TabPanel value={tabIndex} index={1}>
				<ClientsTab
					currentRole={currentRole}
				/>
			</TabPanel>
		</div>
	)
}

export default Clients