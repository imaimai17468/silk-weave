import { Header } from "../parts/header";

type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props): React.ReactNode => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
