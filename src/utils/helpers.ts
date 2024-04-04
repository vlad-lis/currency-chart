const generateDateRange = (start: string, end: string): string[] => {
  const dates = [];
  const startDateObj = new Date(start);
  const endDateObj = new Date(end);
  const currentDate = startDateObj;

  while (currentDate <= endDateObj) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export default generateDateRange;
