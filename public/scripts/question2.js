document.addEventListener('DOMContentLoaded', () => {
  // 1. Read q1 (their CES favorite) from the URL
  const params = new URLSearchParams(window.location.search);
  const q1 = params.get('q1');

  if (!q1) {
    window.location.href = 'index.html';
    return;
  }

  // 2. Wire up the Q2 buttons
  const optionButtons = document.querySelectorAll('.q2-option-btn');

  optionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const q2 = button.getAttribute('data-value');
      if (!q2) return;

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

      // Small delay to let the UI state "land"
      const nextParams = new URLSearchParams({ q1, q2 });

      setTimeout(() => {
        window.location.href = `question3.html?${nextParams.toString()}`;
      }, 180);
    });
  });
});
