# Interconnectivity in the Facile Suite

## Status Quo

Every Facile app is a standalone island. No shared code, no shared database, no shared types. Each app owns its own project model, its own auth, its own schema. The only integration points that exist today are:

- **Perception** ingests events from other apps via `perception-js` SDK
- **Nook** relays webhooks between services (Plume -> Nook -> Perception)
- **Portail** links to all services via hardcoded URLs
- **Suite** describes the vision but implements none of it

The promise on the landing page — "un seul login, zéro dépendance cloud" — is aspirational. The apps don't talk to each other yet.

---

## The Sablier <-> Opus Problem

Sablier tracks time. Opus manages projects. These two share the most obvious overlap in the entire suite: **the concept of a project**.

### Schema Comparison

| Field | Sablier (Go/GORM) | Opus (TS/Drizzle) |
|-------|-------------------|-------------------|
| ID | `int64` (auto-increment) | `text` (CUID2 string) |
| Name | `string` | `text`, required |
| Description | `string` | `text`, nullable |
| Slug | — | `text`, required |
| Icon | — | `text`, default "Layout" |
| Visibility | — | `is_public` boolean |
| Archive | — | `archived_at` timestamp |
| Owner | `owner_id int64` | — (workspace-level) |
| Scope | workspace-wide, flat | workspace -> project hierarchy |
| Tasks | separate table, linked by `project_id` | separate table, linked by `project_id` |
| Time entries | `time_entry.project_id` | `time_entry.task_id` (task-level) |

**Key tensions:**
- ID systems are incompatible (`int64` vs CUID2 string)
- Sablier projects are flat (no workspace hierarchy)
- Opus projects are richer (icon, slug, archive, visibility)
- Sablier has owner-per-project; Opus has workspace membership
- Time tracking lives in Sablier at the project level, in Opus at the task level

---

## Chosen Architecture: Nook as Universal Event Bus

After evaluating lightweight linking, shared microservices, shared databases, and direct API calls, the chosen architecture is **event-driven sync through Nook**.

Every app in the suite gets one toggle: **"Enable Nook Sync"**. Nook handles discovery, routing, and delivery. Apps that aren't running don't receive events. Apps added later join the mesh automatically.

### Core Principles

1. **One integration per app, forever.** Each app talks to Nook. Never to other apps directly.
2. **Canonical event format.** All apps emit and consume a shared `@facile/events` shape. Nook routes envelopes, never parses payloads.
3. **Origin-wins conflict resolution.** The app where an object was created owns it. Other apps receive synced copies.
4. **Perception observes, never decides.** Perception taps the event stream for analytics and dashboards. It is not in the sync hot path.
5. **Graceful partial deployments.** Run 2 apps or 8 — Nook adapts. No config matrix.

---

## Architecture Diagram

> See `INTERCONNECTIVITY.d2` for the full rendered diagram.

```d2
direction: down

title: {
  label: Facile Suite — Nook Event Bus Architecture
  near: top-center
  shape: text
  style.font-size: 28
  style.bold: true
  style.font-color: "#1a1a1a"
}

# ── Apps layer ──────────────────────────────────────────

apps: {
  label: "Facile Apps"
  style.fill: transparent
  style.stroke: transparent

  sablier: {
    label: |md
      **Sablier**
      Time Tracking
      Go / PostgreSQL
    |
    shape: rectangle
    style.fill: "#e8f4f8"
    style.stroke: "#2196F3"
    style.border-radius: 8
  }

  opus: {
    label: |md
      **Opus**
      Project Management
      Node / PostgreSQL
    |
    shape: rectangle
    style.fill: "#e8f4f8"
    style.stroke: "#2196F3"
    style.border-radius: 8
  }

  ardoise: {
    label: |md
      **Ardoise**
      Invoicing & Payments
      Node / PostgreSQL
    |
    shape: rectangle
    style.fill: "#e8f4f8"
    style.stroke: "#2196F3"
    style.border-radius: 8
  }

  plume: {
    label: |md
      **Plume**
      Digital Signatures
      Go / PostgreSQL
    |
    shape: rectangle
    style.fill: "#e8f4f8"
    style.stroke: "#2196F3"
    style.border-radius: 8
  }

  glouton: {
    label: |md
      **Glouton**
      Lead Generation
      Node / PostgreSQL
    |
    shape: rectangle
    style.fill: "#e8f4f8"
    style.stroke: "#2196F3"
    style.border-radius: 8
  }

  vision: {
    label: |md
      **Vision**
      Web Analytics
    |
    shape: rectangle
    style.fill: "#e8f4f8"
    style.stroke: "#2196F3"
    style.border-radius: 8
  }
}

# ── Canonical contract ──────────────────────────────────

contract: {
  label: |md
    **@facile/events**
    Canonical event envelope
    {app, object, action, facile_id, payload, ts, idempotency_key}
  |
  shape: page
  style.fill: "#fff9c4"
  style.stroke: "#f9a825"
  style.border-radius: 4
  style.font-size: 13
}

# ── Nook ────────────────────────────────────────────────

nook: {
  label: "Nook — Universal Event Bus"
  style.fill: "#f3e5f5"
  style.stroke: "#7B1FA2"
  style.border-radius: 12
  style.font-size: 16
  style.bold: true

  registry: {
    label: |md
      **Registry**
      Which apps are active
      What objects they sync
    |
    shape: cylinder
    style.fill: "#e1bee7"
    style.stroke: "#7B1FA2"
  }

  queue: {
    label: |md
      **Event Queue**
      SQLite-backed
      Persist / Retry / Order
    |
    shape: queue
    style.fill: "#e1bee7"
    style.stroke: "#7B1FA2"
  }

  router: {
    label: |md
      **Router**
      Registry-based fan-out
      Idempotent delivery
    |
    shape: hexagon
    style.fill: "#e1bee7"
    style.stroke: "#7B1FA2"
  }

  event-log: {
    label: |md
      **Event Log**
      Append-only
      All events ever
    |
    shape: cylinder
    style.fill: "#e1bee7"
    style.stroke: "#7B1FA2"
  }

  dlq: {
    label: |md
      **Dead Letter Queue**
      Failed deliveries
      Admin visibility
    |
    shape: cylinder
    style.fill: "#ffcdd2"
    style.stroke: "#c62828"
  }

  registry -> router: lookup
  queue -> router: dequeue
  router -> event-log: log
  router -> dlq: on failure
}

# ── Perception ──────────────────────────────────────────

perception: {
  label: |md
    **Perception**
    Intelligence Layer (read-only)
  |
  style.fill: "#e8f5e9"
  style.stroke: "#388E3C"
  style.border-radius: 12

  analytics: {
    label: "Cross-app analytics"
    shape: rectangle
    style.fill: "#c8e6c9"
    style.stroke: "#388E3C"
    style.border-radius: 4
  }

  anomalies: {
    label: "Anomaly detection"
    shape: rectangle
    style.fill: "#c8e6c9"
    style.stroke: "#388E3C"
    style.border-radius: 4
  }

  dashboards: {
    label: "Unified dashboards"
    shape: rectangle
    style.fill: "#c8e6c9"
    style.stroke: "#388E3C"
    style.border-radius: 4
  }

  nl-queries: {
    label: "Natural language queries"
    shape: rectangle
    style.fill: "#c8e6c9"
    style.stroke: "#388E3C"
    style.border-radius: 4
  }
}

# ── Suite / Portail ─────────────────────────────────────

suite: {
  label: |md
    **Suite**
    Landing page
    Marketing / showcase
  |
  shape: rectangle
  style.fill: "#fce4ec"
  style.stroke: "#c2185b"
  style.border-radius: 8
}

portail: {
  label: |md
    **Portail**
    Employee portal
    Links to all services
  |
  shape: rectangle
  style.fill: "#fce4ec"
  style.stroke: "#c2185b"
  style.border-radius: 8
}

# ── Connections: Apps -> Nook ───────────────────────────

apps.sablier -> nook: {
  label: "emit + receive"
  style.stroke: "#2196F3"
  style.animated: true
}
apps.opus -> nook: {
  label: "emit + receive"
  style.stroke: "#2196F3"
  style.animated: true
}
apps.ardoise -> nook: {
  label: "emit + receive"
  style.stroke: "#2196F3"
  style.animated: true
}
apps.plume -> nook: {
  label: "emit + receive"
  style.stroke: "#2196F3"
  style.animated: true
}
apps.glouton -> nook: {
  label: "emit + receive"
  style.stroke: "#2196F3"
  style.animated: true
}
apps.vision -> nook: {
  label: "emit only"
  style.stroke: "#90CAF9"
  style.stroke-dash: 5
}

# ── Connection: Contract ────────────────────────────────

apps -> contract: {
  label: "all apps conform to"
  style.stroke: "#f9a825"
  style.stroke-dash: 3
}
contract -> nook: {
  label: "envelope format"
  style.stroke: "#f9a825"
  style.stroke-dash: 3
}

# ── Connection: Nook -> Perception ──────────────────────

nook.event-log -> perception: {
  label: "tap (read-only stream)"
  style.stroke: "#388E3C"
  style.stroke-dash: 5
  style.animated: true
}

# ── Example sync flow ──────────────────────────────────

example: {
  label: |md
    **Example: Project sync flow**

    1. User creates project "Acme" in Opus
    2. Opus emits `{app: "opus", object: "project", action: "created", facile_id: "fac_xyz", payload: {name: "Acme"}}`
    3. Nook persists event in queue
    4. Router checks registry → Sablier is registered for "project" events
    5. Nook delivers to `POST sablier.internal/webhooks/nook`
    6. Sablier creates mirror project, stores `facile_id: "fac_xyz"`
    7. Event logged. Perception observes for analytics.
  |
  shape: page
  near: bottom-center
  style.fill: "#f5f5f5"
  style.stroke: "#bdbdbd"
  style.border-radius: 8
  style.font-size: 13
}
```

---

## How Nook Becomes the Event Bus

### Current state

Nook is a monitoring tool. It watches websites, receives webhooks, and forwards alerts to Discord/Matrix/ntfy. Fire-and-forget. No persistence, no retry, no ordering.

### Required upgrades

| Capability | Why it matters |
|-----------|---------------|
| **App registry** | Nook needs to know which apps are running and what objects they care about. `POST /api/register {app, url, objects, webhook_endpoint}` |
| **Persistent queue** | If Sablier is down for 5 minutes, events must wait, not vanish. SQLite-backed queue inside Nook. |
| **At-least-once delivery** | Every event reaches every registered consumer, with idempotency keys to prevent duplicates. |
| **Retry with backoff** | Failed deliveries retry automatically (exponential backoff, configurable max attempts). |
| **Ordering guarantees** | `project.created` must arrive before `project.updated`. Per-object FIFO ordering via `facile_id`. |
| **Dead letter queue** | Events that fail N times go to a visible DLQ. Admin UI to inspect and replay. |
| **Event log** | Append-only log of all events. Perception taps this stream. Useful for debugging, replay, and audit. |

### Registration flow

When an app enables "Nook Sync" in its settings:

```
App -> POST nook.internal/api/register
{
  "app": "sablier",
  "url": "https://sablier.internal",
  "objects": ["project", "task", "time_entry", "user"],
  "webhook_endpoint": "/webhooks/nook",
  "secret": "hmac-shared-secret"
}

Nook -> 200 OK { "registered": true, "sync_id": "..." }
```

Nook maintains the registry. When Opus emits `project.created`, Nook checks: "who is registered for `project` events?" — fans out to Sablier, Ardoise, whoever's listening.

Apps that aren't registered don't receive anything. Add Ardoise next month, it joins the mesh by registering. Zero config in other apps.

---

## Canonical Event Format: `@facile/events`

All apps emit and consume the same envelope. Nook routes it without parsing the payload.

```json
{
  "app": "opus",
  "object": "project",
  "action": "created",
  "facile_id": "fac_cuid2xyz",
  "payload": {
    "name": "Acme Corp",
    "description": "Website redesign"
  },
  "timestamp": "2026-05-22T14:30:00Z",
  "idempotency_key": "opus_proj_created_fac_cuid2xyz_1716388200"
}
```

### Canonical object shapes

These are the shared, minimal shapes. Each app maps to/from these. App-specific fields (Opus's `slug`, `icon`, `is_public`) stay local — they don't cross the wire.

```
FacileProject   = { facile_id, name, description }
FacileTask      = { facile_id, project_facile_id, name, status }
FacileUser      = { facile_id, email, name }
FacileTimeEntry = { facile_id, task_facile_id, user_facile_id, started_at, stopped_at }
FacileInvoice   = { facile_id, client_name, amount, currency, status }
FacileDocument  = { facile_id, title, status, signer_email }
```

### The `facile_id` — cross-app identity

Every synced object gets a `facile_id` (CUID2) distinct from the app's internal ID. Each app stores a mapping:

```
Sablier: projects.facile_id TEXT UNIQUE NULL
Opus:    project.facile_id  TEXT UNIQUE NULL
```

Nook routes by `facile_id`. Apps resolve to their local ID internally. This solves the `int64` vs CUID2 mismatch permanently.

**Who generates it?** The origin app — the app where the object was first created. When Opus creates a project, it generates the `facile_id`. When Sablier receives the sync event, it stores that `facile_id` alongside its local `int64` ID.

---

## Conflict Resolution: Origin-Wins

The app where an object was created is its **origin**. The origin app is the source of truth for that object.

| Scenario | Behavior |
|----------|----------|
| Opus creates project, syncs to Sablier | Opus is origin. Opus edits propagate to Sablier. |
| User edits the project name in Sablier | Sablier emits `project.updated`. Nook routes to Opus. Opus accepts (origin can delegate edits) OR rejects (origin-only writes). |
| Both apps edit simultaneously | Origin's edit wins. Non-origin edit is overwritten on next sync cycle. |
| Origin app deletes the object | Deletion propagates. Receiving apps soft-delete or nullify the `facile_id`. |

**For v1: origin edits only.** Synced copies in non-origin apps are read-only (or editable with a "push to origin" flow). This avoids the entire conflict resolution space.

---

## Perception's Role: Observe, Don't Route

Perception taps Nook's event log. It does **not** sit in the sync hot path.

### What Perception does with the event stream

- **Cross-app analytics** — "total hours across all projects in all apps"
- **Anomaly detection** — "Sablier hasn't synced in 2 hours, something's wrong"
- **Unified dashboards** — one view of projects, tasks, time entries, invoices across the entire suite
- **Natural language queries** — "how many hours did the team log on Acme last week?" (pulls from Sablier time entries + Opus tasks)
- **Conflict resolution suggestions** — if conflicts arise in future versions, Perception can suggest the right resolution

### What Perception does NOT do

- Route events
- Transform payloads between apps
- Make sync decisions
- Block or modify the event pipeline

The sync path is dumb and deterministic. Perception is smart and analytical. These are separate concerns.

---

## Per-App Implementation Checklist

Each app needs these additions to join the Nook mesh:

1. **`facile_id` column** on synced tables (nullable, unique)
2. **Event emitter** — emit `@facile/events` envelope on CRUD mutations
3. **Webhook handler** — `POST /webhooks/nook` to receive incoming events
4. **Adapter layer** — map between local model and canonical `@facile/events` shape
5. **Settings toggle** — "Enable Nook Sync" that registers/unregisters with Nook
6. **HMAC validation** — verify event signatures from Nook (same pattern Nook -> Perception already uses)

### Estimated effort per app

| App | Synced objects | Effort |
|-----|---------------|--------|
| Opus | project, task, user | Medium (Node/Hono, straightforward) |
| Sablier | project, task, time_entry, user | Medium (Go/Chi, needs Go webhook handler) |
| Ardoise | invoice, client, user | Medium (Node/tRPC, needs webhook route) |
| Plume | document, user | Low (already emits webhooks with HMAC) |
| Glouton | lead, user | Low-medium |
| Vision | pageview (emit-only) | Low (emit only, no incoming sync) |
| Nook | (is the bus) | High (needs queue, registry, router, DLQ) |
| Perception | (observes) | Low (already ingests from Nook) |

---

## What NOT to Do

- **Don't put Perception in the sync hot path.** CRUD sync must be deterministic, fast, and reliable. AI-powered routing introduces latency, cost, and non-determinism.
- **Don't share a database table across ORMs.** GORM and Drizzle will fight. Migrations become a coordination nightmare.
- **Don't build a shared project microservice.** Nook IS the shared infrastructure. Adding another service is redundant.
- **Don't try to unify the project schemas.** Each app's model is intentionally shaped for its domain. The canonical shape is the intersection, not the union.
- **Don't sync app-specific fields.** Opus's `slug`, `icon`, `is_public` stay in Opus. Sablier's `owner_id`, `rate` stay in Sablier. Only the canonical shape crosses the wire.
- **Don't sync tasks between Opus and Sablier in v1.** Project-level sync is clean. Task-level sync between flat tasks (Sablier) and kanban columns (Opus) is a quagmire. Revisit after project sync is proven.

---

## Open Questions

1. **Origin-only writes or delegated edits?** If a synced project is edited in the non-origin app, should the edit propagate back to the origin, or should synced copies be read-only?

2. **Workspace mapping.** Opus has workspaces, Sablier doesn't. When Opus syncs a project, which Sablier "scope" does it land in? (Sablier is workspace-wide, so this may be a non-issue.)

3. **Deletion semantics.** When the origin deletes a project, should receiving apps hard-delete, soft-delete, or just nullify the `facile_id`?

4. **Nook HA.** If Nook is the single event bus, what happens when Nook itself goes down? SQLite queue helps on restart, but prolonged downtime means no sync. Consider: is this acceptable for a self-hosted suite?

5. **Event schema versioning.** When `@facile/events` shapes evolve, how do apps handle old vs new event formats? Additive-only changes? Version field in the envelope?

6. **Shared auth.** Cross-app sync works best with shared SSO (OIDC). Sablier and Opus both support it but aren't connected yet. This should land before or alongside the sync work.
