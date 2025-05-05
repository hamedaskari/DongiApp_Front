# Split Bill & Settle-Up

This app is designed to help friends easily calculate and manage shared expenses. Whether you're going out for dinner, traveling together, or participating in any shared activity, this app will automatically calculate how much each person owes or should receive.

## Technologies Used

- **Next.js 15**: The latest version of Next.js for fast and optimized server-side rendering.
- **React Query**: For efficient data fetching and state management.
- **ShadCN**: A utility-first CSS framework for creating modern and responsive UI components.
- **React Hook Form**: For easy form handling and validation.
- **Zod**: A TypeScript-first schema declaration and validation library for form data validation.

## Features

- **Create Groups**: Form groups with your friends and manage shared expenses within each group.
- **Add Expenses**: Users can input various expenses such as meals, gifts, trips, etc. Each expense can be divided based on the number of participants or set manually.

- **Track Payments**: The app keeps track of who has paid what and calculates the remaining balance for each person.

- **Clear Settlements**: Easily settle up with your friends. The app tells you exactly how much each person owes or is owed, making sure there’s no confusion.

- **Pagination**: Data is organized in a paginated manner to handle multiple entries efficiently, making it easy to navigate through expenses and balances.

- **User-Friendly Interface**: With a simple and intuitive interface, managing group expenses has never been easier.

## Why Use This App?

- **No More Manual Calculations**: Say goodbye to the hassle of manually calculating who owes whom and how much. The app does all the math for you!

- **Transparency**: Everyone can see exactly how much they owe or are owed. No more misunderstandings.

- **Efficient**: The app’s pagination ensures smooth navigation even for groups with a lot of shared expenses.

## How It Works

1. **Create or Join a Group**: Start by creating a group with your friends or join an existing one.

2. **Add Expenses**: Whenever there’s a shared expense, add it to the app with the amount and participants.

3. **Automatic Calculation**: The app will calculate how the amount should be divided and who owes what.

4. **Settle-Up**: When you’re ready to settle up, the app shows you who should pay whom and how much.

---

This app makes managing group expenses easy, transparent, and hassle-free!

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
