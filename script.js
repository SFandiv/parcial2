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