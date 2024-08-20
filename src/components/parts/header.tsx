import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";

export const Header = (): React.ReactNode => {
  return (
    <header className="sticky top-0 z-50 py-4 px-8 flex gap-4 items-center justify-between bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
      <Logo />
      <ModeToggle />
    </header>
  );
};