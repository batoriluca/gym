import { NextResponse } from "next/server";

export function middleware(request) {
    const url = request.nextUrl.clone();

    let isLoggedIn = request.cookies.get("isLIn") || false;
    let m = request.cookies.get("m") || false;
    let p = request.cookies.get("p") || false;
    // Add more pages as needed 
    // if User is Logged in
    const authenticatedPages = ['/feed', '/emailverif', '/payment', '/setupacc', '/settings', '/changeprofile'];
    const requiresAuthentication = authenticatedPages.includes(
        request.nextUrl.pathname
    );

    // if User is Logged in
    const authenticatedPages2 = ['/autentificare', '/createaccount', '/emailverif', '/payment', '/setupacc'];
    const requiresAuthentication2 = authenticatedPages2.includes(
        request.nextUrl.pathname
    );

    // if User is email verify
    const authenticatedPages3 = ['/autentificare', '/createaccount', '/payment', '/setupacc'];
    const requiresAuthentication3 = authenticatedPages3.includes(
        request.nextUrl.pathname
    );

    // if User is Membership
    const authenticatedPages4 = ['/autentificare', '/createaccount', '/emailverif', '/setupacc'];
    const requiresAuthentication4 = authenticatedPages4.includes(
        request.nextUrl.pathname
    );

    // if User is Pending
    const authenticatedPages5 = ['/autentificare', '/createaccount', '/emailverif', '/payment'];
    const requiresAuthentication5 = authenticatedPages5.includes(
        request.nextUrl.pathname
    );

    if (!isLoggedIn) {
        if (requiresAuthentication) {
            return NextResponse.rewrite(new URL("/autentificare", request.url));
        }
    } else {
        if (p.value == "Unverify") {
            if (requiresAuthentication) {
                return NextResponse.rewrite(new URL("/emailverif", request.url));
            }
            if (requiresAuthentication3) {
                return NextResponse.rewrite(new URL("/emailverif", request.url));
            }
        }
        if (m.value == "Expaired" || m.value == "Pending") {
            if (requiresAuthentication) {
                return NextResponse.rewrite(new URL("/payment", request.url));
            }
            if (requiresAuthentication4) {
                return NextResponse.rewrite(new URL("/payment", request.url));
            }
        }
        if (p.value == "Pending") {
            if (requiresAuthentication) {
                return NextResponse.rewrite(new URL("/setupacc", request.url));
            }
            if (requiresAuthentication5) {
                return NextResponse.rewrite(new URL("/setupacc", request.url));
            }
        }

        if (requiresAuthentication2 && p.value !== "Unverify" && m.value !== "Expaired" && m.value !== "Pending" && p.value !== "Pending") {
            return NextResponse.rewrite(new URL("/feed", request.url));
        }
    }
}