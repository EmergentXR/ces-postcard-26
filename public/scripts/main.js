document.addEventListener('DOMContentLoaded', function () {
  const optionButtons = document.querySelectorAll('.option-btn');

  optionButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // 1. Clear selection from all buttons
      optionButtons.forEach((btn) => {
        btn.classList.remove('option-selected', 'option-btn--active');
        const spans = btn.querySelectorAll('span');
        spans.forEach((s) => s.classList.remove('text-primary-800'));
      });

      // 2. Apply selection styles to this button
      this.classList.add('option-selected', 'option-btn--active');

      const spans = this.querySelectorAll('span');
      spans.forEach((s) => s.classList.add('text-primary-800'));

      // 3. Read Q1 value (e.g. "Innovation", "AI")
      const q1 = this.querySelector('span').textContent.trim();
      const params = new URLSearchParams({ q1 });

      // 4. Small delay so the user SEES the selection state before we navigate
      setTimeout(() => {
        window.location.href = `question2.html?${params.toString()}`;
      }, 180);
    });
  });
});
