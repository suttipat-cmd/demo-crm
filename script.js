/* DEMO CRM v1.3.7
   Static SPA for GitHub Pages + Supabase.
   Security rule: never place service_role key, database password, or private token in this file.
*/
(() => {
  'use strict';

  const APP_VERSION = '1.3.7';
  const APP_CONFIG = {
    SUPABASE_URL: 'https://hacmassihdqlgkmwoivs.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhY21hc3NpaGRxbGdrbXdvaXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMjk1ODgsImV4cCI6MjA5NDcwNTU4OH0.TgkJCHaRndMDZY2SANXCjFLdMkHUd_bxJOb0K9Znpa8',
    APPS_SCRIPT_URL: ''
  };

  const BRAND_LOGO_DATA_URI = 'data:image/png;base64,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';

  const AUTH_TIMEOUT_MS = 12000;
  const DATA_TIMEOUT_MS = 18000;
  const FOREGROUND_REFRESH_COOLDOWN_MS = 30000;

  const STATUS = Object.freeze({
    PENDING: 'รอดำเนินการ',
    ACTIVE: 'เปิดใช้งาน',
    EXPIRED: 'หมดอายุ',
    CLOSED: 'ปิดรายการ',
    CUSTOMER: 'เป็นลูกค้าแล้ว'
  });

  const FINAL_STATUSES = new Set([STATUS.CLOSED, STATUS.CUSTOMER]);
  const DEFAULT_LOG_TYPE = 'หมายเหตุทั่วไป';
  const DEMO_DRAFT_PREFIX = 'demo-crm:v1.1.0:demo-draft:';
  const BRAND_LOGO_CACHE_KEY = 'demo-crm:brand-logo-data-uri';
  const PROFILE_AVATAR_MAX_BYTES = 300 * 1024;
  const DASHBOARD_TABLE_PAGE_SIZE = 10;
  const DEMO_LIST_PAGE_SIZE = 20;
  const REPORT_PAGE_SIZE = 20;

  const State = {
    sb: null,
    session: null,
    profile: null,
    currentRoute: '#dashboard',
    authReady: false,
    bootError: '',
    dataError: '',
    loading: false,
    loadingMessage: '',
    dataLoaded: false,
    loadSeq: 0,
    lastForegroundRefreshAt: 0,
    sidebarCollapsed: localStorage.getItem('demo-crm:sidebar-collapsed') === 'true',
    notificationsOpen: false,
    notificationFilter: 'all',
    notificationStates: [],
    profiles: [],
    responsiblePeople: [],
    companies: [],
    rounds: [],
    accounts: [],
    modules: [],
    roundModules: [],
    activityLogs: [],
    emailLogs: [],
    emailTemplates: [],
    settings: {},
    filters: {
      search: '',
      status: '',
      responsible: '',
      module: '',
      sort: 'updated_desc',
      nearOnly: false
    },
    dashboardRange: defaultMonthRange(),
    dashboardPages: {
      near7: 1,
      expired: 1,
      latest: 1,
      customers: 1
    },
    demoPage: 1,
    reportPage: 1,
    reportSearch: '',
    adminTab: 'users',
    searchRenderTimer: null,
    reportRenderTimer: null
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  document.addEventListener('DOMContentLoaded', boot);
  window.addEventListener('hashchange', () => {
    State.currentRoute = location.hash || '#dashboard';
    State.notificationsOpen = false;
    render();
  });

  function boot() {
    setupGlobalEvents();
    setupLifecycleRefresh();
    State.currentRoute = location.hash || '#dashboard';

    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      State.authReady = true;
      State.bootError = 'โหลด Supabase client ไม่สำเร็จ กรุณาตรวจสอบ internet/CDN หรือเปิดใหม่อีกครั้ง';
      render();
      return;
    }

    if (needsConfig()) {
      State.authReady = true;
      render();
      return;
    }

    State.sb = window.supabase.createClient(APP_CONFIG.SUPABASE_URL, APP_CONFIG.SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });

    State.sb.auth.onAuthStateChange((_event, session) => {
      hydrateSession(session, `auth:${_event}`).catch((error) => {
        State.dataError = `โหลด session ไม่สำเร็จ: ${safeError(error)}`;
        State.loading = false;
        render();
      });
    });

    initSession();
    render();
  }

  async function initSession() {
    try {
      State.loading = true;
      State.loadingMessage = 'กำลังตรวจสอบ session...';
      render();

      const { data, error } = await withTimeout(
        State.sb.auth.getSession(),
        AUTH_TIMEOUT_MS,
        'ตรวจสอบ session นานเกินไป'
      );
      if (error) throw error;
      await hydrateSession(data.session, 'initial');
    } catch (error) {
      State.authReady = true;
      State.session = null;
      State.profile = null;
      State.dataLoaded = false;
      State.loading = false;
      State.bootError = `เริ่มระบบไม่สำเร็จ: ${safeError(error)}`;
      render();
    }
  }

  async function hydrateSession(session, reason = 'unknown') {
    const seq = ++State.loadSeq;
    State.session = session || null;
    State.authReady = true;
    State.bootError = '';
    State.dataError = '';
    State.currentRoute = location.hash || '#dashboard';

    if (!State.session) {
      State.profile = null;
      State.dataLoaded = false;
      State.loading = false;
      State.loadingMessage = '';
      render();
      return;
    }

    State.loading = true;
    State.loadingMessage = reason === 'initial' ? 'กำลังโหลดข้อมูลผู้ใช้...' : 'กำลังรีเฟรชข้อมูล...';
    render();

    try {
      await loadProfile(seq);
      if (seq !== State.loadSeq) return;

      State.loadingMessage = 'กำลังโหลดข้อมูลระบบ...';
      render();

      await loadAllData(false, seq);
      if (seq !== State.loadSeq) return;
    } catch (error) {
      if (seq !== State.loadSeq) return;
      State.dataError = safeError(error);
      State.dataLoaded = false;
    } finally {
      if (seq === State.loadSeq) {
        State.loading = false;
        State.loadingMessage = '';
        render();
      }
    }
  }

  function setupLifecycleRefresh() {
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        refreshAfterForeground('pageshow');
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        refreshAfterForeground('visibilitychange');
      }
    });

    window.addEventListener('online', () => {
      refreshAfterForeground('online');
    });
  }

  async function refreshAfterForeground(reason) {
    if (!State.authReady || !State.sb || needsConfig()) return;
    if (document.visibilityState && document.visibilityState !== 'visible') return;

    const now = Date.now();
    if (now - State.lastForegroundRefreshAt < FOREGROUND_REFRESH_COOLDOWN_MS) return;
    State.lastForegroundRefreshAt = now;

    try {
      const { data, error } = await withTimeout(
        State.sb.auth.getSession(),
        AUTH_TIMEOUT_MS,
        'รีเฟรช session นานเกินไป'
      );
      if (error) throw error;

      if (!data.session) {
        await hydrateSession(null, reason);
        return;
      }

      if (!State.session || !State.dataLoaded || State.dataError) {
        await hydrateSession(data.session, reason);
        return;
      }

      State.session = data.session;
      await loadAllData(false);
      render();
    } catch (error) {
      State.dataError = `รีเฟรชข้อมูลหลังกลับมาที่แท็บไม่สำเร็จ: ${safeError(error)}`;
      State.loading = false;
      render();
    }
  }

  async function refreshCurrentSession(showToast = false) {
    if (!State.sb || needsConfig()) {
      render();
      return;
    }

    State.loading = true;
    State.loadingMessage = 'กำลังรีเฟรชข้อมูล...';
    render();

    try {
      const { data, error } = await withTimeout(
        State.sb.auth.getSession(),
        AUTH_TIMEOUT_MS,
        'รีเฟรช session นานเกินไป'
      );
      if (error) throw error;

      await hydrateSession(data.session, showToast ? 'manual-reload' : 'refresh');
      if (showToast && data.session && !State.dataError) toast('โหลดข้อมูลล่าสุดแล้ว', 'success');
    } catch (error) {
      State.dataError = `รีเฟรชข้อมูลไม่สำเร็จ: ${safeError(error)}`;
      State.loading = false;
      render();
    }
  }

  function setupGlobalEvents() {
    document.addEventListener('submit', handleSubmit);
    document.addEventListener('click', handleClick);
    document.addEventListener('change', handleChange);
    document.addEventListener('input', handleInput);
    document.addEventListener('keydown', handleKeyDown);
  }

  async function handleSubmit(event) {
    const form = event.target;
    if (!form.matches('form[data-action]')) return;
    event.preventDefault();

    const action = form.dataset.action;
    const submitter = event.submitter || form.querySelector('[type="submit"]');

    try {
      await withButtonLoading(submitter, async () => {
        switch (action) {
          case 'login':
            await login(form);
            break;
          case 'demo-save':
            await saveDemoForm(form);
            break;
          case 'activity-add':
            await addActivityLog(form);
            break;
          case 'admin-responsible-save':
            await saveResponsiblePerson(form);
            break;
          case 'admin-module-save':
            await saveModule(form);
            break;
          case 'admin-template-save':
            await saveEmailTemplate(form);
            break;
          case 'admin-setting-save':
            await saveSettings(form);
            break;
          case 'admin-brand-save':
            await saveBrandSettings(form);
            break;
          case 'admin-profile-save':
            await saveProfileAdmin(form);
            break;
          default:
            toast('ไม่รู้จักการทำงานนี้', 'error');
        }
      });
    } catch (error) {
      toast(safeError(error), 'error');
      console.error(error);
    }
  }

  async function handleClick(event) {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;
    if (target.tagName !== 'FORM') event.preventDefault();

    switch (action) {
      case 'logout':
        await State.sb.auth.signOut();
        break;
      case 'reload':
        await withButtonLoading(target, async () => {
          await refreshCurrentSession(true);
        });
        break;
      case 'retry-boot':
        State.bootError = '';
        initSession();
        render();
        break;
      case 'sidebar-toggle':
        State.sidebarCollapsed = !State.sidebarCollapsed;
        localStorage.setItem('demo-crm:sidebar-collapsed', String(State.sidebarCollapsed));
        render();
        break;
      case 'notification-toggle':
        State.notificationsOpen = !State.notificationsOpen;
        if (State.notificationsOpen) {
          await markCurrentNotificationsRead();
        }
        render();
        break;
      case 'notification-close':
        State.notificationsOpen = false;
        render();
        break;
      case 'notification-tab':
        State.notificationFilter = target.dataset.kind || 'all';
        render();
        break;
      case 'notification-dismiss':
        await withButtonLoading(target, async () => {
          await dismissNotification(target.dataset.key || '');
        });
        break;
      case 'notification-clear-all':
        await withButtonLoading(target, async () => {
          await dismissVisibleNotifications(target.dataset.kind || 'all');
        });
        break;
      case 'notification-filter':
        applyNotificationFilter(target.dataset.kind || 'all');
        break;
      case 'brand-logo-reset':
        await withButtonLoading(target, async () => {
          await resetBrandLogo();
        });
        break;
      case 'profile-avatar-clear':
        clearProfileAvatar(target);
        break;
      case 'modal-close':
        closeModal();
        break;
      case 'account-add':
        addAccountRow();
        saveDemoDraftFromElement(target);
        break;
      case 'account-remove':
        target.closest('[data-account-row]')?.remove();
        saveDemoDraftFromElement(target);
        break;
      case 'password-toggle':
        togglePassword(target);
        break;
      case 'login-password-toggle':
        toggleLoginPassword(target);
        break;
      case 'copy':
        await copyText(target.dataset.copy || '');
        break;
      case 'demo-close':
        await withButtonLoading(target, async () => {
          await closeDemoRound(target.dataset.id);
        });
        break;
      case 'demo-delete':
        await withButtonLoading(target, async () => {
          await softDeleteDemo(target.dataset.id);
        });
        break;
      case 'email-preview':
        openEmailPreview(target.dataset.id, target.dataset.type || 'first_demo_email');
        break;
      case 'email-send':
        await withButtonLoading(target, async () => {
          await sendPreviewEmail(target.dataset.id, target.dataset.type || 'first_demo_email');
        });
        break;
      case 'log-edit':
        await withButtonLoading(target, async () => {
          await editLog(target.dataset.id);
        });
        break;
      case 'log-delete':
        await withButtonLoading(target, async () => {
          await deleteLog(target.dataset.id);
        });
        break;
      case 'report-export':
        exportDemoRows();
        break;
      case 'company-report-export':
        exportCompanyReportRows();
        break;
      case 'export-current':
      case 'export-all':
        exportDemoRows();
        break;
      case 'admin-tab':
        State.adminTab = target.dataset.tab || 'users';
        render();
        break;
      case 'admin-responsible-toggle':
        await withButtonLoading(target, async () => {
          await toggleResponsiblePerson(target.dataset.id, target.dataset.active === 'true');
        });
        break;
      case 'admin-responsible-delete':
        await withButtonLoading(target, async () => {
          await deleteResponsiblePerson(target.dataset.id);
        });
        break;
      case 'admin-module-toggle':
        await withButtonLoading(target, async () => {
          await toggleModule(target.dataset.id, target.dataset.active === 'true');
        });
        break;
      case 'admin-module-delete':
        await withButtonLoading(target, async () => {
          await deleteModule(target.dataset.id);
        });
        break;
      case 'admin-template-reset':
        await withButtonLoading(target, async () => {
          await resetTemplate(target.dataset.key);
        });
        break;
      case 'run-reminder-check':
        await withButtonLoading(target, async () => {
          await queueReminderEmails();
        });
        break;
      case 'draft-clear':
        clearDemoDraft(target.dataset.draftKey || '');
        render();
        toast('ล้างข้อมูลร่างแล้ว', 'success');
        break;
      case 'page-change':
        changePage(target);
        break;
      case 'print':
        window.print();
        break;
      case 'chip-remove':
        removeChip(target);
        saveDemoDraftFromElement(target);
        break;
      default:
        break;
    }
  }

  async function handleChange(event) {
    const target = event.target;

    if (target.matches('[data-logo-input]')) {
      await previewLogoUpload(target);
      return;
    }

    if (target.matches('[data-avatar-input]')) {
      await previewProfileAvatarUpload(target);
      return;
    }

    if (target.matches('[data-filter]')) {
      const key = target.dataset.filter;
      if (key === 'nearOnly') {
        State.filters[key] = target.checked;
      } else {
        State.filters[key] = target.value;
      }
      State.demoPage = 1;
      render();
      return;
    }

    if (target.matches('[data-dashboard-range]')) {
      State.dashboardRange[target.dataset.dashboardRange] = target.value;
      resetDashboardPages();
      render();
      return;
    }

    if (target.matches('[data-final-status-date]')) {
      const form = target.closest('form');
      if (form && FINAL_STATUSES.has(target.value)) {
        const endDate = form.querySelector('[name="end_date"]');
        if (endDate) endDate.value = todayISO();
      }
    }

    saveDemoDraftFromElement(target);
  }

  function handleInput(event) {
    const target = event.target;
    if (target.matches('[data-filter="search"]')) {
      State.filters.search = target.value;
      State.demoPage = 1;
      scheduleFocusedSearchRender('demo');
      return;
    }

    if (target.matches('[data-report-search]')) {
      State.reportSearch = target.value;
      State.reportPage = 1;
      scheduleFocusedSearchRender('report');
      return;
    }

    saveDemoDraftFromElement(target);
  }

  function scheduleFocusedSearchRender(type) {
    const isReport = type === 'report';
    const selector = isReport ? '[data-report-search]' : '[data-filter="search"]';
    const timerKey = isReport ? 'reportRenderTimer' : 'searchRenderTimer';
    const active = document.activeElement;
    const selectionStart = active && typeof active.selectionStart === 'number' ? active.selectionStart : null;
    const selectionEnd = active && typeof active.selectionEnd === 'number' ? active.selectionEnd : selectionStart;

    window.clearTimeout(State[timerKey]);
    State[timerKey] = window.setTimeout(() => {
      render();
      const input = $(selector);
      if (!input) return;
      input.focus({ preventScroll: true });
      if (selectionStart !== null) {
        const max = String(input.value || '').length;
        const start = Math.min(selectionStart, max);
        const end = Math.min(selectionEnd ?? start, max);
        try {
          input.setSelectionRange(start, end);
        } catch {
          // ignore unsupported input types
        }
      }
    }, 180);
  }

  function handleKeyDown(event) {
    const input = event.target.closest('[data-chip-input]');
    if (!input) return;

    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addChipFromInput(input);
      saveDemoDraftFromElement(input);
    }

    if (event.key === 'Backspace' && !input.value.trim()) {
      const wrapper = input.closest('[data-chip-name]');
      const chips = $$('.chip', wrapper);
      chips[chips.length - 1]?.querySelector('[data-action="chip-remove"]')?.click();
      saveDemoDraftFromElement(input);
    }
  }

  async function withButtonLoading(button, fn) {
    if (!button) return fn();
    if (button.disabled) return undefined;

    const original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = 'กำลังดำเนินการ...';
    try {
      return await fn();
    } finally {
      button.disabled = false;
      button.innerHTML = original;
    }
  }

  function needsConfig() {
    return APP_CONFIG.SUPABASE_URL.includes('YOUR_PROJECT_ID') || APP_CONFIG.SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON');
  }

  async function login(form) {
    if (needsConfig()) {
      toast('กรุณาตั้งค่า SUPABASE_URL และ SUPABASE_ANON_KEY ใน script.js ก่อน', 'error');
      return;
    }

    const email = form.email.value.trim();
    const password = form.password.value;
    if (!email || !password) {
      toast('กรุณากรอก email และ password', 'warning');
      return;
    }

    const { error } = await State.sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    location.hash = '#dashboard';
  }

  async function loadProfile(seq = State.loadSeq) {
    if (!State.session?.user) {
      State.profile = null;
      return;
    }

    const user = State.session.user;
    const { data, error } = await withTimeout(
      State.sb
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle(),
      DATA_TIMEOUT_MS,
      'โหลด profile นานเกินไป'
    );

    if (seq !== State.loadSeq) return;
    if (error) throw error;

    if (!data) {
      const fallback = {
        id: user.id,
        email: user.email || '',
        full_name: user.email || 'ผู้ใช้',
        role: 'user',
        is_active: true
      };
      const { error: insertError } = await withTimeout(
        State.sb.from('profiles').insert(fallback),
        DATA_TIMEOUT_MS,
        'สร้าง profile เริ่มต้นนานเกินไป'
      );
      if (insertError) throw insertError;
      State.profile = fallback;
    } else {
      State.profile = data;
    }

    if (!State.profile.is_active) {
      toast('บัญชีนี้ถูกปิดใช้งาน กรุณาติดต่อผู้ดูแลระบบ', 'error');
      await State.sb.auth.signOut();
      throw new Error('บัญชีนี้ถูกปิดใช้งาน กรุณาติดต่อผู้ดูแลระบบ');
    }
  }

  async function loadAllData(showToast = false, seq = State.loadSeq) {
    if (!State.session) return;

    const hadData = State.dataLoaded;
    State.loading = true;
    State.loadingMessage = State.loadingMessage || 'กำลังโหลดข้อมูลระบบ...';
    State.dataError = '';
    if (showToast) render();

    try {
      await withTimeout(
        State.sb.rpc('sync_demo_statuses'),
        6000,
        'อัปเดตสถานะนานเกินไป'
      ).catch((error) => {
        console.warn('sync_demo_statuses skipped:', safeError(error));
      });

      if (seq !== State.loadSeq) return;

      const responses = await withTimeout(
        Promise.all([
          State.sb.from('profiles').select('*').order('full_name'),
          State.sb.from('responsible_people').select('*').order('name'),
          State.sb.from('companies').select('*').is('deleted_at', null).order('updated_at', { ascending: false }),
          State.sb.from('demo_rounds').select('*').is('deleted_at', null).order('updated_at', { ascending: false }),
          State.sb.from('demo_accounts').select('*').order('created_at', { ascending: true }),
          State.sb.from('modules').select('*').order('sort_order', { ascending: true }).order('name'),
          State.sb.from('demo_round_modules').select('*'),
          State.sb.from('activity_logs').select('*').is('deleted_at', null).order('created_at', { ascending: false }),
          State.sb.from('email_logs').select('*').order('created_at', { ascending: false }).limit(250),
          State.sb.from('email_templates').select('*').eq('is_active', true).order('template_key'),
          State.sb.from('settings').select('*'),
          State.sb.from('notification_states').select('*').eq('user_id', State.session.user.id)
        ]),
        DATA_TIMEOUT_MS,
        'โหลดข้อมูลหลักนานเกินไป กรุณากดรีเฟรช'
      );

      if (seq !== State.loadSeq) return;

      const [
        profiles,
        responsiblePeople,
        companies,
        rounds,
        accounts,
        modules,
        roundModules,
        activityLogs,
        emailLogs,
        emailTemplates,
        settings,
        notificationStates
      ] = responses;

      const firstError = responses.find((res) => res.error)?.error;
      if (firstError) throw firstError;

      State.profiles = profiles.data || [];
      State.responsiblePeople = responsiblePeople.data || [];
      State.companies = companies.data || [];
      State.rounds = rounds.data || [];
      State.accounts = accounts.data || [];
      State.modules = modules.data || [];
      State.roundModules = roundModules.data || [];
      State.activityLogs = activityLogs.data || [];
      State.emailLogs = emailLogs.data || [];
      State.emailTemplates = emailTemplates.data || [];
      State.settings = Object.fromEntries((settings.data || []).map((row) => [row.key, row.value]));
      State.notificationStates = notificationStates.data || [];
      cacheBrandLogo(State.settings.brand_logo_data_uri);

      State.dataLoaded = true;
      State.dataError = '';
      if (showToast) toast('โหลดข้อมูลล่าสุดแล้ว', 'success');
    } catch (error) {
      if (seq !== State.loadSeq) return;
      State.dataLoaded = hadData;
      State.dataError = safeError(error);
      toast(`โหลดข้อมูลไม่สำเร็จ: ${State.dataError}`, 'error');
    } finally {
      if (seq === State.loadSeq) {
        State.loading = false;
        State.loadingMessage = '';
      }
    }
  }

  function render() {
    syncBrandAssets();
    const app = $('#app');
    if (!app) return;

    if (!State.authReady) {
      app.className = 'app-loading';
      app.innerHTML = renderBootLoading(State.loadingMessage || 'กำลังเริ่มระบบ...');
      return;
    }

    if (!State.session) {
      app.className = '';
      app.innerHTML = renderLogin();
      return;
    }

    const route = State.currentRoute || '#dashboard';
    app.className = '';
    app.innerHTML = renderShell(route);
  }

  function renderBootLoading(message) {
    return `
      <div class="loading-card">
        <div class="spinner" aria-hidden="true"></div>
        <p>${escapeHTML(message)}</p>
      </div>
    `;
  }

  function renderFatal(message) {
    const app = $('#app');
    app.className = 'app-loading';
    app.innerHTML = `
      <div class="loading-card">
        <h1>เปิดระบบไม่ได้</h1>
        <p>${escapeHTML(message)}</p>
      </div>
    `;
  }

  function renderLogin() {
    const logoSrc = getBrandLogoDataUri();

    return `
      <main class="auth-page auth-split-page">
        <section class="auth-hero" aria-label="ข้อมูลระบบ DEMO CRM">
          <div class="auth-hero-overlay"></div>
          <div class="auth-hero-content">
            <div class="auth-hero-kicker">CUSTOMER SUPPORT WORKSPACE</div>
            <h1>จัดการ DEMO<br><span>ครบในที่เดียว</span></h1>
            <p>
              DEMO CRM ช่วยทีม CS ติดตามบริษัทที่ขอทดลองใช้งาน ต่ออายุเดโม
              บันทึกความคืบหน้า และจัดการอีเมลได้เป็นระบบ
            </p>
            <div class="auth-hero-points">
              <span>Demo Timeline</span>
              <span>Reminder</span>
              <span>Report</span>
            </div>
          </div>
          <div class="auth-hero-footer">
            <span>DEMO CRM</span>
            <span>Powered by Supabase + GitHub Pages</span>
          </div>
        </section>

        <section class="auth-panel">
          <div class="auth-card login-card">
            <div class="login-card-hero">
              <img class="login-logo" src="${logoSrc}" alt="DEMO CRM">
              <div>
                <strong>DEMO CRM</strong>
                <span>Demo Access Management</span>
              </div>
            </div>
            <div class="login-lock" aria-hidden="true">🔒</div>
            <div class="login-title">
              <h1>เข้าสู่ระบบ DEMO CRM</h1>
              <p>ระบบจัดการเดโมสำหรับทีม Customer Support</p>
            </div>

            ${needsConfig() ? `
              <div class="config-warning">
                ยังไม่ได้ตั้งค่า Supabase ใน <strong>script.js</strong>
              </div>
            ` : ''}
            ${State.bootError ? `
              <div class="config-warning">
                ${escapeHTML(State.bootError)}
                <div style="margin-top:10px">
                  <button class="btn small ghost" type="button" data-action="retry-boot">ลองใหม่</button>
                </div>
              </div>
            ` : ''}

            <form data-action="login" class="login-form">
              <div class="field login-field">
                <label for="login-email">อีเมล <span class="required">*</span></label>
                <div class="input-with-icon">
                  <span aria-hidden="true">✉</span>
                  <input id="login-email" class="input" type="email" name="email" autocomplete="email" placeholder="ระบุอีเมล" required>
                </div>
              </div>
              <div class="field login-field">
                <label for="login-password">รหัสผ่าน <span class="required">*</span></label>
                <div class="input-with-icon">
                  <span aria-hidden="true">🔒</span>
                  <input id="login-password" class="input" type="password" name="password" autocomplete="current-password" placeholder="ระบุรหัสผ่าน" required>
                  <button class="input-icon-button" type="button" data-action="login-password-toggle" aria-label="แสดงหรือซ่อนรหัสผ่าน">👁</button>
                </div>
              </div>
              <button class="btn primary login-submit" type="submit">เข้าสู่ระบบ</button>
            </form>
            <p class="login-note">ไม่มีระบบสมัครสมาชิก ผู้ใช้ต้องถูกสร้างโดยผู้ดูแลระบบเท่านั้น</p>
          </div>
        </section>
      </main>
    `;
  }

  function renderShell(route) {
    const profileName = displayName(State.profile);
    const isAdmin = userIsAdmin();
    const notifications = buildNotifications();
    const unreadNotificationCount = countUnreadNotifications(notifications);
    const logoSrc = getBrandLogoDataUri();

    return `
      <div class="app-layout">
        <header class="app-header">
          <div class="header-brand">
            <img class="brand-logo" src="${logoSrc}" alt="DEMO CRM">
            <div class="brand-stack">
              <strong>DEMO CRM</strong>
              <span>Customer Support Workspace</span>
            </div>
          </div>
          <nav class="top-nav" aria-label="เมนูหลัก">
            ${navLink('#dashboard', 'แดชบอร์ด', route)}
            ${navLink('#demos', 'รายการเดโม', route)}
            ${navLink('#demos/new', 'สร้างเดโม', route)}
            ${navLink('#reports', 'รายงาน', route)}
            ${isAdmin ? navLink('#admin', 'ตั้งค่าระบบ', route) : ''}
          </nav>
          <div class="header-tools">
            <div class="notification-wrap">
              <button class="icon-button notification-button ${State.notificationsOpen ? 'active' : ''}" type="button" data-action="notification-toggle" title="แจ้งเตือน" aria-label="แจ้งเตือน">
                <span aria-hidden="true">🔔</span>
                ${unreadNotificationCount ? `<span class="notification-badge">${unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}</span>` : ''}
              </button>
              ${State.notificationsOpen ? renderNotificationPanel(notifications) : ''}
            </div>
            <div class="profile-chip" title="${escapeAttr(State.profile?.email || '')}">
              ${renderProfileAvatar(State.profile, 'profile-avatar')}
              <span class="profile-text">
                <strong>${escapeHTML(profileName)}</strong>
                <small>${escapeHTML(roleLabel(State.profile?.role || ''))}</small>
              </span>
            </div>
            <button class="icon-button logout-button" type="button" data-action="logout" title="ออกจากระบบ" aria-label="ออกจากระบบ">↪</button>
          </div>
        </header>
        <main class="main app-main">
          ${renderLoadNotice()}
          ${renderRoute(route)}
        </main>
      </div>
    `;
  }

  function navLink(hash, label, route) {
    const active = route === hash || (hash === '#demos' && route.startsWith('#demos/') && route !== '#demos/new');
    const icons = {
      '#dashboard': '▦',
      '#demos': '▤',
      '#demos/new': '+',
      '#reports': '▧',
      '#admin': '⚙'
    };
    return `<a href="${hash}" class="top-nav-link ${active ? 'active' : ''}" title="${escapeAttr(label)}"><span>${escapeHTML(icons[hash] || '')}</span>${escapeHTML(label)}</a>`;
  }


  function getProfileAvatarDataUri(profile) {
    const value = profile?.avatar_data_uri || '';
    return isValidLogoDataUri(value) ? value : '';
  }

  function renderProfileAvatar(profile, className = 'profile-avatar') {
    const avatar = getProfileAvatarDataUri(profile);
    const name = displayName(profile);
    if (avatar) {
      return `<img class="${escapeAttr(className)} has-image" src="${escapeAttr(avatar)}" alt="${escapeAttr(name)}">`;
    }
    return `<span class="${escapeAttr(className)}">${escapeHTML(initials(name))}</span>`;
  }

  async function previewProfileAvatarUpload(input) {
    const file = input.files?.[0];
    if (!file) return;

    const allowed = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowed.includes(file.type)) {
      input.value = '';
      toast('รองรับเฉพาะ PNG, JPG หรือ WebP', 'warning');
      return;
    }

    if (file.size > PROFILE_AVATAR_MAX_BYTES) {
      input.value = '';
      toast('รูปโปรไฟล์ต้องไม่เกิน 300KB', 'warning');
      return;
    }

    const dataUri = await readFileAsDataURL(file);
    const formId = input.getAttribute('form');
    const form = formId ? document.getElementById(formId) : input.closest('form');
    const hidden = form?.querySelector('[name="avatar_data_uri"]');
    const cell = input.closest('.avatar-admin-cell');
    const preview = cell?.querySelector('.admin-avatar-preview');
    const fileName = cell?.querySelector('[data-avatar-file-name]');

    if (hidden) hidden.value = dataUri;
    if (preview) {
      if (preview.tagName === 'IMG') {
        preview.src = dataUri;
      } else {
        const img = document.createElement('img');
        img.className = preview.className + ' has-image';
        img.alt = 'รูปโปรไฟล์';
        img.src = dataUri;
        preview.replaceWith(img);
      }
    }
    if (fileName) fileName.textContent = `${file.name} · ${(file.size / 1024).toFixed(1)} KB`;
  }

  function clearProfileAvatar(button) {
    const formId = button.dataset.formId;
    const form = formId ? document.getElementById(formId) : button.closest('form');
    const hidden = form?.querySelector('[name="avatar_data_uri"]');
    const cell = button.closest('.avatar-admin-cell');
    const preview = cell?.querySelector('.admin-avatar-preview');
    const fileInput = cell?.querySelector('[data-avatar-input]');
    const fileName = cell?.querySelector('[data-avatar-file-name]');
    const profileId = form?.querySelector('[name="id"]')?.value;
    const profile = State.profiles.find((item) => item.id === profileId);

    if (hidden) hidden.value = '';
    if (fileInput) fileInput.value = '';
    if (preview) {
      const span = document.createElement('span');
      span.className = 'profile-avatar admin-avatar-preview';
      span.textContent = initials(displayName(profile));
      preview.replaceWith(span);
    }
    if (fileName) fileName.textContent = 'ล้างรูปแล้ว กดบันทึกเพื่อยืนยัน';
  }

  
  function getCachedBrandLogo() {
    try {
      const value = localStorage.getItem(BRAND_LOGO_CACHE_KEY);
      return isValidLogoDataUri(value) ? value : '';
    } catch {
      return '';
    }
  }

  function cacheBrandLogo(value) {
    try {
      if (isValidLogoDataUri(value)) {
        localStorage.setItem(BRAND_LOGO_CACHE_KEY, value);
      } else {
        localStorage.removeItem(BRAND_LOGO_CACHE_KEY);
      }
    } catch {
      // localStorage may be unavailable in some privacy modes.
    }
  }

  function getCustomBrandLogo() {
    const value = State.settings?.brand_logo_data_uri;
    if (isValidLogoDataUri(value)) return value;
    return getCachedBrandLogo();
  }

  function getBrandLogoDataUri() {
    return getCustomBrandLogo() || BRAND_LOGO_DATA_URI;
  }

  function syncBrandAssets() {
    const logo = getBrandLogoDataUri();

    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    if (link.href !== logo) {
      link.href = logo;
      link.type = logo.startsWith('data:image/svg') ? 'image/svg+xml' : 'image/png';
    }

    let apple = document.querySelector('link[rel="apple-touch-icon"]');
    if (!apple) {
      apple = document.createElement('link');
      apple.rel = 'apple-touch-icon';
      document.head.appendChild(apple);
    }
    if (apple.href !== logo) apple.href = logo;
  }

  function isValidLogoDataUri(value) {
    return typeof value === 'string' && /^data:image\/(png|jpe?g|webp);base64,/i.test(value);
  }

  function buildNotifications({ includeDismissed = false } = {}) {
    if (!State.dataLoaded) return [];

    const rows = getDemoRows();
    const allRows = getAllDemoRows();
    const rowByRound = new Map(allRows.map((row) => [row.round.id, row]));
    const stateMap = getNotificationStateMap();
    const notifications = [];

    const attachState = (item) => {
      const saved = stateMap.get(item.id) || {};
      return {
        ...item,
        readAt: saved.read_at || null,
        dismissedAt: saved.dismissed_at || null,
        isRead: Boolean(saved.read_at),
        isDismissed: Boolean(saved.dismissed_at)
      };
    };

    for (const row of rows) {
      if (!FINAL_STATUSES.has(row.effectiveStatus) && row.remainingDays >= 0 && row.remainingDays <= 7) {
        notifications.push({
          id: `near-${row.round.id}`,
          kind: 'near',
          icon: '⏳',
          title: `${row.company.company_name} ใกล้หมดอายุ`,
          detail: `เหลือ ${formatRemaining(row.remainingDays)} · สิ้นสุด ${formatDate(row.round.end_date)}`,
          date: row.round.end_date,
          href: `#demos/${row.round.id}`,
          severity: 2
        });
      }

      if (row.effectiveStatus === STATUS.EXPIRED) {
        notifications.push({
          id: `expired-${row.round.id}`,
          kind: 'expired',
          icon: '⚠',
          title: `${row.company.company_name} หมดอายุแล้ว`,
          detail: `${formatRemaining(row.remainingDays)} · ยังไม่ปิดรายการ`,
          date: row.round.end_date,
          href: `#demos/${row.round.id}`,
          severity: 1
        });
      }
    }

    for (const email of State.emailLogs || []) {
      if (!['error', 'queued'].includes(email.sent_status)) continue;
      const row = rowByRound.get(email.demo_round_id);
      const isError = email.sent_status === 'error';
      notifications.push({
        id: `email-${email.id}`,
        kind: 'email',
        icon: isError ? '✕' : '✉',
        title: isError ? 'อีเมลส่งไม่สำเร็จ' : 'อีเมลรอส่ง',
        detail: `${row?.company?.company_name || 'ไม่พบรายการเดโม'} · ${email.subject || '-'}`,
        date: email.sent_at || email.created_at || '',
        href: row ? `#demos/${row.round.id}` : '#demos',
        severity: isError ? 0 : 3
      });
    }

    return notifications
      .map(attachState)
      .filter((item) => includeDismissed || !item.isDismissed)
      .sort((a, b) => {
        if (a.severity !== b.severity) return a.severity - b.severity;
        return new Date(a.date || 0) - new Date(b.date || 0);
      })
      .slice(0, 99);
  }

  function getNotificationStateMap() {
    return new Map((State.notificationStates || []).map((row) => [row.notification_key, row]));
  }

  function countUnreadNotifications(notifications = buildNotifications()) {
    return notifications.filter((item) => !item.isRead && !item.isDismissed).length;
  }

  function getVisibleNotificationsByKind(kind = 'all') {
    const notifications = buildNotifications();
    return kind === 'all' ? notifications : notifications.filter((item) => item.kind === kind);
  }

  async function markCurrentNotificationsRead() {
    const unread = buildNotifications().filter((item) => !item.isRead && !item.isDismissed);
    if (!unread.length) return;
    await saveNotificationStates(unread.map((item) => ({
      notification_key: item.id,
      read_at: new Date().toISOString(),
      dismissed_at: null
    })));
  }

  async function dismissNotification(key) {
    if (!key) return;
    const stateMap = getNotificationStateMap();
    const saved = stateMap.get(key) || {};
    const now = new Date().toISOString();

    await saveNotificationStates([{
      notification_key: key,
      read_at: saved.read_at || now,
      dismissed_at: now
    }]);

    render();
  }

  async function dismissVisibleNotifications(kind = 'all') {
    const items = getVisibleNotificationsByKind(kind);
    if (!items.length) return;

    const now = new Date().toISOString();
    await saveNotificationStates(items.map((item) => ({
      notification_key: item.id,
      read_at: item.readAt || now,
      dismissed_at: now
    })));

    toast('ล้างแจ้งเตือนแล้ว', 'success');
    render();
  }

  async function saveNotificationStates(rows) {
    if (!State.session?.user || !rows.length) return;

    const userId = State.session.user.id;
    const now = new Date().toISOString();
    const payload = rows.map((row) => ({
      user_id: userId,
      notification_key: row.notification_key,
      read_at: row.read_at || null,
      dismissed_at: row.dismissed_at || null,
      updated_at: now
    }));

    const { error } = await State.sb
      .from('notification_states')
      .upsert(payload, { onConflict: 'user_id,notification_key' });
    if (error) throw error;

    mergeNotificationStates(payload);
  }

  function mergeNotificationStates(rows) {
    const map = new Map((State.notificationStates || []).map((row) => [row.notification_key, row]));
    for (const row of rows) {
      map.set(row.notification_key, {
        ...(map.get(row.notification_key) || {}),
        ...row
      });
    }
    State.notificationStates = Array.from(map.values());
  }

  function renderNotificationPanel(notifications) {
    const nearCount = notifications.filter((item) => item.kind === 'near').length;
    const expiredCount = notifications.filter((item) => item.kind === 'expired').length;
    const emailCount = notifications.filter((item) => item.kind === 'email').length;
    const unreadCount = countUnreadNotifications(notifications);
    const activeKind = State.notificationFilter || 'all';
    const visibleItems = activeKind === 'all'
      ? notifications
      : notifications.filter((item) => item.kind === activeKind);
    const items = visibleItems.slice(0, 12);

    return `
      <section class="notification-panel" aria-label="รายการแจ้งเตือน">
        <header class="notification-head">
          <div>
            <strong>แจ้งเตือน${unreadCount ? ` (${unreadCount} ใหม่)` : ''}</strong>
            <p>เปิดแล้วถือว่าอ่านแล้ว กด × เพื่อซ่อนรายการที่ไม่ต้องการเห็นอีก</p>
          </div>
          <button class="btn small ghost" type="button" data-action="notification-close">ปิด</button>
        </header>
        <div class="notification-tabs">
          ${notificationTab('all', `ทั้งหมด ${notifications.length}`, activeKind)}
          ${notificationTab('near', `ใกล้หมดอายุ ${nearCount}`, activeKind)}
          ${notificationTab('expired', `หมดอายุ ${expiredCount}`, activeKind)}
          ${notificationTab('email', `อีเมล ${emailCount}`, activeKind)}
        </div>
        <div class="notification-list">
          ${items.length ? items.map((item) => `
            <div class="notification-item ${escapeAttr(item.kind)} ${item.isRead ? 'read' : 'unread'}">
              <a class="notification-link" href="${escapeAttr(item.href)}">
                <span class="notification-icon">${escapeHTML(item.icon)}</span>
                <span class="notification-content">
                  <strong>${escapeHTML(item.title)}</strong>
                  <small>${escapeHTML(item.detail)}</small>
                </span>
                <span class="notification-date">${escapeHTML(item.date ? formatDate(item.date) : '-')}</span>
              </a>
              <button class="notification-dismiss" type="button" data-action="notification-dismiss" data-key="${escapeAttr(item.id)}" title="ปิดแจ้งเตือนนี้" aria-label="ปิดแจ้งเตือนนี้">×</button>
            </div>
          `).join('') : '<div class="empty compact-empty">ไม่มีแจ้งเตือนในหมวดนี้</div>'}
        </div>
        <footer class="notification-footer">
          <button class="btn small secondary" type="button" data-action="notification-filter" data-kind="${escapeAttr(activeKind)}">ดูในรายการเดโม</button>
          <button class="btn small ghost" type="button" data-action="notification-clear-all" data-kind="${escapeAttr(activeKind)}" ${visibleItems.length ? '' : 'disabled'}>ล้างทั้งหมด</button>
        </footer>
      </section>
    `;
  }

  function notificationTab(kind, label, activeKind) {
    return `<button class="notification-tab ${activeKind === kind ? 'active' : ''}" type="button" data-action="notification-tab" data-kind="${escapeAttr(kind)}">${escapeHTML(label)}</button>`;
  }

  function applyNotificationFilter(kind) {
    State.notificationsOpen = false;
    State.filters = {
      search: '',
      status: '',
      responsible: '',
      module: '',
      sort: 'updated_desc',
      nearOnly: false
    };

    if (kind === 'near') {
      State.filters.nearOnly = true;
    } else if (kind === 'expired') {
      State.filters.status = STATUS.EXPIRED;
    }

    State.demoPage = 1;
    location.hash = '#demos';
    render();
  }

  function renderLoadNotice() {
    if (State.loading) {
      return `<div class="config-warning">${escapeHTML(State.loadingMessage || 'กำลังโหลดข้อมูล...')}</div>`;
    }

    if (State.dataError && State.dataLoaded) {
      return `
        <div class="config-warning">
          โหลดข้อมูลล่าสุดบางส่วนไม่สำเร็จ: ${escapeHTML(State.dataError)}
          <div style="margin-top:10px">
            <button class="btn small ghost" data-action="reload">ลองโหลดใหม่</button>
          </div>
        </div>
      `;
    }

    return '';
  }

  function renderRoute(route) {
    if (!State.dataLoaded) {
      if (State.dataError) {
        return `
          <section class="loading-card error-card">
            <h1>โหลดข้อมูลไม่สำเร็จ</h1>
            <p>${escapeHTML(State.dataError)}</p>
            <div class="actions" style="justify-content:center; margin-top:14px">
              <button class="btn primary" data-action="reload">ลองโหลดใหม่</button>
              <button class="btn ghost" data-action="logout">ออกจากระบบ</button>
            </div>
          </section>
        `;
      }

      return `
        <section class="loading-card">
          <div class="spinner"></div>
          <p>${escapeHTML(State.loadingMessage || 'กำลังโหลดข้อมูล...')}</p>
          <p class="muted small-text">ถ้าหน้านี้ค้างนาน ให้กดรีเฟรชข้อมูล</p>
          <div class="actions" style="justify-content:center; margin-top:14px">
            <button class="btn ghost" data-action="reload">รีเฟรชข้อมูล</button>
          </div>
        </section>
      `;
    }

    if (route === '#dashboard' || route === '') return renderDashboard();
    if (route === '#demos') return renderDemoList();
    if (route === '#reports') return renderReportPage();
    if (route === '#demos/new') return renderDemoForm();
    if (route.startsWith('#demos/new/renew/')) return renderDemoForm({ renewFromId: route.replace('#demos/new/renew/', '') });
    if (route.startsWith('#demos/edit/')) return renderDemoForm({ editId: route.replace('#demos/edit/', '') });
    if (route.startsWith('#demos/')) return renderDemoDetail(route.replace('#demos/', ''));
    if (route === '#admin') return userIsAdmin() ? renderAdmin() : renderForbidden();
    return renderNotFound();
  }

  function renderTopbar(title, subtitle = '', actions = '') {
    return `
      <div class="topbar">
        <div class="page-title">
          <h1>${escapeHTML(title)}</h1>
          ${subtitle ? `<p>${escapeHTML(subtitle)}</p>` : ''}
        </div>
        <div class="actions">
          ${actions}
          <button class="btn ghost" data-action="reload">รีเฟรช</button>
        </div>
      </div>
    `;
  }

  function renderDashboard() {
    const start = State.dashboardRange.start;
    const end = State.dashboardRange.end;
    const rows = getDemoRows().filter((row) => dateInRange(row.round.created_at?.slice(0, 10), start, end));
    const allRows = getDemoRows();
    const chartRows = allRows;

    const counts = countByStatus(rows);
    const chartStatusCounts = countByStatus(chartRows);
    const chartModuleCounts = countByModule(chartRows);
    const chartTotal = chartRows.length;
    const near7 = allRows
      .filter((row) => !FINAL_STATUSES.has(row.effectiveStatus) && row.remainingDays >= 0 && row.remainingDays <= 7)
      .sort((a, b) => a.remainingDays - b.remainingDays);

    const expired = allRows
      .filter((row) => row.effectiveStatus === STATUS.EXPIRED)
      .sort((a, b) => a.remainingDays - b.remainingDays);

    const latest = [...allRows]
      .sort((a, b) => new Date(b.round.created_at || 0) - new Date(a.round.created_at || 0));

    const customers = allRows
      .filter((row) => row.effectiveStatus === STATUS.CUSTOMER)
      .sort((a, b) => new Date(b.round.updated_at || 0) - new Date(a.round.updated_at || 0));

    return `
      ${renderTopbar('แดชบอร์ด', '', `
        <a class="btn primary" href="#demos/new">+ สร้างเดโม</a>
      `)}
      <section class="card">
        <div class="filters compact">
          <div class="field">
            <label>เริ่ม</label>
            <input class="input" type="date" data-dashboard-range="start" value="${escapeAttr(start)}">
          </div>
          <div class="field">
            <label>สิ้นสุด</label>
            <input class="input" type="date" data-dashboard-range="end" value="${escapeAttr(end)}">
          </div>
          ${userIsAdmin() ? '<button class="btn warning" data-action="run-reminder-check">สร้างคิวเตือน 3 วัน</button>' : ''}
        </div>
        <div class="stats-grid">
          ${statCard('เดโมในช่วงที่เลือก', rows.length)}
          ${statCard(STATUS.PENDING, counts[STATUS.PENDING] || 0)}
          ${statCard(STATUS.ACTIVE, counts[STATUS.ACTIVE] || 0)}
          ${statCard('ใกล้หมดอายุ 7 วัน', near7.length)}
          ${statCard(STATUS.EXPIRED, counts[STATUS.EXPIRED] || 0)}
          ${statCard(STATUS.CLOSED, counts[STATUS.CLOSED] || 0)}
          ${statCard(STATUS.CUSTOMER, counts[STATUS.CUSTOMER] || 0)}
        </div>
      </section>

      <section class="grid two content-gap">
        <div class="card">
          <div class="section-title"><h2>จำนวนตามสถานะ</h2></div>
          ${barChart(chartStatusCounts, chartTotal)}
        </div>
        <div class="card">
          <div class="section-title"><h2>จำนวนตามโมดูล</h2></div>
          ${barChart(chartModuleCounts, chartTotal)}
        </div>
      </section>

      <section class="grid two content-gap">
        ${miniTable('ใกล้หมดอายุภายใน 7 วัน', near7, true, 'near7')}
        ${miniTable('หมดอายุแต่ยังไม่ปิดรายการ', expired, true, 'expired')}
        ${miniTable('รายการล่าสุด', latest, false, 'latest')}
        ${miniTable('เป็นลูกค้าแล้วล่าสุด', customers, false, 'customers')}
      </section>
    `;
  }

  function statCard(label, value, hint = '') {
    return `
      <div class="card stat">
        <div class="label">${escapeHTML(label)}</div>
        <div class="value">${Number(value || 0).toLocaleString('th-TH')}</div>
        ${hint ? `<div class="hint">${escapeHTML(hint)}</div>` : ''}
      </div>
    `;
  }

  function miniTable(title, rows, showDays, pageKey) {
    const pageInfo = paginateRows(rows, State.dashboardPages[pageKey] || 1, DASHBOARD_TABLE_PAGE_SIZE);
    State.dashboardPages[pageKey] = pageInfo.page;
    const pageRows = pageInfo.rows;

    return `
      <div class="card">
        <div class="section-title">
          <h2>${escapeHTML(title)}</h2>
          <span class="muted small-text">${rows.length.toLocaleString('th-TH')} รายการ</span>
        </div>
        ${pageRows.length ? `
          <div class="table-wrap compact-table" style="margin-top:12px">
            <table>
              <thead>
                <tr>
                  <th>บริษัท</th>
                  <th>สถานะ</th>
                  <th>${showDays ? 'วันคงเหลือ' : 'ผู้รับผิดชอบ'}</th>
                  <th>บันทึกล่าสุด</th>
                </tr>
              </thead>
              <tbody>
                ${pageRows.map((row) => `
                  <tr>
                    <td><a href="#demos/${row.round.id}"><strong>${escapeHTML(row.company.company_name)}</strong></a></td>
                    <td>${statusBadge(row.effectiveStatus)}</td>
                    <td>${showDays ? formatRemaining(row.remainingDays) : escapeHTML(displayName(row.responsible))}</td>
                    <td class="cell-ellipsis" title="${escapeAttr(row.latestLog?.message || '-')}">${escapeHTML(row.latestLog?.message || '-')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ${renderPagination('dashboard', pageKey, pageInfo.page, pageInfo.totalPages, rows.length)}
        ` : '<div class="empty">ไม่มีข้อมูล</div>'}
      </div>
    `;
  }

  function renderDemoList() {
    const rows = getFilteredRows();
    const pageInfo = paginateRows(rows, State.demoPage, DEMO_LIST_PAGE_SIZE);
    State.demoPage = pageInfo.page;

    return `
      ${renderTopbar('รายการเดโม', '', `
        <a class="btn primary" href="#demos/new">+ สร้างเดโม</a>
        <button class="btn secondary" data-action="report-export">ดึงรายงาน</button>
      `)}
      <section class="card">
        <div class="filters">
          <div class="field search-field">
            <label>ค้นหา</label>
            <input class="input" data-filter="search" value="${escapeAttr(State.filters.search)}" placeholder="บริษัท ผู้ติดต่อ อีเมล โมดูล ผู้รับผิดชอบ">
          </div>
          <div class="field">
            <label>สถานะ</label>
            <select class="select" data-filter="status">
              ${option('', 'ทุกสถานะ', State.filters.status)}
              ${Object.values(STATUS).map((status) => option(status, status, State.filters.status)).join('')}
            </select>
          </div>
          <div class="field">
            <label>ผู้รับผิดชอบ</label>
            <select class="select" data-filter="responsible">
              ${option('', 'ทุกคน', State.filters.responsible)}
              ${State.responsiblePeople.map((person) => option(person.id, person.name, State.filters.responsible)).join('')}
            </select>
          </div>
          <div class="field">
            <label>โมดูล</label>
            <select class="select" data-filter="module">
              ${option('', 'ทุกโมดูล', State.filters.module)}
              ${State.modules.map((module) => option(module.id, module.name, State.filters.module)).join('')}
            </select>
          </div>
          <div class="field">
            <label>จัดเรียง</label>
            <select class="select" data-filter="sort">
              ${option('updated_desc', 'แก้ไขล่าสุด', State.filters.sort)}
              ${option('created_desc', 'สร้างล่าสุด', State.filters.sort)}
              ${option('start_asc', 'วันที่เริ่ม', State.filters.sort)}
              ${option('end_asc', 'วันที่สิ้นสุด', State.filters.sort)}
              ${option('remaining_asc', 'วันคงเหลือ', State.filters.sort)}
              ${option('company_asc', 'ชื่อบริษัท', State.filters.sort)}
              ${option('status_asc', 'สถานะ', State.filters.sort)}
            </select>
          </div>
          <label class="check-card">
            <input type="checkbox" data-filter="nearOnly" ${State.filters.nearOnly ? 'checked' : ''}>
            ใกล้หมดอายุ 7 วัน
          </label>
        </div>
        ${renderDemoTable(pageInfo.rows)}
        ${renderPagination('demo', 'list', pageInfo.page, pageInfo.totalPages, rows.length)}
      </section>
    `;
  }

  function renderDemoTable(rows) {
    if (!rows.length) return '<div class="empty">ไม่พบรายการเดโม</div>';

    return `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ชื่อบริษัท</th>
              <th>ผู้ติดต่อ</th>
              <th>อีเมลผู้ติดต่อ</th>
              <th>สถานะ</th>
              <th>ผู้รับผิดชอบ</th>
              <th>เริ่ม</th>
              <th>สิ้นสุด</th>
              <th>วันรอบนี้</th>
              <th>วันคงเหลือ</th>
              <th>วันสะสมทั้งหมด</th>
              <th>โมดูล</th>
              <th>บันทึกล่าสุด</th>
              <th>แก้ไขล่าสุด</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => {
              const canDelete = canSoftDelete(row);
              const canClose = canCloseDemoRound(row);
              return `
                <tr>
                  <td><a href="#demos/${row.round.id}"><strong>${escapeHTML(row.company.company_name)}</strong></a></td>
                  <td>${escapeHTML(row.company.contact_name || '-')}</td>
                  <td>
                    <div class="contact-copy-cell">
                      <span class="cell-main">${escapeHTML((row.company.contact_emails || []).join(', ') || '-')}</span>
                      <div class="cell-actions">
                        <button class="btn tiny ghost" data-action="copy" data-copy="${escapeAttr(contactEmailsCopyText(row))}">คัดลอกอีเมล</button>
                        <button class="btn tiny ghost" data-action="copy" data-copy="${escapeAttr(demoPasswordsCopyText(row))}" ${row.accounts.length ? '' : 'disabled'}>คัดลอกรหัสผ่าน</button>
                      </div>
                    </div>
                  </td>
                  <td>${statusBadge(row.effectiveStatus)}</td>
                  <td>${escapeHTML(displayName(row.responsible))}</td>
                  <td>${formatDate(row.round.start_date)}</td>
                  <td>${formatDate(row.round.end_date)}</td>
                  <td>${row.totalDays}</td>
                  <td>${formatRemaining(row.remainingDays)}</td>
                  <td>${row.accumulatedDays}</td>
                  <td>${escapeHTML(row.modules.map((module) => module.name).join(', ') || '-')}</td>
                  <td>${escapeHTML(row.latestLog?.message || '-')}</td>
                  <td>${formatDateTime(row.round.updated_at)}</td>
                  <td>
                    <div class="actions">
                      <a class="btn small ghost" href="#demos/${row.round.id}">ดู</a>
                      <a class="btn small secondary" href="#demos/edit/${row.round.id}">แก้ไข</a>
                      <a class="btn small success" href="#demos/new/renew/${row.round.id}">ต่ออายุ</a>
                      ${canClose ? `<button class="btn small warning" data-action="demo-close" data-id="${row.round.id}">ปิด</button>` : ''}
                      ${canShowFirstEmailAction(row) ? `<button class="btn small ghost" data-action="email-preview" data-id="${row.round.id}">อีเมล</button>` : ''}
                      ${canDelete ? `<button class="btn small danger" data-action="demo-delete" data-id="${row.round.id}">ลบ</button>` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }


  function renderReportPage() {
    const rows = getFilteredCompanyReportRows();
    const pageInfo = paginateRows(rows, State.reportPage, REPORT_PAGE_SIZE);
    State.reportPage = pageInfo.page;
    const pageRows = pageInfo.rows;

    return `
      ${renderTopbar('รายงาน', '', `
        <button class="btn secondary" data-action="company-report-export">ดึงรายงาน</button>
      `)}
      <section class="report-toolbar card">
        <div class="field search-field">
          <label>ค้นหารายงาน</label>
          <input class="input" data-report-search value="${escapeAttr(State.reportSearch)}" placeholder="ค้นหาบริษัท ผู้ติดต่อ อีเมล ผู้รับผิดชอบ โมดูล หรือบันทึกล่าสุด">
        </div>
        <div class="report-toolbar-note">
          แสดง ${pageRows.length.toLocaleString('th-TH')} จาก ${rows.length.toLocaleString('th-TH')} บริษัท
        </div>
      </section>

      <section class="card report-board">
        <div class="section-title soft-title">
          <div>
            <h2>สรุปรายบริษัท</h2>
            <p class="muted small-text">เรียงจากบันทึกความคืบหน้าของบริษัทล่าสุดเท่านั้น ไม่รวมกิจกรรมระบบหรือการส่งอีเมล</p>
          </div>
        </div>
        ${renderReportCompanyCards(pageRows)}
        ${renderPagination('report', 'companies', pageInfo.page, pageInfo.totalPages, rows.length)}
      </section>
    `;
  }

  function reportMetricCard(label, value, hint = '') {
    return `
      <div class="report-metric">
        <span>${escapeHTML(label)}</span>
        <strong>${Number(value || 0).toLocaleString('th-TH')}</strong>
        <small>${escapeHTML(hint)}</small>
      </div>
    `;
  }

  function renderReportHighlightList(rows) {
    if (!rows.length) {
      return '<div class="empty compact-empty">ยังไม่มีบันทึกล่าสุด</div>';
    }

    return `
      <div class="report-highlight-list">
        ${rows.map((row) => `
          <a class="report-highlight-item" href="#demos/${row.round.id}">
            <div class="report-highlight-head">
              <strong>${escapeHTML(row.company.company_name)}</strong>
              <span>${formatDateTime(row.latestLog.created_at)}</span>
            </div>
            <p>${escapeHTML(row.latestLog.message)}</p>
          </a>
        `).join('')}
      </div>
    `;
  }

  function renderReportActionList(rows) {
    if (!rows.length) {
      return '<div class="empty compact-empty">ไม่มีรายการเร่งด่วนในตอนนี้</div>';
    }

    return `
      <div class="report-action-list">
        ${rows.map((row) => {
          const urgency = row.effectiveStatus === STATUS.EXPIRED
            ? 'หมดอายุแล้ว'
            : row.remainingDays >= 0 && row.remainingDays <= 7
              ? `เหลือ ${formatRemaining(row.remainingDays)}`
              : 'มีบันทึกล่าสุด';
          return `
            <a class="report-action-item" href="#demos/${row.round.id}">
              <div>
                <strong>${escapeHTML(row.company.company_name)}</strong>
                <span>${escapeHTML(row.latestLog?.message || 'ยังไม่มีบันทึก')}</span>
              </div>
              <em>${escapeHTML(urgency)}</em>
            </a>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderReportCompanyCards(rows) {
    if (!rows.length) return '<div class="empty">ไม่พบข้อมูลรายงาน</div>';

    return `
      <div class="report-card-grid">
        ${rows.map((row) => `
          <article class="report-company-card">
            <div class="report-company-main">
              <div class="report-company-title">
                <a href="#demos/${row.round.id}">${escapeHTML(row.company.company_name)}</a>
                ${statusBadge(row.effectiveStatus)}
              </div>
              <div class="report-company-meta">
                <span>ผู้ติดต่อ: ${escapeHTML(row.company.contact_name || '-')}</span>
                <span>ผู้รับผิดชอบ: ${escapeHTML(displayName(row.responsible))}</span>
                <span>เดโม: ${formatDate(row.round.start_date)} - ${formatDate(row.round.end_date)}</span>
                <span>วันรอบนี้: ${row.totalDays} วัน · สะสม: ${row.accumulatedDays} วัน</span>
              </div>
              <div class="report-module-tags">
                ${row.modules.length
                  ? row.modules.slice(0, 4).map((module) => `<span>${escapeHTML(module.name)}</span>`).join('')
                  : '<span>ไม่มีโมดูล</span>'}
                ${row.modules.length > 4 ? `<span>+${row.modules.length - 4}</span>` : ''}
              </div>
            </div>
            <div class="report-company-log">
              <span>${row.latestLog ? 'บันทึกล่าสุด' : 'ยังไม่มีบันทึก'}</span>
              <p>${escapeHTML(row.latestLog?.message || 'ยังไม่มี activity log ของบริษัทนี้')}</p>
              <small>${row.latestLog ? formatDateTime(row.latestLog.created_at) : '—'}</small>
            </div>
            <div class="report-company-actions">
              <a class="btn small ghost" href="#demos/${row.round.id}" aria-label="ดูรายละเอียด ${escapeAttr(row.company.company_name)}">ดูรายละเอียด</a>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }


  function renderDemoForm({ editId = null, renewFromId = null } = {}) {
    const editRow = editId ? getDemoRow(editId) : null;
    const renewRow = renewFromId ? getDemoRow(renewFromId) : null;

    if (editId && !editRow) return renderNotFound();
    if (renewFromId && !renewRow) return renderNotFound();

    const source = editRow || renewRow;
    const company = source?.company || {};
    const round = source?.round || {};
    const title = editRow ? 'แก้ไขเดโม' : renewRow ? 'ต่ออายุเดโม' : 'สร้างเดโม';

    const startDate = editRow ? round.start_date : todayISO();
    const endDate = editRow ? round.end_date : addDaysISO(todayISO(), 14);
    const renewalNo = editRow ? (round.renewal_no || 0) : renewRow ? (round.renewal_no || 0) + 1 : 0;
    const draftKey = demoDraftKey(editId, renewFromId);
    const draft = readDemoDraft(draftKey);

    const baseValues = {
      company_name: company.company_name || '',
      contact_name: company.contact_name || '',
      contact_emails: company.contact_emails || [],
      status: round.status || STATUS.PENDING,
      responsible_person_id: getRoundResponsiblePersonId(round),
      start_date: startDate,
      end_date: endDate,
      renewal_no: renewalNo,
      modules: source?.modules.map((module) => module.id) || [],
      accounts: source?.accounts.length ? source.accounts : [{ login_email: '', password: '', note: '' }],
      activity_message: ''
    };

    const values = {
      ...baseValues,
      ...(draft || {}),
      contact_emails: draft?.contact_emails || baseValues.contact_emails,
      modules: draft?.modules || baseValues.modules,
      accounts: draft?.accounts?.length ? draft.accounts : baseValues.accounts
    };

    const selectedModuleIds = values.modules || [];
    const accounts = values.accounts || [{ login_email: '', password: '', note: '' }];
    const responsibleOptions = State.responsiblePeople.filter((person) => person.is_active || person.id === values.responsible_person_id);

    return `
      ${renderTopbar(title, '', `
        <a class="icon-button back-button" href="#demos" title="กลับ" aria-label="กลับ">←</a>
      `)}
      ${draft ? `
        <div class="config-warning">
          กู้คืนข้อมูลร่างที่ยังไม่ได้บันทึกแล้ว
          <button class="btn small ghost" type="button" data-action="draft-clear" data-draft-key="${escapeAttr(draftKey)}">ล้างข้อมูลร่าง</button>
        </div>
      ` : ''}
      ${!responsibleOptions.length ? `
        <div class="config-warning">ยังไม่มี master ผู้รับผิดชอบ กรุณาเพิ่มในหน้า ตั้งค่าระบบ → ผู้รับผิดชอบ ก่อนสร้างเดโม</div>
      ` : ''}
      <form data-action="demo-save" data-draft-key="${escapeAttr(draftKey)}" data-edit-id="${escapeAttr(editId || '')}" data-renew-from-id="${escapeAttr(renewFromId || '')}" class="grid demo-form">
        <section class="panel form-section">
          <div class="section-title"><h2>ข้อมูลบริษัท</h2></div>
          <div class="grid two">
            <div class="field">
              <label>ชื่อบริษัท <span class="required">*</span></label>
              <input class="input" name="company_name" list="company-list" value="${escapeAttr(values.company_name)}" required>
              <datalist id="company-list">
                ${State.companies.map((item) => `<option value="${escapeAttr(item.company_name)}"></option>`).join('')}
              </datalist>
            </div>
            <div class="field">
              <label>ชื่อผู้ติดต่อ <span class="required">*</span></label>
              <input class="input" name="contact_name" value="${escapeAttr(values.contact_name)}" required>
            </div>
          </div>
          <div class="field">
            <label>อีเมลผู้ติดต่อ <span class="required">*</span></label>
            ${renderChipInput('contact_emails', values.contact_emails || [], 'พิมพ์อีเมล แล้วกด Enter หรือกดบันทึกได้เลย')}
          </div>
        </section>

        <section class="panel form-section">
          <div class="section-title"><h2>ข้อมูลเดโม</h2></div>
          <div class="grid four">
            <div class="field">
              <label>สถานะ <span class="required">*</span></label>
              <select class="select" name="status" data-final-status-date required>
                ${Object.values(STATUS).map((status) => option(status, status, values.status)).join('')}
              </select>
            </div>
            <div class="field">
              <label>ผู้รับผิดชอบ <span class="required">*</span></label>
              <select class="select" name="responsible_person_id" required>
                ${option('', 'เลือกผู้รับผิดชอบ', values.responsible_person_id)}
                ${responsibleOptions.map((person) => option(person.id, person.name, values.responsible_person_id)).join('')}
              </select>
            </div>
            <div class="field">
              <label>วันที่เริ่ม <span class="required">*</span></label>
              <input class="input" type="date" name="start_date" value="${escapeAttr(values.start_date)}" required>
            </div>
            <div class="field">
              <label>วันที่สิ้นสุด <span class="required">*</span></label>
              <input class="input" type="date" name="end_date" value="${escapeAttr(values.end_date)}" required>
            </div>
          </div>
          <input type="hidden" name="renewal_no" value="${escapeAttr(String(values.renewal_no || 0))}">
          <div class="field">
            <label>โมดูล <span class="required">*</span></label>
            <div class="module-grid">
              ${State.modules.filter((module) => module.is_active || selectedModuleIds.includes(module.id)).map((module) => `
                <label class="check-card">
                  <input type="checkbox" name="modules" value="${module.id}" ${selectedModuleIds.includes(module.id) ? 'checked' : ''}>
                  <span>${escapeHTML(module.name)}</span>
                  ${module.is_active ? '' : '<span class="badge pending">ปิดใช้งาน</span>'}
                </label>
              `).join('')}
            </div>
          </div>
        </section>

        <section class="panel form-section">
          <div class="section-title">
            <h2>บัญชีเดโม</h2>
            <button class="btn small secondary" data-action="account-add" type="button">+ เพิ่มบัญชี</button>
          </div>
          <div id="accounts-list" class="grid">
            ${accounts.map((account) => renderAccountRow(account)).join('')}
          </div>
        </section>

        <section class="panel form-section">
          <div class="section-title"><h2>บันทึกความคืบหน้า</h2></div>
          <div class="field">
            <label>ข้อความบันทึก</label>
            <textarea class="textarea" name="activity_message" placeholder="เช่น โทรคุยแล้ว ลูกค้าขอต่ออายุอีก 7 วัน">${escapeHTML(values.activity_message || '')}</textarea>
          </div>
        </section>

        <div class="actions form-actions">
          <button class="btn primary" type="submit">บันทึก</button>
          <a class="btn ghost" href="${editRow ? `#demos/${editId}` : '#demos'}">ยกเลิก</a>
        </div>
      </form>
    `;
  }

  function renderAccountRow(account = {}) {
    return `
      <div class="account-row" data-account-row>
        <div class="field">
          <label>อีเมลผู้ใช้งาน <span class="required">*</span></label>
          <input class="input" type="email" name="account_login_email" value="${escapeAttr(account.login_email || '')}" required>
        </div>
        <div class="field">
          <label>รหัสผ่าน <span class="required">*</span></label>
          <input class="input" type="text" name="account_password" value="${escapeAttr(account.password || '')}" required autocomplete="off">
        </div>
        <div class="field">
          <label>โน้ตบัญชี</label>
          <input class="input" name="account_note" value="${escapeAttr(account.note || '')}">
        </div>
        <button class="btn danger" type="button" data-action="account-remove">ลบ</button>
      </div>
    `;
  }

  function renderDemoDetail(roundId) {
    const row = getDemoRow(roundId);
    if (!row) return renderNotFound();

    const companyLogs = State.activityLogs
      .filter((log) => log.company_id === row.company.id && isManualLog(log))
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    const history = getAllDemoRows()
      .filter((item) => item.company.id === row.company.id)
      .sort((a, b) => new Date(b.round.created_at || 0) - new Date(a.round.created_at || 0));

    return `
      ${renderTopbar(row.company.company_name, '', `
        <a class="icon-button back-button" href="#demos" title="กลับ" aria-label="กลับ">←</a>
        <a class="btn secondary" href="#demos/edit/${row.round.id}">แก้ไข</a>
        <a class="btn success" href="#demos/new/renew/${row.round.id}">ต่ออายุ</a>
        ${canShowFirstEmailAction(row) ? `<button class="btn primary" data-action="email-preview" data-id="${row.round.id}">ตัวอย่างอีเมล</button>` : ''}
        <button class="btn ghost" data-action="print">พิมพ์</button>
      `)}
      <section class="grid two">
        <div class="card">
          <div class="section-title"><h2>ข้อมูลบริษัท</h2></div>
          <dl class="kv">
            <dt>บริษัท</dt><dd>${escapeHTML(row.company.company_name)}</dd>
            <dt>ผู้ติดต่อ</dt><dd>${escapeHTML(row.company.contact_name)}</dd>
            <dt>อีเมลผู้ติดต่อ</dt><dd>${escapeHTML((row.company.contact_emails || []).join(', '))}</dd>
            <dt>บันทึกล่าสุด</dt><dd>${escapeHTML(row.latestLog?.message || '-')}</dd>
          </dl>
        </div>
        <div class="card">
          <div class="section-title"><h2>รอบเดโมปัจจุบัน</h2></div>
          <dl class="kv">
            <dt>สถานะ</dt><dd>${statusBadge(row.effectiveStatus)}</dd>
            <dt>ผู้รับผิดชอบ</dt><dd>${escapeHTML(displayName(row.responsible))}</dd>
            <dt>วันที่เริ่ม</dt><dd>${formatDate(row.round.start_date)}</dd>
            <dt>วันที่สิ้นสุด</dt><dd>${formatDate(row.round.end_date)}</dd>
            <dt>วันรอบนี้</dt><dd>${row.totalDays}</dd>
            <dt>วันคงเหลือ</dt><dd>${formatRemaining(row.remainingDays)}</dd>
            <dt>วันสะสมทั้งหมด</dt><dd>${row.accumulatedDays}</dd>
            <dt>โมดูล</dt><dd>${escapeHTML(row.modules.map((module) => module.name).join(', ') || '-')}</dd>
            <dt>ต่ออายุครั้งที่</dt><dd>${row.round.renewal_no || 0}</dd>
          </dl>
        </div>
      </section>

      <section class="grid two content-gap">
        <div class="card">
          <div class="section-title"><h2>บัญชีเดโม</h2></div>
          ${renderAccounts(row.accounts)}
        </div>
        <div class="card">
          <div class="section-title"><h2>ประวัติรอบเดโม</h2></div>
          ${history.length ? `
            <div class="timeline round-history">
              ${history.map((item) => {
                const isCurrentRound = item.round.id === row.round.id;
                return `
                  <div class="timeline-item round-history-item ${isCurrentRound ? 'current-round' : ''}">
                    <div class="timeline-date">
                      <span class="timeline-dot" aria-hidden="true"></span>
                      <span>${formatDate(item.round.created_at)}</span>
                    </div>
                    <div class="timeline-body round-card">
                      <div class="round-card-head">
                        <div class="round-title">
                          ${statusBadge(item.effectiveStatus)}
                          <strong>ต่ออายุครั้งที่ ${item.round.renewal_no || 0}</strong>
                        </div>
                        <a class="btn small ghost round-link" href="#demos/${item.round.id}" aria-label="ดูรอบเดโมนี้">ดูรอบนี้</a>
                      </div>
                      <p class="round-meta">${formatDate(item.round.start_date)} - ${formatDate(item.round.end_date)} · ${item.totalDays} วัน · ${item.modules.map((module) => escapeHTML(module.name)).join(', ') || '-'}</p>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : '<div class="empty soft-empty">ยังไม่มีประวัติรอบเดโม</div>'}
        </div>
      </section>

      <section class="card content-gap">
        <div class="section-title"><h2>บันทึกความคืบหน้าของบริษัท</h2></div>
        <form data-action="activity-add" data-company-id="${row.company.id}" data-round-id="${row.round.id}" class="log-form">
          <div class="field">
            <label>ข้อความบันทึก <span class="required">*</span></label>
            <input class="input" name="message" placeholder="บันทึกความคืบหน้าของบริษัทนี้" required>
          </div>
          <button class="btn primary" type="submit">เพิ่มบันทึก</button>
        </form>
        ${renderTimeline(companyLogs)}
      </section>
    `;
  }

  function renderAccounts(accounts) {
    if (!accounts.length) return '<div class="empty">ไม่มีบัญชีเดโม</div>';

    return `
      <div class="grid account-cards">
        ${accounts.map((account) => `
          <div class="card">
            <strong>${escapeHTML(account.login_email)}</strong>
            <div class="actions account-actions">
              <span class="password-mask" data-password="${escapeAttr(account.password)}">••••••••</span>
              <button class="btn small ghost" data-action="password-toggle">ดู/ซ่อน</button>
              <button class="btn small ghost" data-action="copy" data-copy="${escapeAttr(account.login_email)}">คัดลอกอีเมล</button>
              <button class="btn small ghost" data-action="copy" data-copy="${escapeAttr(account.password)}">คัดลอกรหัสผ่าน</button>
            </div>
            ${account.note ? `<p class="muted">${escapeHTML(account.note)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderTimeline(logs) {
    if (!logs.length) return '<div class="empty soft-empty">ยังไม่มีบันทึกความคืบหน้า</div>';

    const latestId = logs[0]?.id;
    return `
      <div class="timeline activity-timeline">
        ${logs.map((log) => {
          const author = findProfile(log.created_by);
          const canEdit = canModifyLog(log, latestId);
          return `
            <div class="timeline-item">
              <div class="timeline-date">${formatDateTime(log.created_at)}</div>
              <div class="timeline-body">
                <div class="actions timeline-head">
                  <span class="timeline-author">
                    ${renderProfileAvatar(author, 'profile-avatar timeline-avatar')}
                    <span class="muted small-text">โดย ${escapeHTML(displayName(author))}</span>
                  </span>
                  ${canEdit ? `
                    <div class="actions">
                      <button class="btn small ghost" data-action="log-edit" data-id="${log.id}">แก้ไข</button>
                      <button class="btn small danger" data-action="log-delete" data-id="${log.id}">ลบ</button>
                    </div>
                  ` : ''}
                </div>
                <p>${escapeHTML(log.message)}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderAdmin() {
    return `
      ${renderTopbar('ตั้งค่าระบบ')}
      <section class="card">
        <div class="admin-tabs">
          ${adminTab('users', 'ผู้ใช้ระบบ')}
          ${adminTab('responsible', 'ผู้รับผิดชอบ')}
          ${adminTab('modules', 'โมดูล')}
          ${adminTab('templates', 'เทมเพลตอีเมล')}
          ${adminTab('settings', 'ตั้งค่าอีเมล')}
          ${adminTab('brand', 'แบรนด์ / โลโก้')}
        </div>
        ${State.adminTab === 'users' ? renderAdminUsers() : ''}
        ${State.adminTab === 'responsible' ? renderAdminResponsiblePeople() : ''}
        ${State.adminTab === 'modules' ? renderAdminModules() : ''}
        ${State.adminTab === 'templates' ? renderAdminTemplates() : ''}
        ${State.adminTab === 'settings' ? renderAdminSettings() : ''}
        ${State.adminTab === 'brand' ? renderAdminBrandSettings() : ''}
      </section>
    `;
  }

  function adminTab(key, label) {
    return `<button class="admin-tab ${State.adminTab === key ? 'active' : ''}" data-action="admin-tab" data-tab="${key}">${escapeHTML(label)}</button>`;
  }

  function renderAdminUsers() {
    return `
      <div class="config-warning">
        การสร้างผู้ใช้และตั้งรหัสผ่านต้องทำใน Supabase Dashboard หรือ backend ที่เก็บ service_role ได้เท่านั้น
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>รูปโปรไฟล์</th>
              <th>อีเมล</th>
              <th>ชื่อที่แสดง</th>
              <th>สิทธิ์</th>
              <th>สถานะ</th>
              <th>การใช้งาน</th>
            </tr>
          </thead>
          <tbody>
            ${State.profiles.map((profile) => {
              const formId = `profile-${profile.id}`;
              const avatar = getProfileAvatarDataUri(profile);
              return `
                <tr>
                  <td>
                    <form data-action="admin-profile-save" id="${formId}">
                      <input type="hidden" name="id" value="${profile.id}">
                      <input type="hidden" name="avatar_data_uri" value="${escapeAttr(avatar)}">
                    </form>
                    <div class="avatar-admin-cell">
                      ${renderProfileAvatar(profile, 'profile-avatar admin-avatar-preview')}
                      <label class="btn small ghost avatar-upload-button">
                        เลือกรูป
                        <input class="visually-hidden" type="file" accept="image/png,image/jpeg,image/webp" data-avatar-input form="${formId}">
                      </label>
                      ${avatar ? `<button class="btn small danger" type="button" data-action="profile-avatar-clear" data-form-id="${formId}">ลบรูป</button>` : ''}
                      <div class="muted small-text" data-avatar-file-name>ไม่เกิน 300KB</div>
                    </div>
                  </td>
                  <td>${escapeHTML(profile.email)}</td>
                  <td>
                    <input class="input" name="full_name" value="${escapeAttr(profile.full_name || '')}" form="${formId}">
                  </td>
                  <td>
                    <select class="select" name="role" form="${formId}">
                      ${option('user', 'ผู้ใช้', profile.role)}
                      ${option('admin', 'ผู้ดูแล', profile.role)}
                    </select>
                  </td>
                  <td>
                    <select class="select" name="is_active" form="${formId}">
                      ${option('true', 'เปิดใช้งาน', String(Boolean(profile.is_active)))}
                      ${option('false', 'ปิดใช้งาน', String(Boolean(profile.is_active)))}
                    </select>
                  </td>
                  <td><button class="btn small primary" type="submit" form="${formId}">บันทึก</button></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderAdminResponsiblePeople() {
    return `
      <form data-action="admin-responsible-save" class="panel inline-form">
        <input type="hidden" name="id" value="">
        <div class="field">
          <label>ชื่อผู้รับผิดชอบ <span class="required">*</span></label>
          <input class="input" name="name" placeholder="เช่น คุณสมชาย" required>
        </div>
        <div class="field">
          <label>อีเมล <span class="required">*</span></label>
          <input class="input" type="email" name="email" placeholder="name@example.com" required>
        </div>
        <div class="field">
          <label>เบอร์โทร</label>
          <input class="input" name="phone" placeholder="08x-xxx-xxxx">
        </div>
        <button class="btn primary" type="submit">เพิ่มผู้รับผิดชอบ</button>
      </form>
      <div class="table-wrap content-gap">
        <table>
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>อีเมล</th>
              <th>เบอร์โทร</th>
              <th>สถานะ</th>
              <th>การใช้งาน</th>
            </tr>
          </thead>
          <tbody>
            ${State.responsiblePeople.map((person) => {
              const usageCount = getResponsibleUsageCount(person.id);
              const canDelete = usageCount === 0;
              return `
                <tr>
                  <td>
                    <form data-action="admin-responsible-save" id="responsible-${person.id}">
                      <input type="hidden" name="id" value="${person.id}">
                      <input class="input" name="name" value="${escapeAttr(person.name || '')}" required>
                    </form>
                  </td>
                  <td><input class="input" type="email" name="email" value="${escapeAttr(person.email || '')}" form="responsible-${person.id}" required></td>
                  <td><input class="input" name="phone" value="${escapeAttr(person.phone || '')}" form="responsible-${person.id}"></td>
                  <td>
                    <select class="select" name="is_active" form="responsible-${person.id}">
                      ${option('true', 'เปิดใช้งาน', String(Boolean(person.is_active)))}
                      ${option('false', 'ปิดใช้งาน', String(Boolean(person.is_active)))}
                    </select>
                  </td>
                  <td>${usageCount ? `${usageCount.toLocaleString('th-TH')} รายการ` : '<span class="muted">ยังไม่ถูกใช้</span>'}</td>
                  <td>
                    <div class="actions">
                      <button class="btn small primary" type="submit" form="responsible-${person.id}">บันทึก</button>
                      ${canDelete ? `<button class="btn small danger" type="button" data-action="admin-responsible-delete" data-id="${person.id}">ลบ</button>` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderAdminModules() {
    return `
      <form data-action="admin-module-save" class="panel inline-form">
        <input type="hidden" name="id" value="">
        <div class="field">
          <label>ชื่อโมดูล <span class="required">*</span></label>
          <input class="input" name="name" placeholder="เช่น CRM" required>
        </div>
        <div class="field">
          <label>รายละเอียด</label>
          <input class="input" name="description" placeholder="คำอธิบายสั้น ๆ">
        </div>
        <div class="field">
          <label>ลำดับ</label>
          <input class="input" type="number" name="sort_order" value="100">
        </div>
        <button class="btn primary" type="submit">เพิ่มโมดูล</button>
      </form>
      <div class="table-wrap content-gap">
        <table>
          <thead>
            <tr>
              <th>ชื่อโมดูล</th>
              <th>รายละเอียด</th>
              <th>ลำดับ</th>
              <th>สถานะ</th>
              <th>การใช้งาน</th>
            </tr>
          </thead>
          <tbody>
            ${State.modules.map((module) => {
              const usageCount = getModuleUsageCount(module.id);
              const canDelete = usageCount === 0;
              return `
                <tr>
                  <td>
                    <form data-action="admin-module-save" id="module-${module.id}">
                      <input type="hidden" name="id" value="${module.id}">
                      <input class="input" name="name" value="${escapeAttr(module.name || '')}" required>
                    </form>
                  </td>
                  <td><input class="input" name="description" value="${escapeAttr(module.description || '')}" form="module-${module.id}"></td>
                  <td><input class="input" type="number" name="sort_order" value="${escapeAttr(String(module.sort_order ?? 100))}" form="module-${module.id}"></td>
                  <td>
                    <select class="select" name="is_active" form="module-${module.id}">
                      ${option('true', 'เปิดใช้งาน', String(Boolean(module.is_active)))}
                      ${option('false', 'ปิดใช้งาน', String(Boolean(module.is_active)))}
                    </select>
                  </td>
                  <td>${usageCount ? `${usageCount.toLocaleString('th-TH')} รายการ` : '<span class="muted">ยังไม่ถูกใช้</span>'}</td>
                  <td>
                    <div class="actions">
                      <button class="btn small primary" type="submit" form="module-${module.id}">บันทึก</button>
                      ${canDelete ? `<button class="btn small danger" type="button" data-action="admin-module-delete" data-id="${module.id}">ลบ</button>` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderAdminTemplates() {
    return `
      <div class="grid two">
        ${State.emailTemplates.map((template) => `
          <form data-action="admin-template-save" class="panel form-section">
            <div class="section-title">
              <h2>${escapeHTML(template.name || template.template_key)}</h2>
              <button class="btn small ghost" data-action="admin-template-reset" data-key="${escapeAttr(template.template_key)}" type="button">คืนค่าเริ่มต้น</button>
            </div>
            <input type="hidden" name="id" value="${template.id}">
            <div class="field">
              <label>หัวข้ออีเมล <span class="required">*</span></label>
              <input class="input" name="subject" value="${escapeAttr(template.subject || '')}" required>
            </div>
            <div class="field">
              <label>เนื้อหาอีเมล <span class="required">*</span></label>
              <textarea class="textarea" name="body" rows="14" required>${escapeHTML(template.body || '')}</textarea>
            </div>
            <button class="btn primary" type="submit">บันทึกเทมเพลต</button>
          </form>
        `).join('')}
      </div>
    `;
  }

  function renderAdminSettings() {
    const fixedCc = State.settings.fixed_cc_emails || [];
    const appsScriptUrl = State.settings.apps_script_url || APP_CONFIG.APPS_SCRIPT_URL || '';

    return `
      <form data-action="admin-setting-save" class="grid">
        <div class="field">
          <label>อีเมล CC ประจำ</label>
          ${renderChipInput('fixed_cc_emails', Array.isArray(fixedCc) ? fixedCc : [], 'พิมพ์อีเมล แล้วกด Enter หรือกดบันทึกได้เลย')}
        </div>
        <div class="field">
          <label>Google Apps Script Web App URL</label>
          <input class="input" name="apps_script_url" value="${escapeAttr(appsScriptUrl)}" placeholder="https://script.google.com/macros/s/.../exec">
        </div>
        <button class="btn primary" type="submit">บันทึกการตั้งค่า</button>
      </form>
    `;
  }


  function renderAdminBrandSettings() {
    const customLogo = getCustomBrandLogo();
    const previewLogo = getBrandLogoDataUri();

    return `
      <form data-action="admin-brand-save" class="grid brand-settings">
        <div class="brand-preview-card">
          <div class="brand-preview-logo">
            <img data-logo-preview src="${previewLogo}" alt="DEMO CRM Logo">
          </div>
          <div class="brand-preview-info">
            <h2>โลโก้ระบบ</h2>
            <p>อัปโหลดโลโก้สำหรับแสดงในแถบบนของเว็บ รองรับ PNG, JPG, WebP ขนาดไม่เกิน 300KB</p>
            <span class="badge ${customLogo ? 'active' : 'pending'}">${customLogo ? 'ใช้โลโก้ที่อัปโหลด' : 'ใช้โลโก้เริ่มต้น'}</span>
          </div>
        </div>

        <div class="field">
          <label>เลือกไฟล์โลโก้</label>
          <input class="input" type="file" accept="image/png,image/jpeg,image/webp" data-logo-input>
          <input type="hidden" name="brand_logo_data_uri" value="${escapeAttr(customLogo || '')}">
          <p class="muted small-text" data-logo-file-name>ไฟล์ที่เลือกจะแสดง preview ก่อนบันทึก</p>
        </div>

        <div class="actions">
          <button class="btn primary" type="submit">บันทึกโลโก้</button>
          <button class="btn ghost" type="button" data-action="brand-logo-reset">คืนค่าโลโก้เริ่มต้น</button>
        </div>
      </form>
    `;
  }

  function renderForbidden() {
    return `
      ${renderTopbar('ไม่มีสิทธิ์เข้าใช้งาน')}
      <section class="card empty">กรุณาติดต่อผู้ดูแลระบบ</section>
    `;
  }

  function renderNotFound() {
    return `
      ${renderTopbar('ไม่พบหน้า')}
      <section class="card empty"><a class="icon-button back-button" href="#dashboard" title="กลับแดชบอร์ด" aria-label="กลับแดชบอร์ด">←</a></section>
    `;
  }

  async function saveDemoForm(form) {
    const editId = form.dataset.editId || '';
    const renewFromId = form.dataset.renewFromId || '';
    const contactEmails = getChipValues(form, 'contact_emails', { commitPending: true });
    const selectedModules = $$('input[name="modules"]:checked', form).map((input) => input.value);
    const accounts = collectDemoAccounts(form);

    validateDemoForm(form, contactEmails, selectedModules, accounts);

    let companyId;
    const companyName = form.company_name.value.trim();
    const existingByName = State.companies.find((company) => normalize(company.company_name) === normalize(companyName));
    const sourceRow = editId ? getDemoRow(editId) : null;

    if (sourceRow) {
      companyId = sourceRow.company.id;
      const { error } = await State.sb.from('companies').update({
        company_name: companyName,
        contact_name: form.contact_name.value.trim(),
        contact_emails: contactEmails,
        updated_at: new Date().toISOString()
      }).eq('id', companyId);
      if (error) throw error;
    } else if (existingByName) {
      companyId = existingByName.id;
      const { error } = await State.sb.from('companies').update({
        contact_name: form.contact_name.value.trim(),
        contact_emails: contactEmails,
        updated_at: new Date().toISOString()
      }).eq('id', companyId);
      if (error) throw error;
    } else {
      const { data, error } = await State.sb.from('companies').insert({
        company_name: companyName,
        contact_name: form.contact_name.value.trim(),
        contact_emails: contactEmails,
        created_by: State.profile.id
      }).select().single();
      if (error) throw error;
      companyId = data.id;
    }

    const status = form.status.value;
    const roundPayload = {
      company_id: companyId,
      status,
      responsible_person_id: form.responsible_person_id.value,
      responsible_user_id: State.profile.id,
      start_date: form.start_date.value,
      end_date: FINAL_STATUSES.has(status) ? todayISO() : form.end_date.value,
      renewal_no: Number(form.renewal_no.value || 0),
      updated_at: new Date().toISOString()
    };

    let roundId = editId;
    if (editId) {
      const { error } = await State.sb.from('demo_rounds').update(roundPayload).eq('id', editId);
      if (error) throw error;
    } else {
      if (renewFromId) {
        await closeRenewedRound(renewFromId);
      }

      const { data, error } = await State.sb.from('demo_rounds').insert({
        ...roundPayload,
        created_by: State.profile.id,
        renewed_from_round_id: renewFromId || null
      }).select().single();
      if (error) throw error;
      roundId = data.id;
    }

    await replaceRoundModules(roundId, selectedModules);
    await replaceAccounts(roundId, accounts);

    const message = form.activity_message.value.trim();
    if (message) {
      await insertActivityLog({
        company_id: companyId,
        demo_round_id: roundId,
        message
      });
    } else if (!editId) {
      await insertActivityLog({
        company_id: companyId,
        demo_round_id: roundId,
        log_type: renewFromId ? 'ต่ออายุ demo' : DEFAULT_LOG_TYPE,
        source: 'system',
        message: renewFromId ? 'สร้างรอบเดโมใหม่จากการต่ออายุ' : 'สร้างรายการเดโมใหม่'
      });
    }

    if (FINAL_STATUSES.has(status)) {
      await cleanupClosedRoundLogs(roundId);
    }

    clearDemoDraft(form.dataset.draftKey || '');
    await loadAllData();
    toast('บันทึกเดโมสำเร็จ', 'success');
    location.hash = `#demos/${roundId}`;
  }

  function collectDemoAccounts(form, { includeEmpty = false } = {}) {
    const rows = $$('[data-account-row]', form);
    let accounts = rows.map((row) => ({
      login_email: $('[name="account_login_email"]', row)?.value.trim() || '',
      password: $('[name="account_password"]', row)?.value || '',
      note: $('[name="account_note"]', row)?.value.trim() || ''
    }));

    if (!accounts.length) {
      const emails = $$('[name="account_login_email"]', form);
      const passwords = $$('[name="account_password"]', form);
      const notes = $$('[name="account_note"]', form);
      const length = Math.max(emails.length, passwords.length, notes.length);

      accounts = Array.from({ length }, (_item, index) => ({
        login_email: emails[index]?.value.trim() || '',
        password: passwords[index]?.value || '',
        note: notes[index]?.value.trim() || ''
      }));
    }

    return accounts
      .map((account) => ({
        login_email: account.login_email,
        password: account.password,
        note: account.note || null
      }))
      .filter((account) => includeEmpty || account.login_email || account.password || account.note);
  }

  function validateDemoForm(form, emails, modules, accounts) {
    if (!form.company_name.value.trim()) throw new Error('กรุณากรอกชื่อบริษัท');
    if (!form.contact_name.value.trim()) throw new Error('กรุณากรอกชื่อผู้ติดต่อ');
    if (!emails.length) throw new Error('กรุณาเพิ่มอีเมลผู้ติดต่ออย่างน้อย 1 รายการ');
    const invalidEmails = emails.filter((email) => !isEmail(email));
    if (invalidEmails.length) throw new Error(`รูปแบบอีเมลไม่ถูกต้อง: ${invalidEmails.join(', ')}`);
    if (!form.responsible_person_id.value) throw new Error('กรุณาเลือกผู้รับผิดชอบ');
    if (!modules.length) throw new Error('กรุณาเลือกโมดูลอย่างน้อย 1 รายการ');
    if (!accounts.length) throw new Error('กรุณาเพิ่มบัญชีเดโมอย่างน้อย 1 รายการ');
    for (const account of accounts) {
      if (!isEmail(account.login_email || '')) throw new Error(`อีเมลบัญชีเดโมไม่ถูกต้อง: ${account.login_email || '-'}`);
      if (!account.password) throw new Error(`กรุณากรอกรหัสผ่านของ ${account.login_email}`);
    }
    if (form.end_date.value < form.start_date.value) throw new Error('วันที่สิ้นสุดต้องไม่ก่อนวันที่เริ่ม');
  }

  async function replaceRoundModules(roundId, moduleIds) {
    const { error: deleteError } = await State.sb.from('demo_round_modules').delete().eq('demo_round_id', roundId);
    if (deleteError) throw deleteError;

    if (!moduleIds.length) return;
    const rows = moduleIds.map((module_id) => ({ demo_round_id: roundId, module_id }));
    const { error } = await State.sb.from('demo_round_modules').insert(rows);
    if (error) throw error;
  }

  async function replaceAccounts(roundId, accounts) {
    const { error: deleteError } = await State.sb.from('demo_accounts').delete().eq('demo_round_id', roundId);
    if (deleteError) throw deleteError;

    if (!accounts.length) return;
    const rows = accounts.map((account) => ({ ...account, demo_round_id: roundId }));
    const { error } = await State.sb.from('demo_accounts').insert(rows);
    if (error) throw error;
  }

  async function closeDemoRound(roundId) {
    const row = getDemoRow(roundId);
    if (!row) {
      toast('ไม่พบรายการเดโม', 'error');
      return;
    }

    if (!canCloseDemoRound(row)) {
      toast('ปิดได้เฉพาะรายการที่ถึงวันสิ้นสุดแล้วและยังไม่ปิดรายการ', 'warning');
      return;
    }

    if (!window.confirm(`ปิดรายการเดโมของ ${row.company.company_name} หรือไม่?`)) return;

    const { error } = await State.sb.from('demo_rounds').update({
      status: STATUS.CLOSED,
      updated_at: new Date().toISOString()
    }).eq('id', roundId);
    if (error) throw error;

    await insertActivityLog({
      company_id: row.company.id,
      demo_round_id: row.round.id,
      log_type: 'เปลี่ยนสถานะ',
      source: 'system',
      message: 'ปิดรายการเดโม'
    }).catch(() => undefined);

    await cleanupClosedRoundLogs(roundId);
    await loadAllData();
    render();
    toast('ปิดรายการแล้ว', 'success');
  }

  async function closeRenewedRound(roundId) {
    const { error } = await State.sb.from('demo_rounds').update({
      status: STATUS.CLOSED,
      end_date: todayISO(),
      updated_at: new Date().toISOString()
    }).eq('id', roundId);
    if (error) throw error;

    await cleanupClosedRoundLogs(roundId);
  }

  async function cleanupClosedRoundLogs(roundId) {
    if (!roundId) return;

    const { data, error } = await State.sb
      .from('activity_logs')
      .select('id, created_at')
      .eq('demo_round_id', roundId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('load logs for cleanup skipped:', safeError(error));
      return;
    }

    const logs = data || [];
    if (logs.length <= 1) return;

    const idsToDelete = logs.slice(1).map((log) => log.id);
    const { error: deleteError } = await State.sb
      .from('activity_logs')
      .delete()
      .in('id', idsToDelete);

    if (deleteError) {
      console.warn('cleanup logs skipped:', safeError(deleteError));
      toast('ล้างบันทึกเก่าไม่สำเร็จ กรุณาตรวจ SQL policy v1.1.2', 'warning');
    }
  }

  async function addActivityLog(form) {
    const message = form.message.value.trim();
    if (!message) throw new Error('กรุณากรอกรายละเอียดบันทึก');

    await insertActivityLog({
      company_id: form.dataset.companyId,
      demo_round_id: form.dataset.roundId,
      message
    });

    form.reset();
    await loadAllData();
    render();
    toast('เพิ่มบันทึกแล้ว', 'success');
  }

  async function insertActivityLog(payload) {
    const { error } = await State.sb.from('activity_logs').insert({
      log_type: payload.log_type || DEFAULT_LOG_TYPE,
      source: payload.source || 'manual',
      ...payload,
      created_by: State.profile.id
    });
    if (error) throw error;
  }

  async function editLog(id) {
    const log = State.activityLogs.find((item) => item.id === id);
    if (!log) return;

    if (!canModifyLog(log)) {
      toast('แก้ไขได้เฉพาะบันทึกล่าสุดเท่านั้น', 'error');
      return;
    }

    const message = window.prompt('แก้ไขข้อความบันทึก', log.message);
    if (message === null) return;
    if (!message.trim()) {
      toast('ข้อความบันทึกห้ามว่าง', 'warning');
      return;
    }

    const { error } = await State.sb.from('activity_logs').update({
      message: message.trim(),
      updated_at: new Date().toISOString()
    }).eq('id', id);
    if (error) throw error;

    await loadAllData();
    render();
    toast('แก้ไขบันทึกแล้ว', 'success');
  }

  async function deleteLog(id) {
    const log = State.activityLogs.find((item) => item.id === id);
    if (!log) return;

    if (!canModifyLog(log)) {
      toast('ลบได้เฉพาะบันทึกล่าสุดเท่านั้น', 'error');
      return;
    }

    if (!window.confirm('ลบบันทึกนี้หรือไม่?')) return;

    const { error } = await State.sb.from('activity_logs').update({
      deleted_at: new Date().toISOString()
    }).eq('id', id);
    if (error) throw error;

    await loadAllData();
    render();
    toast('ลบบันทึกแล้ว', 'success');
  }

  async function softDeleteDemo(roundId) {
    const row = getDemoRow(roundId);
    if (!row) return;
    if (!canSoftDelete(row)) {
      toast('ไม่มีสิทธิ์ลบรายการนี้', 'error');
      return;
    }

    if (!window.confirm(`ลบเดโมของ ${row.company.company_name} หรือไม่?`)) return;

    const { error } = await State.sb.from('demo_rounds').update({
      deleted_at: new Date().toISOString()
    }).eq('id', roundId);
    if (error) throw error;

    await insertActivityLog({
      company_id: row.company.id,
      demo_round_id: row.round.id,
      log_type: 'หมายเหตุทั่วไป',
      source: 'system',
      message: 'ลบรอบเดโมแบบ soft delete'
    }).catch(() => undefined);

    await loadAllData();
    render();
    toast('ลบเดโมแล้ว', 'success');
  }

  function openEmailPreview(roundId, type = 'first_demo_email') {
    const row = getDemoRow(roundId);
    if (!row) return toast('ไม่พบรอบเดโม', 'error');
    if (type === 'first_demo_email' && !canShowFirstEmailAction(row)) {
      toast('อีเมลแจ้งข้อมูลเดโมถูกส่งแล้ว', 'warning');
      return;
    }

    const tpl = getTemplate(type);
    const rendered = renderEmail(row, tpl);
    const responsibleEmail = row.responsible?.email ? [row.responsible.email] : [];
    const fixedCc = Array.isArray(State.settings.fixed_cc_emails) ? State.settings.fixed_cc_emails : [];
    const cc = unique([...responsibleEmail, ...fixedCc].filter(Boolean));

    showModal(`
      <header>
        <div>
          <strong>ตัวอย่างอีเมล</strong>
          <div class="muted small-text">${escapeHTML(tpl.name || type)}</div>
        </div>
        <button class="btn small ghost" data-action="modal-close">ปิด</button>
      </header>
      <main class="grid">
        <div><strong>ถึง:</strong> ${escapeHTML((row.company.contact_emails || []).join(', '))}</div>
        <div><strong>สำเนาถึง:</strong> ${escapeHTML(cc.join(', ') || '-')}</div>
        <div><strong>หัวข้อ:</strong> ${escapeHTML(rendered.subject)}</div>
        <div class="email-preview">${escapeHTML(rendered.body)}</div>
      </main>
      <footer>
        <button class="btn ghost" data-action="modal-close">ยกเลิก</button>
        <button class="btn primary" data-action="email-send" data-id="${roundId}" data-type="${escapeAttr(type)}">ส่งอีเมล</button>
      </footer>
    `);
  }

  async function sendPreviewEmail(roundId, type = 'first_demo_email') {
    const row = getDemoRow(roundId);
    if (!row) return;
    if (type === 'first_demo_email' && !canShowFirstEmailAction(row)) {
      toast('อีเมลแจ้งข้อมูลเดโมถูกส่งแล้ว', 'warning');
      return;
    }

    const tpl = getTemplate(type);
    const rendered = renderEmail(row, tpl);
    const responsibleEmail = row.responsible?.email ? [row.responsible.email] : [];
    const fixedCc = Array.isArray(State.settings.fixed_cc_emails) ? State.settings.fixed_cc_emails : [];
    const cc = unique([...responsibleEmail, ...fixedCc].filter(Boolean));

    const { data, error } = await State.sb.from('email_logs').insert({
      demo_round_id: row.round.id,
      email_type: type,
      to_emails: row.company.contact_emails || [],
      cc_emails: cc,
      subject: rendered.subject,
      body: rendered.body,
      sent_status: 'queued',
      sent_by: State.profile.id
    }).select().single();
    if (error) throw error;

    let status = 'queued';
    let errorMessage = null;
    const endpoint = State.settings.apps_script_url || APP_CONFIG.APPS_SCRIPT_URL;

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            email_log_id: data.id,
            access_token: State.session?.access_token || '',
            app_version: APP_VERSION
          })
        });
        const result = await res.json().catch(() => ({}));
        if (!res.ok || result.ok === false) {
          throw new Error(result.error || `Apps Script HTTP ${res.status}`);
        }
        status = 'sent';
      } catch (err) {
        status = 'error';
        errorMessage = safeError(err);
      }
    }

    const updatePayload = {
      sent_status: status,
      error_message: errorMessage,
      sent_at: status === 'sent' ? new Date().toISOString() : null
    };
    await State.sb.from('email_logs').update(updatePayload).eq('id', data.id);

    if (type === 'first_demo_email' && status !== 'error') {
      await State.sb.from('demo_rounds').update({ first_email_sent_at: new Date().toISOString() }).eq('id', row.round.id);
    }

    await insertActivityLog({
      company_id: row.company.id,
      demo_round_id: row.round.id,
      log_type: 'ส่งอีเมล',
      source: 'system',
      message: status === 'sent'
        ? `ส่งอีเมล ${tpl.name || type} แล้ว`
        : status === 'queued'
          ? `บันทึกคิวอีเมล ${tpl.name || type} แล้ว`
          : `ส่งอีเมลไม่สำเร็จ: ${errorMessage}`
    }).catch(() => undefined);

    closeModal();
    await loadAllData();
    render();

    if (status === 'sent') toast('ส่งอีเมลสำเร็จ', 'success');
    else if (status === 'queued') toast('บันทึกคิวอีเมลแล้ว', 'warning');
    else toast(`ส่งอีเมลไม่สำเร็จ: ${errorMessage}`, 'error');
  }

  async function queueReminderEmails() {
    const dueRows = getDemoRows().filter((row) => {
      return !row.round.reminder_email_sent_at
        && !FINAL_STATUSES.has(row.effectiveStatus)
        && row.remainingDays === 3;
    });

    if (!dueRows.length) {
      toast('ไม่มีรายการที่ต้องส่งอีเมลเตือนวันนี้', 'success');
      return;
    }

    for (const row of dueRows) {
      const tpl = getTemplate('expiry_reminder_email');
      const rendered = renderEmail(row, tpl);
      const responsibleEmail = row.responsible?.email ? [row.responsible.email] : [];
      const fixedCc = Array.isArray(State.settings.fixed_cc_emails) ? State.settings.fixed_cc_emails : [];
      const cc = unique([...responsibleEmail, ...fixedCc].filter(Boolean));

      const { error } = await State.sb.from('email_logs').insert({
        demo_round_id: row.round.id,
        email_type: 'expiry_reminder_email',
        to_emails: row.company.contact_emails || [],
        cc_emails: cc,
        subject: rendered.subject,
        body: rendered.body,
        sent_status: 'queued',
        sent_by: State.profile.id
      });
      if (error) throw error;

      await State.sb.from('demo_rounds').update({ reminder_email_sent_at: new Date().toISOString() }).eq('id', row.round.id);
      await insertActivityLog({
        company_id: row.company.id,
        demo_round_id: row.round.id,
        log_type: 'ส่งอีเมล',
        source: 'system',
        message: 'สร้างคิวอีเมลเตือนก่อนหมดอายุ 3 วัน'
      }).catch(() => undefined);
    }

    await loadAllData();
    render();
    toast(`สร้างคิวอีเมลเตือนแล้ว ${dueRows.length} รายการ`, 'success');
  }

  async function saveResponsiblePerson(form) {
    const id = form.id.value;
    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim() || null,
      is_active: form.is_active ? form.is_active.value === 'true' : true,
      updated_at: new Date().toISOString()
    };

    if (!payload.name) throw new Error('กรุณากรอกชื่อผู้รับผิดชอบ');
    if (!isEmail(payload.email)) throw new Error('อีเมลผู้รับผิดชอบไม่ถูกต้อง');

    const query = id
      ? State.sb.from('responsible_people').update(payload).eq('id', id)
      : State.sb.from('responsible_people').insert(payload);

    const { error } = await query;
    if (error) throw error;

    form.reset();
    await loadAllData();
    render();
    toast('บันทึกผู้รับผิดชอบแล้ว', 'success');
  }

  async function toggleResponsiblePerson(id, isActive) {
    const { error } = await State.sb.from('responsible_people').update({
      is_active: !isActive,
      updated_at: new Date().toISOString()
    }).eq('id', id);
    if (error) throw error;
    await loadAllData();
    render();
    toast('อัปเดตผู้รับผิดชอบแล้ว', 'success');
  }

  
  async function deleteResponsiblePerson(id) {
    const person = State.responsiblePeople.find((item) => item.id === id);
    if (!person) return;

    const usageCount = getResponsibleUsageCount(id);
    if (usageCount > 0) {
      toast('ลบไม่ได้ เพราะผู้รับผิดชอบนี้ถูกใช้งานอยู่', 'error');
      return;
    }

    if (!window.confirm(`ลบผู้รับผิดชอบ "${person.name}" หรือไม่?`)) return;

    const { error } = await State.sb.from('responsible_people').delete().eq('id', id);
    if (error) throw error;

    await loadAllData();
    render();
    toast('ลบผู้รับผิดชอบแล้ว', 'success');
  }

  function getResponsibleUsageCount(personId) {
    return State.rounds.filter((round) => getRoundResponsiblePersonId(round) === personId).length;
  }

async function saveModule(form) {
    const id = form.id.value;
    const payload = {
      name: form.name.value.trim(),
      description: form.description?.value.trim() || null,
      sort_order: Number(form.sort_order?.value || 100),
      is_active: form.is_active ? form.is_active.value === 'true' : true,
      updated_at: new Date().toISOString()
    };

    if (!payload.name) throw new Error('กรุณากรอกชื่อโมดูล');

    const query = id
      ? State.sb.from('modules').update(payload).eq('id', id)
      : State.sb.from('modules').insert(payload);

    const { error } = await query;
    if (error) throw error;

    form.reset();
    await loadAllData();
    render();
    toast('บันทึกโมดูลแล้ว', 'success');
  }

  async function toggleModule(id, isActive) {
    const { error } = await State.sb.from('modules').update({
      is_active: !isActive,
      updated_at: new Date().toISOString()
    }).eq('id', id);
    if (error) throw error;
    await loadAllData();
    render();
    toast('อัปเดตโมดูลแล้ว', 'success');
  }


  async function deleteModule(id) {
    const module = State.modules.find((item) => item.id === id);
    if (!module) return;

    const usageCount = getModuleUsageCount(id);
    if (usageCount > 0) {
      toast('ลบไม่ได้ เพราะโมดูลนี้ถูกใช้งานอยู่', 'error');
      return;
    }

    if (!window.confirm(`ลบโมดูล "${module.name}" หรือไม่?`)) return;

    const { error } = await State.sb.from('modules').delete().eq('id', id);
    if (error) throw error;

    await loadAllData();
    render();
    toast('ลบโมดูลแล้ว', 'success');
  }

  function getModuleUsageCount(moduleId) {
    return State.roundModules.filter((item) => item.module_id === moduleId).length;
  }

  async function saveProfileAdmin(form) {
    const id = form.id.value;
    const fullName = form.full_name.value.trim();
    const role = form.role.value;
    const isActive = form.is_active.value === 'true';
    const avatarDataUri = form.avatar_data_uri?.value.trim() || '';

    if (avatarDataUri && !isValidLogoDataUri(avatarDataUri)) {
      throw new Error('รูปโปรไฟล์ไม่ถูกต้อง รองรับเฉพาะ PNG, JPG หรือ WebP');
    }

    if (avatarDataUri && avatarDataUri.length > 420000) {
      throw new Error('รูปโปรไฟล์ใหญ่เกินไป กรุณาเลือกไฟล์ไม่เกิน 300KB');
    }

    const { error } = await State.sb.from('profiles').update({
      full_name: fullName,
      role,
      is_active: isActive,
      avatar_data_uri: avatarDataUri || null
    }).eq('id', id);
    if (error) throw error;

    await loadAllData();
    render();
    toast('บันทึกผู้ใช้แล้ว', 'success');
  }

  async function saveEmailTemplate(form) {
    const { error } = await State.sb.from('email_templates').update({
      subject: form.subject.value,
      body: form.body.value,
      updated_by: State.profile.id,
      updated_at: new Date().toISOString()
    }).eq('id', form.id.value);
    if (error) throw error;

    await loadAllData();
    render();
    toast('บันทึกเทมเพลตแล้ว', 'success');
  }

  async function resetTemplate(key) {
    const defaults = defaultTemplates();
    const tpl = defaults[key];
    if (!tpl) return;

    const { error } = await State.sb.from('email_templates').update({
      subject: tpl.subject,
      body: tpl.body,
      updated_by: State.profile.id,
      updated_at: new Date().toISOString()
    }).eq('template_key', key);
    if (error) throw error;

    await loadAllData();
    render();
    toast('คืนค่าเทมเพลตแล้ว', 'success');
  }


  async function saveBrandSettings(form) {
    const logoValue = form.brand_logo_data_uri?.value.trim() || '';
    if (logoValue && !isValidLogoDataUri(logoValue)) {
      throw new Error('ไฟล์โลโก้ไม่ถูกต้อง รองรับเฉพาะ PNG, JPG หรือ WebP');
    }

    if (logoValue && logoValue.length > 420000) {
      throw new Error('ไฟล์โลโก้ใหญ่เกินไป กรุณาเลือกไฟล์ไม่เกิน 300KB');
    }

    const { error } = await State.sb.from('settings').upsert({
      key: 'brand_logo_data_uri',
      value: logoValue,
      updated_by: State.profile.id
    }, { onConflict: 'key' });

    if (error) throw error;

    cacheBrandLogo(logoValue);
    syncBrandAssets();
    await loadAllData();
    render();
    toast('บันทึกโลโก้แล้ว', 'success');
  }

  async function resetBrandLogo() {
    if (!window.confirm('คืนค่าโลโก้เริ่มต้นหรือไม่?')) return;

    const { error } = await State.sb.from('settings').upsert({
      key: 'brand_logo_data_uri',
      value: '',
      updated_by: State.profile.id
    }, { onConflict: 'key' });

    if (error) throw error;

    cacheBrandLogo('');
    syncBrandAssets();
    await loadAllData();
    render();
    toast('คืนค่าโลโก้เริ่มต้นแล้ว', 'success');
  }

  async function previewLogoUpload(input) {
    const file = input.files?.[0];
    if (!file) return;

    const allowed = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowed.includes(file.type)) {
      input.value = '';
      toast('รองรับเฉพาะ PNG, JPG หรือ WebP', 'warning');
      return;
    }

    if (file.size > 300 * 1024) {
      input.value = '';
      toast('ไฟล์โลโก้ต้องไม่เกิน 300KB', 'warning');
      return;
    }

    const dataUri = await readFileAsDataURL(file);
    const form = input.closest('form');
    const hidden = form?.querySelector('[name="brand_logo_data_uri"]');
    const preview = form?.querySelector('[data-logo-preview]');
    const fileName = form?.querySelector('[data-logo-file-name]');

    if (hidden) hidden.value = dataUri;
    if (preview) preview.src = dataUri;
    if (fileName) fileName.textContent = `${file.name} · ${(file.size / 1024).toFixed(1)} KB`;
  }

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('อ่านไฟล์ไม่สำเร็จ'));
      reader.readAsDataURL(file);
    });
  }

  async function saveSettings(form) {
    const fixedCc = getChipValues(form, 'fixed_cc_emails');
    const invalid = fixedCc.filter((email) => !isEmail(email));
    if (invalid.length) throw new Error(`อีเมล CC ไม่ถูกต้อง: ${invalid.join(', ')}`);

    const appsScriptUrl = form.apps_script_url.value.trim();

    const rows = [
      { key: 'fixed_cc_emails', value: fixedCc, updated_by: State.profile.id },
      { key: 'apps_script_url', value: appsScriptUrl, updated_by: State.profile.id }
    ];

    for (const row of rows) {
      const { error } = await State.sb.from('settings').upsert(row, { onConflict: 'key' });
      if (error) throw error;
    }

    await loadAllData();
    render();
    toast('บันทึกการตั้งค่าแล้ว', 'success');
  }

  function resetDashboardPages() {
    State.dashboardPages = {
      near7: 1,
      expired: 1,
      latest: 1,
      customers: 1
    };
  }

  function changePage(button) {
    const scope = button.dataset.pageScope;
    const key = button.dataset.pageKey || '';
    const page = Math.max(1, Number(button.dataset.page || 1));

    if (scope === 'dashboard') {
      State.dashboardPages[key] = page;
    } else if (scope === 'demo') {
      State.demoPage = page;
    } else if (scope === 'report') {
      State.reportPage = page;
    }

    render();
  }

  function paginateRows(rows, page, pageSize) {
    const totalRows = rows.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
    const safePage = Math.min(Math.max(Number(page) || 1, 1), totalPages);
    const start = (safePage - 1) * pageSize;

    return {
      rows: rows.slice(start, start + pageSize),
      page: safePage,
      totalPages,
      totalRows
    };
  }

  function renderPagination(scope, key, page, totalPages, totalRows) {
    if (totalPages <= 1) {
      return `<div class="pagination-summary">${totalRows.toLocaleString('th-TH')} รายการ</div>`;
    }

    const prevPage = Math.max(1, page - 1);
    const nextPage = Math.min(totalPages, page + 1);
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let current = start; current <= end; current += 1) {
      pages.push(current);
    }

    return `
      <div class="pagination">
        <span class="pagination-summary">${totalRows.toLocaleString('th-TH')} รายการ · หน้า ${page.toLocaleString('th-TH')} / ${totalPages.toLocaleString('th-TH')}</span>
        <div class="pagination-buttons">
          <button class="btn small ghost" data-action="page-change" data-page-scope="${escapeAttr(scope)}" data-page-key="${escapeAttr(key)}" data-page="${prevPage}" ${page <= 1 ? 'disabled' : ''}>ก่อนหน้า</button>
          ${pages.map((item) => `
            <button class="btn small ${item === page ? 'primary' : 'ghost'}" data-action="page-change" data-page-scope="${escapeAttr(scope)}" data-page-key="${escapeAttr(key)}" data-page="${item}">
              ${item.toLocaleString('th-TH')}
            </button>
          `).join('')}
          <button class="btn small ghost" data-action="page-change" data-page-scope="${escapeAttr(scope)}" data-page-key="${escapeAttr(key)}" data-page="${nextPage}" ${page >= totalPages ? 'disabled' : ''}>ถัดไป</button>
        </div>
      </div>
    `;
  }

  function getAllDemoRows() {
    const accumulatedDaysByCompany = new Map();

    for (const round of State.rounds) {
      if (!round?.company_id) continue;
      const roundDays = Math.max(daysBetween(round.start_date, round.end_date) + 1, 0);
      accumulatedDaysByCompany.set(
        round.company_id,
        (accumulatedDaysByCompany.get(round.company_id) || 0) + roundDays
      );
    }

    return State.rounds
      .map((round) => {
        const company = State.companies.find((item) => item.id === round.company_id);
        if (!company) return null;

        const roundModuleIds = State.roundModules
          .filter((item) => item.demo_round_id === round.id)
          .map((item) => item.module_id);

        const modules = State.modules.filter((module) => roundModuleIds.includes(module.id));
        const accounts = State.accounts.filter((account) => account.demo_round_id === round.id);
        const responsible = findResponsiblePerson(round.responsible_person_id) || findProfile(round.responsible_user_id);
        const logs = State.activityLogs
          .filter((log) => log.company_id === company.id && isManualLog(log))
          .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        const effectiveStatus = computeStatus(round);
        const totalDays = Math.max(daysBetween(round.start_date, round.end_date) + 1, 0);
        const remainingDays = daysBetween(todayISO(), round.end_date);
        const accumulatedDays = accumulatedDaysByCompany.get(company.id) || totalDays;

        return {
          company,
          round,
          modules,
          accounts,
          responsible,
          latestLog: logs[0] || null,
          effectiveStatus,
          totalDays,
          accumulatedDays,
          remainingDays
        };
      })
      .filter(Boolean);
  }

  function getDemoRows() {
    const latestByCompany = new Map();

    for (const row of getAllDemoRows()) {
      const current = latestByCompany.get(row.company.id);
      if (!current || compareRoundLatest(row, current) < 0) {
        latestByCompany.set(row.company.id, row);
      }
    }

    return [...latestByCompany.values()];
  }

  function compareRoundLatest(a, b) {
    const dateA = new Date(a.round.created_at || a.round.updated_at || a.round.start_date || 0).getTime();
    const dateB = new Date(b.round.created_at || b.round.updated_at || b.round.start_date || 0).getTime();
    if (dateA !== dateB) return dateB - dateA;

    const renewalA = Number(a.round.renewal_no || 0);
    const renewalB = Number(b.round.renewal_no || 0);
    if (renewalA !== renewalB) return renewalB - renewalA;

    const endA = new Date(`${a.round.end_date || '1970-01-01'}T00:00:00`).getTime();
    const endB = new Date(`${b.round.end_date || '1970-01-01'}T00:00:00`).getTime();
    return endB - endA;
  }

  function getFilteredRows() {
    const search = normalize(State.filters.search);
    let rows = getDemoRows().filter((row) => {
      const haystack = normalize([
        row.company.company_name,
        row.company.contact_name,
        ...(row.company.contact_emails || []),
        row.effectiveStatus,
        displayName(row.responsible),
        row.responsible?.email,
        row.responsible?.phone,
        ...row.modules.map((module) => module.name),
        ...row.accounts.map((account) => account.login_email),
        row.latestLog?.message
      ].filter(Boolean).join(' '));

      if (search && !haystack.includes(search)) return false;
      if (State.filters.status && row.effectiveStatus !== State.filters.status) return false;
      if (State.filters.responsible && row.round.responsible_person_id !== State.filters.responsible) return false;
      if (State.filters.module && !row.modules.some((module) => module.id === State.filters.module)) return false;
      if (State.filters.nearOnly && !(row.remainingDays >= 0 && row.remainingDays <= 7 && !FINAL_STATUSES.has(row.effectiveStatus))) return false;
      return true;
    });

    rows = sortRows(rows, State.filters.sort);
    return rows;
  }

  function sortRows(rows, sortKey) {
    const cloned = [...rows];
    const compareText = (a, b) => String(a || '').localeCompare(String(b || ''), 'th');
    const compareDate = (a, b) => new Date(a || 0) - new Date(b || 0);

    switch (sortKey) {
      case 'created_desc':
        return cloned.sort((a, b) => compareDate(b.round.created_at, a.round.created_at));
      case 'start_asc':
        return cloned.sort((a, b) => compareDate(a.round.start_date, b.round.start_date));
      case 'end_asc':
        return cloned.sort((a, b) => compareDate(a.round.end_date, b.round.end_date));
      case 'remaining_asc':
        return cloned.sort((a, b) => a.remainingDays - b.remainingDays);
      case 'company_asc':
        return cloned.sort((a, b) => compareText(a.company.company_name, b.company.company_name));
      case 'status_asc':
        return cloned.sort((a, b) => compareText(a.effectiveStatus, b.effectiveStatus));
      case 'updated_desc':
      default:
        return cloned.sort((a, b) => compareDate(b.round.updated_at, a.round.updated_at));
    }
  }

  function getDemoRow(roundId) {
    return getAllDemoRows().find((row) => row.round.id === roundId);
  }

  function countByStatus(rows) {
    const counts = {};
    for (const row of rows) {
      counts[row.effectiveStatus] = (counts[row.effectiveStatus] || 0) + 1;
    }
    return counts;
  }

  function countByModule(rows) {
    const counts = {};
    for (const row of rows) {
      for (const module of row.modules) {
        counts[module.name] = (counts[module.name] || 0) + 1;
      }
    }
    return counts;
  }

  function barChart(counts, totalCount = 0) {
    const entries = Object.entries(counts || {}).sort((a, b) => b[1] - a[1]);
    if (!entries.length) return '<div class="empty">ไม่มีข้อมูล</div>';

    const denominator = Math.max(Number(totalCount) || 0, 1);
    return `
      <div class="bar-list" style="margin-top:14px">
        ${entries.map(([label, value]) => {
          const percent = Math.max(0, Math.min(100, Math.round((Number(value || 0) / denominator) * 100)));
          return `
            <div class="bar-row">
              <div class="bar-label" title="${escapeAttr(label)}">${escapeHTML(label)}</div>
              <div class="bar-track" title="${value} จาก ${denominator}">
                <div class="bar-fill" style="--w:${percent}%"></div>
              </div>
              <strong>${value}</strong>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }


  function getCompanyReportRows() {
    return getDemoRows()
      .map((row) => {
        const latestLog = getLatestCompanyLog(row.company.id);

        return {
          ...row,
          latestLog,
          latestLogAt: latestLog?.created_at || '',
          hasManualLog: Boolean(latestLog)
        };
      })
      .sort((a, b) => {
        if (a.hasManualLog !== b.hasManualLog) return a.hasManualLog ? -1 : 1;

        if (a.hasManualLog && b.hasManualLog) {
          const dateA = new Date(a.latestLogAt || 0).getTime();
          const dateB = new Date(b.latestLogAt || 0).getTime();
          if (dateA !== dateB) return dateB - dateA;
        }

        return String(a.company.company_name || '').localeCompare(String(b.company.company_name || ''), 'th');
      });
  }

  function getFilteredCompanyReportRows() {
    const search = normalize(State.reportSearch);
    const rows = getCompanyReportRows();

    if (!search) return rows;

    return rows.filter((row) => {
      const haystack = normalize([
        row.company.company_name,
        row.company.contact_name,
        ...(row.company.contact_emails || []),
        displayName(row.responsible),
        row.responsible?.email,
        row.responsible?.phone,
        row.effectiveStatus,
        ...row.modules.map((module) => module.name),
        row.latestLog?.message,
        row.latestLog?.log_type
      ].filter(Boolean).join(' '));

      return haystack.includes(search);
    });
  }

  function getLatestCompanyLog(companyId) {
    return State.activityLogs
      .filter((log) => log.company_id === companyId && isManualLog(log))
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))[0] || null;
  }

  function exportCompanyReportRows() {
    const rows = getFilteredCompanyReportRows();
    const data = rows.map((row) => ({
      'ชื่อบริษัท': row.company.company_name,
      'ชื่อผู้ติดต่อ': row.company.contact_name || '',
      'อีเมลผู้ติดต่อ': (row.company.contact_emails || []).join(', '),
      'สถานะปัจจุบัน': row.effectiveStatus,
      'ผู้รับผิดชอบ': displayName(row.responsible),
      'อีเมลผู้รับผิดชอบ': row.responsible?.email || '',
      'เบอร์ผู้รับผิดชอบ': row.responsible?.phone || '',
      'วันที่เริ่มเดโมล่าสุด': formatDate(row.round.start_date),
      'วันที่สิ้นสุดเดโมล่าสุด': formatDate(row.round.end_date),
      'โมดูล': row.modules.map((module) => module.name).join(', '),
      'จำนวนครั้งที่ต่ออายุ': row.round.renewal_no || 0,
      'บันทึกล่าสุด': row.latestLog?.message || '',
      'วันที่บันทึกล่าสุด': row.latestLog ? formatDateTime(row.latestLog.created_at) : '',
      'ผู้บันทึกล่าสุด': displayName(findProfile(row.latestLog?.created_by))
    }));

    const filename = `demo-crm-company-report-${todayISO()}.xlsx`;

    if (window.XLSX) {
      const wb = window.XLSX.utils.book_new();
      const ws = window.XLSX.utils.json_to_sheet(data);
      window.XLSX.utils.book_append_sheet(wb, ws, 'Company Report');
      window.XLSX.writeFile(wb, filename);
      return;
    }

    downloadText(filename.replace('.xlsx', '.csv'), toCSV(data), 'text/csv;charset=utf-8');
  }


  function exportDemoRows(forceAll = false) {
    const filtered = hasActiveDemoFilters();
    const rows = forceAll
      ? getDemoRows()
      : filtered
        ? getFilteredRows()
        : sortRows(getDemoRows(), State.filters.sort);

    const data = rows.map((row) => ({
      'ชื่อบริษัท': row.company.company_name,
      'ชื่อผู้ติดต่อ': row.company.contact_name,
      'อีเมลผู้ติดต่อ': (row.company.contact_emails || []).join(', '),
      'สถานะ': row.effectiveStatus,
      'ผู้รับผิดชอบ': displayName(row.responsible),
      'วันที่เริ่ม': formatDate(row.round.start_date),
      'วันที่สิ้นสุด': formatDate(row.round.end_date),
      'วันรอบนี้': row.totalDays,
      'จำนวนวันคงเหลือ': Math.max(row.remainingDays, 0),
      'วันสะสมทั้งหมด': row.accumulatedDays,
      'โมดูล': row.modules.map((m) => m.name).join(', '),
      'บัญชีเดโม': row.accounts.map((a) => a.login_email).join(', '),
      'จำนวนครั้งที่ต่ออายุ': row.round.renewal_no || 0,
      'วันที่ส่งอีเมลครั้งแรก': row.round.first_email_sent_at ? formatDateTime(row.round.first_email_sent_at) : '',
      'วันที่ส่งอีเมลเตือน': row.round.reminder_email_sent_at ? formatDateTime(row.round.reminder_email_sent_at) : '',
      'วันที่สร้างรายการ': row.round.created_at ? formatDateTime(row.round.created_at) : '',
      'วันที่แก้ไขล่าสุด': row.round.updated_at ? formatDateTime(row.round.updated_at) : '',
      'บันทึกล่าสุด': row.latestLog?.message || ''
    }));

    const filename = `demo-crm-report-${filtered ? 'filtered' : 'all'}-${todayISO()}.xlsx`;

    if (window.XLSX) {
      const wb = window.XLSX.utils.book_new();
      const ws = window.XLSX.utils.json_to_sheet(data);
      window.XLSX.utils.book_append_sheet(wb, ws, 'Demo CRM');
      window.XLSX.writeFile(wb, filename);
      return;
    }

    downloadText(filename.replace('.xlsx', '.csv'), toCSV(data), 'text/csv;charset=utf-8');
  }

  function hasActiveDemoFilters() {
    return Boolean(
      normalize(State.filters.search) ||
      State.filters.status ||
      State.filters.responsible ||
      State.filters.module ||
      State.filters.nearOnly
    );
  }

  function toCSV(rows) {
    if (!rows.length) return '';
    const headers = Object.keys(rows[0]);
    const quote = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    return [headers.map(quote).join(','), ...rows.map((row) => headers.map((h) => quote(row[h])).join(','))].join('\n');
  }

  function downloadText(filename, text, type) {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function renderEmail(row, template) {
    const accounts = row.accounts.map((acc, index) => {
      return `${index + 1}. อีเมล: ${acc.login_email}\n   รหัสผ่าน: ${acc.password}${acc.note ? `\n   หมายเหตุ: ${acc.note}` : ''}`;
    }).join('\n\n');

    const vars = {
      company_name: row.company.company_name,
      contact_name: row.company.contact_name,
      modules: row.modules.map((m) => m.name).join(', '),
      start_date: formatDate(row.round.start_date),
      end_date: formatDate(row.round.end_date),
      total_days: String(row.totalDays),
      remaining_days: String(Math.max(row.remainingDays, 0)),
      demo_accounts: accounts,
      responsible_name: displayName(row.responsible),
      responsible_email: row.responsible?.email || '',
      note: row.latestLog?.message || '-'
    };

    const replaceVars = (text) => String(text || '').replace(/\{\{(.*?)\}\}/g, (_match, key) => {
      return vars[String(key).trim()] ?? '';
    });

    return {
      subject: replaceVars(template.subject),
      body: replaceVars(template.body)
    };
  }

  function getTemplate(key) {
    const tpl = State.emailTemplates.find((item) => item.template_key === key);
    if (tpl) return tpl;
    return { template_key: key, ...defaultTemplates()[key] };
  }

  function defaultTemplates() {
    return {
      first_demo_email: {
        name: 'ส่งข้อมูล Demo ครั้งแรก',
        subject: 'แจ้งข้อมูลสำหรับทดลองใช้งานระบบ Demo',
        body: `เรียนคุณ {{contact_name}}

ทางทีมงานขอแจ้งข้อมูลสำหรับทดลองใช้งานระบบ Demo ของบริษัท {{company_name}} ตามรายละเอียดด้านล่าง

บริษัท: {{company_name}}
โมดูลที่เปิดให้ทดลองใช้งาน: {{modules}}
วันที่เริ่มใช้งาน: {{start_date}}
วันที่สิ้นสุดการทดลองใช้งาน: {{end_date}}
ระยะเวลาทดลองใช้งาน: {{total_days}} วัน

ข้อมูลบัญชีสำหรับเข้าใช้งาน:

{{demo_accounts}}

หมายเหตุเพิ่มเติม:
{{note}}

หากพบปัญหาในการเข้าใช้งาน หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อทีมงานได้ทางอีเมลฉบับนี้

ขอบคุณครับ/ค่ะ
ทีม Customer Support`
      },
      expiry_reminder_email: {
        name: 'เตือนก่อน Demo หมดอายุ',
        subject: 'แจ้งเตือน Demo ใกล้หมดอายุ',
        body: `เรียนคุณ {{contact_name}}

ทางทีมงานขอแจ้งเตือนว่า Demo ของบริษัท {{company_name}} จะหมดอายุในวันที่ {{end_date}}

รายละเอียด Demo:

บริษัท: {{company_name}}
โมดูลที่ทดลองใช้งาน: {{modules}}
วันที่เริ่มใช้งาน: {{start_date}}
วันที่สิ้นสุดการทดลองใช้งาน: {{end_date}}
จำนวนวันที่เหลือ: {{remaining_days}} วัน

หากต้องการต่ออายุ Demo หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อกลับทีมงานได้ทางอีเมลฉบับนี้

ขอบคุณครับ/ค่ะ
ทีม Customer Support`
      }
    };
  }

  function demoDraftKey(editId = '', renewFromId = '') {
    const userId = State.session?.user?.id || 'anonymous';
    if (editId) return `${DEMO_DRAFT_PREFIX}${userId}:edit:${editId}`;
    if (renewFromId) return `${DEMO_DRAFT_PREFIX}${userId}:renew:${renewFromId}`;
    return `${DEMO_DRAFT_PREFIX}${userId}:new`;
  }

  function readDemoDraft(key) {
    if (!key) return null;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  }

  function clearDemoDraft(key) {
    if (!key) return;
    localStorage.removeItem(key);
  }

  function saveDemoDraftFromElement(element) {
    const form = element?.closest?.('form[data-action="demo-save"]');
    if (!form) return;
    saveDemoDraft(form);
  }

  function saveDemoDraft(form) {
    const key = form.dataset.draftKey;
    if (!key) return;

    try {
      localStorage.setItem(key, JSON.stringify(collectDemoDraft(form)));
    } catch (error) {
      console.warn('save draft skipped:', safeError(error));
    }
  }

  function collectDemoDraft(form) {
    return {
      company_name: form.company_name?.value || '',
      contact_name: form.contact_name?.value || '',
      contact_emails: getChipValues(form, 'contact_emails'),
      status: form.status?.value || STATUS.PENDING,
      responsible_person_id: form.responsible_person_id?.value || '',
      start_date: form.start_date?.value || todayISO(),
      end_date: form.end_date?.value || addDaysISO(todayISO(), 14),
      renewal_no: Number(form.renewal_no?.value || 0),
      modules: $$('input[name="modules"]:checked', form).map((input) => input.value),
      accounts: collectDemoAccounts(form, { includeEmpty: true }),
      activity_message: form.activity_message?.value || ''
    };
  }

  function renderChipInput(name, values = [], placeholder = '') {
    const safeValues = unique((values || []).filter(Boolean));
    return `
      <div class="chip-input" data-chip-name="${escapeAttr(name)}">
        ${safeValues.map((value) => renderChip(value)).join('')}
        <input data-chip-input type="text" placeholder="${escapeAttr(placeholder)}">
        <input type="hidden" name="${escapeAttr(name)}" value="${escapeAttr(JSON.stringify(safeValues))}">
      </div>
    `;
  }

  function renderChip(value) {
    return `
      <span class="chip" data-chip-value="${escapeAttr(value)}">
        ${escapeHTML(value)}
        <button type="button" data-action="chip-remove" aria-label="remove">×</button>
      </span>
    `;
  }

  function addChipFromInput(input) {
    try {
      commitPendingChipInput(input.closest('[data-chip-name]'), { source: 'enter' });
    } catch (error) {
      toast(safeError(error), 'warning');
    }
  }

  function commitPendingChipInput(wrapper, { source = 'save' } = {}) {
    if (!wrapper) return [];
    const input = $('[data-chip-input]', wrapper);
    const hidden = $('input[type="hidden"]', wrapper);
    const current = getChipValuesFromWrapper(wrapper);
    const rawValue = input?.value.trim().replace(/,$/, '') || '';

    if (!rawValue) {
      if (hidden) hidden.value = JSON.stringify(current);
      return current;
    }

    if (!isEmail(rawValue)) {
      const message = source === 'save'
        ? `อีเมลผู้ติดต่อไม่ถูกต้อง: ${rawValue}`
        : `อีเมลไม่ถูกต้อง: ${rawValue}`;
      throw new Error(message);
    }

    if (!current.includes(rawValue)) {
      input.insertAdjacentHTML('beforebegin', renderChip(rawValue));
      current.push(rawValue);
    }

    if (hidden) hidden.value = JSON.stringify(current);
    input.value = '';
    return current;
  }

  function removeChip(button) {
    const wrapper = button.closest('[data-chip-name]');
    const chip = button.closest('[data-chip-value]');
    chip?.remove();

    const hidden = $('input[type="hidden"]', wrapper);
    hidden.value = JSON.stringify(getChipValuesFromWrapper(wrapper));
  }

  function getChipValues(form, name, { commitPending = false } = {}) {
    const wrapper = form.querySelector(`[data-chip-name="${escapeCSSIdent(name)}"]`);
    if (!wrapper) return [];
    if (commitPending) return commitPendingChipInput(wrapper, { source: 'save' });
    return getChipValuesFromWrapper(wrapper);
  }

  function getChipValuesFromWrapper(wrapper) {
    return $$('.chip', wrapper).map((chip) => chip.dataset.chipValue).filter(Boolean);
  }

  function addAccountRow() {
    const list = $('#accounts-list');
    if (!list) return;
    list.insertAdjacentHTML('beforeend', renderAccountRow());
  }

  function togglePassword(button) {
    const mask = button.parentElement?.querySelector('[data-password]');
    if (!mask) return;
    const isShown = mask.dataset.shown === 'true';
    mask.textContent = isShown ? '••••••••' : mask.dataset.password;
    mask.dataset.shown = String(!isShown);
    mask.classList.toggle('password-mask', isShown);
  }

  function toggleLoginPassword(button) {
    const wrapper = button.closest('.input-with-icon');
    const input = wrapper?.querySelector('input[type="password"], input[type="text"]');
    if (!input) return;

    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    button.textContent = show ? '🙈' : '👁';
  }

  async function copyText(text) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast('คัดลอกแล้ว', 'success');
    } catch {
      toast('คัดลอกไม่สำเร็จ กรุณาคัดลอกเอง', 'warning');
    }
  }

  function showModal(html) {
    $('#modal-root').innerHTML = `<div class="modal-backdrop"><section class="modal">${html}</section></div>`;
  }

  function closeModal() {
    $('#modal-root').innerHTML = '';
  }

  function toast(message, type = '') {
    const root = $('#toast-root');
    const div = document.createElement('div');
    div.className = `toast ${type}`;
    div.textContent = message;
    root.appendChild(div);
    window.setTimeout(() => div.remove(), 4600);
  }

  function statusBadge(status) {
    const className = status === STATUS.PENDING ? 'pending'
      : status === STATUS.ACTIVE ? 'active'
        : status === STATUS.EXPIRED ? 'expired'
          : status === STATUS.CLOSED ? 'closed'
            : status === STATUS.CUSTOMER ? 'customer'
              : '';
    return `<span class="badge ${className}">${escapeHTML(status)}</span>`;
  }

  function option(value, label, selected) {
    return `<option value="${escapeAttr(value)}" ${String(value) === String(selected) ? 'selected' : ''}>${escapeHTML(label)}</option>`;
  }


  function isManualLog(log) {
    if (!log) return false;
    if (log.source) return log.source === 'manual';

    const systemPrefixes = [
      'สร้างรายการเดโมใหม่',
      'สร้างรอบเดโมใหม่',
      'ส่งอีเมล',
      'บันทึกคิวอีเมล',
      'สร้างคิวอีเมล',
      'ลบรอบเดโม'
    ];
    return !systemPrefixes.some((prefix) => String(log.message || '').startsWith(prefix));
  }

  function canShowFirstEmailAction(row) {
    if (!row) return false;
    if (userIsAdmin()) return true;
    return !row.round?.first_email_sent_at;
  }

  function firstEmailAlreadySent(row) {
    return Boolean(row?.round?.first_email_sent_at);
  }

  function findProfile(id) {
    return State.profiles.find((profile) => profile.id === id) || null;
  }

  function findResponsiblePerson(id) {
    return State.responsiblePeople.find((person) => person.id === id) || null;
  }

  function getRoundResponsiblePersonId(round) {
    if (!round) return '';
    if (round.responsible_person_id) return round.responsible_person_id;

    const legacyProfile = findProfile(round.responsible_user_id);
    if (!legacyProfile?.email) return '';
    const matched = State.responsiblePeople.find((person) => normalize(person.email) === normalize(legacyProfile.email));
    return matched?.id || '';
  }

  function displayName(profile) {
    if (!profile) return '-';
    return profile.name || profile.full_name || profile.email || '-';
  }

  function initials(value) {
    const text = String(value || '').trim();
    if (!text) return 'U';
    const parts = text.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return text.slice(0, 2).toUpperCase();
  }

  function roleLabel(role) {
    if (role === 'admin') return 'ผู้ดูแล';
    if (role === 'user') return 'ผู้ใช้';
    return role || '-';
  }

  function userIsAdmin() {
    return State.profile?.role === 'admin';
  }

  function contactEmailsCopyText(row) {
    const emails = row?.company?.contact_emails || [];
    if (!emails.length) return '';
    return emails.join(', ');
  }

  function demoPasswordsCopyText(row) {
    const accounts = row?.accounts || [];
    if (!accounts.length) return '';
    return accounts
      .map((account) => account.password)
      .filter(Boolean)
      .join('\n');
  }

  function canCloseDemoRound(row) {
    if (!row?.round?.end_date) return false;
    return row.round.end_date <= todayISO() && row.round.status !== STATUS.CLOSED;
  }

  function canSoftDelete(row) {
    if (userIsAdmin()) return true;
    return row.round.created_by === State.profile?.id && row.effectiveStatus === STATUS.PENDING;
  }

  function canModifyLog(log, latestId = null) {
    const companyLogs = State.activityLogs
      .filter((item) => item.company_id === log.company_id)
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    const actualLatestId = latestId || companyLogs[0]?.id;
    if (log.id !== actualLatestId) return false;
    return userIsAdmin() || log.created_by === State.profile?.id;
  }

  function computeStatus(round) {
    if (!round) return STATUS.PENDING;
    if (FINAL_STATUSES.has(round.status)) return round.status;

    const today = todayISO();
    if (round.start_date && today < round.start_date) return STATUS.PENDING;
    if (round.end_date && today > round.end_date) return STATUS.EXPIRED;
    return STATUS.ACTIVE;
  }

  function formatRemaining(days) {
    if (days < 0) return `หมดอายุแล้ว ${Math.abs(days)} วัน`;
    if (days === 0) return 'หมดอายุวันนี้';
    return `${days} วัน`;
  }

  function daysBetween(start, end) {
    if (!start || !end) return 0;
    const s = new Date(`${start}T00:00:00`);
    const e = new Date(`${end}T00:00:00`);
    return Math.floor((e - s) / 86400000);
  }

  function todayISO() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
  }

  function addDaysISO(date, days) {
    const d = new Date(`${date}T00:00:00`);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function defaultMonthRange() {
    return {
      start: '',
      end: ''
    };
  }

  function toLocalISODate(date) {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  function dateInRange(date, start, end) {
    if (!date) return false;
    return (!start || date >= start) && (!end || date <= end);
  }

  function formatDate(value) {
    const date = parseDateValue(value, false);
    if (!date) return '-';
    return formatDateParts(date, false);
  }

  function formatDateTime(value) {
    const date = parseDateValue(value, true);
    if (!date) return '-';
    return formatDateParts(date, true);
  }

  function parseDateValue(value, includeTime) {
    if (!value) return null;
    const text = String(value);
    let date;
    if (!includeTime || /^\d{4}-\d{2}-\d{2}$/.test(text)) {
      date = new Date(`${text.slice(0, 10)}T00:00:00`);
    } else {
      date = new Date(text);
    }
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function formatDateParts(date, includeTime) {
    const pad = (num) => String(num).padStart(2, '0');
    const dd = pad(date.getDate());
    const mm = pad(date.getMonth() + 1);
    const yyyy = date.getFullYear();
    if (!includeTime) return `${dd}/${mm}/${yyyy}`;
    return `${dd}/${mm}/${yyyy} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
  }

  function unique(values) {
    return [...new Set(values.map((value) => String(value || '').trim()).filter(Boolean))];
  }


  function escapeCSSIdent(value) {
    if (window.CSS && typeof window.CSS.escape === 'function') {
      return window.CSS.escape(value);
    }
    return String(value).replace(/"/g, '\\"');
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[char]);
  }

  function escapeAttr(value) {
    return escapeHTML(value).replace(/`/g, '&#096;');
  }

  function withTimeout(promise, timeoutMs, message) {
    let timerId;
    const timeout = new Promise((_resolve, reject) => {
      timerId = window.setTimeout(() => reject(new Error(message || 'request timeout')), timeoutMs);
    });

    return Promise.race([
      Promise.resolve(promise),
      timeout
    ]).finally(() => window.clearTimeout(timerId));
  }

  function safeError(error) {
    if (!error) return 'Unknown error';
    if (typeof error === 'string') return error;
    return error.message || error.error_description || JSON.stringify(error);
  }
})();
