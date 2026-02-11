# 🚀 Quick Start Guide

Get StudyMate AI up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages:
- React 18.2
- Vite 5.0
- Tailwind CSS 3.3
- Lucide React (icons)
- Framer Motion (animations)

## Step 2: Start Development Server

```bash
npm run dev
```

Your application will automatically open at `http://localhost:5173`

## Step 3: Explore the Project

### View the Landing Page
The homepage features a beautiful hero section with feature highlights and call-to-action buttons.

### Navigate the App
Click "Get Started" to explore the dashboard layout with:
- **Responsive Sidebar** - Navigation with collapsible menu on mobile
- **Topbar** - Displays user profile, XP points, and level
- **Smooth Animations** - Powered by Framer Motion
- **Professional Design** - Indigo and Emerald color scheme

## Step 4: Create Your First Page

Create a new file: `src/pages/Dashboard.jsx`

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <Zap className="text-accent-600" size={32} />
        <h1 className="text-4xl font-bold text-slate-800">Dashboard</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="card p-6"
          >
            <h3 className="text-lg font-bold text-primary-600 mb-2">
              Card {i}
            </h3>
            <p className="text-slate-600">
              Click to add your content here
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
```

## Step 5: Update App.jsx to Use It

```jsx
import Dashboard from './pages/Dashboard';

// In the renderContent function:
case 'dashboard':
  return <Dashboard />;
```

## Step 6: Build for Production

```bash
npm run build
```

Creates an optimized build in the `dist/` folder ready for deployment.

## 📚 Next Steps

1. **Add More Pages** - Create pages for Tools, Library, Focus, Coach, Community
2. **Integrate APIs** - Use the API utilities in `src/utils/api.js`
3. **Connect Contexts** - Use UserContext and StudyContext for global state
4. **Add More Components** - Cards, buttons, forms, modals
5. **Customize Colors** - Update `tailwind.config.js` for your branding

## 🎨 Key Features to Build

- [ ] Quiz creation and player
- [ ] Flashcard management
- [ ] Pomodoro timer with ambient music
- [ ] AI integration for summaries and suggestions
- [ ] Community feed
- [ ] User profile settings
- [ ] Study statistics and progress tracking

## 💡 Tips

- Use `classNameclsx` for conditional classes
- Leverage Tailwind responsive classes (md:, lg:)
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use localStorage for offline support

## 🔗 File Structure Reference

```
src/
├── components/   → Reusable UI components
├── pages/        → Full-page components
├── hooks/        → Custom React hooks
├── context/      → Global state management
├── utils/        → Helpers, constants, API calls
└── styles/       → Global CSS
```

## ⚡ Common Tasks

### Add a new custom hook
Create file: `src/hooks/useMyHook.js`
Export from: `src/hooks/index.js`

### Add a new page
Create file: `src/pages/MyPage.jsx`
Import and use in: `src/App.jsx`

### Add a new component
Create file: `src/components/MyComponent.jsx`
Export from: `src/components/index.js`
Import in pages/components that need it

### Add global context
Create file: `src/context/MyContext.jsx`
Export from: `src/context/index.js`
Wrap App with provider in `main.jsx`

## 🐛 Troubleshooting

**Styles not loading?**
- Check Tailwind config content paths
- Restart dev server (`Ctrl+C` then `npm run dev`)

**Component not showing?**
- Verify export/import paths
- Check browser console for errors

**Animations stuttering?**
- Reduce animation complexity
- Use `will-change` CSS property: `className="will-change-transform"`

## 📖 Resources

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Vite Documentation](https://vitejs.dev)

## 🎉 You're Ready!

Start building your amazing learning platform. Happy coding! 🚀

---

For more help, check the main [README.md](./README.md)
