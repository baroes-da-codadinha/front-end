export default function conferirValorMinimo(valorMinimo) {
  if (valorMinimo === '00,00') {
    return false;
  }
  if (valorMinimo.indexOf(',') !== (valorMinimo.length - 3)) {
    return false;
  }
  return true;
}
