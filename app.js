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
    btn.addEventListener("click", () => {
      viewWeek = w === clampWeek(todayWeek) && todayWeek >= FIRST_WEEK ? null : w;
      render();
    });
    li.append(btn);
    el.weeks.append(li);
  }
}

const clampWeek = (w) => Math.min(Math.max(w, FIRST_WEEK), LAST_WEEK);

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

  if (shown < FIRST_WEEK) {
    // совсем ранний срок: фруктов ещё нет
    const left = FIRST_WEEK * 7 - 14 - days;
    el.title.textContent = `${name}, малюк поки зовсім крихітний`;
    el.sub.textContent = `Фрукти починаються з 4-го тижня. Зачекаємо ще ${left} ${plural(left, ["день", "дні", "днів"])}.`;
    el.facts.hidden = true;
    el.story.textContent = "Зазирніть сюди за кілька днів або натисніть на тиждень унизу, щоб подивитися наперед.";
    el.due.textContent = dueText(profile);
    showFruit(0);
    updateTimeline(null);
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

  showFruit(w);
  updateTimeline(w);
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

/* ---------- экраны ---------- */
function showForm() {
  el.stage.dataset.screen = "form";
  el.screenForm.hidden = false;
  el.screenResult.hidden = true;
  el.timeline.hidden = true;
  showFruit(0);
  if (profile) {
    el.name.value = profile.name;
    el.date.value = profile.date;
    el.day.value = String(profile.day);
  }
  el.name.focus();
}

function showResult() {
  el.stage.dataset.screen = "result";
  el.screenForm.hidden = true;
  el.screenResult.hidden = false;
  el.timeline.hidden = false;
  viewWeek = null;
  render();
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
