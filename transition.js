(() => {
  'use strict';

  const delayMs = 10_000;
  const destination = document.getElementById('destination');
  const redirect = document.getElementById('redirect');
  const message = document.getElementById('redirect-message');
  const pauseButton = document.getElementById('pause');
  const status = document.getElementById('redirect-status');
  const seconds = document.getElementById('seconds');

  if (!destination || !redirect || !message || !pauseButton || !status || !seconds) return;

  let remainingMs = delayMs;
  let startedAt = null;
  let intervalId = null;
  let isPaused = false;

  const countdownNodes = Array.from(message.childNodes);

  function stopClock() {
    if (startedAt !== null) {
      remainingMs = Math.max(0, remainingMs - (performance.now() - startedAt));
    }
    startedAt = null;
    window.clearInterval(intervalId);
    intervalId = null;
  }

  function tick() {
    const elapsedMs = startedAt === null ? 0 : performance.now() - startedAt;
    const timeLeft = Math.max(0, remainingMs - elapsedMs);
    seconds.textContent = String(Math.ceil(timeLeft / 1000));

    if (timeLeft <= 0) {
      stopClock();
      // Replacing this entry avoids a Back-button loop through the timed page.
      window.location.replace(destination.href);
    }
  }

  function startClock() {
    if (isPaused || document.hidden || startedAt !== null) return;
    startedAt = performance.now();
    intervalId = window.setInterval(tick, 100);
    tick();
  }

  function renderPauseState() {
    if (isPaused) {
      message.textContent = 'Hänvisningen är pausad.';
      pauseButton.textContent = 'Fortsätt';
      pauseButton.setAttribute('aria-label', 'Fortsätt den automatiska hänvisningen');
    } else {
      message.replaceChildren(...countdownNodes);
      pauseButton.textContent = 'Pausa';
      pauseButton.setAttribute('aria-label', 'Pausa den automatiska hänvisningen');
    }
  }

  pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) stopClock();
    renderPauseState();
    status.textContent = isPaused
      ? 'Den automatiska hänvisningen är pausad. Du kan läsa vidare i lugn och ro.'
      : `Du skickas vidare om ${Math.ceil(remainingMs / 1000)} sekunder.`;
    if (!isPaused) startClock();
  });

  // Visitors get ten seconds on the visible page, even if they switch tabs.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopClock();
    else startClock();
  });

  window.addEventListener('pagehide', stopClock);
  window.addEventListener('pageshow', (event) => {
    // Returning from the destination through the back/forward cache should be calm.
    if (event.persisted) {
      isPaused = true;
      stopClock();
      renderPauseState();
    }
  });

  redirect.hidden = false;
  document.documentElement.dataset.ready = '';
  startClock();
})();
