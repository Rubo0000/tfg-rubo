import sys
import os
import pytest
from httpx import AsyncClient, ASGITransport

# Añadir ruta del proyecto al path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import app
from database.db import database  # importa tu conexión

@pytest.mark.asyncio
async def test_login_incorrect():
    await database.connect()  # 👈 conecta a mano
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/login", json={
            "username": "usuario@invalido.com",
            "password": "incorrecta"
        })
    await database.disconnect()  # 👈 y desconecta al final
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_login_success():
    await database.connect()
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/login", json={
            "username": "rubenarr@gmail.com",
            "password": "Ruben@123"
        })
    await database.disconnect()
    assert response.status_code == 200
    assert "access_token" in response.json()
