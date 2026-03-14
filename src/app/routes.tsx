import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ContainersScreen } from "./screens/ContainersScreen";
import { AddRefillScreen } from "./screens/AddRefillScreen";
import { WiFiManagerScreen } from "./screens/WiFiManagerScreen";
import { WeightAlertsScreen } from "./screens/WeightAlertsScreen";
import { ShopScreen } from "./screens/ShopScreen";
import { RecipesScreen } from "./screens/RecipesScreen";
import { AnalyticsScreen } from "./screens/AnalyticsScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OnboardingScreen />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "containers", element: <ContainersScreen /> },
      { path: "containers/add", element: <AddRefillScreen /> },
      { path: "containers/refill/:id", element: <AddRefillScreen /> },
      { path: "wifi", element: <WiFiManagerScreen /> },
      { path: "alerts", element: <WeightAlertsScreen /> },
      { path: "shop", element: <ShopScreen /> },
      { path: "recipes", element: <RecipesScreen /> },
      { path: "analytics", element: <AnalyticsScreen /> },
      { path: "settings", element: <SettingsScreen /> },
    ],
  },
]);
