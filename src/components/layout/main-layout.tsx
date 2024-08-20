import { Aurora } from "../parts/Aurora";
import { Header } from "../parts/header";

type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props): React.ReactNode => {
  return (
    <>
      <Aurora />
      <Header />
      {children}
    </>
  );
};
