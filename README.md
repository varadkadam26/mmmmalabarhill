# 🙏 Malabar Hill Cha Raja — Official Website & Backend

> **श्री बाल गोपाल गणेशोत्सव मंडळ | Est. 1973 | Mumbai, Maharashtra**

The official website and backend management system for **Malabar Hill Cha Raja** — one of Mumbai's most iconic Ganpati mandals. Built with Node.js, Express, EJS, and integrated with Razorpay payments, Google Sheets real-time sync, Gmail SMTP, Twilio SMS, and PDFKit receipt generation.

---

## 🌟 Features

### 🎪 Public Website
| Feature | Description |
|---------|-------------|
| **Home & Hero** | Grand carousel showcase with GSAP animations, live yatra status, and mandal highlights |
| **About** | Mandal history since 1973, mission, and vision |
| **Glimpses Gallery** | Decade-wise photo gallery (1990–2025) with lightbox viewer |
| **Social Work** | Documentation of mandal's community service — food distribution, blind school visits, rain relief |
| **Festival Schedule** | Day-by-day Ganeshotsav event schedule with live status API |
| **Executive Committee** | Photo cards of all mandal committee members with designations |
| **Advertisement** | Digital advertising information and brochure download |
| **Contact Us** | Contact form with SMTP email delivery + embedded Google Maps |

### 👕 T-Shirt Booking Portal (`/tshirt`)
- Official Collar Polo T-Shirt booking with size selection (Kids + Adults)
- **Razorpay payment gateway** integration — payment before receipt
- Auto-generated PDF pickup token receipt via PDFKit
- Real-time sync to **Google Sheets** ("T-Shirt Bookings" tab)

### 💰 Online Donation Portal (`/donate`)
- Preset amounts (₹501, ₹1008, ₹2100, ₹5001) + custom amount
- **Razorpay checkout** with live order creation
- 80G Tax Exemption PDF receipt with PAN details
- Twilio SMS confirmation to donor
- Real-time sync to **Google Sheets** ("Donations" tab)

### 📬 Contact Form (`/contact`)
- Email sent via **Gmail SMTP** (Nodemailer)
  - **From**: `mitramsolutions@gmail.com`
  - **To**: `marketing.malabarhillcharaja@gmail.com` & `mcrofficial1973@gmail.com`
  - **CC**: User's email (if provided)
- Real-time sync to **Google Sheets** ("Contact Us" tab)

### 📊 Google Sheets Live Sync
All form submissions (T-Shirts, Donations, Contact) are automatically appended to a shared Google Spreadsheet using a **Google Cloud Service Account** — enabling the mandal committee to track everything in real-time without accessing the admin panel.

### 🔐 Admin Panel (`/admin`)
- Password-protected dashboard
- Real-time metrics — total donations, t-shirt orders, system logs
- Excel upload/export for offline records
- Combined online + offline data export

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js (v18+) |
| **Framework** | Express.js |
| **Templating** | EJS (Embedded JavaScript) |
| **Database** | MySQL2 (with in-memory fallback for demo/offline mode) |
| **Payments** | Razorpay SDK |
| **Email** | Nodemailer (Gmail SMTP) |
| **SMS** | Twilio API |
| **PDF Generation** | PDFKit |
| **Spreadsheet Sync** | Google Sheets API v4 (Service Account) |
| **Excel Processing** | ExcelJS |
| **Scheduled Jobs** | node-cron |
| **Styling** | Vanilla CSS3 (Custom design system, Google Fonts — Outfit & Inter) |
| **Deployment** | Vercel (Serverless) |

---

## 📁 Project Structure

```
mmmmalabarhill/
├── server.js                    # Express app entry point
├── package.json                 # Dependencies & scripts
├── vercel.json                  # Vercel serverless deployment config
├── credentials.json             # Google Service Account key (gitignored)
├── .env                         # Environment variables (gitignored)
│
├── config/
│   ├── db.js                    # MySQL + in-memory fallback data store
│   ├── razorpay.js              # Razorpay SDK setup & order creation
│   ├── twilio.js                # Twilio SMS client
│   ├── googleSheets.js          # Google Sheets API client (3-tab sync)
│   ├── mailer.js                # Nodemailer Gmail SMTP transport
│   └── cron.js                  # Background scheduled jobs
│
├── controllers/
│   ├── yatraController.js       # Home, About, Schedule, Glimpses, Social Work, Committee
│   ├── donationController.js    # Donation CRUD + Razorpay + Sheets sync
│   ├── tshirtController.js      # T-Shirt booking + Razorpay + Sheets sync
│   ├── contactController.js     # Contact form + SMTP email + Sheets sync
│   ├── pdfController.js         # PDF receipt generation (Donation 80G + T-Shirt token)
│   ├── adminController.js       # Admin auth & dashboard
│   └── excelController.js       # Excel upload, parse, export (offline records)
│
├── routes/
│   ├── indexRoutes.js           # Public pages + T-Shirt + Contact routes
│   ├── donationRoutes.js        # Donation API routes
│   ├── adminRoutes.js           # Admin panel routes
│   └── excelRoutes.js           # Excel management routes
│
├── views/
│   ├── index.ejs                # Homepage
│   ├── about.ejs                # About mandal
│   ├── donate.ejs               # Donation portal
│   ├── tshirt.ejs               # T-Shirt booking
│   ├── contact.ejs              # Contact form + Google Maps
│   ├── schedule.ejs             # Festival schedule
│   ├── glimpses.ejs             # Photo gallery
│   ├── social-work.ejs          # Social work showcase
│   ├── committee.ejs            # Executive committee
│   ├── advertisement.ejs        # Advertisement info
│   ├── partials/
│   │   ├── header.ejs           # Shared navigation & head
│   │   └── footer.ejs           # Shared footer
│   └── admin/
│       ├── login.ejs            # Admin login
│       ├── dashboard.ejs        # Admin dashboard
│       └── excel.ejs            # Excel management panel
│
├── public/
│   ├── css/style.css            # Complete design system
│   ├── js/
│   │   ├── main.js              # Global JS (animations, i18n toggle)
│   │   ├── i18n.js              # Marathi/English language switcher
│   │   ├── donate.js            # Donation page logic
│   │   └── pass-form.js         # Pass registration logic
│   ├── images/                  # All website images (Ganpati, committee, glimpses, etc.)
│   └── docs/                    # Downloadable documents (brochure PDF)
│
├── receipts/                    # Generated PDF receipts (gitignored)
└── logs/                        # Application logs (gitignored)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** (comes with Node.js)
- **MySQL** (optional — app runs with in-memory data store if unavailable)

### 1. Clone & Install

```bash
git clone https://github.com/varadkadam26/mmmmalabarhill.git
cd mmmmalabarhill
npm install
```

### 2. Environment Setup

Create a `.env` file in the project root:

```env
# Google Sheets Sync
GOOGLE_SHEET_ID=your_google_sheet_id_here

# Gmail SMTP (Contact Form Emails)
SMTP_USER=mitramsolutions@gmail.com
SMTP_APP_PASSWORD=your_gmail_app_password_here

# Razorpay (Payment Gateway)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# MySQL Database (Optional)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=malabarhill_db
DB_PORT=3306

# Twilio SMS (Optional)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
```

### 3. Google Sheets Setup

1. Place your Google Cloud **Service Account** `credentials.json` in the project root
2. Create a Google Spreadsheet and share it with the service account email as **Editor**
3. Set the `GOOGLE_SHEET_ID` in `.env` (extract from the spreadsheet URL)
4. On server start, 3 tabs are auto-created: **T-Shirt Bookings**, **Donations**, **Contact Us**

### 4. Run the Server

```bash
# Development
npm run dev

# Production
npm start
```

Open **http://localhost:3000** in your browser.

---

## 🌐 Deployment (Vercel)

The project includes a `vercel.json` for one-click Vercel deployment:

```bash
npm i -g vercel
vercel --prod
```

Set the environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## 📊 Google Sheets Integration

The app syncs data in real-time to a shared Google Spreadsheet with 3 tabs:

| Tab | Triggered When | Columns |
|-----|----------------|---------|
| **T-Shirt Bookings** | New t-shirt order confirmed | Receipt No, Name, Phone, Email, Size, Color, Qty, Amount, Address, Payment ID, Status, Date |
| **Donations** | New donation payment verified | Receipt No, Name, Phone, Email, Amount, Category, PAN, Payment ID, Order ID, Status, Date |
| **Contact Us** | Contact form submitted | Name, Contact, Message, Date |

---

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero carousel, highlights, live status |
| `/about` | About | Mandal history & mission |
| `/donate` | Donations | Razorpay payment + 80G receipt |
| `/tshirt` | T-Shirt Booking | Size selection + Razorpay payment + PDF token |
| `/contact` | Contact Us | SMTP email form + Google Maps |
| `/schedule` | Schedule | Festival day-by-day events |
| `/glimpses` | Gallery | Decade-wise photo archive |
| `/social-work` | Social Work | Community service showcase |
| `/committee` | Committee | Executive members directory |
| `/advertisement` | Ads | Advertising info & brochure |
| `/admin` | Admin Panel | Protected dashboard |
| `/admin/excel` | Excel Manager | Upload/export offline records |

---

## 🔗 Social & Contact

| Platform | Link |
|----------|------|
| 🌐 **Location** | Ganesh Chowk, Bhaji Galli, Shankar Sheth Road, Grant Road (W), Mumbai — 400007 |
| 📧 **Email** | mcrofficial1973@gmail.com |
| 📧 **Marketing** | marketing.malabarhillcharaja@gmail.com |
| 📞 **Helpline** | +91 93261 50793 |
| 📺 **YouTube** | [@MalabarHillChaRaja-e2z](https://www.youtube.com/@MalabarHillChaRaja-e2z) |
| 📸 **Instagram** | [@malabarhill_cha_raja](https://www.instagram.com/malabarhill_cha_raja/) |
| 📘 **Facebook** | [malabarhillcharaja](https://www.facebook.com/malabarhillcharaja) |

---

## 📄 License

ISC License. Built for **Shree Bal Gopal Ganeshotsav Mandal**, Malabar Hill, Mumbai.

**गणपती बाप्पा मोरया! 🙏**
