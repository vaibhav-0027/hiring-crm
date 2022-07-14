import React from 'react'
import { ClientType } from '../../../helpers/types'
import { styled } from '@mui/system';
import TablePaginationUnstyled, {
    tablePaginationUnstyledClasses as classes,
} from '@mui/base/TablePaginationUnstyled';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VacancySelectorModal from './VacancySelectorModal';

interface ClientsTableProps {
    clientsList: ClientType[];
    setIsModalOpen: (value: boolean) => void;
    currentSelected: ClientType | null;
    setCurrentSelected: (value: ClientType) => void;
}

const ClientsTable = (props: ClientsTableProps) => {

    const {
        clientsList,
        setIsModalOpen,
        currentSelected,
        setCurrentSelected } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [vacancySelectorModal, setVacancySelectorModal] = React.useState<boolean>(false);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clientsList.length) : 0;

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

    const _handleAddButton = (info: ClientType) => {
        setCurrentSelected(info);
        setVacancySelectorModal(true);
    }

    const _selectRowHandler = (info: ClientType) => {
        setCurrentSelected(info);
        setIsModalOpen(true);
    }

    const _openLinkedinProfileHandler = (url: string) => {
        window.open(url, "_blank");
    }

    return (
        <Root className='w-full mt-3'>
            <VacancySelectorModal
                open={vacancySelectorModal}
                handleClose={() => setVacancySelectorModal(false)}
                currentSelected={currentSelected}
            />

            <table className='w-full'>
                <thead className='w-full'>
                    <tr className='w-full'>
                        <th className='w-'>Name</th>
                        <th className=''>Email</th>
                        <th className=''>Mobile Number</th>
                        <th className=''>Location</th>
                        <th className=''>Current CTC</th>
                        <th className=''>Expected CTC</th>
                        <th className=''>Notice period</th>
                        <th className=''>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {(rowsPerPage > 0
                        ? clientsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : clientsList
                    ).map((_client) => (
                        <tr key={_client.id}>
                            <td className='w' align='justify'>
                                <div className='w-full'>
                                    <span
                                        onClick={() => _selectRowHandler(_client)}
                                        className='cursor-pointer text-primary'>
                                        {_client.name}
                                    </span>
                                </div>
                                <div className='w-full font-xs flex flex-row'>
                                    <OpenInNewIcon
                                        fontSize='inherit'
                                        className='text-primary cursor-pointer'
                                        onClick={() => _openLinkedinProfileHandler(_client.linkedinUrl)}
                                    />
                                    <AddCircleOutlineIcon
                                        className='text-primary cursor-pointer'
                                        fontSize='inherit'
                                        onClick={() => _handleAddButton(_client)}
                                    />
                                </div>
                            </td>
                            <td className=''>
                                {_client.email}
                            </td>
                            <td className=''>
                                {_client.mobileNumber}
                            </td>
                            <td>
                                {_client.location}
                            </td>
                            <td>
                                {_client.currentPackage}
                            </td>
                            <td className=''>
                                {_client.expectedPackage}
                            </td>
                            <td>
                                {_client.noticePeriod}
                            </td>
                            <td className='' align='justify' >
                                {_client.description}
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
                            colSpan={8}
                            count={clientsList.length}
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

export default ClientsTable