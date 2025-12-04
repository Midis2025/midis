document.addEventListener("DOMContentLoaded", function () {
    // Menu Toggle
    document.getElementById("menuToggle").addEventListener("click", function () {
      document.getElementById("nav-links").classList.toggle("active");
    });

    // 🎯 Service Cards - Scroll Animation with Intersection Observer
    const servicesGrid = document.querySelector('.services-grid');
    const cards = document.querySelectorAll('.service-card');

    if (servicesGrid && cards.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply different animations to cards based on position
            const index = Array.from(cards).indexOf(entry.target);
            
            if (index % 3 === 0) {
              entry.target.classList.add('animate-slide-left');
            } else if (index % 3 === 1) {
              entry.target.classList.add('animate-scale');
            } else {
              entry.target.classList.add('animate-slide-right');
            }

            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      });

      cards.forEach((card) => {
        observer.observe(card);
      });
    }
  });


// book a meeting

document.addEventListener('DOMContentLoaded', () => {
  const openPopupBtn = document.getElementById('openPopup');
  const popupOverlay = document.getElementById('popupOverlay');
  const closeBtn = popupOverlay.querySelector('.close-btn');

  const nameInput = document.getElementById('name');
  const contactInput = document.getElementById('contact');
  const emailInput = document.getElementById('email');
  const serviceProposalSelect = document.getElementById('serviceProposal');
  const timezoneSelect = document.getElementById('timezone');
  const submitBookingBtn = document.getElementById('submitBooking');

  const calendarDays = document.getElementById('calendarDays');
  const monthYear = document.getElementById('monthYear');
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');

  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let selectedDay = null;

  function renderCalendar(month, year) {
    calendarDays.innerHTML = '';
    monthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;
    const labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    labels.forEach(label => {
      const span = document.createElement('span');
      span.textContent = label;
      calendarDays.appendChild(span);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) calendarDays.appendChild(document.createElement('div'));

    for (let day = 1; day <= numDays; day++) {
      const date = new Date(year, month, day);
      const dayDiv = document.createElement('div');
      dayDiv.textContent = day;
      dayDiv.classList.add('day');

      const todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (date < todayNoTime) {
        dayDiv.classList.add('disabled');
      } else {
        dayDiv.addEventListener('click', () => selectDay(dayDiv, day, month, year));
      }
      calendarDays.appendChild(dayDiv);
    }
  }

  function selectDay(dayDiv, day, month, year) {
    calendarDays.querySelectorAll('.day.active').forEach(d => d.classList.remove('active'));
    dayDiv.classList.add('active');
    selectedDay = { day, month, year };
    updateSubmitButton();
  }

  function updateSubmitButton() {
    const valid =
      nameInput.value.trim() &&
      contactInput.value.trim() &&
      emailInput.value.trim() &&
      serviceProposalSelect.value &&
      timezoneSelect.value &&
      selectedDay;
    submitBookingBtn.disabled = !valid;
  }

  if (openPopupBtn) {
    openPopupBtn.addEventListener('click', e => {
      e.preventDefault();
      popupOverlay.style.display = 'flex';
      renderCalendar(currentMonth, currentYear);
    });
  }

  closeBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
  });

  prevMonthBtn.addEventListener('click', () => changeMonth(-1));
  nextMonthBtn.addEventListener('click', () => changeMonth(1));

  function changeMonth(step) {
    currentMonth += step;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    else if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar(currentMonth, currentYear);
  }

  [nameInput, contactInput, emailInput, serviceProposalSelect, timezoneSelect]
    .forEach(input => {
      input.addEventListener('input', updateSubmitButton);
      input.addEventListener('change', updateSubmitButton);
    });

  submitBookingBtn.addEventListener('click', async () => {
    if (!selectedDay) { alert('Please select a date.'); return; }

    const bookingData = {
      data: {
        name: nameInput.value.trim(),
        contact: contactInput.value.trim(),
        email: emailInput.value.trim(),
        serviceProposal: serviceProposalSelect.value,
        timezone: timezoneSelect.value,
        date: `${selectedDay.year}-${String(selectedDay.month + 1).padStart(2,'0')}-${String(selectedDay.day).padStart(2,'0')}`
      }
    };

    try {
      const res = await fetch("https://devoted-captain-c1ad6bbc4b.strapiapp.com/api/book-a-meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      });

      if (!res.ok) throw new Error(await res.text());
      alert('Booking successful!');
      popupOverlay.style.display = 'none';
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
});