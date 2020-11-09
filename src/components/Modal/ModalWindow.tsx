import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: { borderBottom: '1px solid gray' },
    paper: {
        position: 'absolute',
        width: 480,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid gray',
        borderRadius: 6,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 3, 2),

    },
}));

type ModalWindowProps = {
    children?: React.ReactNode;
    open: boolean;

}
const ModalWindow: FC<ModalWindowProps> = ({ children, open }) => {
    const classes = useStyles();
    return (
        <Modal
            open={open}
            className={classes.modal}
            disableBackdropClick
        >
            <div id="RecordForm" className={classes.paper}>
                {children}
            </div>
        </Modal>
    )
}

export default ModalWindow;