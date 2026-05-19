/* DEMO CRM v1.2.1
   Static SPA for GitHub Pages + Supabase.
   Security rule: never place service_role key, database password, or private token in this file.
*/
(() => {
  'use strict';

  const APP_VERSION = '1.2.1';
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
  const DASHBOARD_TABLE_PAGE_SIZE = 10;
  const DEMO_LIST_PAGE_SIZE = 20;

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
    adminTab: 'users'
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
        await refreshCurrentSession(true);
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
      case 'notification-filter':
        applyNotificationFilter(target.dataset.kind || 'all');
        break;
      case 'brand-logo-reset':
        await resetBrandLogo();
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
      case 'copy':
        await copyText(target.dataset.copy || '');
        break;
      case 'demo-delete':
        await softDeleteDemo(target.dataset.id);
        break;
      case 'email-preview':
        openEmailPreview(target.dataset.id, target.dataset.type || 'first_demo_email');
        break;
      case 'email-send':
        await sendPreviewEmail(target.dataset.id, target.dataset.type || 'first_demo_email');
        break;
      case 'log-edit':
        await editLog(target.dataset.id);
        break;
      case 'log-delete':
        await deleteLog(target.dataset.id);
        break;
      case 'report-export':
        exportDemoRows();
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
        await toggleResponsiblePerson(target.dataset.id, target.dataset.active === 'true');
        break;
      case 'admin-module-toggle':
        await toggleModule(target.dataset.id, target.dataset.active === 'true');
        break;
      case 'admin-module-delete':
        await deleteModule(target.dataset.id);
        break;
      case 'admin-template-reset':
        await resetTemplate(target.dataset.key);
        break;
      case 'run-reminder-check':
        await queueReminderEmails();
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
      render();
      return;
    }

    saveDemoDraftFromElement(target);
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
    toast('เข้าสู่ระบบสำเร็จ', 'success');
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
          State.sb.from('settings').select('*')
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
        settings
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
    return `
      <main class="auth-page">
        <section class="auth-card">
          <div class="brand auth-brand">
            <img class="brand-logo" src="${getBrandLogoDataUri()}" alt="DEMO CRM">
            <div>
              <h1>DEMO CRM</h1>
              <p>ระบบจัดการเดโมสำหรับทีม CS</p>
            </div>
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
          <form data-action="login" class="grid">
            <div class="field">
              <label for="login-email">อีเมล <span class="required">*</span></label>
              <input id="login-email" class="input" type="email" name="email" autocomplete="email" required>
            </div>
            <div class="field">
              <label for="login-password">รหัสผ่าน <span class="required">*</span></label>
              <input id="login-password" class="input" type="password" name="password" autocomplete="current-password" required>
            </div>
            <button class="btn primary" type="submit">เข้าสู่ระบบ</button>
          </form>
        </section>
      </main>
    `;
  }

  function renderShell(route) {
    const profileName = displayName(State.profile);
    const isAdmin = userIsAdmin();
    const notifications = buildNotifications();
    const notificationCount = notifications.length;
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
            ${isAdmin ? navLink('#admin', 'ตั้งค่าระบบ', route) : ''}
          </nav>
          <div class="header-tools">
            <div class="notification-wrap">
              <button class="icon-button notification-button ${State.notificationsOpen ? 'active' : ''}" type="button" data-action="notification-toggle" title="แจ้งเตือน" aria-label="แจ้งเตือน">
                <span aria-hidden="true">🔔</span>
                ${notificationCount ? `<span class="notification-badge">${notificationCount > 99 ? '99+' : notificationCount}</span>` : ''}
              </button>
              ${State.notificationsOpen ? renderNotificationPanel(notifications) : ''}
            </div>
            <div class="profile-chip" title="${escapeAttr(State.profile?.email || '')}">
              <span class="profile-avatar">${escapeHTML(initials(profileName))}</span>
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
      '#admin': '⚙'
    };
    return `<a href="${hash}" class="top-nav-link ${active ? 'active' : ''}" title="${escapeAttr(label)}"><span>${escapeHTML(icons[hash] || '')}</span>${escapeHTML(label)}</a>`;
  }

  
  function getCustomBrandLogo() {
    const value = State.settings?.brand_logo_data_uri;
    return isValidLogoDataUri(value) ? value : '';
  }

  function getBrandLogoDataUri() {
    return getCustomBrandLogo() || BRAND_LOGO_DATA_URI;
  }

  function isValidLogoDataUri(value) {
    return typeof value === 'string' && /^data:image\/(png|jpe?g|webp);base64,/i.test(value);
  }

  function buildNotifications() {
    if (!State.dataLoaded) return [];

    const rows = getDemoRows();
    const allRows = getAllDemoRows();
    const rowByRound = new Map(allRows.map((row) => [row.round.id, row]));
    const notifications = [];

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
      .sort((a, b) => {
        if (a.severity !== b.severity) return a.severity - b.severity;
        return new Date(a.date || 0) - new Date(b.date || 0);
      })
      .slice(0, 99);
  }

  function renderNotificationPanel(notifications) {
    const nearCount = notifications.filter((item) => item.kind === 'near').length;
    const expiredCount = notifications.filter((item) => item.kind === 'expired').length;
    const emailCount = notifications.filter((item) => item.kind === 'email').length;
    const activeKind = State.notificationFilter || 'all';
    const visibleItems = activeKind === 'all'
      ? notifications
      : notifications.filter((item) => item.kind === activeKind);
    const items = visibleItems.slice(0, 12);

    return `
      <section class="notification-panel" aria-label="รายการแจ้งเตือน">
        <header class="notification-head">
          <div>
            <strong>แจ้งเตือน (${notifications.length})</strong>
            <p>รายการที่ควรตรวจสอบตอนนี้</p>
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
            <a class="notification-item ${escapeAttr(item.kind)}" href="${escapeAttr(item.href)}">
              <span class="notification-icon">${escapeHTML(item.icon)}</span>
              <span class="notification-content">
                <strong>${escapeHTML(item.title)}</strong>
                <small>${escapeHTML(item.detail)}</small>
              </span>
              <span class="notification-date">${escapeHTML(item.date ? formatDate(item.date) : '-')}</span>
            </a>
          `).join('') : '<div class="empty compact-empty">ไม่มีแจ้งเตือนในหมวดนี้</div>'}
        </div>
        <footer class="notification-footer">
          <button class="btn small secondary" type="button" data-action="notification-filter" data-kind="${escapeAttr(activeKind)}">ดูในรายการเดโม</button>
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
              <th>วันทั้งหมด</th>
              <th>วันคงเหลือ</th>
              <th>โมดูล</th>
              <th>บันทึกล่าสุด</th>
              <th>แก้ไขล่าสุด</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => {
              const canDelete = canSoftDelete(row);
              return `
                <tr>
                  <td><a href="#demos/${row.round.id}"><strong>${escapeHTML(row.company.company_name)}</strong></a></td>
                  <td>${escapeHTML(row.company.contact_name || '-')}</td>
                  <td>${escapeHTML((row.company.contact_emails || []).join(', '))}</td>
                  <td>${statusBadge(row.effectiveStatus)}</td>
                  <td>${escapeHTML(displayName(row.responsible))}</td>
                  <td>${formatDate(row.round.start_date)}</td>
                  <td>${formatDate(row.round.end_date)}</td>
                  <td>${row.totalDays}</td>
                  <td>${formatRemaining(row.remainingDays)}</td>
                  <td>${escapeHTML(row.modules.map((module) => module.name).join(', ') || '-')}</td>
                  <td>${escapeHTML(row.latestLog?.message || '-')}</td>
                  <td>${formatDateTime(row.round.updated_at)}</td>
                  <td>
                    <div class="actions">
                      <a class="btn small ghost" href="#demos/${row.round.id}">ดู</a>
                      <a class="btn small secondary" href="#demos/edit/${row.round.id}">แก้ไข</a>
                      <a class="btn small success" href="#demos/new/renew/${row.round.id}">ต่ออายุ</a>
                      <button class="btn small ghost" data-action="email-preview" data-id="${row.round.id}">อีเมล</button>
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
        <a class="btn ghost" href="#demos">กลับ</a>
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
            ${renderChipInput('contact_emails', values.contact_emails || [], 'พิมพ์อีเมลแล้วกด Enter')}
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
      .filter((log) => log.company_id === row.company.id)
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    const history = getAllDemoRows()
      .filter((item) => item.company.id === row.company.id)
      .sort((a, b) => new Date(b.round.created_at || 0) - new Date(a.round.created_at || 0));

    return `
      ${renderTopbar(row.company.company_name, '', `
        <a class="btn ghost" href="#demos">กลับ</a>
        <a class="btn secondary" href="#demos/edit/${row.round.id}">แก้ไข</a>
        <a class="btn success" href="#demos/new/renew/${row.round.id}">ต่ออายุ</a>
        <button class="btn primary" data-action="email-preview" data-id="${row.round.id}">ตัวอย่างอีเมล</button>
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
            <dt>วันทั้งหมด</dt><dd>${row.totalDays}</dd>
            <dt>วันคงเหลือ</dt><dd>${formatRemaining(row.remainingDays)}</dd>
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
            <div class="timeline">
              ${history.map((item) => `
                <div class="timeline-item">
                  <div class="timeline-date">${formatDate(item.round.created_at)}</div>
                  <div class="timeline-body">
                    <strong>${statusBadge(item.effectiveStatus)} ต่ออายุครั้งที่ ${item.round.renewal_no || 0}</strong>
                    <p>${formatDate(item.round.start_date)} - ${formatDate(item.round.end_date)} · ${item.modules.map((module) => escapeHTML(module.name)).join(', ')}</p>
                    <a class="btn small ghost" href="#demos/${item.round.id}">ดูรอบนี้</a>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : '<div class="empty">ไม่มีประวัติ</div>'}
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
    if (!logs.length) return '<div class="empty">ยังไม่มีบันทึก</div>';

    const latestId = logs[0]?.id;
    return `
      <div class="timeline">
        ${logs.map((log) => {
          const author = findProfile(log.created_by);
          const canEdit = canModifyLog(log, latestId);
          return `
            <div class="timeline-item">
              <div class="timeline-date">${formatDateTime(log.created_at)}</div>
              <div class="timeline-body">
                <div class="actions timeline-head">
                  <span class="muted small-text">โดย ${escapeHTML(displayName(author))}</span>
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
              <th>อีเมล</th>
              <th>ชื่อที่แสดง</th>
              <th>สิทธิ์</th>
              <th>สถานะ</th>
              <th>การใช้งาน</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            ${State.profiles.map((profile) => `
              <tr>
                <td>${escapeHTML(profile.email)}</td>
                <td>
                  <form data-action="admin-profile-save" id="profile-${profile.id}">
                    <input type="hidden" name="id" value="${profile.id}">
                    <input class="input" name="full_name" value="${escapeAttr(profile.full_name || '')}">
                  </form>
                </td>
                <td>
                  <select class="select" name="role" form="profile-${profile.id}">
                    ${option('user', 'ผู้ใช้', profile.role)}
                    ${option('admin', 'ผู้ดูแล', profile.role)}
                  </select>
                </td>
                <td>
                  <select class="select" name="is_active" form="profile-${profile.id}">
                    ${option('true', 'เปิดใช้งาน', String(Boolean(profile.is_active)))}
                    ${option('false', 'ปิดใช้งาน', String(Boolean(profile.is_active)))}
                  </select>
                </td>
                <td><button class="btn small primary" type="submit" form="profile-${profile.id}">บันทึก</button></td>
              </tr>
            `).join('')}
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
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            ${State.responsiblePeople.map((person) => `
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
                <td><button class="btn small primary" type="submit" form="responsible-${person.id}">บันทึก</button></td>
              </tr>
            `).join('')}
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
              <th>จัดการ</th>
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
          ${renderChipInput('fixed_cc_emails', Array.isArray(fixedCc) ? fixedCc : [], 'พิมพ์อีเมลแล้วกด Enter')}
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
      <section class="card empty"><a class="btn primary" href="#dashboard">กลับแดชบอร์ด</a></section>
    `;
  }

  async function saveDemoForm(form) {
    const editId = form.dataset.editId || '';
    const renewFromId = form.dataset.renewFromId || '';
    const contactEmails = getChipValues(form, 'contact_emails');
    const selectedModules = $$('input[name="modules"]:checked', form).map((input) => input.value);
    const accountRows = $$('[data-account-row]', form);
    const accounts = accountRows.map((row) => ({
      login_email: $('[name="account_login_email"]', row)?.value.trim(),
      password: $('[name="account_password"]', row)?.value,
      note: $('[name="account_note"]', row)?.value.trim() || null
    })).filter((account) => account.login_email || account.password || account.note);

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
      message: 'ลบรอบเดโมแบบ soft delete'
    }).catch(() => undefined);

    await loadAllData();
    render();
    toast('ลบเดโมแล้ว', 'success');
  }

  function openEmailPreview(roundId, type = 'first_demo_email') {
    const row = getDemoRow(roundId);
    if (!row) return toast('ไม่พบรอบเดโม', 'error');

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
        <button class="btn primary" data-action="email-send" data-id="${roundId}" data-type="${escapeAttr(type)}">ส่ง / บันทึกคิวอีเมล</button>
      </footer>
    `);
  }

  async function sendPreviewEmail(roundId, type = 'first_demo_email') {
    const row = getDemoRow(roundId);
    if (!row) return;

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
          body: JSON.stringify({ email_log_id: data.id })
        });
        if (!res.ok) throw new Error(`Apps Script HTTP ${res.status}`);
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

    const { error } = await State.sb.from('profiles').update({
      full_name: fullName,
      role,
      is_active
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
          .filter((log) => log.company_id === company.id)
          .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        const effectiveStatus = computeStatus(round);
        const totalDays = daysBetween(round.start_date, round.end_date) + 1;
        const remainingDays = daysBetween(todayISO(), round.end_date);

        return {
          company,
          round,
          modules,
          accounts,
          responsible,
          latestLog: logs[0] || null,
          effectiveStatus,
          totalDays: Math.max(totalDays, 0),
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
      'วันที่เริ่ม': row.round.start_date,
      'วันที่สิ้นสุด': row.round.end_date,
      'จำนวนวันทั้งหมด': row.totalDays,
      'จำนวนวันคงเหลือ': Math.max(row.remainingDays, 0),
      'โมดูล': row.modules.map((m) => m.name).join(', '),
      'บัญชีเดโม': row.accounts.map((a) => a.login_email).join(', '),
      'จำนวนครั้งที่ต่ออายุ': row.round.renewal_no || 0,
      'วันที่ส่งอีเมลครั้งแรก': row.round.first_email_sent_at || '',
      'วันที่ส่งอีเมลเตือน': row.round.reminder_email_sent_at || '',
      'วันที่สร้างรายการ': row.round.created_at || '',
      'วันที่แก้ไขล่าสุด': row.round.updated_at || '',
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
      accounts: $$('[data-account-row]', form).map((row) => ({
        login_email: $('[name="account_login_email"]', row)?.value.trim() || '',
        password: $('[name="account_password"]', row)?.value || '',
        note: $('[name="account_note"]', row)?.value.trim() || ''
      })),
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
    const value = input.value.trim().replace(/,$/, '');
    if (!value) return;

    if (!isEmail(value)) {
      toast(`อีเมลไม่ถูกต้อง: ${value}`, 'warning');
      return;
    }

    const wrapper = input.closest('[data-chip-name]');
    const hidden = $('input[type="hidden"]', wrapper);
    const current = getChipValuesFromWrapper(wrapper);
    if (!current.includes(value)) current.push(value);

    input.insertAdjacentHTML('beforebegin', renderChip(value));
    hidden.value = JSON.stringify(current);
    input.value = '';
  }

  function removeChip(button) {
    const wrapper = button.closest('[data-chip-name]');
    const chip = button.closest('[data-chip-value]');
    chip?.remove();

    const hidden = $('input[type="hidden"]', wrapper);
    hidden.value = JSON.stringify(getChipValuesFromWrapper(wrapper));
  }

  function getChipValues(form, name) {
    const wrapper = form.querySelector(`[data-chip-name="${escapeCSSIdent(name)}"]`);
    if (!wrapper) return [];
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
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return {
      start: toLocalISODate(start),
      end: toLocalISODate(end)
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
    if (!value) return '-';
    return new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium' }).format(new Date(`${String(value).slice(0, 10)}T00:00:00`));
  }

  function formatDateTime(value) {
    if (!value) return '-';
    return new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
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
