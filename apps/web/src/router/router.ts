import { createBrowserRouter } from "react-router";

import { LaunchPage } from "@/pages/app/launch";
import { LayoutMain } from "@/pages/layout";
import { SignInPage } from "@/pages/auth/sign-in";
import { SignUpPage } from "@/pages/auth/sign-up";
import { ForgotPasswordPage } from "@/pages/auth/forgot-password";
import { ResetPasswordPage } from "@/pages/auth/reset-password";
import { SignOutPage } from "@/pages/auth/sign-out";
import { HomePage } from "@/pages/app/home";
import { SetUpPage } from "@/pages/app/set-up";
import { SettingsPage } from "@/pages/app/settings";
import { NotFoundPage } from "@/pages/not-found";
import { ProfileEditPage } from "@/pages/app/profile/edit";
import { NotificationsSettingsPage } from "@/pages/app/settings/notifications";
import { NotificationsPage } from "@/pages/app/notifications";
import { SearchPage } from "@/pages/app/search";
import { MarketingPage } from "@/pages/(marketing)";
import { ProtectedRoute } from "./providers";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MarketingPage,
  },
  {
    path: "auth",
    Component: LayoutMain,
    children: [
      {
        path: "forgot-password",
        Component: ForgotPasswordPage,
      },
      {
        path: "reset-password",
        Component: ResetPasswordPage,
      },
      {
        path: "sign-in",
        Component: SignInPage,
      },
      {
        path: "sign-out",
        Component: SignOutPage,
      },
      {
        path: "sign-up",
        Component: SignUpPage,
      },
    ],
  },
  {
    path: "app",
    Component: ProtectedRoute,
    children: [
      {
        Component: LayoutMain,
        children: [
          {
            path: "home",
            Component: HomePage,
          },
          {
            path: "launch",
            Component: LaunchPage,
          },
          {
            path: "notifications",
            Component: NotificationsPage,
          },
          {
            path: "profile",
            children: [
              {
                path: "edit",
                Component: ProfileEditPage,
              },
            ],
          },
          {
            path: "search",
            Component: SearchPage,
          },
          {
            path: "settings",
            Component: SettingsPage,
          },
          {
            path: "settings/notifications",
            Component: NotificationsSettingsPage,
          },
          {
            path: "set-up",
            Component: SetUpPage,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: LayoutMain,
    children: [
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
