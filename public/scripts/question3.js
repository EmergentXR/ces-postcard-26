document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const q1 = params.get('q1');
  const q2 = params.get('q2');

  if (!q1) {
    window.location.href = 'index.html';
    return;
  }

  if (!q2) {
    const backParams = new URLSearchParams({ q1 });
    window.location.href = `question2.html?${backParams.toString()}`;
    return;
  }

  const optionButtons = document.querySelectorAll('.q3-option-btn');

  optionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const q3 = button.getAttribute('data-value');
      if (!q3) return;

      // Clear selection styles from all buttons
      optionButtons.forEach((btn) => {
        btn.classList.remove('option-selected', 'option-btn--active');

        const spans = btn.querySelectorAll('span');
        spans.forEach((s) => s.classList.remove('text-primary-800'));

        const check = btn.querySelector('.option-check');
        if (check) {
          check.classList.remove('option-check--visible');
        }
      });

      // Apply selection styles to clicked button
      button.classList.add('option-selected', 'option-btn--active');

      const spans = button.querySelectorAll('span');
      spans.forEach((s) => s.classList.add('text-primary-800'));

      const check = button.querySelector('.option-check');
      if (check) {
        check.classList.add('option-check--visible');
      }

      // Navigate to generate with all three answers, after a small pause
      const nextParams = new URLSearchParams({ q1, q2, q3 });

      setTimeout(() => {
        window.location.href = `generate.html?${nextParams.toString()}`;
      }, 180);
    });
  });
});
