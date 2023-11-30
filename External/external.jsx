export const icon = (props) => {
  return <i className="material-symbols-outlined">{props}</i>
}

export const iconFont = (props, col) => {
  return <i className={props} style={col ? { color: col } : { color: 'black' }}></i>
}

export const presenterImg = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1695134281/RadioProject/y0tzv68llkfcrbtq9yke.jpg';

export const getTimeSince = (date) => {
  // console.log(new Date(date), new Date().getFullYear())

  const currentDate = new Date();
  const programDate = new Date(date);
  const timeElapsed = currentDate - programDate;
  const seconds = Math.floor(timeElapsed / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  }
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const inputYear = programDate.getFullYear();
  const inputMonth = programDate.getMonth();
  const yearDifference = currentYear - inputYear;
  const monthDifference = currentMonth - inputMonth;
  if (yearDifference === 0) {
    if (monthDifference === 1) {
      return '1 month ago';
    } else {
      return `${monthDifference} months ago`;
    }
  } else if (yearDifference === 1 && monthDifference < 0) {
    return '11 months ago';
  } else {
    if (yearDifference === 1) {
      return '1 year ago';
    } else {
      return `${yearDifference} years ago`;
    }
  }
}

export const sortByTime = (a, b) => {
  const timeA = a.timestamp;
  const timeB = b.timestamp;
  return timeB - timeA;
}