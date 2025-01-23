import Quiz from "@/components/quiz/Quiz";
import Navigation from "@/components/navigation/Navigation";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider>
      <Navigation />
      <Quiz />
      </ThemeProvider>
  );
}
