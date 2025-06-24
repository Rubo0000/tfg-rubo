import pytest
pytestmark = pytest.mark.asyncio

from httpx import AsyncClient
from main import app
from database.db import database
from models.user import User
from auth import hash_password

@pytest.fixture(autouse=True, scope="module")
async def setup_and_teardown():
    await database.connect()

    # Usuario de prueba
    await database.execute(
        User.__table__.insert().values(
            name="Usuario Test",
            email="test@example.com",
            password=hash_password("testpass"),
            role="student"
        )
    )
    yield

    # Limpieza al acabar
    await database.execute(
        User.__table__.delete().where(User.email == "test@example.com")
    )
    await database.disconnect()


@pytest.mark.asyncio
async def test_login_success():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/login", json={
            "username": "test@example.com",
            "password": "testpass"
        })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["email"] == "test@example.com"


@pytest.mark.asyncio
async def test_login_failure_wrong_password():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/login", json={
            "username": "test@example.com",
            "password": "wrongpass"
        })
    assert response.status_code == 401
    assert response.json()["detail"] == "Credenciales incorrectas"
