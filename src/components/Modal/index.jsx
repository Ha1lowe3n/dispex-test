import React from "react";

import styles from "./Modal.module.scss";

export const Modal = ({ active, setActive, children }) => {
    return (
        <div
            className={active && styles.modal}
            onClick={() => setActive(false)}
        >
            <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
