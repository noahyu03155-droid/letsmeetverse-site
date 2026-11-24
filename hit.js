(() => {
  if (!['https://letsmeetverse.com', 'https://www.letsmeetverse.com'].includes(location.origin)) return;
  const options = {
    method: 'POST', credentials: 'omit', keepalive: true, redirect: 'error', referrerPolicy: 'origin',
  };
  fetch('/api/hit', options).then(response => {
    if (response.status === 404 || response.status === 405) {
      return fetch('https://play.letsmeetverse.com/api/hit', options);
    }
  }).catch(() => {});
})();
