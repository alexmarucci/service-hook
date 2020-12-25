const loadableDeps = new Map();
const deps = new Map();

function loadService(id, args) {
  const l = loadableDeps.get(id);

  if (l) {
    deps.set(id, l(...args));
    loadableDeps.delete(id);
  }

  return deps.get(id);
}

export function createService(fn) {
  const callable = typeof fn === "function";
  const id = Symbol(fn);

  if (callable) loadableDeps.set(id, fn);
  else loadableDeps.set(id, () => fn);

  return id;
}

export function useService(id, ...args) {
  const d = deps.get(id);

  return d ?? loadService(id, args);
}
