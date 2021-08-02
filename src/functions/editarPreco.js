/* eslint-disable no-unused-vars */
export default function editarPreco(preco, cifrao) {
  const antes = preco.substring(0, preco.length - 2);
  const depois = preco.substring(preco.length - 2);
  return `${cifrao ? 'R$' : ''} ${antes},${depois}`;
}
