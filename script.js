document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector(".about-section");
  const image = document.querySelector(".about-image img");

  const observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          image.classList.add("zoomed");
        } else {
          image.classList.remove("zoomed");
        }
      });
    },
    {
      threshold: 0.60, // Trigger when 50% of the section is visible
    }
  );

  observer.observe(aboutSection);
});






document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");

  document.querySelectorAll(".nav").forEach(button => {
    button.addEventListener("click", () => {
      const direction = parseInt(button.getAttribute("data-direction"), 10);
      scrollCarousel(direction);
    });
  });

  function scrollCarousel(direction) {
    const card = carousel.querySelector('.team-card');
    if (!card) return;

    const cardStyle = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight || 0);

    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  // Optional: socket.io init
  const socket = io();
});




document.addEventListener("DOMContentLoaded", function () {
  // Menu Toggle
  document.getElementById("menuToggle").addEventListener("click", function () {
    document.getElementById("nav-links").classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector('.services-section'); // 👈 Change this to your actual section selector
  const cards = document.querySelectorAll('.container2'); // 👈 Cards inside that section

  // Step 1: Observe the services section
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Step 2: When section appears, animate cards
        cards.forEach(card => card.classList.add('animate'));

      }
    });
  }, {
    threshold: 0.8 // You can adjust this
  });

  sectionObserver.observe(section);
});

// counter






// book a meeting

document.addEventListener('DOMContentLoaded', () => {
  const openPopupBtn = document.getElementById('openPopup'); // trigger button
  const popupOverlay = document.getElementById('popupOverlay');
  const closeBtn = popupOverlay.querySelector('.close-btn');

  const nameInput = document.getElementById('name');
  const contactInput = document.getElementById('contact');
  const emailInput = document.getElementById('email');
  const serviceProposal = document.getElementById('serviceProposal');
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
    clearSelectedDay();
    dayDiv.classList.add('active');
    selectedDay = new Date(year, month, day); // store full JS Date
    updateSubmitButton();
  }

  function clearSelectedDay() {
    calendarDays.querySelectorAll('.day.active').forEach(d => d.classList.remove('active'));
  }

  function resetSelection() {
    clearSelectedDay();
    nameInput.value = '';
    contactInput.value = '';
    emailInput.value = '';
    serviceProposal.value = '';
    timezoneSelect.value = '';
    selectedDay = null;
    updateSubmitButton();
  }

  function updateSubmitButton() {
    const valid =
      nameInput.value.trim() !== '' &&
      contactInput.value.trim() !== '' &&
      emailInput.value.trim() !== '' &&
      serviceProposal.value &&
      timezoneSelect.value &&
      selectedDay;

    submitBookingBtn.disabled = !valid;
  }

  if (openPopupBtn) {
    openPopupBtn.addEventListener('click', e => {
      e.preventDefault();
      popupOverlay.style.display = 'flex';
      resetSelection();
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
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    } else if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
    selectedDay = null;
    updateSubmitButton();
  }

  [nameInput, contactInput, emailInput, serviceProposal, timezoneSelect].forEach(input => {
    input.addEventListener('input', updateSubmitButton);
    input.addEventListener('change', updateSubmitButton);
  });

  submitBookingBtn.addEventListener('click', async () => {
    if (!selectedDay) {
      alert('Please select a date.');
      return;
    }

    const isoDate = selectedDay.toISOString().split('T')[0]; // YYYY-MM-DD

    const bookingData = {
      data: {
        name: nameInput.value.trim(),
        contact: contactInput.value.trim(),
        email: emailInput.value.trim(),
        serviceProposal: serviceProposal.value,
        timezone: timezoneSelect.value,
        date: isoDate
      }
    };

    try {
      const res = await fetch('https://devoted-captain-c1ad6bbc4b.strapiapp.com/api/book-a-meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(result, null, 2));

      alert('Booking successful!');
      console.log('✅ Response:', result);
      popupOverlay.style.display = 'none';
      resetSelection();
    } catch (err) {
      console.error('❌ Error:', err.message);
      alert('Error: ' + err.message);
    }
  });
});


// digitalpopup

window.addEventListener('DOMContentLoaded', () => {
  const hasSeenPopup = localStorage.getItem('hasSeenPopup');

  if (!hasSeenPopup) {
    // Show the popup after 5 seconds
    setTimeout(() => {
      const popup = document.getElementById('popup');
      if (popup) popup.style.display = 'flex';
    }, 5000);
  }

  const closePopupBtn = document.getElementById('closePopup');
  if (closePopupBtn) {
    closePopupBtn.addEventListener('click', () => {
      const popup = document.getElementById('popup');
      if (popup) popup.style.display = 'none';

      // Mark popup as seen for this browser
      localStorage.setItem('hasSeenPopup', 'true');
    });
  }
});


// digitalpopup

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return c.substring(nameEQ.length, c.length);
  }
  return null;
}

window.addEventListener("DOMContentLoaded", () => {
  if (!getCookie("cookieAccepted")) {
    setTimeout(() => {
      document.getElementById("cookiePopup").style.display = "flex";
    }, 2000);
  }

  document.getElementById("acceptCookie").addEventListener("click", () => {
    setCookie("cookieAccepted", "yes", 365); // valid for 1 year
    document.getElementById("cookiePopup").style.display = "none";
  });
});



// --- Accordion Functionality ---
document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click', () => {
    const active = document.querySelector('.accordion-header.active');
    if (active && active !== button) {
      active.classList.remove('active');
      active.nextElementSibling.style.display = 'none';
    }
    button.classList.toggle('active');
    const body = button.nextElementSibling;
    body.style.display = button.classList.contains('active') ? 'block' : 'none';
  });
});

// --- Popup4 open/close functionality ---
const popup4 = document.getElementById("popup4");
const openButtons = document.querySelectorAll(".openPopupBtn");
const closePopup4 = document.getElementById("closePopup4");

if (popup4 && closePopup4 && openButtons.length > 0) {
  openButtons.forEach(button => {
    button.addEventListener("click", () => {
      popup4.style.display = "flex";
    });
  });

  closePopup4.addEventListener("click", () => {
    popup4.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === popup4) {
      popup4.style.display = "none";
    }
  });
}

// --- Social popup after 4 seconds ---
setTimeout(() => {
  const socialPopup = document.getElementById("socialPopup");
  if (socialPopup) socialPopup.style.display = "flex";
}, 4000);

window.showPopup = function () {
  const popup = document.getElementById('marketingPopup');
  if (popup) popup.style.display = 'flex';
};

window.hidePopup = function () {
  const popup = document.getElementById('marketingPopup');
  if (popup) popup.style.display = 'none';
};

window.togglePopup = function () {
  const socialPopup = document.getElementById("socialPopup");
  if (socialPopup) socialPopup.style.display = "none";
};

// --- Contact Form Submission ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const responseEl = document.getElementById('formResponse');

    const formData = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      serviceProposal: this.serviceProposal.value,
      message: this.message.value,
    };

    try {
      const response = await fetch(
        "https://devoted-captain-c1ad6bbc4b.strapiapp.com/api/book-a-consultations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: formData }),
        }
      );

      if (response.ok) {
        responseEl.textContent =
          "✅ Thank you for reaching out! We will get back to you soon.";
        this.reset();
      } else {
        const data = await response.json();
        responseEl.textContent =
          data.error?.message || "❌ Failed to send message.";
      }
    } catch (error) {
      responseEl.textContent = "⚠️ Server error, please try again later.";
    }
  });
}



// --- Book Call Form Logic ---
const exploreButtons = document.querySelectorAll(".cta-btn");
const modal = document.getElementById("bookCallModal");
const closeModal = document.getElementById("closeModalBtn");
const serviceDropdown = document.getElementById("serviceDropdown");
const bookCallForm = document.getElementById("bookCallForm");
const thankYouMsg = document.getElementById("thankYouMsg");

if (exploreButtons && modal && bookCallForm) {
  exploreButtons.forEach(button => {
    button.addEventListener("click", () => {
      const service = button.getAttribute("data-service");

      modal.style.display = "flex";

      if (serviceDropdown) {
        for (let i = 0; i < serviceDropdown.options.length; i++) {
          if (serviceDropdown.options[i].value === service) {
            serviceDropdown.selectedIndex = i;
            break;
          }
        }
      }

      bookCallForm.style.display = "block";
      if (thankYouMsg) thankYouMsg.style.display = "none";
    });
  });
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});



// --- Auth UI Handling ---
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const logoutBtn = document.getElementById('logoutBtn');
const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');

if (token && user) {
  if (logoutBtn) logoutBtn.style.display = 'inline-block';
  if (loginBtn) loginBtn.style.display = 'none';
  if (registerBtn) registerBtn.style.display = 'none';

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });
  }
} else {
  if (logoutBtn) logoutBtn.style.display = 'none';
  if (loginBtn) loginBtn.style.display = 'inline-block';
  if (registerBtn) registerBtn.style.display = 'inline-block';
}

// --- Test server API ---
fetch('/api/hello')
  .then(res => res.json())
  .then(data => console.log(data.message))
  .catch(err => console.error('Hello API Error:', err));


// --- Book Call Form Submission ---
document.addEventListener('DOMContentLoaded', () => {
  const bookCallForm = document.getElementById('bookCallForm');
  const formResponse = document.getElementById('formResponse');

  // Handle form submission
  bookCallForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = bookCallForm.elements['name'].value.trim();
    const email = bookCallForm.elements['email'].value.trim();
    const contact = bookCallForm.elements['contact'].value.trim();
    const serviceProposal = bookCallForm.elements['serviceProposal'].value;
    const message = bookCallForm.elements['message'].value.trim();

    try {
      const response = await fetch(
        'https://devoted-captain-c1ad6bbc4b.strapiapp.com/api/book-a-consultations',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              name,
              email,
              contact,
              serviceProposal,
              message,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "IST",
              date: new Date().toISOString().split("T")[0]
            }
          }),
        }
      );

      if (response.ok) {
        bookCallForm.reset();
        formResponse.textContent = "✅ Thank you! Your request has been submitted.";
        formResponse.style.color = "green";
      } else {
        const error = await response.json();
        formResponse.textContent = "❌ Failed: " + (error.error?.message || 'Please try again later.');
        formResponse.style.color = "red";
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      formResponse.textContent = "❌ An error occurred. Please try again.";
      formResponse.style.color = "red";
    }
  });
});
// WhatsApp Number (change to your boss's number in international format)
    const whatsappNumber = "+919779320626";

    // Redirect directly to WhatsApp when clicking the icon
    document.getElementById("whatsappIcon").addEventListener("click", function () {
      let url = "https://wa.me/" + whatsappNumber;
      window.open(url, "_blank");
    });



    