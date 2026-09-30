// ===== Challenge Definitions =====
const CHALLENGES = [
    {
        id: 'steep-ramp',
        name: 'Spiral Ramp',
        icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 56 L32 12 L56 56 Z" stroke="white" stroke-width="3" fill="none"/>
            <path d="M20 56 L32 24 L44 56" stroke="white" stroke-width="2" fill="rgba(255,255,255,0.15)"/>
            <line x1="32" y1="12" x2="32" y2="8" stroke="white" stroke-width="2"/>
            <polygon points="29,10 32,4 35,10" fill="white"/>
        </svg>`
    },
    {
        id: 'high-bank',
        name: 'Banked Turn',
        icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 52 Q16 52 20 36 Q24 20 32 20 Q40 20 44 36 Q48 52 60 52" stroke="white" stroke-width="3" fill="none"/>
            <path d="M4 56 L60 56" stroke="white" stroke-width="2"/>
            <circle cx="24" cy="32" r="3" fill="white" opacity="0.5"/>
            <circle cx="40" cy="32" r="3" fill="white" opacity="0.5"/>
            <path d="M18 44 L46 44" stroke="white" stroke-width="1.5" stroke-dasharray="3 3"/>
        </svg>`
    },
    {
        id: 'gravel',
        name: 'Gravel',
        icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="44" r="4" fill="white" opacity="0.7"/>
            <circle cx="24" cy="48" r="3" fill="white" opacity="0.5"/>
            <circle cx="36" cy="42" r="5" fill="white" opacity="0.6"/>
            <circle cx="48" cy="46" r="3.5" fill="white" opacity="0.7"/>
            <circle cx="18" cy="36" r="3" fill="white" opacity="0.4"/>
            <circle cx="42" cy="36" r="4" fill="white" opacity="0.5"/>
            <circle cx="30" cy="34" r="2.5" fill="white" opacity="0.6"/>
            <circle cx="52" cy="38" r="2" fill="white" opacity="0.4"/>
            <circle cx="8" cy="50" r="2.5" fill="white" opacity="0.5"/>
            <circle cx="32" cy="52" r="3" fill="white" opacity="0.6"/>
            <circle cx="54" cy="50" r="3" fill="white" opacity="0.5"/>
            <line x1="4" y1="56" x2="60" y2="56" stroke="white" stroke-width="2"/>
        </svg>`
    },
    {
        id: 'potholes',
        name: 'Potholes',
        icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="40" x2="60" y2="40" stroke="white" stroke-width="2"/>
            <ellipse cx="20" cy="44" rx="8" ry="4" stroke="white" stroke-width="2" fill="rgba(255,255,255,0.1)"/>
            <ellipse cx="44" cy="46" rx="10" ry="5" stroke="white" stroke-width="2" fill="rgba(255,255,255,0.1)"/>
            <ellipse cx="32" cy="36" rx="6" ry="3" stroke="white" stroke-width="2" fill="rgba(255,255,255,0.1)"/>
            <path d="M12 44 Q20 50 28 44" stroke="white" stroke-width="1.5" fill="none"/>
            <path d="M34 46 Q44 54 54 46" stroke="white" stroke-width="1.5" fill="none"/>
        </svg>`
    },
    {
        id: 'wide-section',
        name: 'Wide Section',
        icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 8 L4 56" stroke="white" stroke-width="2.5"/>
            <path d="M44 8 L60 56" stroke="white" stroke-width="2.5"/>
            <line x1="4" y1="56" x2="60" y2="56" stroke="white" stroke-width="2"/>
            <!-- Arrows pointing outward -->
            <line x1="16" y1="32" x2="6" y2="32" stroke="white" stroke-width="2"/>
            <polygon points="8,29 2,32 8,35" fill="white"/>
            <line x1="48" y1="32" x2="58" y2="32" stroke="white" stroke-width="2"/>
            <polygon points="56,29 62,32 56,35" fill="white"/>
            <line x1="20" y1="32" x2="44" y2="32" stroke="white" stroke-width="1" stroke-dasharray="4 3"/>
        </svg>`
    },
    {
        id: 'narrow-section',
        name: 'Narrow Section',
        icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8 L26 56" stroke="white" stroke-width="2.5"/>
            <path d="M60 8 L38 56" stroke="white" stroke-width="2.5"/>
            <line x1="26" y1="56" x2="38" y2="56" stroke="white" stroke-width="2"/>
            <!-- Arrows pointing inward -->
            <line x1="10" y1="32" x2="22" y2="32" stroke="white" stroke-width="2"/>
            <polygon points="20,29 26,32 20,35" fill="white"/>
            <line x1="54" y1="32" x2="42" y2="32" stroke="white" stroke-width="2"/>
            <polygon points="44,29 38,32 44,35" fill="white"/>
            <line x1="26" y1="32" x2="38" y2="32" stroke="white" stroke-width="1" stroke-dasharray="4 3"/>
        </svg>`
    },
    {
        id: 'tunnel',
        name: 'Tunnel',
        icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 56 L8 24 Q8 8 32 8 Q56 8 56 24 L56 56" stroke="white" stroke-width="3" fill="none"/>
            <path d="M16 56 L16 28 Q16 16 32 16 Q48 16 48 28 L48 56" stroke="white" stroke-width="2" fill="rgba(255,255,255,0.08)"/>
            <line x1="8" y1="56" x2="56" y2="56" stroke="white" stroke-width="2"/>
            <circle cx="32" cy="36" r="3" fill="white" opacity="0.6"/>
            <line x1="32" y1="40" x2="32" y2="50" stroke="white" stroke-width="1.5" opacity="0.4"/>
        </svg>`
    },
    {
        id: 'hoops',
        name: 'Hoops',
        icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="32" r="14" stroke="white" stroke-width="2.5" fill="none"/>
            <circle cx="44" cy="32" r="14" stroke="white" stroke-width="2.5" fill="none"/>
            <circle cx="20" cy="32" r="8" stroke="white" stroke-width="1" fill="none" opacity="0.3"/>
            <circle cx="44" cy="32" r="8" stroke="white" stroke-width="1" fill="none" opacity="0.3"/>
            <line x1="4" y1="56" x2="60" y2="56" stroke="white" stroke-width="2"/>
        </svg>`
    },
    {
        id: 'fixed-obstacles',
        name: 'Random Obstacles',
        icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Bucket 1 -->
            <path d="M10 28 L14 48 L30 48 L34 28 Z" stroke="white" stroke-width="2" fill="rgba(255,255,255,0.15)"/>
            <ellipse cx="22" cy="28" rx="12" ry="3" stroke="white" stroke-width="2" fill="none"/>
            <path d="M14 24 Q22 18 30 24" stroke="white" stroke-width="2" fill="none"/>
            <!-- Bucket 2 -->
            <path d="M36 32 L39 48 L53 48 L56 32 Z" stroke="white" stroke-width="2" fill="rgba(255,255,255,0.15)"/>
            <ellipse cx="46" cy="32" rx="10" ry="2.5" stroke="white" stroke-width="2" fill="none"/>
            <line x1="4" y1="52" x2="60" y2="52" stroke="white" stroke-width="2"/>
        </svg>`
    },
    {
        id: 'loose-overhead',
        name: 'Carwash',
        icon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Posts -->
            <line x1="12" y1="16" x2="12" y2="56" stroke="white" stroke-width="2.5"/>
            <line x1="52" y1="16" x2="52" y2="56" stroke="white" stroke-width="2.5"/>
            <!-- Top bar -->
            <line x1="10" y1="16" x2="54" y2="16" stroke="white" stroke-width="2.5"/>
            <!-- Hanging strips -->
            <line x1="18" y1="16" x2="16" y2="38" stroke="white" stroke-width="1.5" opacity="0.7"/>
            <line x1="24" y1="16" x2="25" y2="42" stroke="white" stroke-width="1.5" opacity="0.6"/>
            <line x1="30" y1="16" x2="28" y2="40" stroke="white" stroke-width="1.5" opacity="0.8"/>
            <line x1="36" y1="16" x2="37" y2="44" stroke="white" stroke-width="1.5" opacity="0.5"/>
            <line x1="42" y1="16" x2="40" y2="36" stroke="white" stroke-width="1.5" opacity="0.7"/>
            <line x1="48" y1="16" x2="49" y2="40" stroke="white" stroke-width="1.5" opacity="0.6"/>
            <!-- Wavy bottom ends -->
            <circle cx="16" cy="39" r="2" fill="white" opacity="0.5"/>
            <circle cx="25" cy="43" r="2" fill="white" opacity="0.4"/>
            <circle cx="28" cy="41" r="2" fill="white" opacity="0.6"/>
            <circle cx="37" cy="45" r="2" fill="white" opacity="0.4"/>
            <circle cx="40" cy="37" r="2" fill="white" opacity="0.5"/>
            <circle cx="49" cy="41" r="2" fill="white" opacity="0.4"/>
            <line x1="4" y1="56" x2="60" y2="56" stroke="white" stroke-width="2"/>
        </svg>`
    }
];

// ===== Team Definitions =====
const TEAMS = [
    'HAMI Race Team',
    "I Don't Know Yet",
    'Decepticons',
    'Command for Racing (CfR)',
    'Auto-Drive Racing',
    'CATADORES',
    'Bolted Ranger',
    'Silver Helix-Bots',
    'Bots',
    'CAT_Automators',
    'Descent',
    'Juggernauts',
    'The VERY Hungry Caterpillars',
    'Synapse',
    'Hot Wheels',
    'ERD Garage',
    'Proving Grounds',
    'Quantum Rovers',
    'ClaudeBot',
    'AutonoMinds',
    'The Terminators',
    'Turbo Titans',
    'NorthBot',
    'LAKSA'
].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

// ===== App State =====
let stopwatchInterval = null;
let stopwatchStartTime = 0;
let stopwatchElapsed = 0;   // ms
let isRunning = false;
let isPaused = false;      // frozen mid-run by a held e-stop; START resumes it
let hasStopped = false;
let lapTimes = [];         // individual lap durations in ms
let lastLapMark = 0;       // elapsed time (ms) at the last recorded lap
let selectedTeam = '';

// Skips are tracked per lap, and each lap carries its own penalty. An obstacle
// can be skipped at most once per lap; every obstacle starts not skipped
// (green/completed) on every lap.
// lapSkips[lapIndex][obstacleId]: true if the obstacle was skipped on that lap.
// Entries are created lazily by getLapState().
let lapSkips = [];
let selectedLap = 0;       // lap index that obstacle clicks apply to
// Set when the robot was started manually instead of from the visual start
// signal. A flat penalty on both courses, charged to lap 1 only.
let startSignalSkipped = false;
const START_SIGNAL_PENALTY_S = 5;

function getLapState(lap) {
    if (!lapSkips[lap]) {
        lapSkips[lap] = {};
        CHALLENGES.forEach(c => lapSkips[lap][c.id] = false);
    }
    return lapSkips[lap];
}

// ===== DOM References =====
const stopwatchDisplay = document.getElementById('stopwatch-display');
const btnStart = document.getElementById('btn-start');
const btnLap = document.getElementById('btn-lap');
const btnStop = document.getElementById('btn-stop');
const btnReset = document.getElementById('btn-reset');
const finalScoreEl = document.getElementById('final-score');
const baseTimeDisplay = document.getElementById('base-time-display');
const missedCountDisplay = document.getElementById('missed-count-display');
const penaltyDisplay = document.getElementById('penalty-display');
const challengesGrid = document.getElementById('challenges-grid');
const lapTimesList = document.getElementById('lap-times-list');
const lapSelect = document.getElementById('lap-select');
const btnStartSignal = document.getElementById('btn-start-signal');
const lapCountDisplay = document.getElementById('lap-count-display');
const teamSelect = document.getElementById('team-select');
const courseSelect = document.getElementById('course-select');
const appContainer = document.querySelector('.app-container');
const btnSave = document.getElementById('btn-save');
const saveStatus = document.getElementById('save-status');
const espStatus = document.getElementById('esp-status');

// ===== Stopwatch Functions =====
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millis = ms % 1000;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
}

function updateStopwatch() {
    const now = performance.now();
    stopwatchElapsed = now - stopwatchStartTime;
    stopwatchDisplay.textContent = formatTime(Math.floor(stopwatchElapsed));

    if (isRunning) {
        stopwatchInterval = requestAnimationFrame(updateStopwatch);
    }
}

function startStopwatch() {
    if (isRunning) return;
    // A held e-stop must block a fresh run, not just interrupt one in progress.
    if (estopStopped) return;
    isRunning = true;
    isPaused = false;
    hasStopped = false;
    stopwatchStartTime = performance.now() - stopwatchElapsed;
    stopwatchInterval = requestAnimationFrame(updateStopwatch);
    requestWakeLock();

    btnStart.disabled = true;
    btnLap.disabled = false;
    btnStop.disabled = false;
    btnReset.disabled = true;

    // Reset score display while running
    finalScoreEl.textContent = '--:--';
    finalScoreEl.classList.remove('calculated');
}

function stopStopwatch() {
    if (!isRunning) return;
    isRunning = false;
    hasStopped = true;
    cancelAnimationFrame(stopwatchInterval);
    releaseWakeLock();
    updateStopwatch(); // capture final time

    // Record the final segment as the last lap
    recordLap();

    btnStart.disabled = estopStopped;
    btnLap.disabled = true;
    btnStop.disabled = true;
    btnReset.disabled = false;

    calculateFinalScore();
}

// A held e-stop pauses a running stopwatch rather than ending the run: the
// elapsed time freezes where it is, no lap is recorded, and the score isn't
// finalized. STOP and LAP are disabled while paused; the operator resumes the
// same run with START once every stop button is released, and startStopwatch()
// picks up from the frozen stopwatchElapsed.
function pauseStopwatch() {
    if (!isRunning) return;
    isRunning = false;
    isPaused = true;
    cancelAnimationFrame(stopwatchInterval);
    // Keep the wake lock held while paused: the operator is standing at the
    // track waiting to resume, and the screen going dark mid-run is exactly
    // what we don't want. stopStopwatch()/resetStopwatch() release it.
    updateStopwatch(); // freeze the displayed time at the pause instant

    // RESET becomes available; START/LAP/STOP are driven by applyEstopState()
    // for as long as the e-stop is held.
    btnReset.disabled = false;
}

function resetStopwatch() {
    isRunning = false;
    isPaused = false;
    hasStopped = false;
    cancelAnimationFrame(stopwatchInterval);
    releaseWakeLock();
    stopwatchElapsed = 0;
    stopwatchDisplay.textContent = '00:00.000';

    lapTimes = [];
    lastLapMark = 0;
    renderLaps();

    btnStart.disabled = estopStopped;
    btnLap.disabled = true;
    btnStop.disabled = true;
    btnReset.disabled = false;

    // Reset all challenges to zero failures on every lap
    lapSkips = [];
    selectedLap = 0;
    renderLapSelect();
    renderChallenges();

    // Reset score
    finalScoreEl.textContent = '--:--';
    finalScoreEl.classList.remove('calculated');
    lapCountDisplay.textContent = '--';
    startSignalSkipped = false;
    renderStartSignal();
    baseTimeDisplay.textContent = '0.000s';
    missedCountDisplay.textContent = '0';
    penaltyDisplay.textContent = '+0.000s';
}

// ===== Screen Wake Lock =====
// Keep the device showing the UI (a phone propped up at the track, a laptop)
// from dimming or sleeping while the stopwatch is running.
//
// The standard Wake Lock API only works in a secure context, and this page is
// served from the Pico over plain http://<AP IP>, so it's unavailable here.
// js/wakelock.js covers that case: it silently loops a tiny muted <video>,
// which browsers keep the screen on for even over HTTP, and re-arms it when the
// phone is unlocked or the tab is refocused. It still uses the real Wake Lock
// API when one happens to be available. It keeps NoSleep.js's enable()/disable()
// API, hence the name below.
//
// enable() must run inside a user gesture. startStopwatch() is only ever called
// straight from the START click or the Space-key handler, both of which qualify.
const noSleep = (typeof NoSleep !== 'undefined') ? new NoSleep() : null;

function requestWakeLock() {
    if (!noSleep) return;
    try {
        const p = noSleep.enable();
        if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch (err) {
        /* unsupported browser -- nothing else to try */
    }
}

function releaseWakeLock() {
    if (!noSleep) return;
    try {
        noSleep.disable();
    } catch (err) {
        /* already disabled */
    }
}

// ===== E-Stop Timer Control (Server-Sent Events, polling fallback) =====
// The Pico pushes its status over one long-lived SSE connection instead of the
// page opening a fresh TCP connection several times a second. That churn was
// exhausting the device's small lwIP connection-block pool and causing bursts
// of dropped requests. The server re-sends state on a ~2 s heartbeat, so a dead
// link is noticed even when the e-stop state isn't changing.
//
// The e-stop is non-latching: it reports "stopped" while any stop button is
// held and clears when all are released. On the transition into "stopped" a
// running stopwatch is PAUSED -- the time freezes, no lap is recorded, and the
// score isn't finalized. It never auto-resumes. While the e-stop reads
// "stopped" START, LAP and STOP are all disabled (and startStopwatch() refuses
// to run); once every stop button is released START re-enables and the operator
// picks the same run back up with it. Losing the signal does NOT touch the
// stopwatch or the buttons; it only changes the status text.
const ESTOP_SSE_URL = '/api/events';
const ESTOP_STATUS_URL = '/api/status';
const ESTOP_FALLBACK_POLL_MS = 3000;   // used only while SSE is unavailable
const ESTOP_STALE_MS = 6000;           // no message for this long => signal lost
const ESTOP_SSE_RETRY_MS = 15000;      // how often a fallback poll re-tries SSE

let estopLastStopped = null;   // null until the first reading
let estopStopped = false;      // current reading; gates the START button
let estopEverConnected = false;
let estopLastMsgAt = 0;         // performance.now() of the last good message
let estopSource = null;
let estopFallbackTimer = null;
let estopSseRetryAt = 0;

function setEspStatus(text, cssClass) {
    espStatus.textContent = text;
    espStatus.classList.remove('connected', 'error');
    if (cssClass) espStatus.classList.add(cssClass);
}

function applyEstopState(stopped) {
    estopStopped = stopped;

    // Act only on the transition into "stopped"; the first reading just
    // establishes a baseline. Clearing the e-stop does nothing to the
    // stopwatch -- resuming is a manual START from the UI.
    if (estopLastStopped !== null && stopped && stopped !== estopLastStopped) {
        pauseStopwatch();
    }
    estopLastStopped = stopped;

    // Button state while the e-stop is held: START, LAP and STOP are all
    // unavailable -- the run is frozen and can only be resumed with START once
    // every stop button is released. Set here (not just in pauseStopwatch())
    // so it holds even if there was no running timer to pause. When the e-stop
    // clears, re-enable START to allow the resume; LAP/STOP stay disabled until
    // the run actually resumes (startStopwatch() re-enables them).
    if (stopped) {
        btnStart.disabled = true;
        btnLap.disabled = true;
        btnStop.disabled = true;
    } else if (!isRunning) {
        btnStart.disabled = false;
    }
}

function renderEstopData(data) {
    estopLastMsgAt = performance.now();
    estopEverConnected = true;
    const stopped = data.stopped === 1 || data.stopped === true;
    const ids = [...new Set(data.stopped_ids || [])].join(', ');
    setEspStatus(
        stopped ? ('E-Stop: STOPPED' + (ids ? ' [' + ids + ']' : '')) : 'E-Stop: clear',
        stopped ? 'error' : 'connected'
    );
    applyEstopState(stopped);
}

function markSignalLost() {
    setEspStatus(estopEverConnected ? 'E-Stop: signal lost' : 'E-Stop: not connected', 'error');
}

function checkEstopStale() {
    if (estopLastMsgAt && performance.now() - estopLastMsgAt > ESTOP_STALE_MS) {
        markSignalLost();
    }
}

function startEstopSse() {
    stopEstopFallback();
    if (typeof EventSource === 'undefined') { startEstopFallback(); return; }
    try {
        estopSource = new EventSource(ESTOP_SSE_URL);
    } catch (err) {
        estopSource = null;
        startEstopFallback();
        return;
    }
    estopSource.onopen = () => { estopLastMsgAt = performance.now(); };
    estopSource.onmessage = (ev) => {
        let data;
        try { data = JSON.parse(ev.data); } catch (e) { return; }
        renderEstopData(data);
    };
    estopSource.onerror = () => {
        // The browser reconnects on its own (see the server's `retry:` hint)
        // unless it has given up entirely.
        markSignalLost();
        if (!estopSource || estopSource.readyState === EventSource.CLOSED) {
            estopSource = null;
            startEstopFallback();
        }
    };
}

async function pollEstopOnce() {
    try {
        const res = await fetch(ESTOP_STATUS_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error('bad status');
        renderEstopData(await res.json());
        // Server is reachable -- try to move back to a single SSE stream.
        if (!estopSource && performance.now() >= estopSseRetryAt) {
            estopSseRetryAt = performance.now() + ESTOP_SSE_RETRY_MS;
            startEstopSse();
        }
    } catch (err) {
        markSignalLost();
    }
}

function startEstopFallback() {
    if (estopFallbackTimer) return;
    estopSseRetryAt = performance.now() + ESTOP_SSE_RETRY_MS;
    estopFallbackTimer = setInterval(pollEstopOnce, ESTOP_FALLBACK_POLL_MS);
    pollEstopOnce();
}

function stopEstopFallback() {
    if (estopFallbackTimer) { clearInterval(estopFallbackTimer); estopFallbackTimer = null; }
}

setInterval(checkEstopStale, 1000);
startEstopSse();

// ===== Lap Functions =====
function recordLap() {
    const currentElapsed = Math.floor(stopwatchElapsed);
    const lapDuration = currentElapsed - lastLapMark;
    if (lapDuration <= 0) return; // avoid duplicate/zero-length laps
    lapTimes.push(lapDuration);
    lastLapMark = currentElapsed;
    // Pressing LAP starts the next lap, so obstacle clicks now apply to it. The
    // final segment recorded by STOP (isRunning is already false) leaves the
    // selection alone.
    if (isRunning) selectedLap = lapTimes.length;
    renderLaps();
    renderLapSelect();
    renderChallenges();
}

// The dropdown offers the recorded laps plus the one in progress while the
// stopwatch is running, and always at least Lap 1 (e.g. before any laps exist).
function renderLapSelect() {
    const count = Math.max(1, lapTimes.length + (isRunning ? 1 : 0));
    selectedLap = Math.min(selectedLap, count - 1);
    lapSelect.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Lap ${i + 1}`;
        lapSelect.appendChild(option);
    }
    lapSelect.value = selectedLap;
}

function renderLaps() {
    lapTimesList.innerHTML = '';

    if (lapTimes.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'lap-empty';
        empty.textContent = 'No laps recorded yet';
        lapTimesList.appendChild(empty);
        return;
    }

    lapTimes.forEach((lapMs, index) => {
        const penaltyMs = Math.round(lapPenaltySeconds(index) * 1000);
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="lap-number">Lap ${index + 1}</span>
            <span class="lap-time">${formatTime(lapMs)}</span>
            <span class="lap-penalty">+${formatTime(penaltyMs)}</span>
            <span class="lap-total">${formatTime(lapMs + penaltyMs)}</span>
        `;
        lapTimesList.appendChild(li);
    });

    // Auto-scroll to the latest lap
    lapTimesList.parentElement.scrollTop = lapTimesList.parentElement.scrollHeight;
}

// ===== Score Calculation =====
// Shared by the on-screen breakdown and the CSV export below, so the two can
// never disagree and the export never depends on a cached, possibly-stale value.
//
// The score is the total time of all laps plus the penalty. Skips are marked per
// lap but counted together across all laps (obstacle course only) before the
// escalating formula is applied; the flat start-signal penalty applies on
// either course and is shown on lap 1.
function isObstacleCourse() {
    return courseSelect.value !== 'speed';
}

function lapMissedCount(lap) {
    if (!isObstacleCourse()) return 0;
    const state = getLapState(lap);
    return CHALLENGES.filter(c => state[c.id]).length;
}

function penaltySeconds(numMissed) {
    return 15 * (numMissed + (Math.max(numMissed - 1, 0) * numMissed) / 2);
}

// Skips accumulate across laps before the escalating formula is applied, so a
// lap's penalty is how much its skips raise the running total. The per-lap
// penalties therefore always sum to penaltySeconds(total skips).
function missedThroughLap(lap) {
    let n = 0;
    for (let i = 0; i <= lap; i++) n += lapMissedCount(i);
    return n;
}

function lapPenaltySeconds(lap) {
    const startS = lap === 0 && startSignalSkipped ? START_SIGNAL_PENALTY_S : 0;
    const before = lap > 0 ? penaltySeconds(missedThroughLap(lap - 1)) : 0;
    return startS + penaltySeconds(missedThroughLap(lap)) - before;
}

function computeScore() {
    // Before any lap is recorded, the running time stands in as a single lap.
    const laps = lapTimes.length ? lapTimes : [Math.floor(stopwatchElapsed)];
    let baseTimeS = 0, numMissed = 0;
    laps.forEach((lapMs, lapIndex) => {
        baseTimeS += lapMs / 1000; // convert ms to seconds
        numMissed += lapMissedCount(lapIndex);
    });
    const startS = startSignalSkipped ? START_SIGNAL_PENALTY_S : 0;
    const penaltyS = startS + penaltySeconds(numMissed);
    return { lapCount: laps.length, baseTimeS, numMissed, penaltyS, finalTimeS: baseTimeS + penaltyS };
}

function calculateFinalScore() {
    const { lapCount, baseTimeS, numMissed, penaltyS, finalTimeS } = computeScore();

    // Update breakdown
    lapCountDisplay.textContent = `${lapCount}`;
    baseTimeDisplay.textContent = `${baseTimeS.toFixed(3)}s`;
    missedCountDisplay.textContent = `${numMissed}`;
    penaltyDisplay.textContent = `+${penaltyS.toFixed(3)}s`;

    // Format final score
    const totalMs = Math.floor(finalTimeS * 1000);
    finalScoreEl.textContent = formatTime(totalMs);
    finalScoreEl.classList.remove('calculated');
    // Trigger animation
    void finalScoreEl.offsetWidth;
    finalScoreEl.classList.add('calculated');
}

// ===== Challenge Tile Rendering =====
function renderChallenges() {
    challengesGrid.innerHTML = '';

    const state = getLapState(selectedLap);

    CHALLENGES.forEach(challenge => {
        const tile = document.createElement('div');
        const isCompleted = !state[challenge.id];
        tile.className = `challenge-tile ${isCompleted ? 'completed' : 'missed'}`;
        tile.dataset.id = challenge.id;

        tile.innerHTML = `
            <span class="tile-status">${isCompleted ? '✓' : '✕'}</span>
            <div class="tile-icon">${challenge.icon}</div>
            <div class="tile-label">${challenge.name}</div>
        `;

        tile.addEventListener('click', () => toggleChallenge(challenge.id));
        challengesGrid.appendChild(tile);
    });
}

function toggleChallenge(id) {
    const state = getLapState(selectedLap);
    state[id] = !state[id];
    renderChallenges();

    // Recalculate if stopwatch has been stopped
    if (hasStopped) {
        calculateFinalScore();
    }
    renderLaps(); // the lap's penalty changed
}

// ===== Start Signal =====
function renderStartSignal() {
    btnStartSignal.classList.toggle('active', startSignalSkipped);
    btnStartSignal.setAttribute('aria-pressed', String(startSignalSkipped));
}

btnStartSignal.addEventListener('click', () => {
    startSignalSkipped = !startSignalSkipped;
    renderStartSignal();
    if (hasStopped) calculateFinalScore();
    renderLaps();
});

lapSelect.addEventListener('change', () => {
    selectedLap = parseInt(lapSelect.value, 10);
    renderChallenges();
});

// ===== Event Listeners =====
btnStart.addEventListener('click', startStopwatch);
btnLap.addEventListener('click', recordLap);
btnStop.addEventListener('click', stopStopwatch);
btnReset.addEventListener('click', resetStopwatch);

// ===== Keyboard Shortcuts (Space = Start/Stop, Enter = Lap) =====
document.addEventListener('keydown', (e) => {
    // Ignore shortcuts while the scoring tab isn't active or while typing in a form field
    const scoringTabActive = document.getElementById('tab-scoring').classList.contains('active');
    const tag = document.activeElement ? document.activeElement.tagName : '';
    const isFormField = tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON';
    if (!scoringTabActive || isFormField) return;

    if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) {
            stopStopwatch();
        } else if (!hasStopped) {
            startStopwatch();
        }
    } else if (e.code === 'Enter') {
        e.preventDefault();
        if (isRunning) {
            recordLap();
        }
    }
});

// ===== Tab Navigation =====
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active from all tabs & content
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        // Activate clicked tab & matching content
        tab.classList.add('active');
        const target = tab.dataset.tab;
        document.getElementById(`tab-${target}`).classList.add('active');
    });
});

// ===== Initialize =====
renderLapSelect();
renderChallenges();
renderLaps();
populateTeamSelect();
applyCourseSelection();

// ===== Course Selection =====
// Not reset by RESET -- the course doesn't change between runs on the same
// course, so clearing it on every reset would force re-selecting it constantly.
function applyCourseSelection() {
    appContainer.classList.toggle('course-speed', !isObstacleCourse());
    // Obstacle penalties only count on the obstacle course.
    if (hasStopped) calculateFinalScore();
    renderLaps();
}

courseSelect.addEventListener('change', applyCourseSelection);

// ===== Team Selection =====
function populateTeamSelect() {
    TEAMS.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        teamSelect.appendChild(option);
    });
}

teamSelect.addEventListener('change', () => {
    selectedTeam = teamSelect.value;
    btnSave.disabled = !selectedTeam;
    saveStatus.textContent = '';
    saveStatus.className = 'save-status';
});

// ===== CSV Export =====
// Saving a result builds a one-row CSV in the browser and triggers a normal
// file download to whatever machine has the page open -- no server storage
// involved, so it works the same whether or not a network drive is around.
function csvField(value) {
    const s = String(value);
    return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function buildResultCsv() {
    const score = computeScore();
    const lapCount = Math.max(lapTimes.length, 1);
    const lapIndexes = Array.from({ length: lapCount }, (_, i) => i);
    // Per-lap breakdowns, e.g. "Lap 1: Gravel (x1); Potholes (x2)" -- laps with
    // no failures are omitted from the names but still get a penalty entry.
    const missedNames = lapIndexes.map(i => {
        const state = getLapState(i);
        const names = CHALLENGES.filter(c => state[c.id]).map(c => c.name);
        return names.length ? `Lap ${i + 1}: ${names.join(', ')}` : '';
    }).filter(Boolean);
    const lapPenalties = lapIndexes.map(i => `Lap ${i + 1}: ${lapPenaltySeconds(i).toFixed(3)}`);
    const header = [
        'Timestamp', 'Team', 'Course', 'Final Score', 'Final Score (s)', 'Laps',
        'Base Time - All Laps (s)', 'Skipped Obstacles (All Laps)', 'Start Signal Skipped',
        'Penalty (s)', 'Lap Times', 'Lap Penalties (s)', 'Skipped Obstacle Names (By Lap)',
    ];
    const row = [
        new Date().toISOString(),
        selectedTeam,
        isObstacleCourse() ? 'Obstacle' : 'Speed',
        formatTime(Math.floor(score.finalTimeS * 1000)),
        score.finalTimeS.toFixed(3),
        score.lapCount,
        score.baseTimeS.toFixed(3),
        score.numMissed,
        startSignalSkipped ? 'Yes' : 'No',
        score.penaltyS.toFixed(3),
        lapTimes.map(formatTime).join('; '),
        lapPenalties.join('; '),
        missedNames.join('; '),
    ];
    return header.map(csvField).join(',') + '\r\n' + row.map(csvField).join(',') + '\r\n';
}

function downloadCsv(filename, content) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Revoke on a delay: some browsers cancel the download if the object URL
    // disappears too soon after click().
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ===== Toasts =====
// A transient overlay notification, separate from the (easy-to-miss) inline
// save-status line, so a failed save is hard not to notice. Built and styled
// entirely from here -- no markup needed in index.html.
let toastContainer = null;

function getToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}

function showToast(message, type = 'error', durationMs = 4000) {
    const container = getToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    let dismissed = false;
    const dismiss = () => {
        if (dismissed) return;
        dismissed = true;
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 250);
    };
    toast.addEventListener('click', dismiss);

    container.appendChild(toast);
    // Two rAFs so the browser paints the initial (hidden) state before the
    // 'show' class is added -- otherwise the transition doesn't animate.
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
    setTimeout(dismiss, durationMs);
}

btnSave.addEventListener('click', () => {
    if (!selectedTeam) {
        showToast('Select a team before saving a result.');
        return;
    }

    if (lapTimes.length < 2) {
        const message = 'Record at least 2 laps before saving a result.';
        saveStatus.textContent = message;
        saveStatus.className = 'save-status error';
        showToast(message);
        return;
    }

    const safeTeam = selectedTeam.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'team';
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `score_${safeTeam}_${stamp}.csv`;

    try {
        downloadCsv(filename, buildResultCsv());
        saveStatus.textContent = `Saved ${filename}`;
        saveStatus.className = 'save-status success';
    } catch (err) {
        const message = 'Could not generate the CSV download.';
        saveStatus.textContent = `Error: ${message}`;
        saveStatus.className = 'save-status error';
        showToast(message);
    }
});
