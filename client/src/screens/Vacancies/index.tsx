import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { VacancyType } from '../../helpers/types';
import PipelineTab from './PipelineTab';
import VacanciesTab from './VacanciesTab';

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

const Vacancies = () => {

	const [tabIndex, setTabIndex] = useState<number>(0);
	const [currentVacancy, setCurrentVacancy] = useState<VacancyType | null>(null);

	const _tabChangeHandler = (event: React.SyntheticEvent, newValue: number) => {
		setTabIndex(newValue);
	}

	return (
		// <div className={tabIndex === 0 ? 'm-5 w-full h-full vacancies-div' : 'm-5 w-full h-full vacancies-div overflow-x-scroll overflow-y-hidden'}>
		<div className='m-5 w-full h-full vacancies-div'>
			<Tabs className='' value={tabIndex} onChange={_tabChangeHandler}>
				<Tab
					label='Vacancies'
					value={0}
					{...a11yProps(0)}
				/>

				<Tab
					label='Pipeline'
					value={1}
					{...a11yProps(1)}
				/>
			</Tabs>

			<TabPanel value={tabIndex} index={0}>
				<VacanciesTab
					setTabIndex={setTabIndex}
					setCurrentVacancy={setCurrentVacancy}
				/>
			</TabPanel>

			<TabPanel value={tabIndex} index={1}>
				<PipelineTab
					currentVacancy={currentVacancy}
				/>
			</TabPanel>
		</div>
	)
}

export default Vacancies