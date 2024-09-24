import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import QueryProviderComponent from "@/components/query-provider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <QueryProviderComponent>
      <div className="h-screen">
        <Navbar />
        {children}
        <Footer />
      </div>
    </QueryProviderComponent>
  );
};

export default Layout;
