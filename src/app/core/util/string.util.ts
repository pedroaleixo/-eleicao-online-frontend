export function somenteNumeros(texto: string): number {
  return Number(texto.toString().replace(/\.|-/gm, ''));
}

