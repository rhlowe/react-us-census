export function formatNumber(number) {
  return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function formatFloat(number) {
    return parseFloat(number).toFixed(2);
}
