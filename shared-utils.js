/* Shared, side-effect-free helpers used across DEMO CRM screens. */
(function initDemoCrmUtils(global) {
  'use strict';

  function formatRemaining(days) {
    if (days < 0) return `หมดอายุแล้ว ${Math.abs(days)} วัน`;
    if (days === 0) return 'หมดอายุวันนี้';
    return `${days} วัน`;
  }

  function daysBetween(start, end) {
    if (!start || !end) return 0;
    const [startYear, startMonth, startDay] = String(start).split('-').map(Number);
    const [endYear, endMonth, endDay] = String(end).split('-').map(Number);
    return Math.round((Date.UTC(endYear, endMonth - 1, endDay) - Date.UTC(startYear, startMonth - 1, startDay)) / 86400000);
  }

  function todayISO() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
  }

  function currentMonthKey() { return todayISO().slice(0, 7); }

  function shiftMonthKey(monthKey, delta) {
    const [yearText, monthText] = String(monthKey || currentMonthKey()).split('-');
    const absoluteMonth = Number(yearText) * 12 + Number(monthText) - 1 + Number(delta || 0);
    return `${Math.floor(absoluteMonth / 12)}-${String(((absoluteMonth % 12) + 12) % 12 + 1).padStart(2, '0')}`;
  }

  function formatCalendarMonth(monthKey) {
    const [yearText, monthText] = String(monthKey || currentMonthKey()).split('-');
    return new Intl.DateTimeFormat('th-TH', { month: 'long', year: 'numeric' }).format(new Date(Number(yearText), Number(monthText) - 1, 1));
  }

  function addDaysISO(date, days) {
    const [year, month, day] = String(date).split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day + Number(days || 0))).toISOString().slice(0, 10);
  }

  function dateInRange(date, start, end) {
    return Boolean(date) && (!start || date >= start) && (!end || date <= end);
  }

  function parseDateValue(value, includeTime) {
    if (!value) return null;
    const text = String(value);
    const date = !includeTime || /^\d{4}-\d{2}-\d{2}$/.test(text)
      ? new Date(`${text.slice(0, 10)}T00:00:00`)
      : new Date(text);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function formatDateParts(date, includeTime) {
    const pad = (num) => String(num).padStart(2, '0');
    const dateText = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
    return includeTime ? `${dateText} ${pad(date.getHours())}:${pad(date.getMinutes())}` : dateText;
  }

  function formatDate(value) {
    const date = parseDateValue(value, false);
    return date ? formatDateParts(date, false) : '-';
  }

  function formatDateTime(value) {
    const date = parseDateValue(value, true);
    return date ? formatDateParts(date, true) : '-';
  }

  function normalize(value) { return String(value || '').trim().toLowerCase(); }
  function isEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim()); }
  function unique(values) { return [...new Set(values.map((value) => String(value || '').trim()).filter(Boolean))]; }

  function escapeCSSIdent(value) {
    if (global.CSS && typeof global.CSS.escape === 'function') return global.CSS.escape(value);
    return String(value).replace(/"/g, '\\"');
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[char]);
  }

  function escapeAttr(value) { return escapeHTML(value).replace(/`/g, '&#096;'); }

  function safeError(error) {
    if (!error) return 'Unknown error';
    if (typeof error === 'string') return error;
    return error.message || error.error_description || JSON.stringify(error);
  }

  global.DemoCrmUtils = Object.freeze({
    addDaysISO, currentMonthKey, dateInRange, daysBetween, escapeAttr, escapeCSSIdent,
    escapeHTML, formatCalendarMonth, formatDate, formatDateParts, formatDateTime,
    formatRemaining, isEmail, normalize, parseDateValue, safeError, shiftMonthKey,
    todayISO, unique
  });
})(window);
