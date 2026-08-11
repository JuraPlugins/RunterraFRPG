import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { databaseMessage } from "@/lib/db";

export function apiError(error: unknown) {
  if (error instanceof Error && error.message === "UNAUTHORIZED") return NextResponse.json({ error: "Bu işlem için giriş yapmalısın." }, { status: 401 });
  if (error instanceof Error && error.message === "FORBIDDEN") return NextResponse.json({ error: "Bu işlem için GM yetkin yok." }, { status: 403 });
  if (error instanceof Error && error.message === "NOT_FOUND") return NextResponse.json({ error: "Oda veya kayıt bulunamadı." }, { status: 404 });
  if (error instanceof ZodError) return NextResponse.json({ error: error.issues[0]?.message ?? "Geçersiz veri." }, { status: 400 });
  if (error && typeof error === "object" && "code" in error && error.code === "23505") return NextResponse.json({ error: "Bu kayıt zaten kullanılıyor." }, { status: 409 });
  console.error("[api]", error);
  return NextResponse.json({ error: databaseMessage(error) }, { status: 500 });
}
