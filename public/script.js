
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
  const openPopupBtn = document.getElementById('openPopup');
  const popupOverlay = document.getElementById('popupOverlay');
  const closeBtn = popupOverlay.querySelector('.close-btn');

  const nameInput = document.getElementById('name');
  const contactInput = document.getElementById('contact');
  const emailInput = document.getElementById('email');
  const timezoneSelect = document.getElementById('timezone');
  const submitBookingBtn = document.getElementById('submitBooking');

  const calendarDays = document.getElementById('calendarDays');
  const slotsDiv = document.getElementById('slots');
  const monthYear = document.getElementById('monthYear');
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');

  const times = [
    '10:00 am', '10:30 am', '11:00 am', '11:30 am',
    '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm'
  ];

  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let selectedDay = null;
  let selectedTime = null;

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
    selectedDay = { day, month, year };
    renderTimeSlots();
    updateSubmitButton();
  }

  function clearSelectedDay() {
    calendarDays.querySelectorAll('.day.active').forEach(d => d.classList.remove('active'));
  }

  function renderTimeSlots() {
    slotsDiv.innerHTML = '';
    selectedTime = null;
    times.forEach(time => {
      const slotDiv = document.createElement('div');
      slotDiv.textContent = time;
      slotDiv.classList.add('slot');
      slotDiv.addEventListener('click', () => selectTimeSlot(slotDiv, time));
      slotsDiv.appendChild(slotDiv);
    });
  }

  function selectTimeSlot(slotDiv, time) {
    clearSelectedTime();
    slotDiv.classList.add('active');
    selectedTime = time;
    updateSubmitButton();
  }

  function clearSelectedTime() {
    slotsDiv.querySelectorAll('.slot.active').forEach(s => s.classList.remove('active'));
  }

  function clearTimeSlots() {
    slotsDiv.innerHTML = '';
  }

  function resetSelection() {
    clearSelectedDay();
    clearSelectedTime();
    clearTimeSlots();
    nameInput.value = '';
    contactInput.value = '';
    emailInput.value = '';
    timezoneSelect.value = '';
    selectedDay = null;
    selectedTime = null;
    updateSubmitButton();
  }

  function updateSubmitButton() {
    const valid =
      nameInput.value.trim() !== '' &&
      contactInput.value.trim() !== '' &&
      emailInput.value.trim() !== '' &&
      timezoneSelect.value &&
      selectedDay && selectedTime;

    submitBookingBtn.disabled = !valid;
  }

  // Event Listeners
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
    clearTimeSlots();
    selectedDay = null;
    selectedTime = null;
    updateSubmitButton();
  }

  // Watch inputs
  [nameInput, contactInput, emailInput, timezoneSelect].forEach(input => {
    input.addEventListener('input', updateSubmitButton);
    input.addEventListener('change', updateSubmitButton);
  });

  submitBookingBtn.addEventListener('click', async () => {
    if (!selectedDay || !selectedTime) {
      alert('Please complete all fields.');
      return;
    }

    const bookingData = {
      name: nameInput.value.trim(),
      contact: contactInput.value.trim(),
      email: emailInput.value.trim(),
      timezone: timezoneSelect.value,
      day: selectedDay.day,
      month: selectedDay.month + 1,
      year: selectedDay.year,
      time: selectedTime
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (!res.ok) throw new Error(await res.text());
      alert('Booking successful!');
      popupOverlay.style.display = 'none';
      resetSelection();
    } catch (err) {
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
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          responseEl.textContent = 'Thank you for reaching out! We will get back to you soon.';
          this.reset();
        } else {
          const data = await response.json();
          responseEl.textContent = data.error || 'Failed to send message.';
        }
      } catch (error) {
        responseEl.textContent = 'Server error, please try again later.';
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


    
// chatbot
 // 🌐 Socket.IO initialization — supports both localhost and production
const isLocal = window.location.hostname === 'localhost';
const socket = io(isLocal ? 'http://localhost:5000' : window.location.origin);

let userId = localStorage.getItem('userId');
let userName = localStorage.getItem('userName');

if (!userId) {
  userId = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 100000);
  localStorage.setItem('userId', userId);
}

const chatPopupBtn = document.getElementById('openChat');
const chatPopup = document.getElementById('chatPopup');
const sendBtn = document.getElementById('sendBtn');
const userMessageInput = document.getElementById('userMessage');
const messagesBox = document.getElementById('messages');
const chatStatus = document.getElementById('chatStatus');
const chatTyping = document.getElementById('chatTyping');
const welcomePopup = document.getElementById('welcomePopup');
const closeChat = document.getElementById('closeChat');

if (chatPopup) chatPopup.style.display = 'none';

// 👋 Show welcome popup outside when chat is closed
function showWelcomePopup() {
  if (chatPopup.style.display === 'none') {
    welcomePopup.classList.remove('hidden');
  }
}

// 👋 Hide welcome popup immediately when chat opens
function hideWelcomePopup() {
  welcomePopup.classList.add('hidden');
}

// 🔥 Open chat from welcome popup click
welcomePopup?.addEventListener('click', () => {
  openChat();
});

// 👋 Toggle Chat from chat button
chatPopupBtn?.addEventListener('click', () => {
  const isVisible = chatPopup.style.display === 'flex';
  if (isVisible) {
    chatPopup.style.display = 'none';
    setTimeout(showWelcomePopup, 1000);
  } else {
    openChat();
  }
});

// ❌ Close chat button logic
closeChat?.addEventListener('click', () => {
  chatPopup.style.display = 'none';
  setTimeout(showWelcomePopup, 1000);
});

// ✅ Open chat function
function openChat() {
  chatPopup.style.display = 'flex';
  socket.emit('userJoin', { userId, userName });
  hideWelcomePopup();
}

// ✉️ Send message
sendBtn?.addEventListener('click', sendUserMessage);
userMessageInput?.addEventListener('keypress', (e) => {
  socket.emit('userTyping', { userId, userName });
  if (e.key === 'Enter') {
    sendUserMessage();
    e.preventDefault();
  }
});

function sendUserMessage() {
  const message = userMessageInput.value.trim();
  if (!message) return;

  if (!userName) {
    // 🚨 Ask for name first
    appendMessage('bot', "👋 Hi! Before we start, what’s your name?");
    showNameInput(message); // Pass first message to send later
    userMessageInput.value = '';
    return;
  }

  // Send message as usual
  socket.emit('userMessage', { userId, userName, message });
  appendMessage('user', message);
  userMessageInput.value = '';
  chatTyping.innerText = '';
  removeQuickReplies();
}

// 📝 Show name input in chat
function showNameInput(pendingMessage) {
  const nameInputContainer = document.createElement('div');
  nameInputContainer.classList.add('name-input-container');

  nameInputContainer.innerHTML = `
    <input type="text" id="nameInputField" placeholder="Enter your name..." class="name-input" />
    <button id="nameSubmitBtn" class="name-submit-btn">Submit</button>
  `;

  messagesBox.appendChild(nameInputContainer);
  messagesBox.scrollTop = messagesBox.scrollHeight;

  const nameInputField = document.getElementById('nameInputField');
  const nameSubmitBtn = document.getElementById('nameSubmitBtn');

  nameInputField.focus();

  // Submit on button click
  nameSubmitBtn.addEventListener('click', () => submitName(nameInputField.value.trim(), pendingMessage));
  // Submit on Enter key
  nameInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitName(nameInputField.value.trim(), pendingMessage);
      e.preventDefault();
    }
  });
}

// 📥 Handle name submission
function submitName(enteredName, pendingMessage) {
  if (!enteredName) {
    alert("Please enter a valid name.");
    return;
  }

  userName = enteredName;
  localStorage.setItem('userName', userName);
  socket.emit('userJoin', { userId, userName });

  appendMessage('user', userName); // Show name as user message
  removeNameInput();

  // Send pending first message
  if (pendingMessage) {
    socket.emit('userMessage', { userId, userName, message: pendingMessage });
    appendMessage('user', pendingMessage);
  }
}

// 🧹 Remove name input from chat
function removeNameInput() {
  const nameInputContainer = document.querySelector('.name-input-container');
  if (nameInputContainer) nameInputContainer.remove();
}

// 🧠 Bot Replies (support quick replies)
socket.on('botReply', (data) => {
  if (typeof data === 'string') {
    appendMessage('bot', data);
  } else {
    appendMessage('bot', data.message);
    if (data.quickReplies && Array.isArray(data.quickReplies)) {
      showQuickReplies(data.quickReplies);
    }
  }
});

socket.on('info', (msg) => appendMessage('system', msg));

socket.on('adminReply', ({ userId: fromId, message }) => {
  if (fromId === userId) {
    appendMessage('admin', message);
    chatTyping.innerText = '';
  }
});

// 🔴 Admin status
socket.on('adminStatus', (status) => {
  if (chatStatus) {
    chatStatus.innerText = status === 'online' ? '🟢 Admin is online' : '🔴 Admin is offline';
  }
});

// ✍️ Typing indicator
socket.on('adminTyping', () => {
  chatTyping.innerText = 'Admin is typing...';
  clearTimeout(window.typingTimeout);
  window.typingTimeout = setTimeout(() => {
    chatTyping.innerText = '';
  }, 2000);
});

// 💬 Append message with styles
function appendMessage(sender, message) {
  const bubble = document.createElement('div');
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  bubble.classList.add('chat-bubble');
  if (sender === 'user') bubble.classList.add('user');
  else if (sender === 'admin') bubble.classList.add('admin');
  else if (sender === 'system') bubble.classList.add('system');
  else bubble.classList.add('bot');

  bubble.innerHTML = `
    <div class="message-text">${message}</div>
    <div class="time">${time}</div>
  `;

  messagesBox.appendChild(bubble);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

// ➕ Show Quick Reply Buttons
function showQuickReplies(quickReplies) {
  removeQuickReplies();

  const container = document.createElement('div');
  container.classList.add('quick-replies');

  quickReplies.forEach(reply => {
    const btn = document.createElement('button');
    btn.classList.add('quick-reply-btn');

    const label = typeof reply === 'string' ? reply : reply.label;
    btn.innerText = label;

    btn.onclick = () => {
      if (typeof reply === 'object' && reply.url) {
        window.open(reply.url, '_blank');
      } else {
        socket.emit('userMessage', { userId, userName, message: label });
        appendMessage('user', label);
      }
      container.remove();
      userMessageInput.focus();
    };

    container.appendChild(btn);
  });

  messagesBox.appendChild(container);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

// 🧹 Remove quick replies
function removeQuickReplies() {
  const existing = document.querySelector('.quick-replies');
  if (existing) existing.remove();
}

// Show welcome popup after 2 seconds initially
setTimeout(showWelcomePopup, 2000);


// Book call
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('bookCallModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookCallForm = document.getElementById('bookCallForm');
  const thankYouMsg = document.getElementById('thankYouMsg');
  const serviceDropdown = document.getElementById('serviceDropdown');

  // Show modal when any "Explore now" button is clicked
  document.querySelectorAll('.cta-btn').forEach(button => {
    button.addEventListener('click', () => {
      const service = button.getAttribute('data-service');

      // Prefill dropdown with selected service
      if (service && serviceDropdown) {
        serviceDropdown.value = service;
      }

      // Reset modal view
      thankYouMsg.style.display = 'none';
      bookCallForm.style.display = 'block';
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
  });

  // Close modal on clicking the close button
  closeModalBtn?.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scroll
  });

  // Close modal when clicking outside modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // Handle form submission
  bookCallForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = bookCallForm.elements['name'].value.trim();
    const email = bookCallForm.elements['email'].value.trim();
    const contactNumber = bookCallForm.elements['contactNumber'].value.trim();
    const serviceProposal = bookCallForm.elements['serviceProposal'].value;

    try {
      const response = await fetch('/api/bookcalls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, contactNumber, serviceProposal }),
      });

      if (response.ok) {
        bookCallForm.reset();
        bookCallForm.style.display = 'none';
        thankYouMsg.style.display = 'block';
      } else {
        alert('Failed to submit your request. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  });
});






