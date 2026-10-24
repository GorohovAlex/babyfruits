"use strict";

/* Тиждень -> фрукт. with: «розміром із …» (знахідний відмінок), cm і g: середні значення. */
const WEEKS = {
  4:  { name: "макове зернятко", with: "із макове зернятко", cm: 0.1, g: 0, fact: "Крихітна кулька клітин закріплюється в стінці матки." },
  5:  { name: "кунжут", with: "із зернятко кунжуту", cm: 0.2, g: 0, fact: "Закладаються серце та нервова трубка, з якої виростуть мозок і спинний мозок." },
  6:  { name: "сочевиця", with: "із сочевицю", cm: 0.6, g: 0, fact: "Серденько починає битися: від 100 до 150 ударів на хвилину." },
  7:  { name: "чорниця", with: "із чорницю", cm: 1.3, g: 1, fact: "З’являються зачатки ручок і ніжок, поки схожі на крихітні лопатки." },
  8:  { name: "малина", with: "із малину", cm: 1.6, g: 1, fact: "Ростуть пальчики. Малюк уже рухається, хоча ви цього ще не відчуваєте." },
  9:  { name: "вишня", with: "із вишню", cm: 2.3, g: 2, fact: "Основні органи сформовані, хвостик зник." },
  10: { name: "полуниця", with: "із полуницю", cm: 3.1, g: 4, fact: "Тепер малюк називається плодом. Закладаються нігті та зубки." },
  11: { name: "інжир", with: "з інжир", cm: 4.1, g: 7, fact: "Малюк розтягується, відкриває й стискає кулачки." },
  12: { name: "лайм", with: "із лайм", cm: 5.4, g: 14, fact: "Рефлекси вже працюють: малюк стискає пальчики й морщить лоб." },
  13: { name: "лимон", with: "із лимон", cm: 7.4, g: 23, fact: "На пальчиках з’являються унікальні відбитки." },
  14: { name: "персик", with: "із персик", cm: 8.7, g: 43, fact: "Малюк вчиться міміці: супить брови й гримасує." },
  15: { name: "яблуко", with: "з яблуко", cm: 10.1, g: 70, fact: "Малюк розрізняє світло навіть крізь заплющені повіки." },
  16: { name: "авокадо", with: "з авокадо", cm: 11.6, g: 100, fact: "Формується слух. З малюком уже можна розмовляти й співати йому." },
  17: { name: "груша", with: "із грушу", cm: 13, g: 140, fact: "З’являється жировий прошарок, малюк починає повнішати." },
  18: { name: "болгарський перець", with: "із болгарський перець", cm: 14.2, g: 190, fact: "Малюк уміє позіхати та гикати." },
  19: { name: "манго", with: "із манго", cm: 15.3, g: 240, fact: "Шкіру вкриває захисне мастило, воно оберігає її від навколоплідних вод." },
  20: { name: "банан", with: "із банан", cm: 25.6, g: 300, fact: "Середина шляху. Багато мам уперше відчувають поштовхи. З цього тижня зріст міряють від тім’я до п’ят, тому цифра одразу зросла." },
  21: { name: "гранат", with: "із гранат", cm: 26.7, g: 360, fact: "Малюк ковтає навколоплідні води й куштує перші «смаки»." },
  22: { name: "папайя", with: "із папайю", cm: 27.8, g: 430, fact: "Малюк відчуває дотики: обмацує обличчя та хапає пуповину." },
  23: { name: "грейпфрут", with: "із грейпфрут", cm: 28.9, g: 500, fact: "Малюк чує ваш голос і здригається від гучних звуків." },
  24: { name: "диня-канталупа", with: "із диню-канталупу", cm: 30, g: 600, fact: "Розвиваються легені, з’являється власний режим сну та неспання." },
  25: { name: "цвітна капуста", with: "із цвітну капусту", cm: 34.6, g: 660, fact: "Малюк реагує на знайомі голоси та музику." },
  26: { name: "кабачок", with: "із кабачок", cm: 35.6, g: 760, fact: "Оченята починають розплющуватися." },
  27: { name: "качан капусти", with: "із качан капусти", cm: 36.6, g: 875, fact: "Малюк смокче пальчик, а іноді гикає: ви відчуєте ритмічні поштовхи." },
  28: { name: "баклажан", with: "із баклажан", cm: 37.6, g: 1005, fact: "З’являються фази швидкого сну, малюк може бачити сни." },
  29: { name: "гарбуз", with: "із гарбуз", cm: 38.6, g: 1153, fact: "Кісточки міцнішають, малюк запасає кальцій." },
  30: { name: "білокачанна капуста", with: "із білокачанну капусту", cm: 39.9, g: 1319, fact: "Мозок швидко росте, на ньому з’являються борозни та звивини." },
  31: { name: "кокос", with: "із кокос", cm: 41.1, g: 1502, fact: "Малюк повертає голову з боку в бік." },
  32: { name: "дайкон", with: "із дайкон", cm: 42.4, g: 1702, fact: "Нігтики досягають кінчиків пальців." },
  33: { name: "ананас", with: "з ананас", cm: 43.7, g: 1918, fact: "Малюкові стає тісно, поштовхи відчуваються дедалі сильніше." },
  34: { name: "диня", with: "із диню", cm: 45, g: 2146, fact: "Легені майже готові до першого вдиху." },
  35: { name: "жовта диня", with: "із жовту диню", cm: 46.2, g: 2383, fact: "Малюк дедалі більше набирає вагу й дедалі менше вертиться." },
  36: { name: "качан салату", with: "із качан салату", cm: 47.4, g: 2622, fact: "Малюк зазвичай уже лежить головкою вниз і готується до народження." },
  37: { name: "мангольд", with: "із пучок мангольду", cm: 48.6, g: 2859, fact: "З цього тижня термін вважається доношеним." },
  38: { name: "порей", with: "із порей", cm: 49.8, g: 3083, fact: "Малюк додає приблизно по 200 грамів на тиждень." },
  39: { name: "джекфрут", with: "із джекфрут", cm: 50.7, g: 3288, fact: "Малюк готовий до зустрічі й чекає своєї години." },
  40: { name: "кавун", with: "із кавун", cm: 51.2, g: 3462, fact: "Очікуваний термін пологів. Малюк може з’явитися найближчими днями, а може ще трохи затриматися." },
};

const FIRST_WEEK = 4;
const LAST_WEEK = 40;
const EMBRYO_DAYS = [3, 5, 6];
const DEFAULT_EMBRYO_DAY = 5;
const STORAGE_KEY = "babyfruits:v1";
const DAY_MS = 864e5;

/* ---------- элементы ---------- */
const $ = (id) => document.getElementById(id);
const el = {
  stage: $("stage"),
  screenForm: $("screen-form"),
  screenResult: $("screen-result"),
  form: $("form"),
  name: $("name"),
  date: $("date"),
  day: $("day"),
  nameError: $("name-error"),
  dateError: $("date-error"),
  title: $("result-title"),
  sub: $("result-sub"),
  height: $("fact-height"),
  weight: $("fact-weight"),
  facts: $("facts"),
  story: $("result-fact"),
  due: $("result-due"),
  back: $("back-today"),
  edit: $("edit"),
  timeline: $("timeline"),
  weeks: $("weeks"),
  fruit: $("fruit"),
  prev: $("prev"),
  next: $("next"),
  ringBar: $("ring-bar"),
  ringText: $("ring-text"),
  progressTitle: $("progress-title"),
  progressSub: $("progress-sub"),
  upcoming: $("upcoming"),
  events: $("events"),
  share: $("share"),
  shareStatus: $("share-status"),
};

/* ---------- расчёт срока ---------- */
function startOfToday() {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

function parseDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toInputValue(date) {
  const p = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

/* Дни от переноса эмбриона. */
function daysSinceTransfer(value) {
  return Math.round((startOfToday() - parseDate(value)) / DAY_MS);
}

/* Дни от зачатия = возраст эмбриона на момент переноса + дни после переноса.
   Акушерская неделя считается от последних месячных, это на 14 дней раньше зачатия. */
function conceptionDays(p) {
  return daysSinceTransfer(p.date) + p.day;
}

function obstetricWeek(days) {
  return Math.floor((days + 14) / 7);
}

const MAX_DAYS = 42 * 7 - 14; // дальше 42-й недели считаем ошибкой ввода

/* ---------- тексты ---------- */
function plural(n, [one, few, many]) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b > 1 && b < 5) return few;
  if (b === 1) return one;
  return many;
}

const num = (n) => String(n).replace(".", ",");

function formatHeight(cm) {
  return cm < 1 ? `близько ${num(cm * 10)} мм` : `близько ${num(cm)} см`;
}

function formatWeight(g) {
  if (g === 0) return "менше 1 г";
  if (g >= 1000) return `близько ${num((g / 1000).toFixed(2))} кг`;
  return `близько ${g} г`;
}

/* ---------- состояние ---------- */
let profile = null;     // { name, date (перенос), day (возраст эмбриона при переносе, 3/5/6) }
let todayWeek = 0;      // реальная неделя (может быть < 4 или > 40)
let viewWeek = null;    // неделя, которую смотрим; null = сегодняшняя

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.name && saved.date) return { ...saved, day: EMBRYO_DAYS.includes(saved.day) ? saved.day : DEFAULT_EMBRYO_DAY };
  } catch (e) { /* хранилище недоступно, не страшно */ }
  return null;
}

function saveProfile(value) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    else localStorage.removeItem(STORAGE_KEY);
  } catch (e) { /* ничего */ }
}

/* ---------- фрукт в окне ---------- */
const fruitUrlCache = new Map();
let fruitToken = 0;

function weekFile(w) {
  return `fruits/week-${String(w).padStart(2, "0")}.webp`;
}

/* Если картинки для недели ещё нет, берём ближайшую неделю, где она есть. */
function fruitCandidates(w) {
  const list = [w];
  for (let d = 1; d <= LAST_WEEK; d++) {
    if (w - d >= FIRST_WEEK) list.push(w - d);
    if (w + d <= LAST_WEEK) list.push(w + d);
  }
  return list;
}

function showFruit(w) {
  const token = ++fruitToken;
  el.fruit.classList.remove("is-in");

  if (w < FIRST_WEEK) {
    el.fruit.removeAttribute("src");
    return;
  }

  const apply = (url) => {
    if (token !== fruitToken) return;
    el.fruit.src = url;
    void el.fruit.offsetWidth; // перезапуск анимации
    el.fruit.classList.add("is-in");
  };

  if (fruitUrlCache.has(w)) return apply(fruitUrlCache.get(w));

  const list = fruitCandidates(w);
  const tryNext = (i) => {
    if (i >= list.length) return;
    const url = weekFile(list[i]);
    const probe = new Image();
    probe.onload = () => { fruitUrlCache.set(w, url); apply(url); };
    probe.onerror = () => tryNext(i + 1);
    probe.src = url;
  };
  tryNext(0);
}

/* ---------- шкала недель ---------- */
function buildTimeline() {
  el.weeks.textContent = "";
  for (let w = FIRST_WEEK; w <= LAST_WEEK; w++) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "wk";
    btn.dataset.week = w;
    btn.title = `${w}-й тиждень: ${WEEKS[w].name}`;
    btn.setAttribute("aria-label", `${w}-й тиждень, ${WEEKS[w].name}`);
    btn.addEventListener("click", () => goToWeek(w));
    li.append(btn);
    el.weeks.append(li);
  }
}

const clampWeek = (w) => Math.min(Math.max(w, FIRST_WEEK), LAST_WEEK);

function goToWeek(w) {
  viewWeek = w === clampWeek(todayWeek) && todayWeek >= FIRST_WEEK ? null : w;
  render();
}

/* Неделя, которая сейчас на экране. До 4-й недели фруктов ещё нет: считаем, что мы на 3-й. */
function shownWeek() {
  if (viewWeek !== null) return viewWeek;
  return todayWeek < FIRST_WEEK ? FIRST_WEEK - 1 : clampWeek(todayWeek);
}

function step(delta) {
  const next = shownWeek() + delta;
  if (next < FIRST_WEEK || next > LAST_WEEK) return;
  goToWeek(next);
}

function updateArrows() {
  const w = shownWeek();
  el.prev.disabled = w <= FIRST_WEEK;
  el.next.disabled = w >= LAST_WEEK;
  el.prev.setAttribute("aria-label", w > FIRST_WEEK ? `Попередній тиждень, ${w - 1}-й` : "Попередній тиждень");
  el.next.setAttribute("aria-label", w < LAST_WEEK ? `Наступний тиждень, ${w + 1}-й` : "Наступний тиждень");
}

function updateTimeline(shown) {
  const today = clampWeek(todayWeek);
  const hasToday = todayWeek >= FIRST_WEEK;
  el.weeks.querySelectorAll(".wk").forEach((btn) => {
    const w = Number(btn.dataset.week);
    btn.classList.toggle("is-past", hasToday ? w < today : false);
    btn.classList.toggle("is-today", hasToday && w === today);
    btn.classList.toggle("is-viewed", w === shown);
    btn.dataset.label = hasToday && w === today && viewWeek === null ? "Сьогодні" : `${w}-й`;
    if (w === shown) btn.setAttribute("aria-current", "true");
    else btn.removeAttribute("aria-current");
  });
}

function centerTimeline(shown) {
  const btn = el.weeks.querySelector(`[data-week="${shown}"]`);
  if (!btn) return;
  const box = el.weeks;
  box.scrollLeft = btn.offsetLeft - box.clientWidth / 2 + btn.offsetWidth / 2;
}

/* ---------- отрисовка результата ---------- */
function render() {
  const days = conceptionDays(profile);
  const sinceTransfer = daysSinceTransfer(profile.date);
  const { name } = profile;
  const isPreview = viewWeek !== null;
  const shown = isPreview ? viewWeek : todayWeek;

  el.back.hidden = !isPreview;
  el.facts.hidden = false;
  el.shareStatus.textContent = "";

  if (shown < FIRST_WEEK) {
    // совсем ранний срок: фруктов ещё нет
    const left = FIRST_WEEK * 7 - 14 - days;
    el.title.textContent = `${name}, малюк поки зовсім крихітний`;
    el.sub.textContent = `Фрукти починаються з 4-го тижня. Зачекаємо ще ${left} ${plural(left, ["день", "дні", "днів"])}.`;
    el.facts.hidden = true;
    el.story.textContent = "Зазирніть сюди за кілька днів або натисніть на тиждень унизу, щоб подивитися наперед.";
    el.due.textContent = dueText(profile);
    renderProgress(todayWeek, ((days + 14) % 7 + 7) % 7);
    renderEvents();
    el.share.hidden = true;
    showFruit(0);
    updateTimeline(null);
    updateArrows();
    return;
  }

  const w = clampWeek(shown);
  const data = WEEKS[w];

  if (isPreview) {
    el.title.textContent = `На ${w}-му тижні малюк розміром ${data.with}`;
    el.sub.textContent = w < todayWeek ? "Так було раніше." : "Так буде далі.";
  } else {
    el.title.textContent = `${name}, малюк сьогодні розміром ${data.with}`;
    const overdue = todayWeek > LAST_WEEK;
    el.sub.textContent = overdue
      ? "Термін у 40 тижнів уже настав: зустріч із малюком близько."
      : `Іде ${w}-й тиждень вагітності. Від переносу минуло ${sinceTransfer} ${plural(sinceTransfer, ["день", "дні", "днів"])}.`;
  }

  el.height.textContent = formatHeight(data.cm);
  el.weight.textContent = formatWeight(data.g);
  el.story.textContent = data.fact;
  el.due.textContent = isPreview ? "" : dueText(profile);

  // в режиме просмотра показываем прогресс выбранной недели, иначе точный срок на сегодня
  if (isPreview) renderProgress(w);
  else renderProgress(todayWeek, Math.max(days + 14 - todayWeek * 7, 0));
  renderEvents();
  el.share.hidden = false;
  el.shareStatus.textContent = "";

  showFruit(w);
  updateTimeline(w);
  updateArrows();
  centerTimeline(w);
}

function dueText(p) {
  const due = new Date(parseDate(p.date).getTime() + (266 - p.day) * DAY_MS);
  const left = Math.round((due - startOfToday()) / DAY_MS);
  const when = due.toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" }).replace(" р.", "");
  if (left > 0) {
    const unit = left % 10 === 1 && left % 100 !== 11 ? "дня" : "днів"; // після «близько» родовий відмінок
    return `Чекаємо на зустріч приблизно ${when}, залишилося близько ${left} ${unit}.`;
  }
  return `Очікувана дата пологів: ${when}.`;
}

/* ---------- прогресс беременности ---------- */
const RING_LENGTH = 188.5; // 2 * pi * 30
const TOTAL_WEEKS = 40;

function trimesterOf(weeks) {
  return weeks < 14 ? 1 : weeks < 28 ? 2 : 3;
}

/* weeks: полных недель, extraDays: дней сверх них. */
function renderProgress(weeks, extraDays = 0) {
  const done = Math.min(Math.max((weeks * 7 + extraDays) / (TOTAL_WEEKS * 7), 0), 1);
  const pct = Math.round(done * 100);
  const left = Math.max(TOTAL_WEEKS - weeks, 0);

  el.ringBar.style.strokeDashoffset = String(RING_LENGTH * (1 - done));
  el.ringText.textContent = `${pct}%`;
  el.progressTitle.textContent = `${trimesterOf(weeks)}-й триместр`;
  el.progressSub.textContent = left > 0
    ? `Ще ${left} ${plural(left, ["тиждень", "тижні", "тижнів"])} до пологів`
    : "Термін у 40 тижнів настав";
}

/* ---------- ближайшие события ---------- */
const addDays = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);

/* from/to: акушерские дни (от первого дня последних месячных), либо transfer: дни после переноса. */
const EVENTS = [
  { name: "Аналіз крові на ХГЧ", note: "Підтверджує вагітність. Дату зазвичай призначає клініка.", transfer: [12, 14] },
  { name: "Перше УЗД: серцебиття", note: "Видно плідне яйце і серцебиття малюка.", from: 42, to: 49 },
  { name: "Скринінг першого триместру", note: "УЗД та аналіз крові, 11–13 тижнів і 6 днів.", from: 77, to: 97 },
  { name: "Детальне УЗД", note: "Лікар оглядає органи малюка, 18–21 тиждень.", from: 126, to: 153 },
  { name: "Тест на глюкозу", note: "Перевіряє рівень цукру, 24–28 тижнів.", from: 168, to: 196 },
  { name: "Декретна відпустка", note: "Право на відпустку з 30-го тижня.", from: 210, to: 210 },
  { name: "Скринінг третього триместру", note: "УЗД та огляд перед пологами, 30–34 тижні.", from: 210, to: 238 },
];

function eventDates(ev, p) {
  const transfer = parseDate(p.date);
  if (ev.transfer) return [addDays(transfer, ev.transfer[0]), addDays(transfer, ev.transfer[1])];
  const lmp = addDays(transfer, -(p.day + 14)); // умовний перший день останніх місячних
  return [addDays(lmp, ev.from), addDays(lmp, ev.to)];
}

function formatRange(a, b) {
  const month = (d) => d.toLocaleDateString("uk-UA", { month: "long" });
  const full = (d) => d.toLocaleDateString("uk-UA", { day: "numeric", month: "long" });
  if (a.getTime() === b.getTime()) return full(a);
  return a.getMonth() === b.getMonth() ? `${a.getDate()}–${b.getDate()} ${month(b)}` : `${full(a)} – ${full(b)}`;
}

function renderEvents() {
  const today = startOfToday();
  const upcoming = EVENTS
    .map((ev) => ({ ev, range: eventDates(ev, profile) }))
    .filter(({ range }) => range[1] >= today)
    .sort((x, y) => x.range[0] - y.range[0])
    .slice(0, 3);

  el.events.textContent = "";
  el.upcoming.hidden = upcoming.length === 0;

  for (const { ev, range } of upcoming) {
    const [from, to] = range;
    const inDays = Math.round((from - today) / DAY_MS);
    const now = from <= today;

    const li = document.createElement("li");
    li.className = "event";

    const date = document.createElement("span");
    date.className = "event__date";
    date.textContent = formatRange(from, to);

    const body = document.createElement("div");
    body.className = "event__body";
    const name = document.createElement("p");
    name.className = "event__name";
    name.textContent = ev.name;
    const note = document.createElement("p");
    note.className = "event__note";
    note.textContent = ev.note;
    body.append(name, note);

    const when = document.createElement("span");
    when.className = "event__when" + (now ? " event__when--now" : "");
    when.textContent = now ? "зараз" : `через ${inDays} ${plural(inDays, ["день", "дні", "днів"])}`;

    li.append(date, body, when);
    el.events.append(li);
  }
}

/* ---------- экраны ---------- */
function showForm() {
  el.stage.dataset.screen = "form";
  el.screenForm.hidden = false;
  el.screenResult.hidden = true;
  el.timeline.hidden = true;
  el.prev.hidden = el.next.hidden = true;
  showFruit(0);
  if (profile) {
    el.name.value = profile.name;
    el.date.value = profile.date;
    el.day.value = String(profile.day);
  }
  window.scrollTo(0, 0);
  el.name.focus({ preventScroll: true });
}

function showResult() {
  el.stage.dataset.screen = "result";
  el.screenForm.hidden = true;
  el.screenResult.hidden = false;
  el.timeline.hidden = false;
  el.prev.hidden = el.next.hidden = false;
  viewWeek = null;
  render();
  window.scrollTo(0, 0); // на телефоне форма длинная: показываем рисунок сверху
  el.title.focus({ preventScroll: true });
}

/* ---------- картинка для відправки ---------- */
const CARD = { w: 1080, h: 1350, plum: "#4A2F4F", soft: "#6E5473", powder: "#EADDE6", mist: "#F6EEF3", lilac: "#C9B3D6" };

function loadedFruitImage() {
  const img = el.fruit;
  if (img.complete && img.naturalWidth) return Promise.resolve(img);
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("fruit image timeout")), 4000);
    img.addEventListener("load", () => { clearTimeout(timer); resolve(img); }, { once: true });
  });
}

function wrapLines(ctx, text, maxWidth) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    const test = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(test).width > maxWidth) { lines.push(line); line = word; }
    else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function spark(ctx, x, y, r) {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x + r * 0.1, y - r * 0.1, x + r, y);
  ctx.quadraticCurveTo(x + r * 0.1, y + r * 0.1, x, y + r);
  ctx.quadraticCurveTo(x - r * 0.1, y + r * 0.1, x - r, y);
  ctx.quadraticCurveTo(x - r * 0.1, y - r * 0.1, x, y - r);
  ctx.fill();
}

async function drawShareCard() {
  const w = clampWeek(viewWeek !== null ? viewWeek : todayWeek);
  const data = WEEKS[w];
  const [img] = await Promise.all([
    loadedFruitImage(),
    document.fonts ? document.fonts.load('800 60px Podkova') : null,
    document.fonts ? document.fonts.load('700 40px Nunito') : null,
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = CARD.w;
  canvas.height = CARD.h;
  const ctx = canvas.getContext("2d");
  const cx = CARD.w / 2;

  ctx.fillStyle = CARD.powder;
  ctx.fillRect(0, 0, CARD.w, CARD.h);

  // сиреневое пятно позади
  const blob = ctx.createLinearGradient(100, 100, 980, 900);
  blob.addColorStop(0, "#D9C6E3");
  blob.addColorStop(1, "#E3C5D3");
  ctx.fillStyle = blob;
  ctx.beginPath();
  ctx.moveTo(150, 420);
  ctx.bezierCurveTo(90, 200, 520, 40, 820, 150);
  ctx.bezierCurveTo(1040, 250, 1050, 650, 900, 830);
  ctx.bezierCurveTo(750, 1010, 250, 990, 140, 760);
  ctx.bezierCurveTo(90, 640, 190, 560, 150, 420);
  ctx.fill();

  // «окно» как на животе
  const cy = 465;
  ctx.fillStyle = CARD.plum;
  ctx.beginPath(); ctx.arc(cx, cy, 345, 0, Math.PI * 2); ctx.fill();
  const glow = ctx.createRadialGradient(cx, cy - 60, 20, cx, cy, 330);
  glow.addColorStop(0, "#FFFFFF");
  glow.addColorStop(0.65, CARD.mist);
  glow.addColorStop(1, "#E4D2EC");
  ctx.fillStyle = glow;
  ctx.beginPath(); ctx.arc(cx, cy, 328, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = CARD.lilac;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.setLineDash([2, 22]);
  ctx.beginPath(); ctx.arc(cx, cy, 296, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);

  // фрукт
  const size = 500;
  ctx.drawImage(img, cx - size / 2, cy - size / 2, size, size);

  ctx.fillStyle = "#FFFFFF";
  spark(ctx, 170, 250, 34); spark(ctx, 930, 330, 44); spark(ctx, 190, 760, 26); spark(ctx, 900, 110, 24);

  // тексты
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const head = viewWeek === null ? `${profile.name}, ${w}-й тиждень` : `${w}-й тиждень`;
  ctx.fillStyle = CARD.soft;
  ctx.font = '800 50px Podkova, Georgia, serif';
  ctx.fillText(head, cx, 925);

  ctx.fillStyle = CARD.plum;
  ctx.font = '800 78px Podkova, Georgia, serif';
  const lines = wrapLines(ctx, `малюк розміром ${data.with}`, 900);
  lines.forEach((line, i) => ctx.fillText(line, cx, 1020 + i * 92));

  ctx.fillStyle = CARD.soft;
  ctx.font = '700 40px Nunito, system-ui, sans-serif';
  ctx.fillText(`${formatHeight(data.cm)} · ${formatWeight(data.g)}`, cx, 1020 + lines.length * 92 + 20);

  ctx.font = '700 30px Nunito, system-ui, sans-serif';
  const site = location.hostname.endsWith("github.io") ? `Малюк-фрукт · ${location.host}${location.pathname.replace(/\/$/, "")}` : "Малюк-фрукт";
  ctx.fillText(site, cx, CARD.h - 44);

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))), "image/png"));
}

async function shareCard() {
  el.share.disabled = true;
  el.shareStatus.textContent = "Готуємо картинку…";
  try {
    const w = clampWeek(viewWeek !== null ? viewWeek : todayWeek);
    const blob = await drawShareCard();
    const file = new File([blob], `malyuk-frukt-${String(w).padStart(2, "0")}.png`, { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "Малюк-фрукт" });
        el.shareStatus.textContent = "";
      } catch (err) {
        el.shareStatus.textContent = err && err.name === "AbortError" ? "" : "Не вдалося поділитися. Спробуйте ще раз.";
      }
      return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    el.shareStatus.textContent = "Картинку збережено на пристрій.";
  } catch (err) {
    el.shareStatus.textContent = "Не вдалося створити картинку. Оновіть сторінку й спробуйте ще раз.";
  } finally {
    el.share.disabled = false;
  }
}

/* ---------- форма ---------- */
function setError(input, box, message) {
  box.textContent = message;
  if (message) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
}

function validate() {
  const name = el.name.value.trim();
  const date = el.date.value;
  const day = Number(el.day.value);
  let ok = true;

  setError(el.name, el.nameError, name ? "" : "Напишіть, як вас звати.");
  if (!name) ok = false;

  let dateMessage = "";
  if (!date) dateMessage = "Оберіть дату переносу.";
  else {
    const sinceTransfer = daysSinceTransfer(date);
    if (sinceTransfer < 0) dateMessage = "Дата переносу не може бути в майбутньому.";
    else if (sinceTransfer + day > MAX_DAYS) dateMessage = "Від цієї дати минуло забагато часу. Перевірте, будь ласка, рік.";
  }
  setError(el.date, el.dateError, dateMessage);
  if (dateMessage) ok = false;

  return ok ? { name, date, day } : null;
}

el.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = validate();
  if (!value) {
    (el.name.getAttribute("aria-invalid") ? el.name : el.date).focus();
    return;
  }
  profile = value;
  saveProfile(profile);
  todayWeek = obstetricWeek(conceptionDays(profile));
  showResult();
});

el.prev.addEventListener("click", () => step(-1));
el.next.addEventListener("click", () => step(1));

/* Стрелки на клавиатуре листают недели, пока человек не печатает в форме. */
document.addEventListener("keydown", (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey || el.screenResult.hidden) return;
  if (e.target instanceof Element && e.target.closest("input, select, textarea, .weeks")) return;
  if (e.key === "ArrowLeft") step(-1);
  else if (e.key === "ArrowRight") step(1);
});

el.share.addEventListener("click", shareCard);

el.back.addEventListener("click", () => { viewWeek = null; render(); });

el.edit.addEventListener("click", () => {
  saveProfile(null);
  showForm();
});

/* ---------- старт ---------- */
el.date.max = toInputValue(startOfToday());
el.date.min = toInputValue(new Date(startOfToday().getTime() - MAX_DAYS * DAY_MS));
buildTimeline();

profile = loadProfile();
if (profile && daysSinceTransfer(profile.date) >= 0 && conceptionDays(profile) <= MAX_DAYS) {
  todayWeek = obstetricWeek(conceptionDays(profile));
  showResult();
} else {
  profile = null;
}
