// =============================================
//  PURSUE — Clasificador OVNI
//  script.js
// =============================================

// ── AÑO EN EL FOOTER ──
document.getElementById('anio').textContent = new Date().getFullYear();

// ── HISTORIAL EN MEMORIA ──
var historial = [];

// ─────────────────────────────────────────────
//  CALCULAR PUNTAJE — función principal
// ─────────────────────────────────────────────
function calcularPuntaje() {
    // 1. CAPTURA DE DATOS
    var nombreReporte = document.getElementById('nombre-reporte').value.trim();
    var lugar = document.getElementById('lugar').value.trim();
    var testigosVal = document.getElementById('testigos').value;
    var descripcion = document.getElementById('descripcion').value.trim();
    var tieneVideo = document.getElementById('tiene-video').checked;
    var tieneImagen = document.getElementById('tiene-imagen').checked;
    var tieneRadar = document.getElementById('tiene-radar').checked;

    var radios = document.querySelectorAll('input[name="explicacion"]');
    var explicacion = '';
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            explicacion = radios[i].value;
            break;
        }
    }

    // 2. VALIDACIÓN
    var errores = [];

    if (nombreReporte === '') {
        errores.push('El nombre del reporte es obligatorio.');
    }
    if (lugar === '') {
        errores.push('El lugar del avistamiento es obligatorio.');
    }
    if (testigosVal === '') {
        errores.push('Debés indicar la cantidad de testigos.');
    }
    if (descripcion === '') {
        errores.push('La descripción breve es obligatoria.');
    }
    if (explicacion === '') {
        errores.push('Debés indicar si existe explicación científica probable.');
    }

    var errorContainer = document.getElementById('form-error');

    if (errores.length > 0) {
        var mensajeError = '⚠ Campos obligatorios incompletos:<br>• ' + errores.join('<br>• ');
        errorContainer.innerHTML = mensajeError;
        errorContainer.classList.remove('hidden');
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // Ocultar errores si todo está bien
    errorContainer.classList.add('hidden');

    // 3. CÁLCULO DE PUNTAJE
    var puntaje = 0;

    if (tieneVideo) {
        puntaje += 3;
    }
    if (tieneImagen) {
        puntaje += 2;
    }
    if (tieneRadar) {
        puntaje += 4;
    }
    if (testigosVal === '4') {
        puntaje += 2;
    } // 4 o más testigos
    if (explicacion === 'no') {
        puntaje += 3;
    } // sin explicación científica

    // 4. CLASIFICACIÓN
    var nivel, clase, recomendacion, color, porcentaje;

    if (puntaje <= 4) {
        nivel = 'Evidencia Débil';
        clase = 'debil';
        recomendacion =
            'La evidencia disponible es insuficiente para establecer un caso sólido. Se recomienda ampliar la recolección de datos antes de proceder con un informe formal.';
        color = '#f0c040';
        porcentaje = Math.max(10, Math.round((puntaje / 14) * 40));
    } else if (puntaje <= 8) {
        nivel = 'Evidencia Moderada';
        clase = 'moderada';
        recomendacion =
            'El caso presenta características de interés. Se recomienda escalarlo a análisis secundario y buscar confirmación adicional mediante fuentes independientes.';
        color = '#ff9900';
        porcentaje = Math.round(40 + (puntaje / 14) * 35);
    } else {
        nivel = 'Evidencia Fuerte';
        clase = 'fuerte';
        recomendacion =
            'ALERTA: Este caso cumple múltiples criterios de alta confiabilidad. Se recomienda apertura de expediente oficial, notificación a autoridades competentes y preservación inmediata de todas las pruebas.';
        color = '#ff4444';
        porcentaje = Math.min(100, Math.round(70 + (puntaje / 14) * 30));
    }

    // 5. MOSTRAR RESULTADO CON ANIMACIÓN DE ESCANEO
    var container = document.getElementById('resultado-container');
    var nivelEl = document.getElementById('resultado-nivel');
    var puntajeEl = document.getElementById('resultado-puntaje');
    var recomEl = document.getElementById('resultado-recomendacion');
    var barraEl = document.getElementById('resultado-barra');

    // Ocultar contenido real mientras escanea
    nivelEl.textContent = '';
    nivelEl.className = 'resultado-nivel';
    puntajeEl.textContent = '';
    recomEl.innerHTML = '';
    barraEl.style.width = '0%';

    // Mostrar contenedor con el escáner
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Líneas que se van escribiendo una por una
    var lineas = [
        '> Iniciando análisis de evidencia...',
        '> Verificando fuentes de datos...',
        '> Cruzando con base PURSUE...',
        '> Calculando índice de confiabilidad...',
        '> Clasificando expediente UAP-' +
            String(Math.floor(Math.random() * 90000) + 10000) +
            '...',
        '> Análisis completado.',
    ];

    // Mostrar el escáner en el elemento de puntaje
    puntajeEl.style.color = 'var(--accent)';
    puntajeEl.style.minHeight = '120px';

    var lineaActual = 0;
    var textoAcumulado = '';

    function escribirLinea() {
        if (lineaActual < lineas.length) {
            textoAcumulado += lineas[lineaActual] + '\n';
            puntajeEl.textContent = textoAcumulado;
            lineaActual++;
            setTimeout(escribirLinea, 320);
        } else {
            // Escaneo terminado — mostrar resultado real
            setTimeout(function () {
                puntajeEl.style.color = '';
                puntajeEl.style.minHeight = '';
                puntajeEl.textContent =
                    'Puntaje total: ' +
                    puntaje +
                    ' / 14 pts  |  Reporte: "' +
                    nombreReporte +
                    '"  |  Lugar: ' +
                    lugar;

                nivelEl.textContent = nivel;
                nivelEl.className = 'resultado-nivel ' + clase;

                recomEl.innerHTML = '<strong>Recomendaci\u00f3n:</strong> ' + recomendacion;

                barraEl.style.backgroundColor = color;
                setTimeout(function () {
                    barraEl.style.width = porcentaje + '%';
                }, 100);
            }, 300);
        }
    }

    escribirLinea();

    // 6. GUARDAR EN HISTORIAL
    var registro = {
        nombre: nombreReporte,
        lugar: lugar,
        puntaje: puntaje,
        nivel: nivel,
        clase: clase,
        fecha: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    };

    historial.push(registro);
    renderizarHistorial();
}

// ─────────────────────────────────────────────
//  RENDERIZAR HISTORIAL
// ─────────────────────────────────────────────
function renderizarHistorial() {
    var lista = document.getElementById('historial-lista');
    lista.innerHTML = '';

    if (historial.length === 0) {
        lista.innerHTML = '<p class="historial-vacio">Aún no hay reportes clasificados.</p>';
        return;
    }

    // Iterar en orden inverso (el más reciente primero)
    for (var i = historial.length - 1; i >= 0; i--) {
        var r = historial[i];

        var item = document.createElement('div');
        item.classList.add('historial-item');

        var nombreSpan = document.createElement('span');
        nombreSpan.classList.add('historial-item-nombre');
        nombreSpan.textContent = r.nombre;

        var metaSpan = document.createElement('span');
        metaSpan.classList.add('historial-item-meta');
        metaSpan.textContent = r.lugar + '  |  ' + r.puntaje + ' pts  |  ' + r.fecha;

        var badge = document.createElement('span');
        badge.classList.add('badge', r.clase);
        badge.textContent = r.nivel;

        item.appendChild(nombreSpan);
        item.appendChild(metaSpan);
        item.appendChild(badge);

        lista.appendChild(item);
    }
}

// ─────────────────────────────────────────────
//  REINICIAR FORMULARIO
// ─────────────────────────────────────────────
function reiniciarFormulario() {
    // Limpiar campos de texto
    document.getElementById('nombre-reporte').value = '';
    document.getElementById('lugar').value = '';
    document.getElementById('descripcion').value = '';

    // Resetear selects
    document.getElementById('testigos').value = '';
    document.getElementById('tipo-fenomeno').value = '';

    // Desmarcar checkboxes
    document.getElementById('tiene-video').checked = false;
    document.getElementById('tiene-imagen').checked = false;
    document.getElementById('tiene-radar').checked = false;

    // Desmarcar radios
    var radios = document.querySelectorAll('input[name="explicacion"]');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    // Ocultar errores y resultado
    document.getElementById('form-error').classList.add('hidden');
    document.getElementById('resultado-container').classList.add('hidden');

    // Volver al tope del formulario
    document.getElementById('clasificador').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─────────────────────────────────────────────
//  EVENTO ENTER en campos de texto
// ─────────────────────────────────────────────
var inputsCampos = document.querySelectorAll('input[type="text"]');
for (var k = 0; k < inputsCampos.length; k++) {
    inputsCampos[k].addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calcularPuntaje();
        }
    });
}
