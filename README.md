# Developer Portfolio

A modern, responsive, and interactive developer portfolio built with cutting-edge web technologies. This portfolio is designed to showcase projects, skills, and experience with a focus on performance, aesthetics, and smooth animations.

## 🚀 Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Email/Contact**: [Resend](https://resend.com/), [Nodemailer](https://nodemailer.com/), & [EmailJS](https://www.emailjs.com/)
- **UI Components**: Radix UI, Swiper

## 📦 Getting Started

First, install the dependencies:

```bash
npm install
```

Set up your environment variables by copying the example file:

```bash
cp .env.local.example .env.local
```
*(Make sure to fill in your API keys for the email services in `.env.local`)*

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to catch errors and enforce code style.

## 📂 Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable UI components.
- `/lib`: Utility functions and helpers.
- `/public`: Static assets (images, fonts, etc.).

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
