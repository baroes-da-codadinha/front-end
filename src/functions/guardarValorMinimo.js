export default function guardarValorMinimo(valorMinimo) {
  const novoValorMinimo = valorMinimo.replace(',', '') * 1;
  return novoValorMinimo;
}
