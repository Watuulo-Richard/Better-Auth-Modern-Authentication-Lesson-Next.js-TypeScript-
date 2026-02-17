import { getUserById } from "@/actions/user";
import MinimalOTPVerification from "@/components/auth/verify";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  /* Remember The id is the userId*/
  const { id } = await params;
  const user = await getUserById(id);
  // Check if user exists and has an email
  if (!user.data) {
    console.error("User not found or email missing:", id);
    redirect("/sign-up"); // Redirect to sign-up if user doesn't exist
  }
  const userEmail = user.data?.email;
  return (
    <>
      <MinimalOTPVerification userId={id} email={userEmail} />
    </>
  );
}
