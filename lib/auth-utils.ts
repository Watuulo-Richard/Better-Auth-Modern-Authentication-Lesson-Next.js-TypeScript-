// lib/auth-utils.ts
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAuth(allowedRoles?: string[]) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  if (allowedRoles && !allowedRoles.includes(user.role as string)) {
    redirect("/unauthorized");
  }

  return user;
}

// // Usage in pages
// export default async function AdminPage() {
//   const user = await requireAuth(["ADMIN", "ASSISTANT_ADMIN"]);

//   return <div>Admin content for {user.name}</div>;
// }
