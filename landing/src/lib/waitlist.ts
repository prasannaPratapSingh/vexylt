/**
 * Waitlist storage.
 *
 * This is a front-end-only implementation: signups are validated and kept in
 * localStorage so the flow is fully functional in the demo. To make it real,
 * replace `submit()` with a POST to your backend / a form provider and keep
 * the same return shape.
 */

const STORAGE_KEY = "vexylt.waitlist.v1";
// Seed so an early signup lands at a believable position in line.
const SEED = 1274;

export type WaitlistResult =
  | { status: "joined"; position: number }
  | { status: "already"; position: number }
  | { status: "invalid" };

type Store = { emails: string[] };

function read(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { emails: [] };
    const parsed = JSON.parse(raw) as Partial<Store>;
    return { emails: Array.isArray(parsed.emails) ? parsed.emails : [] };
  } catch {
    return { emails: [] };
  }
}

function write(store: Store): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* storage unavailable — degrade quietly, the UI still confirms */
  }
}

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  // Deliberately simple: a local part, an @, a dot-something domain.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export function count(): number {
  return SEED + read().emails.length;
}

/** Simulated async join. Resolves after a short beat so pending state shows. */
export function submit(rawEmail: string): Promise<WaitlistResult> {
  return new Promise((resolve) => {
    const email = rawEmail.trim().toLowerCase();

    if (!isValidEmail(email)) {
      resolve({ status: "invalid" });
      return;
    }

    window.setTimeout(() => {
      const store = read();
      const existingIndex = store.emails.indexOf(email);

      if (existingIndex !== -1) {
        resolve({ status: "already", position: SEED + existingIndex + 1 });
        return;
      }

      store.emails.push(email);
      write(store);
      resolve({ status: "joined", position: SEED + store.emails.length });
    }, 620);
  });
}
