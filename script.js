/**
 * Universidad - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * Estudiante: Andrés Santiago Fandiño Palacio
 * 
 * Parcial 2: Sistema de Dispersión Geométrica Orbital
 */

// Obtener canvas y contexto
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/**
 * Única función autorizada para dibujar píxeles
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {string} color 
 */
function plotPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}
/**
 * Dibuja los 8 puntos simétricos de la circunferencia
 */
function drawCirclePoints(cx, cy, x, y, color) {
    plotPixel(ctx, cx + x, cy + y, color);
    plotPixel(ctx, cx - x, cy + y, color);
    plotPixel(ctx, cx + x, cy - y, color);
    plotPixel(ctx, cx - x, cy - y, color);
    plotPixel(ctx, cx + y, cy + x, color);
    plotPixel(ctx, cx - y, cy + x, color);
    plotPixel(ctx, cx + y, cy - x, color);
    plotPixel(ctx, cx - y, cy - x, color);
}
function midpointCircle(cx, cy, r, color = "#999") {
    let x = 0;
    let y = r;
    let p = 1 - r;

    drawCirclePoints(cx, cy, x, y, color);

    while (x < y) {
        x++;
        if (p < 0) {
            p = p + 2 * x + 1;
        } else {
            y--;
            p = p + 2 * x - 2 * y + 1;
        }
        drawCirclePoints(cx, cy, x, y, color);
    }
}
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Parámetros aleatorios
const R = Math.floor(Math.random() * 100) + 120;
const N = Math.floor(Math.random() * 7) + 4;
const K = Math.floor(Math.random() * 5) + 3;

// Dibujar órbita
midpointCircle(centerX, centerY, R, "#aaa");

// Obtener posiciones
const positions = getOrbitalPositions(centerX, centerY, R, N);

// Dibujar polígonos
positions.forEach(pos => {
    let vertices = generatePolygonVertices(pos.x, pos.y, 20, K);
    drawPolygon(vertices, "#000");
});
/**
 * Retorna los centros donde se ubicarán los polígonos
 */
function getOrbitalPositions(cx, cy, r, n) {
    let positions = [];

    for (let i = 0; i < n; i++) {
        let angle = (2 * Math.PI * i) / n;

        let x = cx + r * Math.cos(angle);
        let y = cy + r * Math.sin(angle);

        positions.push({ x, y });
    }
    return positions;
}
/**
 * Genera los vértices de un polígono regular
 */
function generatePolygonVertices(cx, cy, radius, sides) {
    let vertices = [];

    for (let i = 0; i < sides; i++) {
        let angle = (2 * Math.PI * i) / sides;

        let x = cx + radius * Math.cos(angle);
        let y = cy + radius * Math.sin(angle);

        vertices.push({ x, y });
    }
    return vertices;
}
/**
 * Dibuja un polígono conectando vértices
 */
function drawPolygon(vertices, color = "#000") {
    for (let i = 0; i < vertices.length; i++) {
        let v1 = vertices[i];
        let v2 = vertices[(i + 1) % vertices.length];

        bresenhamLine(v1.x, v1.y, v2.x, v2.y, color);
    }
}