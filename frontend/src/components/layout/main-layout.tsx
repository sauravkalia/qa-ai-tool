
import { ReactNode } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="h-full p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
