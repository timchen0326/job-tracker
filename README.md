# Job Tracker

Hey there! Welcome to **Job Tracker**, my personal app to keep tabs on all the internships and roles I’m applying to. I built this little tool because I realized I needed more than a messy spreadsheet or scattered notes—you know that feeling when you can’t remember if you’ve followed up on that one role? That’s exactly why this exists.

## 🚀 What Is This Project?

This is a single‑page app that helps me log every job or internship application I send out. I can add a new entry for a company, track the date I applied, update the status (applied, interview scheduled, offer, rejected, you name it), and even delete entries when they’re no longer relevant.

## 🛠 What I Used

* **React** (with TypeScript): The core for building a snappy UI.
* **Create React App**: Quick setup so I could dive straight into coding.
* **Tailwind CSS** & **PostCSS**: For styling without wrestling with CSS frameworks.
* **Supabase**: Handles user authentication (email/password) and stores my data securely in the cloud.
* **GitHub Pages**: Free hosting at [https://timchen0326.github.io/job-tracker/](https://timchen0326.github.io/job-tracker/).

## 💡 Why I Made It

I’m on the hunt for my next internship, and every time I hit “send” on LinkedIn or an online portal, I wanted a simple place to log it. Instead of context‑switching between a spreadsheet and my inbox, I thought, why not build something that’s exactly tailored to my workflow—and hey, showcase my skills in the process?

## 📦 Getting Started

### Prerequisites

* **Node.js** (v14 or higher)
* **npm** or **yarn**
* A free [Supabase](https://supabase.com) account

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/timchen0326/job-tracker.git
   cd job-tracker
   ```
2. Install dependencies:

   ```bash
   npm install
   # or yarn install
   ```
3. Set up environment variables: Copy `.env.example` to `.env` and fill in your Supabase URL and Anon Key.

### Running Locally

```bash
npm start
# or yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will hot‑reload as you save changes.

### Building for Production

```bash
npm run build
# or yarn build
```

This creates an optimized bundle in the `build` folder.

## 🚢 Deployment

I’ve deployed this project to GitHub Pages. If you want to host your own copy:

1. Add the `homepage` field in `package.json`:

   ```json
   "homepage": "https://<your‑username>.github.io/job-tracker"
   ```
2. Run:

   ```bash
   npm run deploy
   ```

## 🤝 Contributing

Feel free to send a pull request if you spot anything that could be improved. This is a personal project, but I’m open to suggestions!

## 📬 Contact

Have questions or suggestions? Shoot me an email at **[timchen0326@gmail.com](mailto:timchen0326@gmail.com)**. I’d love to hear from you!
