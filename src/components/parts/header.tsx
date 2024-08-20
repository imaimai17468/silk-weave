import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";

export const Header = (): React.ReactNode => {
  return (
    <header className="sticky top-0 z-50 p-4 flex gap-4 items-center justify-between">
      <Logo />
      <ModeToggle />
    </header>
  );
};
