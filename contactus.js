
document.addEventListener("DOMContentLoaded", function () {
    // Menu Toggle
    document.getElementById("menuToggle").addEventListener("click", function () {
      document.getElementById("nav-links").classList.toggle("active");
    });

    // Card Animation on Scroll
    const cards = document.querySelectorAll('.service-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, {
      threshold: 0.15 // Adjust how early animation triggers
    });

    cards.forEach((card) => {
      observer.observe(card);
    });
  });



// Handle Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const responseEl = document.getElementById("formResponse");

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
            body: JSON.stringify({ data: formData }), // <-- Strapi v4 requires "data" wrapper
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
        responseEl.textContent =
          "⚠️ Server error, please try again later.";
      }
    });
  }

  // book a meeting

document.addEventListener('DOMContentLoaded', () => {
      const openPopupBtn = document.getElementById('openPopup');
      const popupOverlay = document.getElementById('popupOverlay');
      const closeBtn = popupOverlay.querySelector('.close-btn');

      const nameInput = document.getElementById('name');
      const contactInput = document.getElementById('contact');
      const emailInput = document.getElementById('email');
      const serviceSelect = document.getElementById('serviceProposal');
      const timezoneSelect = document.getElementById('timezone');
      const submitBookingBtn = document.getElementById('submitBooking');

      const calendarDays = document.getElementById('calendarDays');
      const slotsDiv = document.getElementById('slots');
      const monthYear = document.getElementById('monthYear');
      const prevMonthBtn = document.getElementById('prevMonthBtn');
      const nextMonthBtn = document.getElementById('nextMonthBtn');

      const times = ['10:00 am','10:30 am','11:00 am','11:30 am','12:00 pm','12:30 pm','1:00 pm','1:30 pm','2:00 pm','2:30 pm'];

      let today = new Date();
      let currentMonth = today.getMonth();
      let currentYear = today.getFullYear();
      let selectedDay = null;
      let selectedTime = null;

      function renderCalendar(month, year) {
        calendarDays.innerHTML = '';
        monthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;
        const labels = ['Su','Mo','Tu','We','Th','Fr','Sa'];
        labels.forEach(l => {
          const span = document.createElement('span');
          span.textContent = l;
          calendarDays.appendChild(span);
        });
        const firstDay = new Date(year, month, 1).getDay();
        const numDays = new Date(year, month + 1, 0).getDate();
        for (let i=0;i<firstDay;i++) calendarDays.appendChild(document.createElement('div'));
        for (let d=1; d<=numDays; d++) {
          const date = new Date(year, month, d);
          const div = document.createElement('div');
          div.textContent = d;
          div.classList.add('day');
          const todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          if (date < todayNoTime) div.classList.add('disabled');
          else div.addEventListener('click', () => selectDay(div,d,month,year));
          calendarDays.appendChild(div);
        }
      }

      function selectDay(div,d,m,y){
        clearSelectedDay();
        div.classList.add('active');
        selectedDay={day:d,month:m,year:y};
        renderTimeSlots();
        updateSubmitButton();
      }
      function clearSelectedDay(){ calendarDays.querySelectorAll('.day.active').forEach(d=>d.classList.remove('active')); }
      function renderTimeSlots(){
        slotsDiv.innerHTML='';
        selectedTime=null;
        times.forEach(t=>{
          const slot=document.createElement('div');
          slot.textContent=t;
          slot.classList.add('slot');
          slot.addEventListener('click',()=>selectTime(slot,t));
          slotsDiv.appendChild(slot);
        });
      }
      function selectTime(div,t){
        clearSelectedTime();
        div.classList.add('active');
        selectedTime=t;
        updateSubmitButton();
      }
      function clearSelectedTime(){ slotsDiv.querySelectorAll('.slot.active').forEach(s=>s.classList.remove('active')); }

      function resetForm(){
        clearSelectedDay(); clearSelectedTime(); slotsDiv.innerHTML='';
        nameInput.value=''; contactInput.value=''; emailInput.value='';
        serviceSelect.value=''; timezoneSelect.value='';
        selectedDay=null; selectedTime=null;
        updateSubmitButton();
      }

      function updateSubmitButton(){
        const valid=nameInput.value.trim()!==''&&contactInput.value.trim()!==''&&emailInput.value.trim()!==''&&serviceSelect.value&&timezoneSelect.value&&selectedDay&&selectedTime;
        submitBookingBtn.disabled=!valid;
      }

      if(openPopupBtn){
        openPopupBtn.addEventListener('click', e=>{
          e.preventDefault();
          popupOverlay.style.display='flex';
          resetForm();
          renderCalendar(currentMonth,currentYear);
        });
      }
      closeBtn.addEventListener('click',()=>popupOverlay.style.display='none');
      prevMonthBtn.addEventListener('click',()=>changeMonth(-1));
      nextMonthBtn.addEventListener('click',()=>changeMonth(1));
      function changeMonth(step){
        currentMonth+=step;
        if(currentMonth>11){currentMonth=0;currentYear++;}
        else if(currentMonth<0){currentMonth=11;currentYear--;}
        renderCalendar(currentMonth,currentYear);
        slotsDiv.innerHTML='';selectedDay=null;selectedTime=null;updateSubmitButton();
      }
      [nameInput,contactInput,emailInput,serviceSelect,timezoneSelect].forEach(inp=>{
        inp.addEventListener('input',updateSubmitButton);
        inp.addEventListener('change',updateSubmitButton);
      });

      submitBookingBtn.addEventListener('click',async()=>{
        if(!selectedDay||!selectedTime){alert('Please complete all fields.');return;}
        const selectedDate=new Date(selectedDay.year,selectedDay.month,selectedDay.day).toISOString().split('T')[0];
        const bookingData={
          data:{
            name:nameInput.value.trim(),
            contact:contactInput.value.trim(),
            email:emailInput.value.trim(),
            serviceProposal:serviceSelect.value,
            timezone:timezoneSelect.value,
            date:selectedDate
          }
        };
        try{
          const res=await fetch('https://devoted-captain-c1ad6bbc4b.strapiapp.com/api/book-a-meetings',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(bookingData)
          });
          if(!res.ok) throw new Error(await res.text());
          alert('Booking successful!');
          popupOverlay.style.display='none';
          resetForm();
        }catch(err){ alert('Error: '+err.message); }
      });
    });