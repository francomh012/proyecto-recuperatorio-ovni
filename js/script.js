// =============================================
//  PURSUE — Clasificador OVNI
//  script.js
// =============================================

// ── AÑO EN EL FOOTER ──
document.getElementById('anio').textContent = new Date().getFullYear();

// ── HISTORIAL EN MEMORIA ──
var historial = [];

// ── ORDEN DE LA TABLA ──
var ordenColumna = 'fecha';
var ordenAsc = false;

// ─────────────────────────────────────────────
//  SONIDO TERMINAL con Web Audio API
// ─────────────────────────────────────────────
var audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

function beep(frecuencia, duracion, volumen) {
    try {
        var ctx = getAudioCtx();
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'square';
        osc.frequency.value = frecuencia || 440;
        gain.gain.value = volumen || 0.04;

        osc.start();
        osc.stop(ctx.currentTime + (duracion || 0.06));
    } catch (e) {
        /* silencioso si el navegador bloquea */
    }
}

function beepLinea() {
    beep(660, 0.05, 0.03);
}
function beepFinal() {
    beep(880, 0.12, 0.05);
    setTimeout(function () {
        beep(1100, 0.1, 0.04);
    }, 130);
}
function beepError() {
    beep(220, 0.15, 0.05);
}

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
    if (nombreReporte === '') errores.push('El nombre del reporte es obligatorio.');
    if (lugar === '') errores.push('El lugar del avistamiento es obligatorio.');
    if (testigosVal === '') errores.push('Deb\u00e9s indicar la cantidad de testigos.');
    if (descripcion === '') errores.push('La descripci\u00f3n breve es obligatoria.');
    if (explicacion === '')
        errores.push('Deb\u00e9s indicar si existe explicaci\u00f3n cient\u00edfica probable.');

    var errorContainer = document.getElementById('form-error');

    if (errores.length > 0) {
        beepError();
        errorContainer.innerHTML =
            '\u26a0 Campos obligatorios incompletos:<br>\u2022 ' + errores.join('<br>\u2022 ');
        errorContainer.classList.remove('hidden');
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    errorContainer.classList.add('hidden');

    // 3. CÁLCULO DE PUNTAJE
    var puntaje = 0;
    if (tieneVideo) puntaje += 3;
    if (tieneImagen) puntaje += 2;
    if (tieneRadar) puntaje += 4;
    if (testigosVal === '4') puntaje += 2;
    if (explicacion === 'no') puntaje += 3;

    // 4. CLASIFICACIÓN
    var nivel, clase, recomendacion, color, porcentaje;

    if (puntaje <= 4) {
        nivel = 'Evidencia D\u00e9bil';
        clase = 'debil';
        recomendacion =
            'La evidencia disponible es insuficiente para establecer un caso s\u00f3lido. Se recomienda ampliar la recolecci\u00f3n de datos antes de proceder con un informe formal.';
        color = '#f0c040';
        porcentaje = Math.max(10, Math.round((puntaje / 14) * 40));
    } else if (puntaje <= 8) {
        nivel = 'Evidencia Moderada';
        clase = 'moderada';
        recomendacion =
            'El caso presenta caracter\u00edsticas de inter\u00e9s. Se recomienda escalarlo a an\u00e1lisis secundario y buscar confirmaci\u00f3n adicional mediante fuentes independientes.';
        color = '#ff9900';
        porcentaje = Math.round(40 + (puntaje / 14) * 35);
    } else {
        nivel = 'Evidencia Fuerte';
        clase = 'fuerte';
        recomendacion =
            'ALERTA: Este caso cumple m\u00faltiples criterios de alta confiabilidad. Se recomienda apertura de expediente oficial, notificaci\u00f3n a autoridades competentes y preservaci\u00f3n inmediata de todas las pruebas.';
        color = '#ff4444';
        porcentaje = Math.min(100, Math.round(70 + (puntaje / 14) * 30));
    }

    // 5. ANIMACIÓN DE ESCANEO
    var container = document.getElementById('resultado-container');
    var nivelEl = document.getElementById('resultado-nivel');
    var puntajeEl = document.getElementById('resultado-puntaje');
    var recomEl = document.getElementById('resultado-recomendacion');
    var barraEl = document.getElementById('resultado-barra');

    nivelEl.textContent = '';
    nivelEl.className = 'resultado-nivel';
    puntajeEl.textContent = '';
    recomEl.innerHTML = '';
    barraEl.style.width = '0%';

    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });

    var expId = String(Math.floor(Math.random() * 90000) + 10000);
    var lineas = [
        '> Iniciando an\u00e1lisis de evidencia...',
        '> Verificando fuentes de datos...',
        '> Cruzando con base PURSUE...',
        '> Calculando \u00edndice de confiabilidad...',
        '> Clasificando expediente UAP-' + expId + '...',
        '> An\u00e1lisis completado.',
    ];

    puntajeEl.style.color = 'var(--accent)';
    puntajeEl.style.minHeight = '120px';

    var lineaActual = 0;
    var textoAcumulado = '';

    function escribirLinea() {
        if (lineaActual < lineas.length) {
            beepLinea();
            textoAcumulado += lineas[lineaActual] + '\n';
            puntajeEl.textContent = textoAcumulado;
            lineaActual++;
            setTimeout(escribirLinea, 320);
        } else {
            beepFinal();
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
    historial.push({
        nombre: nombreReporte,
        lugar: lugar,
        puntaje: puntaje,
        nivel: nivel,
        clase: clase,
        fecha: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    });

    renderizarTabla();
}

// ─────────────────────────────────────────────
//  TABLA DE HISTORIAL ORDENABLE
// ─────────────────────────────────────────────
function renderizarTabla() {
    var contenedor = document.getElementById('historial-lista');

    if (historial.length === 0) {
        contenedor.innerHTML =
            '<p class="historial-vacio">A\u00fan no hay reportes clasificados.</p>';
        return;
    }

    // Copiar y ordenar
    var datos = historial.slice();
    datos.sort(function (a, b) {
        var va = a[ordenColumna];
        var vb = b[ordenColumna];
        if (ordenColumna === 'puntaje') {
            va = Number(va);
            vb = Number(vb);
            return ordenAsc ? va - vb : vb - va;
        }
        va = String(va).toLowerCase();
        vb = String(vb).toLowerCase();
        if (va < vb) return ordenAsc ? -1 : 1;
        if (va > vb) return ordenAsc ? 1 : -1;
        return 0;
    });

    var columnas = [
        { key: 'nombre', label: 'Reporte' },
        { key: 'lugar', label: 'Lugar' },
        { key: 'puntaje', label: 'Puntaje' },
        { key: 'nivel', label: 'Nivel' },
        { key: 'fecha', label: 'Hora' },
    ];

    // Construir tabla
    var html = '<table class="tabla-historial"><thead><tr>';
    columnas.forEach(function (col) {
        var flecha = '';
        if (ordenColumna === col.key) {
            flecha = ordenAsc ? ' &#9650;' : ' &#9660;';
        }
        html +=
            '<th onclick="ordenarPor(\'' +
            col.key +
            '\')" class="th-ordenable">' +
            col.label +
            flecha +
            '</th>';
    });
    html += '</tr></thead><tbody>';

    datos.forEach(function (r) {
        html += '<tr>';
        html += '<td>' + r.nombre + '</td>';
        html += '<td>' + r.lugar + '</td>';
        html +=
            '<td style="text-align:center;font-family:var(--font-mono)">' + r.puntaje + ' pts</td>';
        html += '<td><span class="badge ' + r.clase + '">' + r.nivel + '</span></td>';
        html +=
            '<td style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-dim)">' +
            r.fecha +
            '</td>';
        html += '</tr>';
    });

    html += '</tbody></table>';
    contenedor.innerHTML = html;
}

function ordenarPor(col) {
    if (ordenColumna === col) {
        ordenAsc = !ordenAsc;
    } else {
        ordenColumna = col;
        ordenAsc = true;
    }
    renderizarTabla();
}

// ─────────────────────────────────────────────
//  REINICIAR FORMULARIO
// ─────────────────────────────────────────────
function reiniciarFormulario() {
    document.getElementById('nombre-reporte').value = '';
    document.getElementById('lugar').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('testigos').value = '';
    document.getElementById('tipo-fenomeno').value = '';
    document.getElementById('tiene-video').checked = false;
    document.getElementById('tiene-imagen').checked = false;
    document.getElementById('tiene-radar').checked = false;

    var radios = document.querySelectorAll('input[name="explicacion"]');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    document.getElementById('form-error').classList.add('hidden');
    document.getElementById('resultado-container').classList.add('hidden');
    document.getElementById('clasificador').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─────────────────────────────────────────────
//  ENTER en inputs de texto
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
