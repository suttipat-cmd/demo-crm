/* Loads optional heavy libraries only when the feature that needs them opens. */
(() => {
  'use strict';

  const sources = {
    'ag-grid': './vendor/ag-grid-community-36.0.0.min.js',
    xlsx: './vendor/xlsx-0.18.5.min.js'
  };
  const pending = new Map();

  function isReady(name) {
    return name === 'ag-grid'
      ? Boolean(window.agGrid && typeof window.agGrid.createGrid === 'function')
      : Boolean(window.XLSX);
  }

  function load(name) {
    if (!sources[name]) return Promise.reject(new Error(`Unknown vendor: ${name}`));
    if (isReady(name)) return Promise.resolve();
    if (pending.has(name)) return pending.get(name);

    const request = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = sources[name];
      script.async = true;
      script.onload = () => isReady(name)
        ? resolve()
        : reject(new Error(`${name} loaded without its expected global`));
      script.onerror = () => reject(new Error(`Unable to load ${name}`));
      document.head.append(script);
    }).finally(() => pending.delete(name));

    pending.set(name, request);
    return request;
  }

  window.DemoCrmVendorLoader = { load };
})();
