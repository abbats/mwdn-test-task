import React, { FC } from 'react'
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../TabPanel/TabPanel';
import { Formik, Form, Field } from 'formik';
import { IRecord } from '@/interfaces';
import { Nullable } from '@/types';
import './RecordForm.css';

type RecordFormProps = {
    currentRecord: Nullable<IRecord>,
    onSaveForm(record: IRecord): void,
    onCancelForm(): void
}

const RecordForm: FC<RecordFormProps> = ({ currentRecord, onSaveForm, onCancelForm }) => {

    const [activeTab, setActiveTab] = React.useState(0);
    const handleTabChange = (event: any, tabIndex: number) => {
        setActiveTab(tabIndex);
    };

    const validateName = (value: string) => {
        let error;
        if (!value) {
            error = 'Required';
        }
        return error;
    }

    const initialValues: IRecord = currentRecord ?? { id: -1, name: '', email: '', phone: '' }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                onSaveForm(values);
                actions.setSubmitting(false);
            }}

            onReset={(values, actions) => {
                onCancelForm();
            }}

        >
            {({ errors, touched, isValidating }) => (
                <Form>
                    <Tabs value={activeTab} onChange={handleTabChange} >
                        <Tab label="Name" />
                        <Tab label="Email" />
                        <Tab label="Phone" />
                    </Tabs>
                    <TabPanel value={activeTab} index={0}>
                        <Field className="form-input" id="name" name="name" placeholder="Name" validate={validateName} />
                        {errors.name && touched.name && <div className="form-input-error">{errors.name}</div>}
                    </TabPanel>
                    <TabPanel value={activeTab} index={1}>
                        <Field className="form-input" id="email" name="email" placeholder="Email" />
                    </TabPanel>
                    <TabPanel value={activeTab} index={2}>
                        <Field className="form-input" id="phone" name="phone" placeholder="Phone" />
                    </TabPanel>

                    <Field id="id" name="id" type="hidden" />
                    <div style={{ textAlign: "right" }}>
                        <Button type="submit">
                            {currentRecord === null ? "Add" : "Save"}
                        </Button>
                        <Button type="reset">Cancel</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default RecordForm;