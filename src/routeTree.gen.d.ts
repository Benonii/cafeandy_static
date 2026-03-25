import { Route as rootRouteImport } from './routes/__root';
import { Route as SignupRouteImport } from './routes/signup';
import { Route as ResetPasswordRouteImport } from './routes/reset-password';
import { Route as LoginRouteImport } from './routes/login';
import { Route as ForgotPasswordRouteImport } from './routes/forgot-password';
import { Route as IndexRouteImport } from './routes/index';
declare const SignupRoute: import("@tanstack/router-core").Route<import("@tanstack/router-core").Register, import("@tanstack/react-router").RootRoute<import("@tanstack/router-core").Register, undefined, {}, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, {}, undefined, unknown, unknown, unknown, unknown, undefined>, "/signup", "/signup", "/signup", "/signup", undefined, import("@tanstack/router-core").ResolveParams<"/signup">, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, {}, undefined, unknown, unknown, unknown, unknown, undefined>;
declare const ResetPasswordRoute: import("@tanstack/router-core").Route<import("@tanstack/router-core").Register, import("@tanstack/react-router").RootRoute<import("@tanstack/router-core").Register, undefined, {}, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, {}, undefined, unknown, unknown, unknown, unknown, undefined>, "/reset-password", "/reset-password", "/reset-password", "/reset-password", undefined, import("@tanstack/router-core").ResolveParams<"/reset-password">, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, {}, undefined, unknown, unknown, unknown, unknown, undefined>;
declare const LoginRoute: import("@tanstack/router-core").Route<import("@tanstack/router-core").Register, import("@tanstack/react-router").RootRoute<import("@tanstack/router-core").Register, undefined, {}, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, {}, undefined, unknown, unknown, unknown, unknown, undefined>, "/login", "/login", "/login", "/login", undefined, import("@tanstack/router-core").ResolveParams<"/login">, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, {}, undefined, unknown, unknown, unknown, unknown, undefined>;
declare const ForgotPasswordRoute: import("@tanstack/router-core").Route<import("@tanstack/router-core").Register, import("@tanstack/react-router").RootRoute<import("@tanstack/router-core").Register, undefined, {}, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, {}, undefined, unknown, unknown, unknown, unknown, undefined>, "/forgot-password", "/forgot-password", "/forgot-password", "/forgot-password", undefined, import("@tanstack/router-core").ResolveParams<"/forgot-password">, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, {}, undefined, unknown, unknown, unknown, unknown, undefined>;
declare const IndexRoute: import("@tanstack/router-core").Route<import("@tanstack/router-core").Register, import("@tanstack/react-router").RootRoute<import("@tanstack/router-core").Register, undefined, {}, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, {}, undefined, unknown, unknown, unknown, unknown, undefined>, "/", "/", "/", "/", undefined, import("@tanstack/router-core").ResolveParams<"/">, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, {}, undefined, unknown, unknown, unknown, unknown, undefined>;
export interface FileRoutesByFullPath {
    '/': typeof IndexRoute;
    '/forgot-password': typeof ForgotPasswordRoute;
    '/login': typeof LoginRoute;
    '/reset-password': typeof ResetPasswordRoute;
    '/signup': typeof SignupRoute;
}
export interface FileRoutesByTo {
    '/': typeof IndexRoute;
    '/forgot-password': typeof ForgotPasswordRoute;
    '/login': typeof LoginRoute;
    '/reset-password': typeof ResetPasswordRoute;
    '/signup': typeof SignupRoute;
}
export interface FileRoutesById {
    __root__: typeof rootRouteImport;
    '/': typeof IndexRoute;
    '/forgot-password': typeof ForgotPasswordRoute;
    '/login': typeof LoginRoute;
    '/reset-password': typeof ResetPasswordRoute;
    '/signup': typeof SignupRoute;
}
export interface FileRouteTypes {
    fileRoutesByFullPath: FileRoutesByFullPath;
    fullPaths: '/' | '/forgot-password' | '/login' | '/reset-password' | '/signup';
    fileRoutesByTo: FileRoutesByTo;
    to: '/' | '/forgot-password' | '/login' | '/reset-password' | '/signup';
    id: '__root__' | '/' | '/forgot-password' | '/login' | '/reset-password' | '/signup';
    fileRoutesById: FileRoutesById;
}
export interface RootRouteChildren {
    IndexRoute: typeof IndexRoute;
    ForgotPasswordRoute: typeof ForgotPasswordRoute;
    LoginRoute: typeof LoginRoute;
    ResetPasswordRoute: typeof ResetPasswordRoute;
    SignupRoute: typeof SignupRoute;
}
declare module '@tanstack/react-router' {
    interface FileRoutesByPath {
        '/signup': {
            id: '/signup';
            path: '/signup';
            fullPath: '/signup';
            preLoaderRoute: typeof SignupRouteImport;
            parentRoute: typeof rootRouteImport;
        };
        '/reset-password': {
            id: '/reset-password';
            path: '/reset-password';
            fullPath: '/reset-password';
            preLoaderRoute: typeof ResetPasswordRouteImport;
            parentRoute: typeof rootRouteImport;
        };
        '/login': {
            id: '/login';
            path: '/login';
            fullPath: '/login';
            preLoaderRoute: typeof LoginRouteImport;
            parentRoute: typeof rootRouteImport;
        };
        '/forgot-password': {
            id: '/forgot-password';
            path: '/forgot-password';
            fullPath: '/forgot-password';
            preLoaderRoute: typeof ForgotPasswordRouteImport;
            parentRoute: typeof rootRouteImport;
        };
        '/': {
            id: '/';
            path: '/';
            fullPath: '/';
            preLoaderRoute: typeof IndexRouteImport;
            parentRoute: typeof rootRouteImport;
        };
    }
}
export declare const routeTree: import("@tanstack/router-core").Route<import("@tanstack/router-core").Register, any, "/", "/", string, "__root__", undefined, {}, {}, import("@tanstack/router-core").AnyContext, import("@tanstack/router-core").AnyContext, {}, undefined, RootRouteChildren, FileRouteTypes, unknown, unknown, undefined>;
import type { getRouter } from './router.tsx';
declare module '@tanstack/react-start' {
    interface Register {
        ssr: true;
        router: Awaited<ReturnType<typeof getRouter>>;
    }
}
export {};
