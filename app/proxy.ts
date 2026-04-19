import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log(req.cookies);
  

  const isAuthPage =
    req.nextUrl.pathname === "/sign-in" ||
    req.nextUrl.pathname === "/sign-up";

  const isPrivatePage =
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/notes");

  // ❌ НЕ авторизований → намагається в приватний роут
  if (!token && isPrivatePage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // ❌ авторизований → йде на auth сторінки
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}
