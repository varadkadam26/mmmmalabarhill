document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('passForm');
  if (!form) return;

  function showToast(msg, type = 'info') {
    alert(msg);
  }

  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');

  const btnNext = document.getElementById('btnStepNext');
  const btnPrev = document.getElementById('btnStepPrev');

  const stepIndicator1 = document.getElementById('stepIndicator1');
  const stepIndicator2 = document.getElementById('stepIndicator2');

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      // Validate Step 1 Inputs
      const fullName = document.getElementById('full_name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const age = document.getElementById('age').value;
      const gender = document.getElementById('gender').value;
      const city = document.getElementById('city').value.trim();

      if (!fullName || !phone || !age || !gender || !city) {
        showToast('Please fill in all personal details in Step 1 before proceeding.', 'error');
        return;
      }

      if (phone.length < 10) {
        showToast('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      // Switch to Step 2
      step1.style.display = 'none';
      step2.style.display = 'block';

      if (stepIndicator1) stepIndicator1.classList.remove('active');
      if (stepIndicator2) stepIndicator2.classList.add('active');

      window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      step2.style.display = 'none';
      step1.style.display = 'block';

      if (stepIndicator2) stepIndicator2.classList.remove('active');
      if (stepIndicator1) stepIndicator1.classList.add('active');
    });
  }
});
