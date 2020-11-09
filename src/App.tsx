import React, { FC, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import RecordForm from './components/RecordForm/RecordForm';
import RecordsTable from './components/RecordsTable/RecordsTable';
import ModalWindow from './components/Modal/ModalWindow';
import IndexedDb from './indexdDb';
import _ from 'lodash';
import './App.css';

import { IRecord } from './interfaces';
import { Nullable } from './types';

const App: FC = () => {
    const [open, setOpen] = React.useState(false);
    const [records, setRecords] = React.useState<IRecord[]>([]);
    const [record, setRecord] = React.useState<Nullable<IRecord>>(null);

    const recordIndexById = (id: number) => _.findIndex(records, _record => _record.id === id);
    const newRecordId = () => Date.now(); // fast way to get unique id for test purpose :)

    const indexedDb = new IndexedDb('mwdn');

    const refreshDataFromLocalDb = async () => {
        const _records = await indexedDb.getAllValue('records');
        setRecords(_records);
    }

    useEffect(() => {
        refreshDataFromLocalDb();
    }, [])

    const handleAddRecord = () => {
        setRecord(null);
        setOpen(true);
    };

    const handleEditRecord = (record: IRecord) => {
        setRecord(record);
        setOpen(true);
    }

    const handleRemoveRecord = (id: number) => {

        const _records = [...records];
        _records.splice(recordIndexById(id), 1);

        _.remove(_records, _record => _record.id === id);

        indexedDb.deleteValue('records', id);

        setRecords(_records);
    }

    const handleSaveForm = async (record: IRecord) => {
        let _records = [...records];
        if (record.id < 0) {
            record.id = newRecordId();
            _records = [record, ..._records];
        } else {
            _records[recordIndexById(record.id)] = record;
        }

        await indexedDb.putValue('records', record);
        setRecords(_records);
        setOpen(false);

    }

    const handleCancelForm = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleAddRecord}>Add record</Button>

            <RecordsTable
                records={records}
                onEditRecord={handleEditRecord}
                onRemoveRecord={handleRemoveRecord} />

            <ModalWindow open={open} >
                <RecordForm
                    currentRecord={record}
                    onSaveForm={handleSaveForm}
                    onCancelForm={handleCancelForm}
                />
            </ModalWindow>
        </div>
    )
}

export default App
