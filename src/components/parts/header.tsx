import { Logo } from "./logo";

export const Header = (): React.ReactNode => {
  return (
    <header className="sticky top-0 z-50 p-6">
      <Logo />
    </header>
  );
};
