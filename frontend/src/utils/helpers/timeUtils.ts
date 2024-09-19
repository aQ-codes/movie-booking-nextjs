
//conver 24 hour to 12 hour format
export const convertTo12HourFormat = (time: string): string => {
  const [hour, minute] = time.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const adjustedHour = hour % 12 || 12;
  return `${adjustedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
};
