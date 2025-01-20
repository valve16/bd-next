import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './Modal.module.css';

const Modal = ({ children }: { children: React.ReactNode }) => {
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const modalElement = document.createElement('div');
        modalElement.id = 'modal-root';
        document.body.appendChild(modalElement);
        setModalRoot(modalElement);

        return () => {
            document.body.removeChild(modalElement);
        };
    }, []);

    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <div className={modalStyles.modal_overlay}>
            <div className={modalStyles.modal}>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;