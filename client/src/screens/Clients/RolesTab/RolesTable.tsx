import React from 'react'
import { RoleListType } from '../../../helpers/types'
import { styled } from '@mui/system';
import TablePaginationUnstyled, {
    tablePaginationUnstyledClasses as classes,
} from '@mui/base/TablePaginationUnstyled';
import EditIcon from '@mui/icons-material/Edit';

interface RolesTableProps {
    rolesList: RoleListType[];
    setIsModalOpen: (value: boolean) => void;
    setCurrentSelected: (value: RoleListType) => void;
    setTabIndex: (value: number) => void;
    setCurrentRole: (value: RoleListType) => void;
}

const RolesTable = (props: RolesTableProps) => {

    const {
        rolesList,
        setIsModalOpen,
        setCurrentSelected,
        setTabIndex,
        setCurrentRole } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rolesList.length) : 0;

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

    const _selectRowHandler = (info: RoleListType) => {
        setTabIndex(1);
        setCurrentRole(info);
    }

    const _editCurrentRow = (info: RoleListType) => {
        setCurrentSelected(info);
        setIsModalOpen(true);
    }

    return (
        <Root className='w-full mt-3'>
            <table className='w-full'>
                <thead className='w-full'>
                    <tr className='w-full'>
                        <th className='w-2/12'>Name</th>
                        <th className='w-8/12'>Description</th>
                        <th className='w-2/12'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(rowsPerPage > 0
                        ? rolesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rolesList
                    ).map((_role) => (
                        <tr key={_role.id}>
                            <td className='w-2/12' align='justify'>
                                <div className='w-full'>
                                    <span
                                        onClick={() => _selectRowHandler(_role)}
                                        className='cursor-pointer text-primary'>
                                        {_role.name}
                                    </span>
                                </div>
                            </td>
                            <td className='w-10/12' align='justify' >
                                {_role.description}
                            </td>
                            <td className='w-2/12 text-primary' align='justify' >
                                <EditIcon
                                    className='cursor-pointer'
                                    onClick={() => _editCurrentRow(_role)}
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
                            colSpan={3}
                            count={rolesList.length}
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

export default RolesTable