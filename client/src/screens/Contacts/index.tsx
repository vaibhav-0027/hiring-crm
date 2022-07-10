import React, { useEffect, useState } from 'react';
import { dummyCompanyIdNameMap, dummyContactList } from '../../helpers/dummyContacts';
import { ContactType } from '../../helpers/types';
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

	useEffect(() => {
		setCurrentContactList(dummyContactList);
		setFullContactList(dummyContactList);
		setCompanyIdNameMap(dummyCompanyIdNameMap);
	}, []);

	return (
		<div className='m-5 mt-20 w-full h-full'>

			<ContactModal
				open={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
				currentSelected={currentSelected}
				companyIdNameMap={companyIdNameMap}
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