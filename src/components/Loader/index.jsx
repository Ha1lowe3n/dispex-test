import React from "react";

import { LinearProgress, Box } from "@mui/material";

export const Loader = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgress
                style={{ position: "absolute", width: "100%", top: 1 }}
            />
        </Box>
    );
};
