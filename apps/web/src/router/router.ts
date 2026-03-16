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
import { WorkoutPlansPage } from "@/pages/app/workout-plans";
import { ExercisesPage } from "@/pages/app/exercises";
import { ExercisePage } from "@/pages/app/exercises/[exerciseId]";
import { AppPageLoader } from "@/pages/app/loader";
import { WorkoutPlansLoader } from "@/pages/app/workout-plans/loader";
import { WorkoutPlanPage } from "@/pages/app/workout-plans/[workoutPlanId]";
import { WorkoutPlanLoader } from "@/pages/app/workout-plans/[workoutPlanId]/loader";
import { WorkoutDayIdLoader } from "@/pages/app/workout-plans/[workoutPlanId]/workout-days/[workoutDayId]/loader";
import { WorkoutDayPage } from "@/pages/app/workout-plans/[workoutPlanId]/workout-days/[workoutDayId]";
import { ExercisesLoader } from "@/pages/app/exercises/loader";
import { ExerciseLoader } from "@/pages/app/exercises/[exerciseId]/loader";
import { WorkoutSessionPage } from "@/pages/app/workout-sessions/[workoutSessionId]";
import { WorkoutSessionLoader } from "@/pages/app/workout-sessions/[workoutSessionId]/loader";
import { WorkoutSessionsPage } from "@/pages/app/workout-sessions";
import { WorkoutSessionsLoader } from "@/pages/app/workout-sessions/loader";

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
    loader: AppPageLoader,
    Component: ProtectedRoute,

    children: [
      {
        Component: LayoutMain,
        children: [
          {
            path: "exercises/:exerciseId",
            loader: ExerciseLoader,
            Component: ExercisePage,
          },
          {
            path: "exercises",
            loader: ExercisesLoader,
            Component: ExercisesPage,
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
          {
            path: "workout-plans/:workoutPlanId/workout-days/:workoutDayId",
            loader: WorkoutDayIdLoader,
            Component: WorkoutDayPage,
          },
          {
            path: "workout-plans/:workoutPlanId",
            loader: WorkoutPlanLoader,
            Component: WorkoutPlanPage,
          },
          {
            path: "workout-plans",
            loader: WorkoutPlansLoader,
            Component: WorkoutPlansPage,
          },
          {
            path: "workout-sessions/:workoutSessionId",
            loader: WorkoutSessionLoader,
            Component: WorkoutSessionPage,
          },
          {
            path: "workout-sessions",
            loader: WorkoutSessionsLoader,
            Component: WorkoutSessionsPage,
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
