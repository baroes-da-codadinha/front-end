export default function editarTaxaEntrega(taxaEntrega, cifrao) {
  const novaTaxaEntrega = taxaEntrega.toString();
  const antes = novaTaxaEntrega.substring(0, novaTaxaEntrega.length - 2).padStart(2, '0');
  const depois = novaTaxaEntrega.substring(novaTaxaEntrega.length - 2).padStart(2, '0');
  return `${cifrao ? 'R$' : ''} ${antes},${depois}`;
}
