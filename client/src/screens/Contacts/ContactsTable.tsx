import { styled } from '@mui/system';
import TablePaginationUnstyled, {
    tablePaginationUnstyledClasses as classes,
} from '@mui/base/TablePaginationUnstyled';
import React from 'react'
import { ContactType } from '../../helpers/types';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface ContactsTableProps {
    contactList: ContactType[];
    companyIdNameMap: any;
    setIsModalOpen: (value: boolean) => void;
    setCurrentSelected: (value: ContactType) => void;
}

const ContactsTable = (props: ContactsTableProps) => {

    const { contactList, companyIdNameMap, setIsModalOpen, setCurrentSelected } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contactList.length) : 0;

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

    const _getCompanyName = (companyId: any) => {
        return companyIdNameMap[companyId]
    }

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

    const _openLinkedinProfileHandler = (url: string) => {
        window.open(url, "_blank");
    }

    const _selectRowHandler = (info: ContactType) => {
        setCurrentSelected(info);
        setIsModalOpen(true);
    }

    return (
        <Root className='w-full mt-3'>
            <table className='w-full'>
                <thead className='w-full'>
                    <tr className='w-full'>
                        <th className='w-2/12'>Name</th>
                        <th className='w-2/12'>Email</th>
                        <th className='w-2/12'>Mobile Number</th>
                        <th className='w-2/12'>Company</th>
                        <th className='w-4/12'>About</th>
                    </tr>
                </thead>
                <tbody>
                    {(rowsPerPage > 0
                        ? contactList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : contactList
                    ).map((_contact) => (
                        <tr key={_contact.id}>
                            <td className='w-2/12' align='justify'>
                                <div className='w-10/12'>
                                    <span
                                        onClick={() => _selectRowHandler(_contact)}
                                        className='cursor-pointer text-primary'>
                                        {_contact.name}
                                    </span>
                                </div>
                                <div className='w-2/12 font-xs'>
                                    <OpenInNewIcon
                                        fontSize='inherit'
                                        className='text-primary cursor-pointer'
                                        onClick={() => _openLinkedinProfileHandler(_contact.linkedinUrl)}
                                    />
                                </div>
                            </td>
                            <td className='w-2/12' align='justify' >
                                {_contact.email}
                            </td>
                            <td className='w-2/12' align='justify' >
                                {_contact.mobileNumber}
                            </td>
                            <td className='w-2/12' align='justify' >
                                {_getCompanyName(_contact.companyId)}
                            </td>
                            <td className='w-4/12' align='justify' >
                                {_contact.description}
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
                            colSpan={5}
                            count={contactList.length}
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

export default ContactsTable