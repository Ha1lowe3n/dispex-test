import React from "react";

import styles from "./Modal.module.scss";

export const Modal = ({ active, setActive, children, setType }) => {
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { setActive, setType });
        }
        return child;
    });

    return (
        <div className={active ? styles.modal : ""}>
            <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                {childrenWithProps}
            </div>
        </div>
    );
};
