// Import stylesheets
import './style.css';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const cur_month = document.querySelector('#month');
const days = document.querySelector('.days');

console.log(days);

function generateCalendar(month, year) {
  days.innerHTML = '';

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= firstDayOfMonth + lastDayOfMonth; i++) {
    const day = document.createElement('div');
    if (i > firstDayOfMonth) {
      day.classList.add('days');
      day.innerText = i - firstDayOfMonth;

      if (
        i === today.getDate() &&
        year === today.getFullYear() &&
        month === today.getMonth()
      ) {
        day.classList.add('today');
      }
    } else {
      day.innerHTML = ' ';
    }
    days.appendChild(day);
  }
  cur_month.innerHTML = monthNames[month] + ' / ' + year;
}

generateCalendar(currentMonth, currentYear);

prev.addEventListener('click', () => {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  generateCalendar(currentMonth, currentYear);
});

next.addEventListener('click', () => {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  generateCalendar(currentMonth, currentYear);
});

days.addEventListener('click', (e) => {
  const messageDiv = document.getElementById('message');
  const selected = document.querySelector('.selected');
  if (selected) {
    selected.classList.remove('selected');
  }
  e.target.classList.add('selected');
  messageDiv.innerHTML = event.target.innerText;
});
