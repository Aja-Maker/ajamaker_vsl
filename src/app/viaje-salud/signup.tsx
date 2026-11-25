"use client";

import { useState, type FormEvent } from "react";

export default function JourneySignup() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("No pudimos completar tu registro. Inténtalo de nuevo.");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/viaje-salud/register", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(typeof result?.error === "string" ? result.error : "No pudimos completar tu registro. Inténtalo de nuevo.");
      }
      setStatus("success");
    } catch (error) { setErrorMessage(error instanceof Error ? error.message : "No pudimos completar tu registro. Inténtalo de nuevo."); setStatus("error"); }
  }
  if (status === "success") return <p role="status" className="mt-8 rounded-2xl bg-white p-6 font-semibold text-[#173e38]">¡Te has inscrito! Revisa tu correo para ver la confirmación.</p>;
  return <form onSubmit={submit} className="mt-8 grid gap-4 rounded-2xl bg-white p-6 text-left text-[#243a35] shadow-xl">
    <label className="text-sm font-semibold">Nombre completo<input required name="name" autoComplete="name" className="mt-2 w-full rounded-lg border border-[#cad5ca] p-3" /></label>
    <label className="text-sm font-semibold">Teléfono<input required name="phone" type="tel" autoComplete="tel" className="mt-2 w-full rounded-lg border border-[#cad5ca] p-3" /></label>
    <label className="text-sm font-semibold">WhatsApp<input required name="whatsapp" type="tel" className="mt-2 w-full rounded-lg border border-[#cad5ca] p-3" /></label>
    <label className="text-sm font-semibold">Correo electrónico<input required name="email" type="email" autoComplete="email" className="mt-2 w-full rounded-lg border border-[#cad5ca] p-3" /></label>
    {status === "error" && <p role="alert" className="text-sm text-red-700">{errorMessage}</p>}
    <button disabled={status === "loading"} className="rounded-full bg-[#bc8b58] px-6 py-4 font-bold text-white disabled:opacity-50">{status === "loading" ? "Registrando..." : "Sí, quiero comenzar mi viaje"}</button>
  </form>;
}
