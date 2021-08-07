export default function editarValorMinimo(valorMinimo, cifrao) {
  const novoValorMinimo = valorMinimo.toString();
  const antes = novoValorMinimo.substring(0, novoValorMinimo.length - 2).padStart(2, '0');
  const depois = novoValorMinimo.substring(novoValorMinimo.length - 2).padStart(2, '0');
  return `${cifrao ? 'R$' : ''} ${antes},${depois}`;
}
