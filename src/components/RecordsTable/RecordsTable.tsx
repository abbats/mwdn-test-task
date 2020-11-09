import React, { FC } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Delete';
import './RecordsTable.css';

import { IRecord } from '@/interfaces';

type RecordsTableProps = {
    records: IRecord[]
    onEditRecord(record: IRecord): void,
    onRemoveRecord(index: number): void
}

const RecordsTable: FC<RecordsTableProps> = ({ records, onEditRecord, onRemoveRecord }) => {
    return (
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell align="right">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {records.map((record: IRecord) => (
                    <TableRow key={record.id}>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.email}</TableCell>
                        <TableCell>{record.phone}</TableCell>
                        <TableCell align="right">
                            <EditIcon className="icon-button" onClick={() => onEditRecord(record)} />
                            <RemoveIcon className="icon-button" onClick={() => onRemoveRecord(record.id)} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default RecordsTable;

