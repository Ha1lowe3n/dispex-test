import Grid from "@mui/material/Grid";

import { SearchResidents } from "./components/SearchResidents";

function App() {
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
