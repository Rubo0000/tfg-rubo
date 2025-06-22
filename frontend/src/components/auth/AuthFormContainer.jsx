import React from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Avatar,
    Stack,
    Divider
} from "@mui/material";

export default function AuthFormContainer({
    children,
    avatarIcon,
    avatarBgColor,
    avatarSize = 80,
    title,
    subtitle,
    titleColor = "primary.main",
    paperElevation = 8,
}) {
    return (
        <Container maxWidth="sm" sx={{ pt: 4 }}>
            <Paper elevation={paperElevation} sx={{ p: 5, borderRadius: 8, overflow: 'hidden', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
                <Stack spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <Avatar
                        sx={{
                            bgcolor: avatarBgColor,
                            width: avatarSize,
                            height: avatarSize,
                            boxShadow: `0px 4px 15px ${avatarBgColor}40`,
                        }}
                    >
                        {avatarIcon}
                    </Avatar>
                    <Typography variant="h4" fontWeight="bold" color={titleColor}>
                        {title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {subtitle}
                    </Typography>
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {children}
            </Paper>
        </Container>
    );
}