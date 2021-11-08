import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SearchResidents.module.scss";

import {
    appartmensActions,
    fetchHousesTC,
    fetchFlatsTC,
} from "../../state/appartments.reducer";
import { fetchResidentsTC } from "../../state/residents.reducer";

export const SearchResidents = () => {
    const dispatch = useDispatch();
    const { streets, houses, flats, errorAddress, currentHouseId } =
        useSelector((state) => state.appartments);

    // values on inputs
    const [street, setStreet] = useState("");
    const [house, setHouse] = useState("");
    const [flat, setFlat] = useState("");

    // errors of inputs
    const [errorInputStreets, setErrorInputStreets] = useState(false);
    const [errorInputHouses, setErrorInputHouses] = useState(false);
    const [errorInputFlats, setErrorInputFlats] = useState(false);

    const onChangeStreet = (e) => {
        if (errorInputStreets) {
            setErrorInputStreets(false);
        }
        setStreet(e.currentTarget.value);

        const haveValueOrNot = Object.values(streets).includes(
            e.currentTarget.value
        );
        if (haveValueOrNot) {
            const idOfStreet = Object.keys(streets).find(
                (key) => streets[key] === e.currentTarget.value
            );
            dispatch(fetchHousesTC(+idOfStreet));
        }
    };
    const onChangeHouse = (e) => {
        if (errorInputHouses) {
            setErrorInputHouses(false);
        }
        setHouse(e.currentTarget.value);

        const haveValueOrNot = Object.values(houses).includes(
            e.currentTarget.value
        );
        if (haveValueOrNot) {
            const idOfHouse = Object.keys(houses).find(
                (key) => houses[key] === e.currentTarget.value
            );
            dispatch(fetchFlatsTC(+idOfHouse));
        }
    };
    const onChangeFlat = (e) => {
        if (errorInputFlats) {
            setErrorInputFlats(false);
        }
        setFlat(e.currentTarget.value);
    };

    const onCheckErrorInputStreet = (e) => {
        const haveValueOrNot = Object.values(streets).includes(
            e.currentTarget.value
        );
        if (!haveValueOrNot) {
            setErrorInputStreets(true);
        }
    };
    const onCheckErrorInputHouses = (e) => {
        const haveValueOrNot = Object.values(houses).includes(
            e.currentTarget.value
        );
        if (!haveValueOrNot) {
            setErrorInputHouses(true);
        }
    };
    const onCheckErrorInputFlats = (e) => {
        const haveValueOrNot = Object.values(flats).includes(
            e.currentTarget.value
        );
        if (!haveValueOrNot) {
            setErrorInputFlats(true);
        }
    };

    const onSearchResidents = () => {
        if (street.trim() === "" || house.trim() === "" || flat.trim() === "") {
            dispatch(appartmensActions.errorAddress(true));
        } else {
            dispatch(appartmensActions.errorAddress(false));
            dispatch(fetchResidentsTC(currentHouseId, street, house, flat));
        }
    };

    return (
        <div className={styles.wrapper}>
            <h2>
                {errorAddress && <p className={styles.errorStar}>*</p>} Адрес
            </h2>
            <div className={styles.inputs}>
                <div>
                    <input
                        className={errorInputStreets ? styles.errorInput : ""}
                        value={street}
                        placeholder={"Улица"}
                        list="streets"
                        onChange={onChangeStreet}
                        onBlur={onCheckErrorInputStreet}
                    />
                    {errorInputStreets && (
                        <div className={styles.errorText}>
                            {street.trim() === ""
                                ? "* Нужно заполнить поле"
                                : "* Некорректные данные"}
                        </div>
                    )}
                </div>

                <div>
                    <input
                        className={errorInputHouses ? styles.errorInput : ""}
                        value={house}
                        placeholder={"Дом"}
                        list="houses"
                        onChange={onChangeHouse}
                        onBlur={onCheckErrorInputHouses}
                    />
                    {errorInputHouses && (
                        <div className={styles.errorText}>
                            {house.trim() === ""
                                ? "* Нужно заполнить поле"
                                : "* Некорректные данные"}
                        </div>
                    )}
                </div>

                <div>
                    <input
                        className={errorInputFlats ? styles.errorInput : ""}
                        value={flat}
                        placeholder={"Кв./офис"}
                        list="flats"
                        onChange={onChangeFlat}
                        onBlur={onCheckErrorInputFlats}
                    />

                    {currentHouseId && Object.keys(flats).length === 0 ? (
                        <div className={styles.errorText}>
                            * Квартиры в доме не найдены
                        </div>
                    ) : (
                        errorInputFlats && (
                            <div className={styles.errorText}>
                                {flat.trim() === ""
                                    ? "* Нужно заполнить поле"
                                    : "* Некорректные данные"}
                            </div>
                        )
                    )}
                </div>

                <datalist id="streets">
                    {Object.values(streets).map((street, i) => (
                        <option key={street + i}>{street}</option>
                    ))}
                </datalist>
                <datalist id="houses">
                    {Object.values(houses).map((house, i) => (
                        <option key={house + i}>{house}</option>
                    ))}
                </datalist>
                <datalist id="flats">
                    {Object.values(flats).map((flat, i) => (
                        <option key={flat + i}>{flat}</option>
                    ))}
                </datalist>
            </div>

            <button onClick={onSearchResidents}>Поиск жителей</button>
        </div>
    );
};
