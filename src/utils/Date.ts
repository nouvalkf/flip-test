const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export const dateFormat = (value: string) => {
  const date = new Date(`${value}+07:00`);
  const dt = date.getDate();
  const month = months[date.getMonth()]
  const year = date.getFullYear();

  return `${dt} ${month} ${year}`;
}