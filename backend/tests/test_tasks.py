import pytest
from httpx import AsyncClient, ASGITransport
from main import app
from database.db import database
import asyncio
import sys

if sys.platform.startswith("win"):
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

@pytest.mark.asyncio
async def test_create_task():
    await database.connect()
    try:
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            login_response = await ac.post("/login", json={
                "username": "rubenarr@gmail.com",
                "password": "Ruben@123"
            })
            assert login_response.status_code == 200
            token = login_response.json()["access_token"]

            response = await ac.post(
                "/tasks",
                json={
                    "title": "Tarea de prueba",
                    "description": "Una prueba más",
                    "priority": "media",
                    "status": "pendiente",
                    "project_id": 1,
                    "assigned_to": 1
                },
                headers={"Authorization": f"Bearer {token}"}
            )
            assert response.status_code == 200
    finally:
        await database.disconnect()
