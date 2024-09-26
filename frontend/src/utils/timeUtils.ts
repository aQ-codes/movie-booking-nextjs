
//conver 24 hour to 12 hour format
export const convertTo12HourFormat = (time: string): string => {
  const [hour, minute] = time.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const adjustedHour = hour % 12 || 12;
  return `${adjustedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
};




export function convertToISTAndFormat(dateString: string) {
  // Convert the input date string to a Date object
  const utcDate = new Date(dateString);

  // Define the IST offset (UTC +5:30)
  const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
  const istDate = new Date(utcDate.getTime() + istOffset);

  // Get current date in IST
  const now = new Date(Date.now() + istOffset);

  // Format options
  const year = istDate.getFullYear();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(istDate); // 'Sep'
  const dayOfMonth = istDate.getDate(); // 18
  const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(istDate); // 'Wed'

  // Check if the date is today or tomorrow
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const givenDate = new Date(istDate.getFullYear(), istDate.getMonth(), istDate.getDate());

  let specialDay = '';
  if (givenDate.toDateString() === today.toDateString()) {
    specialDay = 'today';
  } else if (givenDate.toDateString() === tomorrow.toDateString()) {
    specialDay = 'tomorrow';
  }

  return {
    year,
    month,
    date: dayOfMonth,
    day: dayOfWeek,
    specialDay,
  };
}


