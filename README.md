# Labor Management System (LMS)

A comprehensive Next.js application for managing labor workforce with role-based dashboards, attendance tracking, payroll management, and WhatsApp integration.

## Features

### Core Modules
- **Role-Based Dashboards**: Admin, Manager, and Labor-specific dashboards
- **Labor Management**: Add, edit, and manage labor information
- **Salary Management**: Track and manage salary disbursements
- **Leave Management**: Request and approve leaves with balance tracking
- **Attendance Tracking**: Mark attendance with face recognition
- **Shift Management**: Create and manage work shifts
- **Reports**: Attendance, salary, and leave reports

### Advanced Features
- **Face Recognition Attendance**: AI-powered face verification using Python
- **WhatsApp Integration**: Request leaves, salary slips, and get support via WhatsApp
- **JWT Authentication**: Secure authentication with JWT tokens
- **Role-Based Access Control**: Different features for admin, manager, and labor

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **State Management**: React hooks, localStorage
- **API Integration**: Placeholder for ASP.NET Web API
- **Database**: SQL Server (backend)
- **AI/ML**: Python face recognition module (placeholder)
- **Messaging**: WhatsApp Business API (placeholder)

## Project Structure

```
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page with redirect
│   ├── login/                        # Login page
│   ├── register/                     # Registration page
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── manage-labor/
│   │   ├── manage-salary/
│   │   ├── leave-requests/
│   │   └── reports/
│   ├── manager/
│   │   ├── dashboard/
│   │   ├── shift-management/
│   │   ├── leave-approval/
│   │   └── salary-approval/
│   └── labor/
│       ├── dashboard/
│       ├── leave/
│       ├── salary/
│       ├── attendance/
│       └── profile/
├── components/
│   ├── ui/                          # Reusable UI components
│   ├── header.tsx
│   ├── sidebar.tsx
│   ├── footer.tsx
│   ├── dashboard-card.tsx
│   ├── data-table.tsx
│   ├── form-input.tsx
│   ├── modal.tsx
│   ├── auth-form.tsx
│   ├── face-attendance-widget.tsx
│   ├── whatsapp-module.tsx
│   └── attendance-ai-status.tsx
├── layouts/
│   ├── admin-layout.tsx
│   ├── manager-layout.tsx
│   └── labor-layout.tsx
├── hooks/
│   ├── use-auth.ts
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── types/
│   └── index.ts
├── constants/
│   └── index.ts
├── utils/
│   └── api.ts
└── styles/
    └── globals.css
```

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

### Running the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

### Default Login Credentials

- **Admin**: admin@example.com / password
- **Manager**: manager@example.com / password
- **Labor**: labor@example.com / password

## API Integration

### ASP.NET Web API Integration

The application is configured to work with an ASP.NET Web API backend. Update the `NEXT_PUBLIC_API_URL` environment variable to point to your API server.

Key endpoints:
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `GET /labor` - Get all labor
- `POST /labor` - Create labor
- `GET /salary/{id}` - Get salary
- `POST /attendance/verify-face` - Face verification
- And more...

### Face Recognition Module

The attendance system includes AI-powered face recognition. This requires:
1. Python backend with face recognition library
2. API endpoint: `POST /attendance/verify-face`
3. Returns: `{ verified: boolean, confidenceScore: number }`

### WhatsApp Business API

WhatsApp integration for leave requests, salary slips, and Q&A support:
1. Configure WhatsApp Business API credentials
2. Endpoints for sending and receiving messages
3. Webhook integration for message delivery

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

```bash
vercel deploy
```

## Development Guidelines

### Adding New Pages

1. Create folder under `app/[role]/[feature]/`
2. Create `page.tsx` file
3. Use appropriate layout (AdminLayout, ManagerLayout, LaborLayout)
4. Implement components

### Adding New Components

1. Create component file in `components/`
2. Use TypeScript for type safety
3. Export from component file
4. Import in pages as needed

### Styling

- Use Tailwind CSS classes
- Follow the semantic design token system
- Ensure responsive design (mobile-first)

## Security Considerations

- JWT tokens are stored in localStorage (use HTTP-only cookies in production)
- Implement proper authentication checks on backend
- Validate all API inputs
- Use HTTPS in production
- Implement Row Level Security (RLS) on database

## Future Enhancements

- Real-time notifications
- Advanced analytics and reporting
- Mobile app version
- SMS notifications
- Video interviewing
- Performance tracking
- Employee training module

## Support

For issues and feature requests, please open an issue in the repository.

## License

This project is licensed under the MIT License.
