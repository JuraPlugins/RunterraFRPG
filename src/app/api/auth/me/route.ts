import { currentUser } from "@/lib/auth";
import { databaseConfigured, databaseSource } from "@/lib/db";
import { apiError } from "@/lib/http";

export async function GET() {
  try { return Response.json({ user: await currentUser(), configured: databaseConfigured(), databaseSource: databaseSource() }); }
  catch (error) { return apiError(error); }
}
