import { Box, Typography } from "@mui/material";

const TaskInfo = ({ description }) => {
    return (
        <Box>
            <Typography variant="h6">Descripción</Typography>
            <Typography>{description}</Typography>
        </Box>
    );
};

export default TaskInfo;