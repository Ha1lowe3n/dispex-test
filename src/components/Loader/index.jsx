import React from "react";
import { useSelector } from "react-redux";

import { LinearProgress, Box } from "@mui/material";
import styles from "./Loader.module.scss";

export const Loader = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgress className={styles.lineProgress} />
        </Box>
    );
};
