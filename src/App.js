import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchResidents } from "./components/SearchResidents";
import { fetchStreetsTC } from "./state/appartments.reducer";
import { Loader } from "./components/Loader";
import { ResidentsList } from "./components/ResidentsList";

import styles from "./App.module.scss";

function App() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.app.status);

    useEffect(() => {
        dispatch(fetchStreetsTC());
    }, [dispatch]);

    return (
        <>
            {status === "loading" && <Loader />}
            <div className={styles.container}>
                <SearchResidents />
                <div className={styles.hr}></div>
                <ResidentsList />
            </div>
        </>
    );
}

export default App;
