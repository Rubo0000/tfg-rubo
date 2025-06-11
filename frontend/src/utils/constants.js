// src/utils/constants.js
import GestionDeTareas from "../assets/GestionDeTareas.png";
import SeguimientoDelProgreso from "../assets/SeguimientoDelProgeso.png";
import SupervisionDocente from "../assets/SupervisionDocente.png";
import Landpage from "../assets/LandPage.png";
import LogoTitulo from "../assets/LogoTitulo.png";
import LogoUPV from "../assets/LogoUPV.png";
import LogoETSINF from "../assets/LogoETSINF.png";

export const ASSETS = {
    GestionDeTareas,
    SeguimientoDelProgreso,
    SupervisionDocente,
    Landpage,
    LogoTitulo,
    LogoUPV,
    LogoETSINF,
};

export const NAV_LINKS = [
    { name: "Cómo funciona", path: "/how-it-works" },
    { name: "Sobre la app", path: "/about" },
    { name: "Contacto", path: "/contact" },
];

export const FOOTER_LINKS = [
    ...NAV_LINKS, // Reuse nav links
    { name: "UPV", path: "https://www.upv.es/", external: true },
    { name: "ETSINF", path: "https://www.etsinf.upv.es/", external: true },
];

export const FEATURES = [
    {
        icon: "clipboard",
        title: "Gestión de Tareas",
        description: "Crea, asigna y supervisa tareas con claridad y roles definidos para mantener todo bajo control.",
        imgSrc: ASSETS.GestionDeTareas,
    },
    {
        icon: "bar-chart",
        title: "Seguimiento de Progreso",
        description: "Visualiza el avance individual y grupal con estadísticas en tiempo real y reportes claros.",
        imgSrc: ASSETS.SeguimientoDelProgreso,
    },
    {
        icon: "graduation",
        title: "Supervisión Docente",
        description: "Facilita la evaluación justa con herramientas específicas para profesores y tutores.",
        imgSrc: ASSETS.SupervisionDocente,
    },
];