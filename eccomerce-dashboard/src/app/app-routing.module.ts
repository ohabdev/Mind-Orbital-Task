import { Routes } from "@angular/router";
import { FullComponent } from "./layouts/full/full.component";
import { AuthLayoutComponent } from "./layouts/auth/auth.component";

import { AuthGuard } from "./shared/guard/auth.guard";
import { ConfigResolver } from "./shared/resolver";

export const Approutes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    resolve: { appConfig: ConfigResolver },
    children: [
      { path: "", redirectTo: "/auth/login", pathMatch: "full" },
      { path: "auth", loadChildren: "./auth/auth.module#AuthModule" },
    ],
  },
  {
    path: "",
    component: FullComponent,
    canActivate: [AuthGuard],
    resolve: { appConfig: ConfigResolver },
    children: [
      { path: "", redirectTo: "/auth/login", pathMatch: "full" },
      {
        path: "starter",
        loadChildren: "./starter/starter.module#StarterModule",
      },
      { path: "users", loadChildren: "./user/user.module#UserModule" },
      { path: "shops", loadChildren: "./shop/shop.module#ShopModule" },
    ],
  },
  {
    path: "**",
    redirectTo: "/starter",
  },
];
