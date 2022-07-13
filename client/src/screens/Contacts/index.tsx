import React, { useEffect, useState } from 'react';
import { dummyCompanyIdNameMap, dummyContactList } from '../../helpers/dummyContacts';
import { ContactType } from '../../helpers/types';
import { fetchCompanyIdNameMap } from '../Companies/apis';
import { fetchContactList } from './apis';
import ContactModal from './ContactModal';
import ContactsTable from './ContactsTable';
import SearchFilterRow from './SearchFilterRow';

const Contacts = () => {

	const [searchField, setSearchField] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentContactList, setCurrentContactList] = useState<ContactType[]>([]);
	const [fullContactList, setFullContactList] = useState<ContactType[]>([]);
	const [companyIdNameMap, setCompanyIdNameMap] = useState<object>({});
	const [currentSelected, setCurrentSelected] = useState<ContactType | null>(null);
	const [updatedContactInfo, setUpdatedContactInfo] = useState<ContactType | null>(null);

	useEffect(() => {
		(async () => {
			const data = await fetchContactList();
			setFullContactList(data);
			setCurrentContactList(data);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const data = await fetchCompanyIdNameMap();
			setCompanyIdNameMap(data);
		})()
	}, []);

	useEffect(() => {
		if (!updatedContactInfo) {
			return;
		}

		let found = false;
		let tempFullList = fullContactList;
		let tempCurrentList = currentContactList;

		tempFullList = tempFullList.map(_current => {
			if (_current.id === updatedContactInfo.id) {
				found = true;
				return updatedContactInfo;
			}

			return _current;
		});

		tempCurrentList = tempCurrentList.map(_current => {
			if (_current.id === updatedContactInfo.id) {
				return updatedContactInfo;
			}

			return _current;
		});

		if (!found) {
			tempFullList.push(updatedContactInfo);
			tempCurrentList.push(updatedContactInfo);
		}

		setFullContactList(tempFullList);
		setCurrentContactList(tempCurrentList);

	}, [updatedContactInfo]);

	return (
		<div className='m-5 mt-20 w-full h-full'>

			<ContactModal
				open={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
				currentSelected={currentSelected}
				companyIdNameMap={companyIdNameMap}
				setUpdatedContactInfo={setUpdatedContactInfo}
			/>

			<SearchFilterRow
				searchField={searchField}
				setSearchField={setSearchField}
				contactList={fullContactList}
				companyIdList={dummyCompanyIdNameMap}
				setContactList={setCurrentContactList}
				setIsModalOpen={setIsModalOpen}
				setCurrentSelected={setCurrentSelected}
			/>

			<ContactsTable
				contactList={currentContactList}
				companyIdNameMap={companyIdNameMap}
				setIsModalOpen={setIsModalOpen}
				setCurrentSelected={setCurrentSelected}
			/>
		</div>

	)
}

export default Contacts