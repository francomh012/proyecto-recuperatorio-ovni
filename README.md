# PURSUE — Clasificador Web de Evidencias UAP/OVNI

Proyecto académico desarrollado para el examen recuperatorio de **Programación Web I**.

## Descripción

Aplicación web interactiva que permite evaluar una supuesta evidencia de fenómeno aéreo no identificado (OVNI/UAP) y clasificarla automáticamente como **evidencia débil**, **moderada** o **fuerte**, según criterios seleccionados por el usuario.

El diseño y contexto están inspirados en el sistema **PURSUE** (Presidential Unsealing and Reporting System for UAP Encounters) del Departamento de Guerra de EE.UU., accesible en [www.war.gov/ufo](https://www.war.gov/ufo/).

---

## Funcionalidades

- Formulario completo con campos de texto, select, checkboxes y radio buttons
- Validación de campos obligatorios con mensajes de error dinámicos
- Cálculo automático de puntaje de confiabilidad mediante JavaScript
- Clasificación en tres niveles: Débil / Moderada / Fuerte
- Visualización del resultado con barra de progreso animada y recomendaciones
- Historial de reportes clasificados durante la sesión
- Diseño responsivo adaptable a mobile y desktop
- Reinicio completo del formulario

---

## Criterios de puntaje

| Criterio                         | Puntaje |
|----------------------------------|---------|
| Tiene video                      | +3 pts  |
| Tiene imagen                     | +2 pts  |
| Detección por radar              | +4 pts  |
| Más de 3 testigos                | +2 pts  |
| Sin explicación científica clara | +3 pts  |
| **Puntaje máximo**               | **14 pts** |

| Puntaje total | Clasificación       |
|---------------|---------------------|
| 0 a 4 pts     | Evidencia Débil     |
| 5 a 8 pts     | Evidencia Moderada  |
| 9 pts o más   | Evidencia Fuerte    |

---

## Tecnologías utilizadas

- **HTML5** — estructura semántica con `header`, `nav`, `main`, `section`, `footer`, `fieldset`
- **CSS3** — archivo externo `css/styles.css`, variables CSS, flexbox, grid, media queries
- **JavaScript** — archivo externo `js/script.js`, manipulación del DOM, validación, eventos

---

## Estructura de carpetas

```
proyecto-recuperatorio-ovni/
│
├── index.html
├── README.md
│
├── css/
│   └── styles.css
│
|── js/
    └── script.js
```

---

## Cómo usar

1. Abrí `index.html` en el navegador, o visitá la [página publicada en Versel](#).
2. Completá el formulario con los datos del avistamiento.
3. Hacé clic en **Clasificar evidencia**.
4. El sistema mostrará el nivel de confiabilidad y una recomendación.
5. Los reportes clasificados se guardan en el historial de la sesión.

---

## Fuente de referencia

> U.S. Department of War — PURSUE (Presidential Unsealing and Reporting System for UAP Encounters)
> https://www.war.gov/ufo/

*Nota: el contenido del proyecto es de elaboración propia; la referencia se usa únicamente como inspiración para el contexto temático.*

---

**Programación Web I — Examen Recuperatorio Virtual**
