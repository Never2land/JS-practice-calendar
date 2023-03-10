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
let clicked = null;
let events = localStorage.getItem('events')
  ? JSON.parse(localStorage.getItem('events'))
  : [];

const newEventModal = document.getElementById('newEventModal');
const modalBackDrop = document.getElementById('modalBackDrop');

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
      const date = `${month + 1}/${i - firstDayOfMonth}/${year}`;
      const eventForDay = events.find((event) => event.date === date);
      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.innerText = eventForDay.title;
        day.appendChild(eventDiv);
      }
    }

    day.addEventListener('click', (e) => {
      const selected = document.querySelector('.selected');
      if (selected) {
        selected.classList.remove('selected');
      }
      e.target.classList.add('selected');
      const date = `${month + 1}/${i - firstDayOfMonth}/${year}`;
      openModal(date);
    });

    days.appendChild(day);
  }
  cur_month.innerHTML = monthNames[month] + ' / ' + year;
}

function openModal(date) {
  clicked = date;
  // const modal = document.getElementById('modalBackDrop');
  newEventModal.style.display = 'block';
  modalBackDrop.style.display = 'block';
}

function closeModal() {
  clicked = null;
  newEventModal.style.display = 'none';
  modalBackDrop.style.display = 'none';
}

function saveEvent() {
  const title = document.getElementById('eventTitleInput').value;
  const event = {
    date: clicked,
    title: title,
  };
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));
  console.log(localStorage);
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

document.getElementById('cancelButton').addEventListener('click', closeModal);
document.getElementById('saveButton').addEventListener('click', saveEvent);
