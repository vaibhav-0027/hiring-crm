import React from 'react'
import { VacancyType } from '../../../helpers/types';
import { styled } from '@mui/system';
import TablePaginationUnstyled, {
    tablePaginationUnstyledClasses as classes,
} from '@mui/base/TablePaginationUnstyled';
import EditIcon from '@mui/icons-material/Edit';

interface VacanciesTableProps {
    vacancyList: VacancyType[];
    setIsModalOpen: (value: boolean) => void;
    setCurrentSelected: (value: VacancyType) => void;
    setTabIndex: (value: number) => void;
    setCurrentVacancy: (value: VacancyType) => void;
    companyIdNameMap: any;
}

const VacanciesTable = (props: VacanciesTableProps) => {

    const {
        vacancyList,
        setIsModalOpen,
        setCurrentSelected,
        setTabIndex,
        setCurrentVacancy,
        companyIdNameMap } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vacancyList.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const Root = styled('div')`
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }
    
            td,
            th {
                border: 1px solid #ddd;
                text-align: left;
                padding: 8px;
            }
    
            th {
                background-color: #ddd;
            }
            `;

    const CustomTablePagination = styled(TablePaginationUnstyled)`
            & .${classes.toolbar} {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
                width: 100%;
    
                @media (min-width: 768px) {
                flex-direction: row;
                align-items: center;
                }
            }
    
            & .${classes.selectLabel} {
                margin: 0;
            }
    
            & .${classes.displayedRows} {
                margin: 0;
    
                @media (min-width: 768px) {
                margin-left: auto;
                }
            }
    
            & .${classes.spacer} {
                display: none;
            }
    
            & .${classes.actions} {
                display: flex;
                gap: 0.25rem;
            }
            `;
    const _selectRowHandler = (info: VacancyType) => {
        setTabIndex(1);
        setCurrentVacancy(info);
    }

    const _editCurrentRow = (info: VacancyType) => {
        setCurrentSelected(info);
        setIsModalOpen(true);
    }

    return (
        <Root className='w-full mt-3'>
            <table className='w-full'>
                <thead className='w-full'>
                    <tr className='w-full'>
                        <th className='w-2/12'>Name</th>
                        <th className='w-1/12'>Min package</th>
                        <th className='w-1/12'>Max package</th>
                        <th className='w-1/12'>Open count</th>
                        <th className='w-4/12'>Description</th>
                        <th className='w-2/12'>Company</th>
                        <th className='w-1/12'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(rowsPerPage > 0
                        ? vacancyList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : vacancyList
                    ).map((_vacancy) => (
                        <tr key={_vacancy.id}>
                            <td className='w-2/12' align='justify'>
                                <div className='w-full'>
                                    <span
                                        onClick={() => _selectRowHandler(_vacancy)}
                                        className='cursor-pointer text-primary'>
                                        {_vacancy.roleName}
                                    </span>
                                </div>
                            </td>
                            <td className='w-1/12' align='justify' >
                                {_vacancy.packageMin}
                            </td>
                            <td className='w-1/12' align='justify' >
                                {_vacancy.packageMax}
                            </td>
                            <td className='w-1/12' align='justify' >
                                {_vacancy.countOpen}
                            </td>
                            <td className='w-4/12' align='justify' >
                                {_vacancy.jobDescription}
                            </td>
                            <td className='w-2/12' align='justify' >
                                {companyIdNameMap[_vacancy.companyId]}
                            </td>
                            <td className='w-1/12 text-primary' align='justify' >
                                <EditIcon
                                    className='cursor-pointer'
                                    onClick={() => _editCurrentRow(_vacancy)}
                                />
                            </td>
                        </tr>
                    ))}
                    {emptyRows > 0 && (
                        <tr style={{ height: 41 * emptyRows }}>
                            <td colSpan={3} />
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <CustomTablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={7}
                            count={vacancyList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            componentsProps={{
                                select: {
                                    'aria-label': 'rows per page',
                                },
                                actions: {
                                    showFirstButton: true,
                                    showLastButton: true,
                                } as any,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </tr>
                </tfoot>
            </table>
        </Root>
    )
}

export default VacanciesTable