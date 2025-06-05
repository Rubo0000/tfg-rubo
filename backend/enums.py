from enum import Enum

class PriorityEnum(str, Enum):
    alta = "alta"
    media = "media"
    baja = "baja"

class StatusEnum(str, Enum):
    pendiente = "pendiente"
    en_progreso = "en progreso"
    finalizada = "finalizada"
