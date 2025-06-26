import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateTaskModal from "../task/TaskCreateModal";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const renderModal = (props) =>
    render(
        <ThemeProvider theme={createTheme()}>
            <CreateTaskModal {...props} />
        </ThemeProvider>
    );

describe("CreateTaskModal", () => {
    it("no llama a onCreate si el título está vacío", () => {
        const handleCreate = vi.fn();
        renderModal({
            open: true,
            onClose: () => { },
            onCreate: handleCreate,
            projectId: 1,
            users: [],
        });

        const submitBtn = screen.getByRole("button", { name: /crear tarea/i });
        fireEvent.click(submitBtn);

        expect(handleCreate).not.toHaveBeenCalled();
    });

    it("llama a onCreate con los datos correctos", async () => {
        const handleCreate = vi.fn();
        renderModal({
            open: true,
            onClose: () => { },
            onCreate: handleCreate,
            projectId: 1,
            users: [{ id: 42, name: "Rubén" }],
        });

        fireEvent.change(screen.getByLabelText(/título/i), {
            target: { value: "Tarea simple" },
        });

        fireEvent.mouseDown(screen.getByLabelText(/asignado a/i));
        const option = await screen.findByText("Rubén");
        fireEvent.click(option);

        fireEvent.click(screen.getByRole("button", { name: /crear tarea/i }));

        expect(handleCreate).toHaveBeenCalledWith(
            expect.objectContaining({
                title: "Tarea simple",
                assigned_to: 42,
                project_id: 1,
            })
        );
    });
});
