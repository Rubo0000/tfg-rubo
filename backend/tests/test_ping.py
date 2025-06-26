import sys
import os
import pytest
from httpx import AsyncClient
from httpx import ASGITransport  # IMPORTANTE

# Añadir la raíz del proyecto al path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app  # ← ahora sí la encuentra

@pytest.mark.asyncio
async def test_health_check():
    transport = ASGITransport(app=app)  # <--- aquí está la clave
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
