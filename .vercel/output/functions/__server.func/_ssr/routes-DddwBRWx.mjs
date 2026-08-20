import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime, n as CheckboxIndicator, t as Checkbox$1, u as Slot } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as LOFI_CHANNELS } from "./lofi-catalog-C-rOPM07.mjs";
import { c as Settings, d as Plus, f as Play, h as Check, i as Unplug, l as RotateCcw, m as Link2, n as VolumeX, o as Trash2, p as Pause, r as Volume2, s as SkipForward, t as X, u as RefreshCw } from "../_libs/lucide-react.mjs";
import { n as Route, r as getLofiLiveStreams } from "./router-B085E_oT.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DddwBRWx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,color,opacity,transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:opacity-90",
			secondary: "bg-elevated text-fg hover:bg-border",
			outline: "border border-border bg-transparent text-fg hover:bg-elevated",
			ghost: "text-muted hover:bg-elevated hover:text-fg"
		},
		size: {
			default: "h-11 rounded-md px-4 text-sm",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-14 rounded-full px-8 text-base",
			icon: "size-11 rounded-md",
			"icon-sm": "size-9 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-scrim", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed inset-x-4 top-1/2 z-50 mx-auto grid w-auto max-w-md -translate-y-1/2", "max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl border border-border bg-surface p-6 text-fg shadow-lg", "duration-[var(--motion-fast)] data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			className: cn("absolute top-3 right-3 flex size-11 items-center justify-center rounded-sm text-muted", "transition-colors duration-[var(--motion-quick)] hover:bg-elevated hover:text-fg", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
			"aria-label": "Close",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-5 flex flex-col gap-1 pr-8", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl font-medium tracking-tight text-fg", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-sm font-medium text-fg", className),
		...props
	});
}
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
		decorative,
		orientation,
		className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
		...props
	});
}
function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }) {
	const _values = import_react.useMemo(() => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min], [
		value,
		defaultValue,
		min
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		defaultValue,
		value,
		min,
		max,
		className: cn("relative flex w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
		}), Array.from({ length: _values.length }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: cn("block size-4 rounded-full border border-primary bg-surface", "shadow-sm transition-[box-shadow] duration-[var(--motion-quick)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:pointer-events-none disabled:opacity-50") }, i))]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent", "transition-[background-color] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg", "disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:bg-primary data-[state=unchecked]:bg-elevated", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-surface shadow-sm", "transition-transform duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]", "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5") })
	});
}
function TooltipProvider({ delayDuration = 400, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration,
		...props
	});
}
var Tooltip = Root3;
var TooltipTrigger = Trigger;
function TooltipContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 rounded-sm bg-tooltip px-2 py-1 text-xs text-tooltip-fg", "origin-[var(--radix-tooltip-content-transform-origin)]", className),
		...props
	}) });
}
function formatMs(ms) {
	const total = Math.max(0, Math.ceil(ms / 1e3));
	const minutes = Math.floor(total / 60);
	const seconds = total % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
function todayKey(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function phaseLabel(phase) {
	if (phase === "work") return "Focus";
	if (phase === "shortBreak") return "Short break";
	return "Long break";
}
var audioCtx = null;
function getContext() {
	if (typeof window === "undefined") return null;
	const Ctor = window.AudioContext || window.webkitAudioContext;
	if (!Ctor) return null;
	if (!audioCtx) audioCtx = new Ctor();
	return audioCtx;
}
function tone(ctx, frequency, start, duration, gainValue) {
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();
	osc.type = "sine";
	osc.frequency.setValueAtTime(frequency, start);
	gain.gain.setValueAtTime(1e-4, start);
	gain.gain.exponentialRampToValueAtTime(gainValue, start + .03);
	gain.gain.exponentialRampToValueAtTime(1e-4, start + duration);
	osc.connect(gain);
	gain.connect(ctx.destination);
	osc.start(start);
	osc.stop(start + duration + .02);
}
function playPhaseComplete(kind) {
	const ctx = getContext();
	if (!ctx) return;
	ctx.resume();
	const now = ctx.currentTime + .02;
	(kind === "work" ? [
		392,
		523.25,
		659.25
	] : [
		659.25,
		523.25,
		392
	]).forEach((freq, i) => {
		tone(ctx, freq, now + i * .14, .7, .08);
	});
}
var THEME_OPTIONS = [
	{
		id: "light",
		label: "Light"
	},
	{
		id: "dark",
		label: "Dark"
	},
	{
		id: "system",
		label: "System"
	}
];
var THEME_COLOR = {
	light: "#f2eee6",
	dark: "#12110f"
};
function isTheme(value) {
	return value === "light" || value === "dark" || value === "system";
}
function resolveTheme(theme) {
	if (theme === "system") return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	return theme;
}
function applyResolvedTheme(resolved) {
	const root = document.documentElement;
	root.classList.toggle("dark", resolved === "dark");
	root.style.colorScheme = resolved;
	const meta = document.querySelector("meta[name=\"theme-color\"]");
	if (meta) meta.setAttribute("content", THEME_COLOR[resolved]);
}
var STORAGE_KEY$1 = "still-pomodoro-v1";
var DEFAULT_SETTINGS = {
	workMinutes: 25,
	shortBreakMinutes: 5,
	longBreakMinutes: 15,
	sessionsUntilLongBreak: 4,
	soundEnabled: true,
	theme: "light"
};
function clamp(n, min, max) {
	if (!Number.isFinite(n)) return min;
	return Math.min(max, Math.max(min, Math.round(n)));
}
function normalizeSettings(input) {
	const merged = {
		...DEFAULT_SETTINGS,
		...input
	};
	return {
		workMinutes: clamp(merged.workMinutes, 5, 60),
		shortBreakMinutes: clamp(merged.shortBreakMinutes, 1, 20),
		longBreakMinutes: clamp(merged.longBreakMinutes, 5, 45),
		sessionsUntilLongBreak: clamp(merged.sessionsUntilLongBreak, 2, 8),
		soundEnabled: Boolean(merged.soundEnabled),
		theme: isTheme(merged.theme) ? merged.theme : "light"
	};
}
function phaseDurationMs(phase, settings) {
	return (phase === "work" ? settings.workMinutes : phase === "shortBreak" ? settings.shortBreakMinutes : settings.longBreakMinutes) * 60 * 1e3;
}
function loadPersisted() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(STORAGE_KEY$1);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
var persistBound = false;
var persistTimer = null;
function persistSnapshot(state) {
	if (typeof window === "undefined") return;
	const payload = {
		settings: state.settings,
		tasks: state.tasks,
		activeTaskId: state.activeTaskId,
		completedToday: state.completedToday,
		totalWorkSessions: state.totalWorkSessions,
		phase: state.phase,
		remainingMs: state.remainingMs,
		status: state.status === "running" ? "paused" : state.status
	};
	localStorage.setItem(STORAGE_KEY$1, JSON.stringify(payload));
}
function bindPersist() {
	if (persistBound) return;
	persistBound = true;
	usePomodoro.subscribe((state, prev) => {
		if (state.remainingMs !== prev.remainingMs && state.settings === prev.settings && state.tasks === prev.tasks && state.phase === prev.phase && state.status === prev.status && state.activeTaskId === prev.activeTaskId && state.completedToday === prev.completedToday) {
			if (Math.floor(prev.remainingMs / 1e3) === Math.floor(state.remainingMs / 1e3)) return;
			if (persistTimer) window.clearTimeout(persistTimer);
			persistTimer = window.setTimeout(() => persistSnapshot(state), 400);
			return;
		}
		persistSnapshot(state);
	});
}
var usePomodoro = create((set, get) => ({
	hydrated: false,
	settings: DEFAULT_SETTINGS,
	tasks: [],
	activeTaskId: null,
	completedToday: {
		date: todayKey(),
		count: 0
	},
	totalWorkSessions: 0,
	phase: "work",
	status: "idle",
	remainingMs: phaseDurationMs("work", DEFAULT_SETTINGS),
	endsAt: null,
	hydrate: () => {
		if (get().hydrated) return;
		const saved = loadPersisted();
		const date = todayKey();
		if (saved) {
			const settings = normalizeSettings(saved.settings);
			const completedToday = saved.completedToday?.date === date ? saved.completedToday : {
				date,
				count: 0
			};
			const phase = saved.phase ?? "work";
			const full = phaseDurationMs(phase, settings);
			const remainingMs = Math.min(Math.max(0, saved.remainingMs ?? full), full);
			const status = remainingMs > 0 && remainingMs < full && saved.status === "paused" ? "paused" : "idle";
			set({
				hydrated: true,
				settings,
				tasks: Array.isArray(saved.tasks) ? saved.tasks : [],
				activeTaskId: saved.activeTaskId ?? null,
				completedToday,
				totalWorkSessions: saved.totalWorkSessions ?? 0,
				phase,
				remainingMs: status === "idle" && remainingMs === 0 ? full : remainingMs,
				status: remainingMs === 0 ? "idle" : status,
				endsAt: null
			});
		} else set({ hydrated: true });
		bindPersist();
	},
	tick: () => {
		const { status, endsAt } = get();
		if (status !== "running" || endsAt === null) return;
		const remaining = endsAt - Date.now();
		if (remaining <= 0) {
			get().completePhase();
			return;
		}
		set({ remainingMs: remaining });
	},
	start: () => {
		const { remainingMs, status } = get();
		if (status === "running") return;
		const remaining = Math.max(remainingMs, 0);
		if (remaining <= 0) return;
		set({
			status: "running",
			endsAt: Date.now() + remaining
		});
	},
	pause: () => {
		const { status, endsAt, remainingMs } = get();
		if (status !== "running") return;
		set({
			status: "paused",
			remainingMs: endsAt ? Math.max(0, endsAt - Date.now()) : remainingMs,
			endsAt: null
		});
	},
	reset: () => {
		const { phase, settings } = get();
		set({
			status: "idle",
			remainingMs: phaseDurationMs(phase, settings),
			endsAt: null
		});
	},
	skip: () => {
		const { phase, settings } = get();
		if (phase === "work") {
			set({
				phase: "shortBreak",
				status: "idle",
				remainingMs: phaseDurationMs("shortBreak", settings),
				endsAt: null
			});
			return;
		}
		set({
			phase: "work",
			status: "idle",
			remainingMs: phaseDurationMs("work", settings),
			endsAt: null
		});
	},
	updateSettings: (partial) => {
		const settings = normalizeSettings({
			...get().settings,
			...partial
		});
		const { status, phase } = get();
		if (status === "idle") {
			set({
				settings,
				remainingMs: phaseDurationMs(phase, settings)
			});
			return;
		}
		set({ settings });
	},
	addTask: (title) => {
		const trimmed = title.trim();
		if (!trimmed) return;
		const task = {
			id: crypto.randomUUID(),
			title: trimmed,
			done: false
		};
		const { tasks, activeTaskId } = get();
		const hasActive = activeTaskId && tasks.some((t) => t.id === activeTaskId && !t.done);
		set({
			tasks: [...tasks, task],
			activeTaskId: hasActive ? activeTaskId : task.id
		});
	},
	toggleTask: (id) => {
		const tasks = get().tasks.map((t) => t.id === id ? {
			...t,
			done: !t.done
		} : t);
		let activeTaskId = get().activeTaskId;
		const active = tasks.find((t) => t.id === activeTaskId);
		if (!active || active.done) activeTaskId = tasks.find((t) => !t.done)?.id ?? null;
		set({
			tasks,
			activeTaskId
		});
	},
	removeTask: (id) => {
		const tasks = get().tasks.filter((t) => t.id !== id);
		let activeTaskId = get().activeTaskId;
		if (activeTaskId === id) activeTaskId = tasks.find((t) => !t.done)?.id ?? null;
		set({
			tasks,
			activeTaskId
		});
	},
	setActiveTask: (id) => {
		if (id === null) {
			set({ activeTaskId: null });
			return;
		}
		const task = get().tasks.find((t) => t.id === id);
		if (!task || task.done) return;
		set({ activeTaskId: id });
	},
	completePhase: () => {
		const { phase, settings, completedToday, totalWorkSessions } = get();
		if (settings.soundEnabled) playPhaseComplete(phase === "work" ? "work" : "break");
		if (phase === "work") {
			const date = todayKey();
			const count = completedToday.date === date ? completedToday.count + 1 : 1;
			const next = count % settings.sessionsUntilLongBreak === 0 ? "longBreak" : "shortBreak";
			set({
				completedToday: {
					date,
					count
				},
				totalWorkSessions: totalWorkSessions + 1,
				phase: next,
				status: "idle",
				remainingMs: phaseDurationMs(next, settings),
				endsAt: null
			});
			return;
		}
		set({
			phase: "work",
			status: "idle",
			remainingMs: phaseDurationMs("work", settings),
			endsAt: null
		});
	}
}));
function cycleFilled(completedCount, untilLong, phase) {
	const n = Math.max(1, untilLong);
	const mod = completedCount % n;
	if (mod === 0 && completedCount > 0 && phase !== "work") return n;
	return mod;
}
function LengthRow({ id, label, value, min, max, formatValue = (n) => `${n} min`, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: id,
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted tabular-nums",
				children: formatValue(value)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
			id,
			min,
			max,
			step: 1,
			value: [value],
			onValueChange: (v) => {
				const next = v[0];
				if (typeof next !== "number" || next === value) return;
				onChange(next);
			},
			"aria-label": label
		})]
	});
}
function AppearanceRow() {
	const theme = usePomodoro((s) => s.settings.theme);
	const updateSettings = usePomodoro((s) => s.updateSettings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				id: "appearance-label",
				children: "Appearance"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Light is the default. System follows the device."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "radiogroup",
			"aria-labelledby": "appearance-label",
			className: "grid grid-cols-3 rounded-md bg-elevated p-1",
			children: THEME_OPTIONS.map((option) => {
				const selected = theme === option.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "radio",
					"aria-checked": selected,
					onClick: () => updateSettings({ theme: option.id }),
					className: cn("h-11 rounded-sm text-sm font-medium", "transition-colors duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", selected ? "bg-raised text-fg" : "text-muted hover:text-fg"),
					children: option.label
				}, option.id);
			})
		})]
	});
}
function SettingsDialog() {
	const settings = usePomodoro((s) => s.settings);
	const updateSettings = usePomodoro((s) => s.updateSettings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon",
				"aria-label": "Settings",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {})
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Settings" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Length changes apply to the next idle phase. A running timer keeps its remaining time." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LengthRow, {
				id: "work-length",
				label: "Focus",
				value: settings.workMinutes,
				min: 5,
				max: 60,
				onChange: (workMinutes) => updateSettings({ workMinutes })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LengthRow, {
				id: "short-break",
				label: "Short break",
				value: settings.shortBreakMinutes,
				min: 1,
				max: 20,
				onChange: (shortBreakMinutes) => updateSettings({ shortBreakMinutes })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LengthRow, {
				id: "long-break",
				label: "Long break",
				value: settings.longBreakMinutes,
				min: 5,
				max: 45,
				onChange: (longBreakMinutes) => updateSettings({ longBreakMinutes })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LengthRow, {
				id: "until-long",
				label: "Long break every",
				value: settings.sessionsUntilLongBreak,
				min: 2,
				max: 8,
				formatValue: (n) => `${n} sessions`,
				onChange: (sessionsUntilLongBreak) => updateSettings({ sessionsUntilLongBreak })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-4 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "sound",
						children: "Sound on complete"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "A short chime when a phase ends."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					id: "sound",
					checked: settings.soundEnabled,
					onCheckedChange: (soundEnabled) => updateSettings({ soundEnabled })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppearanceRow, {})
		]
	})] })] });
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: "size-6 text-primary",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "8",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			className: "text-elevated"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "8",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			pathLength: "100",
			strokeDasharray: "70 30",
			transform: "rotate(-90 12 12)"
		})]
	});
}
function AppHeader() {
	const completedToday = usePomodoro((s) => s.completedToday);
	const totalWorkSessions = usePomodoro((s) => s.totalWorkSessions);
	const soundEnabled = usePomodoro((s) => s.settings.soundEnabled);
	const updateSettings = usePomodoro((s) => s.updateSettings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "leading-tight",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-medium tracking-tight italic",
					children: "Still"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted tabular-nums",
					children: [
						completedToday.count,
						" today",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-subtle",
							children: [
								" · ",
								totalWorkSessions,
								" total"
							]
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"aria-label": soundEnabled ? "Mute completion sound" : "Unmute completion sound",
					onClick: () => updateSettings({ soundEnabled: !soundEnabled }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative size-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
							className: soundEnabled ? "absolute inset-0 scale-100 opacity-100" : "absolute inset-0 scale-25 opacity-0 blur-sm",
							style: { transition: "opacity var(--motion-fast) ease-in-out, transform var(--motion-fast) ease-in-out, filter var(--motion-fast) ease-in-out" }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {
							className: soundEnabled ? "absolute inset-0 scale-25 opacity-0 blur-sm" : "absolute inset-0 scale-100 opacity-100",
							style: { transition: "opacity var(--motion-fast) ease-in-out, transform var(--motion-fast) ease-in-out, filter var(--motion-fast) ease-in-out" }
						})]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: soundEnabled ? "Sound on" : "Sound off" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDialog, {})]
		})]
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg", "placeholder:text-subtle", "transition-[border-color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
var VIDEO_ID = /^[a-zA-Z0-9_-]{11}$/;
var YT_HOSTS = /* @__PURE__ */ new Set([
	"youtube.com",
	"m.youtube.com",
	"music.youtube.com",
	"youtube-nocookie.com",
	"youtu.be"
]);
function parseYouTubeId(input) {
	const trimmed = input.trim();
	if (!trimmed) return null;
	if (VIDEO_ID.test(trimmed)) return trimmed;
	let url;
	try {
		url = new URL(trimmed);
	} catch {
		return null;
	}
	const host = url.hostname.replace(/^www\./, "");
	if (!YT_HOSTS.has(host)) return null;
	if (host === "youtu.be") {
		const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
		return VIDEO_ID.test(id) ? id : null;
	}
	const fromQuery = url.searchParams.get("v");
	if (fromQuery && VIDEO_ID.test(fromQuery)) return fromQuery;
	const parts = url.pathname.split("/").filter(Boolean);
	const kind = parts.findIndex((p) => p === "embed" || p === "live" || p === "shorts" || p === "v");
	const nested = kind >= 0 ? parts[kind + 1] ?? "" : "";
	if (VIDEO_ID.test(nested)) return nested;
	return null;
}
function youtubeEmbedSrc(videoId) {
	return `https://www.youtube-nocookie.com/embed/${videoId}?${new URLSearchParams({
		rel: "0",
		modestbranding: "1",
		playsinline: "1"
	}).toString()}`;
}
var STORAGE_KEY = "still-lofi-v2";
function loadSaved() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (parsed && typeof parsed === "object") return {
				videoId: typeof parsed.videoId === "string" ? parsed.videoId : null,
				draft: typeof parsed.draft === "string" ? parsed.draft : ""
			};
		}
		const legacy = localStorage.getItem("still-lofi-url");
		if (legacy) return {
			videoId: parseYouTubeId(legacy),
			draft: legacy
		};
	} catch {}
	return {
		videoId: null,
		draft: ""
	};
}
function persist(saved) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
	} catch {}
}
function LofiEmbed({ initialCatalog = null }) {
	const [draft, setDraft] = (0, import_react.useState)("");
	const [videoId, setVideoId] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [catalog, setCatalog] = (0, import_react.useState)(initialCatalog);
	const [catalogError, setCatalogError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(!initialCatalog);
	const loadCatalog = (0, import_react.useCallback)(async (refresh = false) => {
		setLoading(true);
		setCatalogError(null);
		try {
			const payload = await getLofiLiveStreams(refresh ? { data: { refresh: true } } : void 0);
			setCatalog(payload);
		} catch (err) {
			setCatalogError(err instanceof Error ? err.message : "Could not load livestreams.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const saved = loadSaved();
		setVideoId(saved.videoId);
		setDraft(saved.draft);
		if (!initialCatalog) loadCatalog();
	}, [initialCatalog, loadCatalog]);
	function selectStream(id, title) {
		setVideoId(id);
		setError(null);
		if (title) setDraft(title);
		persist({
			videoId: id,
			draft: title ?? draft
		});
	}
	function connect(e) {
		e.preventDefault();
		const id = parseYouTubeId(draft);
		if (!id) {
			setError("Paste a YouTube video or live URL.");
			return;
		}
		setError(null);
		setVideoId(id);
		persist({
			videoId: id,
			draft: draft.trim()
		});
	}
	function disconnect() {
		setVideoId(null);
		setDraft("");
		setError(null);
		persist({
			videoId: null,
			draft: ""
		});
	}
	const groups = catalog?.channels ?? LOFI_CHANNELS.map((ch) => ({
		...ch,
		streams: []
	}));
	const liveCount = groups.reduce((sum, ch) => sum + ch.streams.length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-medium tracking-tight",
						children: "Lofi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-muted tabular-nums",
						children: loading ? "Loading" : `${liveCount} live`
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"aria-label": "Refresh livestreams",
					onClick: () => void loadCatalog(true),
					disabled: loading,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: loading ? "animate-spin" : void 0 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "mb-4 max-h-60 overflow-y-auto rounded-md border border-border bg-bg/50 p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "sr-only",
					children: "Livestreams from Claude, Catholic Lofi, and Chillhop"
				}), catalogError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-2 py-3 text-sm text-muted",
					children: catalogError
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: groups.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 pb-1 text-xs font-medium tracking-wide text-muted",
						children: channel.name
					}), loading && !catalog ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-2 h-10 rounded-sm bg-elevated" }) : channel.streams.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 py-2 text-sm text-subtle",
						children: channel.error ? "Could not load this channel." : "None live right now."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-1",
						children: channel.streams.map((stream) => {
							const selected = videoId === stream.videoId;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "radio",
								"aria-checked": selected,
								onClick: () => selectStream(stream.videoId, stream.title),
								className: cn("flex min-h-11 w-full items-center gap-3 rounded-md px-2 py-2 text-left", "transition-colors duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)]", selected ? "bg-elevated text-fg" : "text-fg hover:bg-elevated/70"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("size-2 shrink-0 rounded-full", selected ? "bg-primary" : "bg-border"),
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 text-sm leading-snug",
										children: stream.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-xs font-medium tracking-widest text-muted uppercase",
										children: "Live"
									})
								]
							}) }, stream.videoId);
						})
					})] }, channel.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative aspect-video overflow-hidden rounded-md bg-elevated",
				children: videoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					src: youtubeEmbedSrc(videoId),
					title: "Lofi livestream",
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
					allowFullScreen: true,
					referrerPolicy: "strict-origin-when-cross-origin",
					className: "absolute inset-0 size-full border-0"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center px-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-subtle",
						children: "Pick a livestream, or paste a URL below."
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: connect,
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft,
						onChange: (e) => {
							setDraft(e.target.value);
							if (error) setError(null);
						},
						placeholder: "Or paste a YouTube URL",
						"aria-label": "YouTube livestream URL",
						"aria-invalid": error ? true : void 0,
						inputMode: "url",
						autoComplete: "url"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						variant: "secondary",
						"aria-label": "Connect stream",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {})
					}),
					videoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon",
						variant: "ghost",
						"aria-label": "Disconnect stream",
						onClick: disconnect,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unplug, {})
					}) : null
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: error
			}) : null
		]
	});
}
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
		className: cn("peer size-5 shrink-0 rounded-sm border border-border bg-surface", "transition-[background-color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-fg", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
			className: "flex items-center justify-center text-current",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "size-3.5",
				strokeWidth: 2.5
			})
		})
	});
}
function TaskList() {
	const tasks = usePomodoro((s) => s.tasks);
	const activeTaskId = usePomodoro((s) => s.activeTaskId);
	const addTask = usePomodoro((s) => s.addTask);
	const toggleTask = usePomodoro((s) => s.toggleTask);
	const removeTask = usePomodoro((s) => s.removeTask);
	const setActiveTask = usePomodoro((s) => s.setActiveTask);
	const [draft, setDraft] = (0, import_react.useState)("");
	function onSubmit(e) {
		e.preventDefault();
		addTask(draft);
		setDraft("");
	}
	const remaining = tasks.filter((t) => !t.done).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-medium tracking-tight",
					children: "This session"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium tracking-wide text-muted tabular-nums",
					children: [remaining, " open"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mb-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					placeholder: "Add a task",
					"aria-label": "New task",
					maxLength: 80
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					variant: "secondary",
					"aria-label": "Add task",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
				})]
			}),
			tasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-sm text-subtle",
				children: "Nothing queued. Add what you want to finish this session."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-1",
				children: tasks.map((task) => {
					const active = task.id === activeTaskId && !task.done;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("group flex items-center gap-3 rounded-md px-2 py-1.5", "transition-colors duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)]", active && "bg-elevated"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: task.done,
								onCheckedChange: () => toggleTask(task.id),
								"aria-label": task.done ? `Restore ${task.title}` : `Complete ${task.title}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => !task.done && setActiveTask(task.id),
								className: cn("min-h-11 flex-1 py-2 text-left text-sm", task.done ? "text-subtle line-through" : "text-fg", !task.done && "hover:text-primary"),
								children: [task.title, active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-xs font-medium tracking-wide text-muted uppercase",
									children: "Now"
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								"aria-label": `Remove ${task.title}`,
								onClick: () => removeTask(task.id),
								className: "opacity-70 group-hover:opacity-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
							})
						]
					}, task.id);
				})
			})
		]
	});
}
function ThemeEngine() {
	const hydrated = usePomodoro((s) => s.hydrated);
	const theme = usePomodoro((s) => s.settings.theme);
	(0, import_react.useLayoutEffect)(() => {
		if (!hydrated) return;
		const apply = () => applyResolvedTheme(resolveTheme(theme));
		apply();
		if (theme !== "system") return;
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		media.addEventListener("change", apply);
		return () => media.removeEventListener("change", apply);
	}, [hydrated, theme]);
	return null;
}
function TimerControls() {
	const status = usePomodoro((s) => s.status);
	const phase = usePomodoro((s) => s.phase);
	const start = usePomodoro((s) => s.start);
	const pause = usePomodoro((s) => s.pause);
	const reset = usePomodoro((s) => s.reset);
	const skip = usePomodoro((s) => s.skip);
	const running = status === "running";
	const skipLabel = phase === "work" ? "Skip to break" : "Skip to focus";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						onClick: reset,
						"aria-label": "Reset timer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Reset" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "lg",
					onClick: running ? pause : start,
					"aria-label": running ? "Pause" : "Start",
					className: "min-w-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative size-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
							className: running ? "absolute inset-0 scale-25 opacity-0 blur-sm" : "absolute inset-0 scale-100 opacity-100",
							style: { transition: "opacity var(--motion-fast) ease-in-out, transform var(--motion-fast) ease-in-out, filter var(--motion-fast) ease-in-out" }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
							className: running ? "absolute inset-0 scale-100 opacity-100" : "absolute inset-0 scale-25 opacity-0 blur-sm",
							style: { transition: "opacity var(--motion-fast) ease-in-out, transform var(--motion-fast) ease-in-out, filter var(--motion-fast) ease-in-out" }
						})]
					}), running ? "Pause" : status === "paused" ? "Resume" : "Start"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						onClick: skip,
						"aria-label": skipLabel,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, {})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: skipLabel })] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "hidden text-xs text-subtle sm:block",
			children: ["Space to ", running ? "pause" : status === "paused" ? "resume" : "start"]
		})]
	});
}
function TimerEngine() {
	const status = usePomodoro((s) => s.status);
	const remainingMs = usePomodoro((s) => s.remainingMs);
	const phase = usePomodoro((s) => s.phase);
	const tick = usePomodoro((s) => s.tick);
	const hydrate = usePomodoro((s) => s.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		if (status !== "running") return;
		let id = 0;
		let last = 0;
		const loop = (t) => {
			if (t - last >= 50) {
				last = t;
				tick();
			}
			id = requestAnimationFrame(loop);
		};
		id = requestAnimationFrame(loop);
		const onVis = () => tick();
		document.addEventListener("visibilitychange", onVis);
		return () => {
			cancelAnimationFrame(id);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, [status, tick]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.code !== "Space") return;
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") return;
			e.preventDefault();
			const state = usePomodoro.getState();
			if (state.status === "running") state.pause();
			else state.start();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	(0, import_react.useEffect)(() => {
		const label = phaseLabel(phase);
		if (status === "running") document.title = `${formatMs(remainingMs)} · ${label}`;
		else if (status === "paused") document.title = `Paused · ${label}`;
		else document.title = "Still";
	}, [
		remainingMs,
		phase,
		status
	]);
	return null;
}
var SIZE = 320;
var STROKE = 7;
var RADIUS = 313 / 2 - 4;
var CIRCUMFERENCE = 2 * Math.PI * RADIUS;
function TimerRing() {
	const remainingMs = usePomodoro((s) => s.remainingMs);
	const phase = usePomodoro((s) => s.phase);
	const status = usePomodoro((s) => s.status);
	const settings = usePomodoro((s) => s.settings);
	const completedToday = usePomodoro((s) => s.completedToday);
	const tasks = usePomodoro((s) => s.tasks);
	const activeTaskId = usePomodoro((s) => s.activeTaskId);
	const total = phaseDurationMs(phase, settings);
	const dashOffset = CIRCUMFERENCE * (1 - (total > 0 ? Math.min(1, Math.max(0, remainingMs / total)) : 0));
	const filled = cycleFilled(completedToday.count, settings.sessionsUntilLongBreak, phase);
	const activeTask = tasks.find((t) => t.id === activeTaskId && !t.done);
	const statusCopy = status === "running" ? "In session" : status === "paused" ? "Paused" : "Ready";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative size-64 sm:size-80",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: `0 0 ${SIZE} ${SIZE}`,
				className: "size-full -rotate-90",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: SIZE / 2,
					cy: SIZE / 2,
					r: RADIUS,
					fill: "none",
					stroke: "currentColor",
					strokeWidth: STROKE,
					className: "text-elevated"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: SIZE / 2,
					cy: SIZE / 2,
					r: RADIUS,
					fill: "none",
					stroke: "currentColor",
					strokeWidth: STROKE,
					strokeLinecap: "round",
					strokeDasharray: CIRCUMFERENCE,
					strokeDashoffset: dashOffset,
					className: cn("text-primary", status === "paused" && "opacity-50")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center select-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-5xl font-medium tracking-tight text-fg tabular-nums sm:text-6xl",
					"aria-live": "polite",
					"aria-atomic": "true",
					children: formatMs(remainingMs)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs font-medium tracking-widest text-muted uppercase",
					children: phaseLabel(phase)
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					"aria-label": `${filled} of ${settings.sessionsUntilLongBreak} focus sessions this cycle`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1.5",
						children: Array.from({ length: settings.sessionsUntilLongBreak }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full transition-colors duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]", i < filled ? "bg-primary" : "bg-elevated") }, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-medium tracking-wide text-muted tabular-nums",
						children: [
							filled,
							"/",
							settings.sessionsUntilLongBreak
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-subtle",
					children: statusCopy
				}),
				activeTask ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "max-w-xs text-center text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-subtle",
						children: "Now · "
					}), activeTask.title]
				}) : null
			]
		})]
	});
}
function Home() {
	const phase = usePomodoro((s) => s.phase);
	const catalog = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerEngine, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeEngine, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-phase": phase,
			className: "phase-shell flex min-h-svh flex-col px-5 pt-6 pb-10 sm:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-lg flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "flex flex-1 flex-col gap-10 pt-10 sm:pt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerRing, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerControls, {})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LofiEmbed, { initialCatalog: catalog }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskList, {})
					]
				})]
			})
		})
	] });
}
//#endregion
export { Home as component };
