import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AppHeader from "../layout/AppHeader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";

describe("AppHeader", () => {
    it("renderiza el título por defecto", () => {
        localStorage.setItem("userName", "Rubén");
        localStorage.setItem("userRole", "student");
        localStorage.setItem("userAvatar", "");

        render(
            <MemoryRouter>
                <ThemeProvider theme={createTheme()}>
                    <AppHeader onOpenProfile={() => { }} />
                </ThemeProvider>
            </MemoryRouter>
        );

        expect(screen.getByText(/panel principal de proyectos/i)).toBeInTheDocument();
    });
});
