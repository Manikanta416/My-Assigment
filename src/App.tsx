import { ThemeProvider } from "./components/theme-provider"; // Adjust the path as needed
import Sidebar from './components/ui/Sidebar';
import Dashboard from './components/ui/Dashboard';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex min-h-screen">
        {/* Sidebar takes 1/5 of the width */}
        <div className="w-1/5">
          <Sidebar />
        </div>

        {/* Dashboard takes the remaining 4/5 */}
        <div className="w-4/5">
          <Dashboard />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
