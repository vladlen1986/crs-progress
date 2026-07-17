# Cookbook: Stripe
> Source: `buildprint guidelines get cookbooks/stripe` · Captured: 2026-07-17 (verbatim)

Use this path when building or reviewing a Bubble Stripe integration that combines API Connector calls, backend webhook workflows, and Bubble data types.

## Required companion paths

Fetch these together before editing:
- `schema/api-connector`
- `workflows/backend`
- `schema/workflow`
- `schema/action`
- `schema/data-type`
- `schema/option-set`
- `security/bubble`
- `editing/apps` if you will edit worktree files

## Core architecture

Treat the integration as three layers:
1. Stripe is the billing source of truth.
2. Bubble API Connector handles outbound Stripe API calls.
3. Bubble data types can store a normalized local projection keyed by Stripe IDs when the app actually needs one.

Recommended runtime pattern:
- UI or backend workflow makes a Stripe API Connector call.
- Stripe emits a webhook when billing state changes.
- Bubble webhook workflow fetches the canonical Stripe object again by ID.
- Bubble upserts local records by Stripe ID, not by display text or assumptions from the incoming event payload.

That fetch-again pattern keeps webhook handling idempotent and avoids trusting partial event payloads as the final object shape.

## Phase 1: Map Stripe endpoints into API Connector calls

In the worktree, Bubble API Connector maps Stripe endpoints into `settings/api-connector/<plugin>/plugin.json` and `settings/api-connector/<plugin>/calls/<call-id>.json`.
The underlying logical Bubble path is still `settings.client_safe.apiconnector2` when you need to reason about schema keys.

Practical mapping rules:
- One Stripe service = one API Connector group, usually named `Stripe`.
- Object fetches by id are usually `publish_as: "action"` with URL placeholders like `[subscriptionId]`.
- List/read calls used in expressions or repeating groups are usually `publish_as: "data"`.
- Most Stripe POST actions map cleanly to `params` rows, even for nested form keys like `items[0][price]`.
- Reserve `body`/`body_params` for endpoints where you intentionally maintain a raw JSON body template.

Secret handling notes:
- Keep Stripe secrets private at the group level.
- Exports can redact private values or even whole private rows; do not delete private stubs just because `key` or `value` is hidden in exported JSON.
- If the app already uses `auth: "private_key_header"`, preserve that pattern. If it uses a private shared `Authorization` header row, preserve that instead.

### Example: GET object by Stripe id

```json
{
  "name": "Get subscription",
  "method": "get",
  "url": "https://api.stripe.com/v1/subscriptions/[subscriptionId]",
  "publish_as": "action",
  "headers": {},
  "params": {},
  "url_params": {
    "subscription_id": {
      "key": "subscriptionId",
      "private": false,
      "optional": false
    }
  },
  "body_params": {}
}
```

### Example: list call used as Bubble data

```json
{
  "name": "List prices",
  "method": "get",
  "url": "https://api.stripe.com/v1/prices",
  "publish_as": "data",
  "headers": {},
  "params": {
    "product": { "key": "product", "private": false, "optional": false },
    "limit": { "key": "limit", "private": false, "optional": false },
    "active": { "key": "active", "private": false, "optional": false },
    "interval": { "key": "recurring[interval]", "private": false, "optional": false }
  },
  "url_params": {},
  "body_params": {}
}
```

### Example: POST action with nested Stripe form keys

```json
{
  "name": "Create checkout session",
  "method": "post",
  "url": "https://api.stripe.com/v1/checkout/sessions",
  "publish_as": "action",
  "headers": {},
  "params": {
    "mode": { "key": "mode", "private": false, "optional": false },
    "success_url": { "key": "success_url", "private": false, "optional": false },
    "cancel_url": { "key": "cancel_url", "private": false, "optional": false },
    "customer": { "key": "customer", "private": false, "optional": false },
    "line_item_price": { "key": "line_items[0][price]", "private": false, "optional": false },
    "line_item_quantity": { "key": "line_items[0][quantity]", "private": false, "optional": false },
    "promo_codes": { "key": "allow_promotion_codes", "private": false, "optional": false }
  },
  "url_params": {},
  "body_params": {}
}
```

## Stripe row keys -> Bubble action property keys

Bubble flattens API Connector rows into workflow action properties.

Examples:
- URL placeholder `[subscriptionId]` -> `url_params_subscriptionId`
- Row key `customer` -> `params_customer`
- Row key `items[0][price]` -> `params_items&40&5&4price&5`
- Row key `line_items[0][quantity]` -> `params_line_items&40&5&4quantity&5`

Do not rename API Connector row `key` values after workflows are wired unless you also update every flattened workflow property that depends on them.

### Example: action bound to Stripe checkout session

```json
{
  "type": "apiconnector2-<stripeGroupId>.<createCheckoutSessionCallId>",
  "properties": {
    "params_mode": { "type": "TextExpression", "entries": { "0": "subscription" } },
    "params_customer": { "type": "TextExpression", "entries": { "0": "cus_123" } },
    "params_line_items&40&5&4price&5": { "type": "TextExpression", "entries": { "0": "price_123" } },
    "params_line_items&40&5&4quantity&5": { "type": "TextExpression", "entries": { "0": "1" } },
    "params_success_url": { "type": "TextExpression", "entries": { "0": "https://app.example.com/billing/success" } },
    "params_cancel_url": { "type": "TextExpression", "entries": { "0": "https://app.example.com/billing/cancel" } }
  }
}
```

## Phase 2: Decide what Bubble should mirror

Do not mirror every Stripe object by default.
Work with the user on a case-by-case basis and only persist the Stripe objects the Bubble app needs to search, join, permission, or render efficiently.

Usually worth mirroring locally:
- `Billing Account`: maps app account/user ownership to a Stripe customer id.
- `Subscription`: when the app gates access, shows plan state, or needs subscription history.
- `Invoice`: when the app shows billing history, receipt links, or invoice status in Bubble.

Often optional:
- `Product`: only if the app needs a local product catalog, admin UI, historical snapshots, or Bubble-side searching/filtering.
- `Price`: only if the app needs local plan selection, joins against other Bubble data, or recurring price metadata without live Stripe fetches.

If the app can read catalog data live from Stripe at render time or only needs a checkout-session handoff, mirroring Products and Prices may be unnecessary.

Minimum durable keys:
- Always store Stripe object IDs as text fields such as `stripeCustomerId`, `subscriptionId`, `invoiceId`, `stripeProductId`, `stripePriceId` for every object you choose to mirror.
- Use those fields as the upsert/search keys in webhook workflows.

Recommended enum mapping pattern:
- Use Bubble option sets for Stripe enums you show in UI or query frequently.
- Add an attribute like `stripeId` on the option set so Bubble options map back to raw Stripe values.

## Phase 3: Set up Stripe webhooks in Bubble

Use Bubble backend API workflows (`type: APIEvent`) for inbound Stripe events.

Recommended structure:
- Create one workflow per resource family instead of one giant catch-all endpoint.
- Keep `parameter_def: "auto"` so the workflow uses typed request data under `_wf_body.*` and `_wf_headers.*`.
- Turn on `include_headers: true` if you need access to `stripe-signature` or other headers.
- Use short slug-style `wf_name` values because Bubble exposes that in the public webhook URL.

Public webhook URL pattern:
- Live: `https://<app-domain>/api/1.1/wf/<wf_name>`
- Development/version-test: `https://<app-domain>/version-test/api/1.1/wf/<wf_name>`

Recommended endpoint grouping:
- `stripe-subscription`: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
- `stripe-invoice`: `invoice.created`, `invoice.finalized`, `invoice.paid`, `invoice.payment_failed`, `invoice.voided`
- `stripe-product`: `product.created`, `product.updated`, `product.deleted`
- `stripe-price`: `price.created`, `price.updated`, `price.deleted`
- Optional `stripe-checkout-session`: `checkout.session.completed` and async checkout completion events if the app provisions immediately after checkout

Preferred schema-seeding workflow when editing the worktree directly:
1. Create the API workflow shell with `expose: true`, `parameter_def: "auto"`, and `include_headers: true`.
2. Seed `properties.raw_data` with one representative Stripe event payload shaped as `{ body, headers }`.
3. Seed the matching `properties.data_type` JSON string so Bubble already knows fields like `_wf_body.data.object.id` and `_wf_headers.stripe-signature`.
4. Wire actions against `_wf_body.*` fields immediately.

Default when you can initialize through Bubble or Stripe directly:
- Send a representative sample event from Stripe Dashboard or Stripe CLI, let Bubble generate the schema, then run `buildprint sync` before continuing local edits.

Advanced fallback when you must seed by hand in the worktree:

### Example: representative Stripe subscription webhook payload

This is the general form Bubble stores inside `properties.raw_data` after webhook initialization or manual seeding.

```json
{
  "body": {
    "id": "evt_1S92CXLwyyoVqHFUSNP2uxRt",
    "object": "event",
    "api_version": "2025-08-27.basil",
    "created": 1758280204,
    "data": {
      "object": {
        "id": "sub_1S92CULwyyoVqHFUupEowA6q",
        "object": "subscription",
        "customer": "cus_T5CD6OGyzI6E29",
        "status": "active",
        "latest_invoice": "in_1S92CULwyyoVqHFUEY52xC6n"
      }
    },
    "livemode": false,
    "pending_webhooks": 3,
    "type": "customer.subscription.created"
  },
  "headers": {
    "stripe-signature": "t=1758280205,v1=<signature>,v0=<signature>",
    "content-type": "application/json; charset=utf-8",
    "user-agent": "Stripe/1.0 (+https://stripe.com/docs/webhooks)",
    "host": "app.bubbleapps.io"
  }
}
```

### Example: reduced decoded `data_type` shape

In `workflow.json`, `properties.data_type` is stored as a JSON string. Decoded, the generated shape looks like this:

```json
{
  "types": {
    "<workflowId>": {
      "caption": "Request Data",
      "fields": {
        "_wf_body.data.object.id": {
          "ret_btype": "text",
          "caption": "body object id",
          "path": ["body", "data", "object", "id"]
        },
        "_wf_body.type": {
          "ret_btype": "text",
          "caption": "body type",
          "path": ["body", "type"]
        },
        "_wf_headers.stripe-signature": {
          "ret_btype": "text",
          "caption": "headers stripe-signature",
          "path": ["headers", "stripe-signature"]
        }
      }
    }
  }
}
```

### Example: webhook workflow shell

```json
{
  "type": "APIEvent",
  "name": "Webhook - Stripe Subscription",
  "properties": {
    "expose": true,
    "wf_name": "stripe-subscription",
    "parameter_def": "auto",
    "auth_unecessary": true,
    "include_headers": true,
    "ignore_privacy_rules": false,
    "raw_data": "{\"body\":{...},\"headers\":{...}}",
    "data_type": "{\"types\":{\"<workflowId>\":{...}}}"
  },
  "actions": {
    "0": {
      "type": "apiconnector2-<stripeGroupId>.<getSubscriptionCallId>",
      "properties": {
        "url_params_subscriptionId": {
          "type": "TextExpression",
          "entries": {
            "0": {
              "type": "APIEventParameter",
              "properties": {
                "event_id": "<workflowId>",
                "param_id": "_wf_request_data",
                "param_name": "_wf_request_data",
                "btype_id": "api_wf_data.<workflowId>"
              },
              "next": { "type": "Message", "name": "_wf_body.data.object.id" }
            }
          }
        }
      }
    }
  }
}
```

Webhook security note:
- Bubble can capture `stripe-signature` in headers, but full Stripe signature verification is awkward if the app cannot access the exact raw request body at verification time.
- If strict signature verification is required, terminate the webhook at a proxy or server function that validates the signature and forwards only trusted events into Bubble.
- If you keep verification inside Bubble, treat the endpoint as public input and keep the workflow narrow, idempotent, and explicit about what records it may change.

## Phase 4: Implement the webhook upsert flow

Preferred action pattern inside each webhook workflow:
1. Read `event.body.data.object.id` from `_wf_body.data.object.id`.
2. Call the matching Stripe `Get ...` API Connector action using that id.
3. Search Bubble by the stored Stripe id field.
4. Terminate early if the canonical Stripe fetch failed or the owning Bubble record cannot be resolved.
5. Create the Bubble thing when no local record exists.
6. Apply a `ChangeThing` with normalized fields and relationship updates.

Normalized fields usually worth storing:
- status
- currency
- unit amount / invoice totals (convert from Stripe cents to your app's number convention)
- hosted invoice / receipt URLs
- billing-account relation
- product/price relations if those objects are mirrored locally

Fields often worth keeping raw as well:
- the full Stripe object as an `api.apiconnector2.<group>.<call>` field
- nested lists you use directly in Bubble expressions, such as subscription items

## Bubble data model pattern

For Stripe objects you choose to mirror, keep normalized fields for searching plus one raw Stripe object field for detailed rendering or debugging.

### Example: Billing Account + Subscription

```json
{
  "billing_account": {
    "display": "Billing Account",
    "fields": {
      "account_custom_account": { "display": "Account", "value": "custom.account" },
      "stripecustomerid_text": { "display": "stripeCustomerId", "value": "text" },
      "subscriptions_list_custom_subscription": { "display": "Subscriptions", "value": "list.custom.subscription" }
    }
  },
  "subscription": {
    "display": "Subscription",
    "fields": {
      "subscriptionid_text": { "display": "subscriptionId", "value": "text" },
      "billing_account_custom_billing_account": { "display": "Billing Account", "value": "custom.billing_account" },
      "products_list_custom_product": { "display": "Products", "value": "list.custom.product" },
      "subscription_status_option_subscription_status": { "display": "Status", "value": "option.subscription_status" },
      "stripesubscriptionobject_api_apiconnector2_<group>_<call>": {
        "display": "stripeSubscriptionObject",
        "value": "api.apiconnector2.<group>.<getSubscriptionCallId>"
      }
    }
  }
}
```

### Example: Invoice + Product + Price

Only use this fuller catalog model when the app needs local Product and Price records.

```json
{
  "invoice": {
    "display": "Invoice",
    "fields": {
      "invoiceid_text": { "display": "invoiceId", "value": "text" },
      "billing_account_custom_billing_account": { "display": "Billing Account", "value": "custom.billing_account" },
      "subscription_custom_subscription": { "display": "Subscription", "value": "custom.subscription" },
      "total_number": { "display": "total", "value": "number" },
      "status_option_invoice_status": { "display": "Status", "value": "option.invoice_status" },
      "receipturl_text": { "display": "invoiceUrl", "value": "text" },
      "stripeinvoiceobject_api_apiconnector2_<group>_<call>": {
        "display": "stripeInvoiceObject",
        "value": "api.apiconnector2.<group>.<getInvoiceCallId>"
      }
    }
  },
  "product": {
    "display": "Product",
    "fields": {
      "stripeproductid_text": { "display": "stripeProductId", "value": "text" },
      "name_text": { "display": "name", "value": "text" },
      "default_price_custom_price": { "display": "Default Price", "value": "custom.price" }
    }
  },
  "price": {
    "display": "Price",
    "fields": {
      "stripepriceid_text": { "display": "stripePriceId", "value": "text" },
      "product_custom_product": { "display": "Product", "value": "custom.product" },
      "amount_number": { "display": "amount", "value": "number" },
      "interval_option_subscription_interval": { "display": "Interval", "value": "option.subscription_interval" }
    }
  }
}
```

### Example: option set that preserves Stripe enum values

```json
{
  "display": "Subscription Status",
  "attributes": {
    "stripeid": { "display": "stripeId", "value": "text" }
  },
  "values": {
    "active": { "display": "Active", "db_value": "active", "stripeid": "active", "sort_factor": 4 },
    "past_due": { "display": "Past due", "db_value": "past_due", "stripeid": "past_due", "sort_factor": 5 },
    "canceled": { "display": "Cancelled", "db_value": "canceled", "stripeid": "canceled", "sort_factor": 6 }
  }
}
```

## Validation checklist

1. Every Bubble billing type has a dedicated Stripe id field used for upserts.
2. Every public webhook workflow has a slug-safe `wf_name` and `parameter_def: "auto"`.
3. Webhook workflows fetch the canonical Stripe object before mutating Bubble data.
4. Nested Stripe param keys with brackets are reflected in correctly escaped Bubble action property keys.
5. Option sets cover every Stripe enum value the app persists.
6. Private API Connector auth rows were preserved even if the export redacted them.
7. Privacy rules on billing data types match the app's account ownership model.

## Example guideline fetch

- `buildprint guidelines get schema/api-connector workflows/backend schema/data-type schema/option-set cookbooks/stripe`
