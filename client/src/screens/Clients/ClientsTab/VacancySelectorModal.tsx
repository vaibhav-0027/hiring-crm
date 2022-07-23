import { Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { DUMMY_UUID } from '../../../helpers/constants';
import { ClientType, VacancyType } from '../../../helpers/types';
import { fetchCompanyIdNameMap } from '../../Companies/apis';
import { addCandidateForVacancy } from '../../Vacancies/PipelineTab/apis';
import { fetchVacanciesList } from '../../Vacancies/VacanciesTab/apis';

interface VacancySelectorModalProps {
    open: boolean;
    handleClose: () => void;
    currentSelected: ClientType | null;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '75vh',
    overflowX: 'scroll',
    bgcolor: 'white',
    borderRaduis: '5px',
    boxShadow: 24,
    p: 4,
};

const VacancySelectorModal = (props: VacancySelectorModalProps) => {

    const {
        open,
        handleClose,
        currentSelected } = props;

    const [fullVacancyList, setFullVacancyList] = useState<VacancyType[]>([]);
    const [currentVacancyList, setCurrentVacancyList] = useState<VacancyType[]>([]);
    const [search, setSearch] = useState<string>('');
    const [companyIdNameMap, setCompanyIdNameMap] = useState<any>({});

    useEffect(() => {

        (async () => {
            const data = await fetchCompanyIdNameMap();
            setCompanyIdNameMap(data);
        })();

    }, []);

    useEffect(() => {

        (async () => {
            const data = await fetchVacanciesList();
            setFullVacancyList(data);
            setCurrentVacancyList(data);
        })();

    }, [currentSelected]);

    useEffect(() => {
        if (search === "") {
            setCurrentVacancyList(fullVacancyList);
            return;
        }

        setCurrentVacancyList((prev: VacancyType[]) => {
            return prev.filter((_current: VacancyType) => {
                if (_current.roleName.toLowerCase().includes(search)) {
                    return _current;
                }

                if (companyIdNameMap[_current.companyId].toLowerCase().includes(search)) {
                    return _current;
                }

                return null;
            });
        });
    }, [search]);

    const _addHandler = async (info: VacancyType) => {
        if (!currentSelected) {
            return;
        }

        const req = {
            id: DUMMY_UUID,
            status: 0,
            description: '',
            vacancyId: info.id,
            clientId: currentSelected.id,
            name: currentSelected.name,
        }

        const response = await addCandidateForVacancy(req);

        if (!response) {
            toast.error('Something went wrong!');
            return;
        }

        if (response.error === 403) {
            toast.error("Already exists!");
            return;
        }

        handleClose();
    }

    const _renderVacancyList = () => {
        return (
            <div className='flex flex-col h-full overflow-scroll mt-3'>
                {
                    currentVacancyList.map((_current: VacancyType, idx: number) => {
                        return (
                            <div key={idx} className='flex flex-row w-full'>
                                <div className='w-5/12'>
                                    {companyIdNameMap[_current.companyId]}
                                </div>

                                <div className='w-5/12'>
                                    {_current.roleName}
                                </div>

                                <div
                                    className='text-primary font-bold cursor-pointer'
                                    onClick={() => _addHandler(_current)}>
                                    Add
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <div className='w-full h-full flex flex-col'>
                    <div className='font-bold text-2xl'>
                        Add to vacancy
                    </div>
                    <TextField
                        label='Search'
                        placeholder='Search'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    {_renderVacancyList()}
                </div>
            </Box>
        </Modal>
    )
}

export default VacancySelectorModal