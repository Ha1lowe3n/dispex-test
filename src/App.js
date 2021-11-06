import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchResidents } from "./components/SearchResidents";
import { fetchStreetsTC } from "./state/appartments.reducer";
import { Loader } from "./components/Loader";

function App() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.app.status);

    useEffect(() => {
        dispatch(fetchStreetsTC());
    }, [dispatch]);

    return (
        <>
            {status === "loading" && <Loader />}
            <Grid
                style={{ width: "1140px", margin: "0 auto" }}
                container
                spacing={2}
            >
                <SearchResidents />
            </Grid>
        </>
    );
}

export default App;
