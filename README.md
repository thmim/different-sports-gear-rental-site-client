# GearUp - Sports & Outdoor Equipment Rental Platform (Client)

GearUp is a modern full-stack sports and outdoor equipment rental platform that allows customers to browse and rent equipment, providers to manage rental listings, and administrators to oversee the entire platform. This repository contains the **Next.js frontend** of the application.

---

## Live Demo

* **Frontend:** https://sports-gear-rental-site.vercel.app/
* **Backend API:** https://sports-gear-rental-site-server.vercel.app

---

## Features

### Public Features

* Browse all available sports and outdoor equipment.
* View detailed information for each gear item.
* Filter gear by category.
* Responsive user interface for desktop, tablet, and mobile devices.

### Authentication

* User registration and login.
* JWT authentication using HTTP-only cookies.
* Protected routes based on user roles.
* Automatic session management.

### Customer Dashboard

* View personal rental history.
* Create rental orders.
* Complete secure online payments.
* Submit reviews for rented equipment.

### Provider Dashboard

* Create new gear listings.
* Update existing gear information.
* Delete gear listings.
* Manage personal rental inventory.

### Admin Dashboard

* Manage users.
* Manage gear listings.
* Monitor rental activities.
* Platform administration.

---

## Tech Stack

### Frontend

* Next.js 15 (App Router)
* React
* TypeScript
* Tailwind CSS
* Shadcn/UI
* Server Actions
* Sonner (Toast Notifications)

### Backend

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT Authentication

### Payment

* SSLCommerz Payment Gateway

---

## Project Structure

```text
app/
│── (authGroup)/
│── (dashboard)/
│── gears/
│── provider-dashboard/
│── customer-dashboard/
│── admin-dashboard/
│── components/
│── actions/
│── types/
│── utils/
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project:

```bash
cd gearup-client
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file and add:

```env
BACKEND_API_URL=https://sports-gear-rental-site-server.vercel.app
```

Run the development server:

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

---

## Build for Production

```bash
npm run build
npm start
```

---

## Environment Variables

| Variable          | Description          |
| ----------------- | -------------------- |
| `BACKEND_API_URL` | Backend API base URL
| `JWT_ACCESS_SECRET` | ACCESS TOKEN
|| `JWT_REFRESH_SECRET` | REFRESH TOKEN
|

---

## API Integration

The frontend communicates with the backend through REST APIs.

Major integrations include:

* Authentication
* Gear Management
* Categories
* Rental Orders
* Payments
* Reviews
* Customer Dashboard
* Provider Dashboard
* Admin Dashboard

See **API_INTEGRATION.md** for the complete endpoint mapping.

---

## Deployment

The application is deployed on **Vercel**.

Deployment process:

1. Push the latest code to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the project.
5. Update backend CORS to allow the deployed frontend URL.

---

## Future Improvements

* Advanced filtering and search.
* Wishlist functionality.
* Provider analytics dashboard.
* Real-time rental notifications.
* Equipment availability calendar.
* Image upload with cloud storage.
* Email notifications.
* Multi-language support.

---

## Author

**Taharim Hasan Mim**

* GitHub: https://github.com/thmim


---

## License

This project is developed for educational and portfolio purposes.
