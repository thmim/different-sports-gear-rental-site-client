# API Integration

This document describes how the GearUp frontend integrates with the backend REST API.

## Base URL

```text
https://sports-gear-rental-site-server.vercel.app/api
```

---

## Authentication

| Frontend Feature         | Endpoint              | Method |
| ------------------------ | --------------------- | ------ |
| User Registration        | `/auth/register`      | POST   |
| User Login               | `/auth/login`         | POST   |
| Get Current User Profile | `/auth/me`            | GET    |
| Refresh Access Token     | `/auth/refresh-token` | POST   |
| User Logout              | `/auth/logout`        | POST   |

---

## Public Gear

| Frontend Component | Endpoint                     | Method |
| ------------------ | ---------------------------- | ------ |
| Gear Listing Page  | `/gear`                      | GET    |
| Gear Details Page  | `/gear/users/:id`            | GET    |
| Category Filter    | `/gear?category=:categoryId` | GET    |
|                    |                              |        |

---

## Categories

| Frontend Component | Endpoint      | Method |
| ------------------ | ------------- | ------ |
| Category Dropdown  | `/categories` | GET    |

---

## Customer Dashboard

| Frontend Component    | Endpoint       | Method |
| --------------------- | -------------- | ------ |
| Customer Profile      | `/auth/me`     | GET    |
| My Rental Orders      | `/rentals`     | GET    |
| Rental Order Details  | `/rentals/:id` | GET    |
| Create Rental Order   | `/rentals`     | POST   |
| Submit Review         | `/reviews`     | POST   |
| View Payment History* | `/payments`    | GET    |

> *Include this endpoint only if your backend provides a payment history API.

---

## Provider Dashboard

| Frontend Component      | Endpoint                | Method |
| ----------------------- | ----------------------- | ------ |
| Provider Gear List      | `/own/gear-list`        | GET    |
| Create Gear             | `/provider/gear`        | POST   |
| Update Gear             | `/provider/gear/:id`    | PUT    |
| Delete Gear             | `/provider/gear/:id`    | DELETE |
| Provider Rental Orders* | `/provider/rentals`     | GET    |
| Update Rental Status*   | `/provider/rentals/:id` | PATCH  |

> *Include these endpoints only if they exist in your backend.

---

## Admin Dashboard

| Frontend Component    | Endpoint           | Method |
| --------------------- | ------------------ | ------ |
| Dashboard Statistics* | `/admin/dashboard` | GET    |
| Manage Users          | `/admin/users`     | GET    |
| Update User Status*   | `/admin/users/:id` | PATCH  |
| Manage Gear Listings  | `/admin/gear`      | GET    |
| Delete Gear Listing*  | `/admin/gear/:id`  | DELETE |
| Manage Rental Orders* | `/admin/rentals`   | GET    |

> *Include only the endpoints that are implemented in your backend.

---

## Payment

| Frontend Component       | Endpoint                          | Method |
| ------------------------ | --------------------------------- | ------ |
| Initiate Payment         | `/payments/init-payment/:orderId` | POST   |
| Payment Success Callback | `/payments/success`               | POST   |
| Payment Fail Callback    | `/payments/fail`                  | POST   |

---

## Reviews

| Frontend Component | Endpoint           | Method |
| ------------------ | ------------------ | ------ |
| Create Review      | `/reviews`         | POST   |
| View Gear Reviews  | `/reviews/:gearId` | GET    |

---

## Authentication Strategy

* JWT-based authentication using **HTTP-only cookies**.
* Access tokens are automatically included with authenticated requests.
* Protected pages use server-side authentication checks.
* Server Actions read authentication cookies using Next.js `cookies()`.

---

## Data Fetching Strategy

* **Server Components** are used for initial page data fetching.
* **Server Actions** handle form submissions (login, registration, CRUD operations).
* `fetch()` is used with Next.js caching and revalidation where appropriate.
* Dynamic filtering is implemented using URL search parameters for better navigation and shareable links.

---

## Error Handling

* API responses are validated before rendering.
* User-friendly toast notifications are displayed for successful and failed operations.
* Empty-state UI is shown when no matching gear is found after filtering.
* Protected routes redirect unauthenticated users to the login page.
