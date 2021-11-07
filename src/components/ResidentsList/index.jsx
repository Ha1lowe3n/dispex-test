import React from "react";
import { useSelector } from "react-redux";

import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import styles from "./ResidentsList.module.scss";

export const ResidentsList = () => {
    const { residents } = useSelector((state) => state.residents);
    console.log(residents);
    return (
        <div className={styles.list}>
            {residents.clients?.map((resident) => (
                <div className={styles.item}>
                    <div className={styles.itemIcon}>
                        <PersonIcon />
                    </div>

                    <div>
                        {resident.name && <h4>{resident.name}</h4>}
                        <div className={styles.itemPhone}>
                            <CallIcon
                                style={{
                                    width: "14px",
                                    height: "14px",
                                    marginRight: "5px",
                                }}
                            />
                            {resident.phone}
                        </div>
                        {resident.email && (
                            <div>
                                <EmailIcon
                                    style={{
                                        width: "14px",
                                        height: "14px",
                                        marginRight: "5px",
                                    }}
                                />
                                {resident.email}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
