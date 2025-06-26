import { render, screen } from '@testing-library/react'
import Login from '../Login'
import { MemoryRouter } from 'react-router-dom' // ⬅️ Esto es clave

describe('Login component', () => {
    it('muestra el título de inicio de sesión', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )
        expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument()
    })
})
