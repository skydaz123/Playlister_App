import { useContext } from 'react';
import { GlobalStoreContext } from "../store";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function MUIListErrorModal() {
    const { store } = useContext(GlobalStoreContext);

    let modalClass = "modal";
    if (store.isListErrorModalOpen()) {
        modalClass += " is-visible";
    }

    const handleCloseErrorModal = () => {
        store.hideModals();
    }

    return (
        <Modal
            open={store.isListErrorModalOpen()}
        >
            <Box sx={style}>
                <div
                    id="error-modal"
                    className={modalClass}
                    data-animation="slideInOutLeft">
                    <div className="modal-root">
                        <div className="modal-center">
                            <div className="modal-center-content" id='error-text'>
                                The list you entered already exists. Try another one.
                            </div>
                        </div>
                        <div className="modal-south">
                            <input type="button"
                                id="close-error-modal-button"
                                className="modal-button"
                                onClick={handleCloseErrorModal}
                                value='Confirm' />
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}   