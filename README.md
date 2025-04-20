# Doctor Booking Application

A modern, user-friendly web application for booking doctor appointments. Built with React, Vite, and Tailwind CSS, this application provides a seamless experience for patients to find and book appointments with healthcare professionals.

## 🚀 Features

- **Doctor Search & Filtering**

  - Filter doctors by specialty
  - Filter by available time slots
  - View detailed doctor profiles

- **Appointment Management**

  - Real-time availability checking
  - Easy appointment booking
  - Appointment confirmation system
  - Prevention of double bookings

- **User Experience**

  - Modern, responsive design
  - Smooth animations and transitions
  - Intuitive user interface
  - Mobile-friendly layout

## 🛠️ Tech Stack

- **Frontend**

  - React.js
  - Vite
  - Tailwind CSS
  - React Hooks (useState, useEffect, useCallback, useMemo)

- **Backend**
  - JSON Server (for mock API)
  - RESTful API endpoints

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/hussienkamalelden/doctor-booking
   cd doctor-booking
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Start the JSON Server**
   ```bash
   npm run server
   # or
   yarn server
   ```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
doctor-booking/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── hooks/         # Custom hooks
│   ├── layouts/       # Layout components
│   └── assets/        # Static assets
├── public/            # Public assets
└── db.json            # Mock database
```

## 🎨 Component Architecture

- **FilterBy**: Handles doctor filtering by specialty and availability
- **DoctorCard**: Displays individual doctor information
- **DoctorModal**: Manages appointment booking process
- **Dropdown**: Reusable dropdown component
- **AppointmentCard**: Shows appointment details

## 🔧 API Endpoints

- `GET /doctors` - Fetch all doctors
- `GET /specialties` - Fetch all specialties
- `GET /appointments` - Fetch all appointments
- `POST /appointments` - Create new appointment
- `PATCH /doctors/:id` - Update doctor's availability
