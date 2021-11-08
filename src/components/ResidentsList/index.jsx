import React from "react";
import { useSelector } from "react-redux";

import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import styles from "./ResidentsList.module.scss";

export const ResidentsList = () => {
    const { residents } = useSelector((state) => state.residents);
    const { fullAddressTitle } = useSelector((state) => state.appartments);
    console.log(fullAddressTitle, residents);
    return (
        <>
            {fullAddressTitle && (
                <>
                    <div className={styles.topList}>
                        <h3>{fullAddressTitle}</h3>
                        <Button>
                            <PersonAddIcon />
                        </Button>
                    </div>
                    <div className={styles.list}>
                        {residents.clients?.map((resident, i) => (
                            <div key={resident + i} className={styles.item}>
                                <div className={styles.information}>
                                    <div className={styles.itemIcon}>
                                        <PersonIcon />
                                    </div>

                                    <div>
                                        {resident.name && (
                                            <h4>{resident.name}</h4>
                                        )}
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

                                <div className={styles.buttons}>
                                    <DeleteIcon />
                                    <div className={styles.buttonsBorder}></div>
                                    <CreateIcon />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};
