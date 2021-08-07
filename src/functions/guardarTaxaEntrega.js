export default function guardarTaxEntrega(taxaEntrega) {
  const novoPreco = taxaEntrega.replace(',', '') * 1;
  return novoPreco;
}
