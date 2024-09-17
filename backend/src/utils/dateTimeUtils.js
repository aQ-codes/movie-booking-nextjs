
export const getCurrentISTDateTime = () => {
    const now = new Date(); // Current date and time in UTC
    
    // Get the offset in minutes between UTC and IST
    const istOffset = 5.5 * 60; // IST is UTC+5:30

    // Convert current date to IST by adding the offset
    const istTime = new Date(now.getTime() + (istOffset * 60 * 1000));

    // Extract the current date and time in IST
    const currentDate = istTime.toISOString().split('T')[0]; // Format YYYY-MM-DD
    const currentTime = istTime.toISOString().split('T')[1].substring(0, 5); // Format HH:MM

    return { currentDate, currentTime };
};
