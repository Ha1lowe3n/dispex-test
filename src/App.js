import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { SearchResidents } from "./components/SearchResidents";
import { fetchStreetsTC } from "./state/appartments.reducer";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStreetsTC());
    }, [dispatch]);

    return (
        <Grid
            style={{ width: "1140px", margin: "0 auto" }}
            container
            spacing={2}
        >
            <SearchResidents />
        </Grid>
    );
}

export default App;
