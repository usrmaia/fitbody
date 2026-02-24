import { Outlet } from "react-router";

export function LayoutMain() {
  return (
    <div className="m-0 flex h-svh w-full flex-col items-center p-0">
      <main id="layout-main" className="w-full max-w-110 min-w-xs flex-1 pb-1">
        <Outlet />
      </main>
    </div>
  );
}
