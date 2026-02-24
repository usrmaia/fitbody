import { createBrowserRouter } from "react-router";

import { LaunchPage } from "./app/launch";
import { LayoutMain } from "./app/layout";
import { SignInPage } from "./app/auth/sign-in";
import { SignUpPage } from "./app/auth/sign-up";
import { ForgotPasswordPage } from "./app/auth/forgot-password";
import { ResetPasswordPage } from "./app/auth/reset-password";
import { SignOutPage } from "./app/auth/sign-out";
import { HomePage } from "./app/home";
import { SetUpPage } from "./app/set-up";
import { SettingsPage } from "./app/settings";
import { NotFoundPage } from "./not-found";
import { ProfileEditPage } from "./app/profile/edit";
import { NotificationsSettingsPage } from "./app/settings/notifications";
import { NotificationsPage } from "./app/notifications";
import { SearchPage } from "./app/search";
import { MarketingPage } from "./(marketing)";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MarketingPage,
  },
  {
    path: "app",
    Component: LayoutMain,
    children: [
      {
        path: "auth",
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
