
# Next.js Nodemailer Project

This project is a **Next.js** web application that implements email verification, password reset functionality, and user profile management. It uses **Nodemailer** for email handling, along with **axios** for API calls and **React Hot Toast** for notifications. The application is built with **Tailwind CSS** for styling.

## Features

- **User Authentication**: Includes user login, signup, and profile management.
- **Email Verification**: Sends an email to the user for verifying their account.
- **Forgot Password**: Allows users to reset their password via an email link.
- **Profile Page**: Displays user details such as username, email, verification status, and admin status.
- **Logout**: Allows users to log out of the application.

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **NPM** (v6 or higher)

## Installation

Follow these steps to get the project up and running on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nextjs-nodemailer-project.git
   ```
2. Navigate to the project folder:
   ```bash
   cd nextjs-nodemailer-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables for your SMTP service (e.g., Gmail, SendGrid, etc.) in a `.env.local` file:
   ```bash
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   ```
   Make sure to replace the placeholders with your actual credentials.

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

### Pages

- **Home Page** (`/`): Welcome page for the app.
- **Login Page** (`/login`): User login page.
- **Signup Page** (`/signup`): User registration page.
- **Forgot Password Page** (`/forgot-password`): Page to request a password reset email.
- **Reset Password Page** (`/reset-password`): Page to reset the password after clicking the email link.
- **Profile Page** (`/profile`): Displays the logged-in user's profile and allows profile management.

### Example API Routes

- **POST /api/users/signup**: Handles user signup and sends an email verification link.
- **POST /api/users/login**: Handles user login.
- **POST /api/users/verifyemail**: Verifies the user's email address.
- **POST /api/users/send-verification-email**: Sends an email with a verification link.
- **POST /api/users/reset-password**: Handles password reset functionality.
- **GET /api/users/logout**: Logs out the user.

## Technologies Used

- **Next.js**: React framework for building server-side rendered applications.
- **Nodemailer**: Used for sending emails for verification and password reset.
- **Axios**: HTTP client for making API calls.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.
- **React Hot Toast**: Toast notifications library for success/error messages.
- **React Icons**: For adding icons like logout.

## File Structure

```bash
nextjs-nodemailer-project/
├── components/
│   ├── Header.js            # Header component
│   ├── Footer.js            # Footer component
│   ├── UserProfile.js       # User profile component
│   └── FormInput.js         # Reusable input component
├── pages/
│   ├── api/
│   │   ├── users/
│   │   │   ├── login.js     # API route for user login
│   │   │   ├── signup.js    # API route for user signup
│   │   │   ├── verifyemail.js # API route for email verification
│   │   │   ├── send-verification-email.js # API route for sending email verification
│   │   │   ├── reset-password.js # API route for resetting password
│   │   │   └── logout.js    # API route for logging out
│   ├── index.js             # Home page
│   ├── login.js             # Login page
│   ├── signup.js            # Signup page
│   ├── forgot-password.js   # Forgot password page
│   ├── reset-password.js    # Reset password page
│   └── profile.js           # User profile page
├── public/
│   └── logo.png             # Application logo
├── styles/
│   └── globals.css          # Global styles
├── .env.local               # Environment variables for SMTP and other secrets
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Nodemailer](https://nodemailer.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Hot Toast](https://react-hot-toast.com/)


### Explanation:
- **Technologies Used**: Lists the core technologies in the project.
- **File Structure**: Provides a breakdown of the folder and file organization of your project.
- **Installation**: Describes the process to set up the project locally.
- **Contributing**: Explains how others can contribute to the project.
- **License**: A placeholder for licensing information.
