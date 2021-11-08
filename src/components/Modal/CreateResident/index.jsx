import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import styles from "./CreateResident.module.scss";
import { createResidentsTC } from "../../../state/residents.reducer";

export const CreateResident = ({ setActive, setType }) => {
    const dispatch = useDispatch();
    const { fullAddressTitle, currentAddressId } = useSelector(
        (state) => state.appartments
    );
    console.log(currentAddressId);

    const [valuePhone, setValuePhone] = useState("");
    const [valueEmail, setValueEmail] = useState("");
    const [valueFullname, setValueFullname] = useState("");

    const closeModal = () => {
        setActive(false);
        setType("");
    };

    const changeValuePhone = (e) => {
        setValuePhone(e.currentTarget.value);
    };
    const changeValueEmail = (e) => {
        setValueEmail(e.currentTarget.value);
    };
    const changeValueFullname = (e) => {
        setValueFullname(e.currentTarget.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            createResidentsTC(
                valueFullname,
                valuePhone,
                valueEmail,
                currentAddressId
            )
        );
        closeModal();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.addResident}>
                    <PersonAddIcon style={{ width: "30px", height: "30px" }} />
                    <h4>Добавить жильца</h4>
                </div>
                <div className={styles.close} onClick={closeModal}>
                    X
                </div>
            </div>

            <div className={styles.line}></div>

            <div className={styles.form}>
                <h4>{fullAddressTitle}</h4>
                <form onSubmit={handleSubmit}>
                    <label>
                        <div className={styles.inputBlock}>
                            Телефон
                            <input
                                type="phone"
                                value={valuePhone}
                                onChange={changeValuePhone}
                            />
                        </div>
                        <div className={styles.inputBlock}>
                            E-mail
                            <input
                                type="email"
                                value={valueEmail}
                                onChange={changeValueEmail}
                            />
                        </div>
                        <div className={styles.inputBlock}>
                            ФИО
                            <input
                                type="text"
                                value={valueFullname}
                                onChange={changeValueFullname}
                            />
                        </div>
                    </label>
                    <div className={styles.endForm}>
                        <button onClick={closeModal}>отмена</button>
                        <input
                            className={styles.inputSubmit}
                            type="submit"
                            value="отправить"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
