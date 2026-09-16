import { useSyncExternalStore } from "react";
import { seedMotos, type Moto, type MotoRequest } from "./moto-data";

const MOTOS_KEY = "motodrive_motos_v1";
const REQUESTS_KEY = "motodrive_requests_v1";

let motos: Moto[] = seedMotos;
let requests: MotoRequest[] = [];
let hydrated = false;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function loadFromStorage() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const rawMotos = window.localStorage.getItem(MOTOS_KEY);
    if (rawMotos) {
      const parsed = JSON.parse(rawMotos) as Moto[];
      if (Array.isArray(parsed)) motos = parsed;
    }
    const rawRequests = window.localStorage.getItem(REQUESTS_KEY);
    if (rawRequests) {
      const parsed = JSON.parse(rawRequests) as MotoRequest[];
      if (Array.isArray(parsed)) requests = parsed;
    }
  } catch {
    /* повреждённые данные — используем начальный набор */
  }
  emit();
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MOTOS_KEY, JSON.stringify(motos));
    window.localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  } catch {
    /* хранилище недоступно */
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  loadFromStorage();
  return () => listeners.delete(listener);
}

export function useMotos(): Moto[] {
  return useSyncExternalStore(
    subscribe,
    () => motos,
    () => seedMotos,
  );
}

export function useRequests(): MotoRequest[] {
  return useSyncExternalStore(
    subscribe,
    () => requests,
    () => [] as MotoRequest[],
  );
}

function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e4).toString(36)}`;
}

export function addMoto(data: Omit<Moto, "id">) {
  motos = [{ ...data, id: newId("moto") }, ...motos];
  persist();
  emit();
}

export function updateMoto(id: string, data: Omit<Moto, "id">) {
  motos = motos.map((m) => (m.id === id ? { ...data, id } : m));
  persist();
  emit();
}

export function removeMoto(id: string) {
  motos = motos.filter((m) => m.id !== id);
  persist();
  emit();
}

export function resetMotos() {
  motos = seedMotos;
  persist();
  emit();
}

export function addRequest(data: Omit<MotoRequest, "id" | "createdAt">) {
  requests = [
    { ...data, id: newId("req"), createdAt: new Date().toISOString() },
    ...requests,
  ];
  persist();
  emit();
}

export function removeRequest(id: string) {
  requests = requests.filter((r) => r.id !== id);
  persist();
  emit();
}
