import React from 'react';
import { Snackbar, Alert } from "@mui/material";

export default function AuthSnackbar({
    open,
    message,
    severity,
    onClose,
    autoHideDuration = 2500,
    anchorOrigin = { vertical: "top", horizontal: "center" }
}) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}