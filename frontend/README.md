# KioskMC — Frontend

Next.js kiosk application simulating a fast-food self-service terminal. Allows customers to browse the menu, customize orders, and pay. Includes an admin panel for managing products and viewing sales statistics.

## Tech Stack

- **Next.js 14** + **TypeScript**
- **Tailwind CSS** — styling
- **Axios** — HTTP client
- **Formik** — form handling
- **react-modal** — order summary modal
- **FontAwesome** — icons

## Pages

| Path | Description |
|------|-------------|
| `/` | Landing page with advertisements and dining mode selection |
| `/home` | Product menu |
| `/edit/[name]` | Product detail — ingredient customization |
| `/basket` | Cart — review, edit, and pay |
| `/login` | Admin login |
| `/admin` | Admin panel — product editor and sales statistics |

## Project Structure

```
pages/
  index.tsx           # Landing page
  home.tsx            # Menu
  basket.tsx          # Cart
  login.tsx           # Admin login
  admin.tsx           # Admin panel
  edit/[name].tsx     # Product detail
app/
  Components/
    Advertisements/   # Landing page ad banner
    DiningButton/     # Dine-in / takeaway selector
    Edit/             # Admin product editor
    Footer/
    Login/            # Login form
    Navbar/
    NavbarAdmin/
    NavbarBetterOne/  # Menu page navbar with typewriter search
    Orders/           # Admin sales statistics
    ProductCard/      # Menu product card
    ProductDetailsEdit/ # Product detail with ingredient editor
    Products/         # Product list
  Style/              # Global CSS per page
```

## Getting Started

### Prerequisites

- Node.js
- Backend running on port `3030`

### Install & run

```bash
npm install
npm run dev
```

App available at **http://localhost:3000**.

## Environment Variables

Create a `.env.local` file in this directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3030
```

## Admin Panel

Navigate to `/login` and sign in with the credentials set in the backend `.env` file (default: `admin` / `admin123`).

The admin panel provides:
- **Product editor** — update prices and ingredient quantities
- **Sales statistics** — orders grouped by date
