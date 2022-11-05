import { useContext } from 'react';
import AuthContext from '../auth';
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


export default function MUIErrorModal() {
    const { auth } = useContext(AuthContext);

    let modalClass = "modal";
    if (auth.checkIsErrorModalOpen()) {
        modalClass += " is-visible";
    }

    let error = "";
    if (auth.getErrorMessage() !== null){
        error = auth.getErrorMessage();
    }
    console.log("error is " + error);
    const handleCloseErrorModal = () => {
        auth.hideErrorModal();
    }

    return (
        <Modal
            open={auth.checkIsErrorModalOpen()}
        >
            <Box sx={style}>
                <div
                    id="error-modal"
                    className={modalClass}
                    data-animation="slideInOutLeft">
                    <div className="modal-root">
                        <div className="modal-center">
                            <div className="modal-center-content" id='error-text'>
                                {error}
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