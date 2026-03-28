 // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); } });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // Stagger child reveals
  document.querySelectorAll('.services-grid, .lens-grid, .why-features, .stats').forEach(grid => {
    [...grid.children].forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  async function submitAppointment() {
  const btn = event.target;
  btn.disabled = true;
  btn.textContent = 'Booking...';

  const res = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: document.querySelector('[placeholder="Kwame"]').value,
      last_name:  document.querySelector('[placeholder="Asante"]').value,
      phone:      document.querySelector('[placeholder="+233 XX XXX XXXX"]').value,
      email:      '',
      service:    document.querySelectorAll('select')[0].value,
      appt_date:  document.querySelector('input[type="date"]').value,
      appt_time:  document.querySelectorAll('select')[1].value,
    })
  });

  const data = await res.json();
  alert(data.message || data.error);
  btn.disabled = false;
  btn.textContent = 'Confirm Appointment ✓';
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(elem => {
  revealObserver.observe(elem);
});
