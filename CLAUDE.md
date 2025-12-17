# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TinySplit SPA is an Angular 20 single-page application using zoneless change detection, Angular Material, TailwindCSS, and FontAwesome. The backend API is expected to run at `http://localhost/api/v1` (configurable via environment files).

## Development Commands

### Start Development Server
```bash
npm start
# or
ng serve
```
Server runs on `http://localhost:4200/` with hot reload enabled.

### Build
```bash
npm run build          # Production build
npm run watch          # Development build with watch mode
ng build --configuration development  # Development build
```

### Testing
```bash
npm test               # Run all tests with Karma
ng test                # Same as above
```

### Code Generation
```bash
ng generate component component-name
ng generate service service-name
ng generate --help     # See all available schematics
```

### Docker Development
```bash
docker-compose up      # Start containerized development environment
```
The Docker setup connects to an external network `tinysplit-api_api-network` to communicate with the backend API.

## Architecture

### Project Structure
```
src/app/
├── core/              # Core singleton services and interceptors
│   ├── interceptors/  # HTTP interceptors (auth, refresh token)
│   └── services/      # Core services (theme, etc.)
├── features/          # Feature modules (lazy-loaded where applicable)
│   ├── auth/          # Authentication (login, guards, resolvers)
│   ├── dashboard/     # Dashboard feature
│   ├── storage/       # LocalStorage wrapper service
│   └── user/          # User management (register, user service)
├── layouts/           # Layout components
│   ├── fullscreen-layout/  # For login/register pages
│   └── main-layout/        # For authenticated pages with navigation
└── shared/            # Shared components, directives, pipes, models
    ├── components/
    ├── directives/
    ├── models/
    └── pipes/
```

### Key Architectural Patterns

**Zoneless Change Detection**: The app uses `provideZonelessChangeDetection()` instead of Zone.js. Components must explicitly trigger change detection when needed.

**Feature-Based Organization**: Features are organized by domain (auth, user, dashboard) with their own routes, services, and components. Each feature module should have:
- `*.routes.ts` - Feature routing configuration
- `*.service.ts` - Feature-specific services
- `*.model.ts` - TypeScript interfaces/types
- Components in subdirectories

**Two-Layout System**:
- `MainLayoutComponent` - For authenticated pages with navigation/sidebar
- `FullscreenLayoutComponent` - For login, register, and public pages

**Route Structure**: Routes are defined in `app.routes.ts` and import feature-specific routes from each module (e.g., `AUTH_ROUTES`, `USER_ROUTES`). The root path uses `MainLayoutComponent` with `authGuard`.

### Authentication Flow

1. **Login**: `AuthService.login()` stores tokens (`token`, `refresh_token`) in localStorage via `StorageService`
2. **Request Interception**: `AuthenticationInterceptor` adds `Authorization` header if authenticated
3. **Token Refresh**: `RefreshTokenInterceptor` handles token refresh on 401 responses
4. **Route Protection**: `authGuard` protects routes requiring authentication
5. **Logout**: `logoutResolver` handles logout logic on the login route

**Important**: Authentication tokens are stored in localStorage and managed through `StorageService`. The `AuthService.isAuthenticated()` method checks token presence.

### HTTP Interceptors

Interceptors are registered in `app.config.ts` with `withInterceptors([AuthenticationInterceptor, RefreshTokenInterceptor])`. They are functional interceptors (not class-based).

### Theme Management

The app supports light and dark themes via `ThemeService` (`src/app/core/services/theme.service.ts`):
- Uses Angular signals for reactive theme state
- Persists theme preference in localStorage
- Defaults to system preference or dark mode
- Toggle via toolbar button in main layout
- Theme applied to `document.body.style.colorScheme`

### Environment Configuration

Environment files use the pattern `enviroment.ts` and `enviroment.prod.ts` (note the typo in the filename). The `angular.json` file replacement configuration maps these during builds:
- Development: `src/environments/enviroment.ts`
- Production: `src/environments/enviroment.prod.ts`

API host is configured in environment files (`apiHost` property).

### Styling

- **TailwindCSS 4.x** with PostCSS for utility-first styling
- **Angular Material** with date-fns adapter for date components
- **SCSS** as the component style language (configured in `angular.json`)
- Main styles entry point: `src/styles/main.scss`
- Default Material form field appearance: `fill`

### Third-Party Libraries

- **ngx-mask**: Input masking (configured globally with `provideEnvironmentNgxMask()`)
- **FontAwesome**: Icon library with `angular-fontawesome` wrapper
- **date-fns**: Date manipulation with Material adapter

### Code Style

Prettier is configured with:
- `printWidth: 100`
- `singleQuote: true`
- Angular parser for HTML files

## Common Patterns

### Creating a New Feature Module

1. Create feature directory under `src/app/features/`
2. Add `*.routes.ts` with route configuration
3. Add `*.service.ts` for data/business logic
4. Add `*.model.ts` for TypeScript types
5. Import routes in `app.routes.ts`

### Using StorageService

The `StorageService` wraps localStorage with methods:
- `save(items: Object)` - Save multiple key-value pairs
- `getItem(key: string)` - Retrieve a value
- `removeItem(key: string)` - Remove a value

### Adding Authenticated Routes

Authenticated routes should use `MainLayoutComponent` as parent and include `canActivate: [authGuard]`:

```typescript
{
  path: 'protected',
  component: MainLayoutComponent,
  canActivate: [authGuard],
  children: [
    // child routes
  ]
}
```

### Menu Items Configuration

Navigation menu items are defined in `src/app/shared/menu-items.ts` with structure:
```typescript
{ name: string, icon: IconProp | '', path: string }
```
