export const numberFormat = (value: number): string =>
Number(value)
.toString()
.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
