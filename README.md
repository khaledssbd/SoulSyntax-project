# RideRevolt 🚴‍♂️

## Live site 🌐

- [RideRevolt on Vercel](https://assignment-2-mongoose-mu.vercel.app)

---

## GitHub Repository 📂

- [RideRevolt Repository](https://github.com/khaledssbd/RideRevolt-project)

---

# Project Overview 🛠️

- RideRevolt is a Bike-store management web application that has is make on express.js and has different routes (https://assignment-2-mongoose-pi.vercel.app/api/products, https://assignment-2-mongoose-pi.vercel.app/api//orders, https://assignment-2-mongoose-pi.vercel.app/api/orders/revenue) for different requests.
- CRUD operations are implemented for product Model
- For every order the product quentity decreases accordingly.
- user can see the sum of all totalPrice from order Model as totalRevenue

---

# Used npm Packages 📦

- npm init -y
- npm install express
- npm install mongoose
- npm install cors
- npm install dotenv
- npm install -D typescript
- tsc -init
- npm install -D @eslint/js
- npm install -D @types/express
- npm install -D @types/cors
- npm install -D @typescript-eslint/eslint-plugin
- npm install -D @typescript-eslint/parser
- npm install -D eslint@9.14.0
- npm install -D globals
- npm install -D prettier
- npm install -D typescript-eslint

---

# Getting Started 🚀

To run this project on your local machine follow the instructions-

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/download/) (which includes npm)
- [Git](https://git-scm.com/)

---

### Installation

1. ```bash
   git clone https://github.com/khaledssbd/RideRevolt-project
   ```

2. ```bash
   cd RideRevolt-project
   ```

3. ```bash
   npm install
   ```

4. Create a .env file inside the "RideRevolt-project" folder and configure the following environment variables accordingly-

```bash
NODE_ENV=

PORT=

DATABASE_URL=

BCRYPT_SALT_ROUNDS=
```

5. ```bash
   npm run start:dev
   ```

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
