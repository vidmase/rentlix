import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Ensure the request is authenticated
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const {
      firstName = "",
      lastName = "",
      phone = null,
      gender = null,
      occupation = null,
      bio = null,
      dateOfBirth = null, // ISO string e.g. "1990-01-01"
      userType = null,
    } = body ?? {};

    const full_name = `${String(firstName || "").trim()} ${String(lastName || "").trim()}`.trim();
    if (!full_name) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }

    const user = authData.user;

    const payload: Record<string, any> = {
      id: user.id,
      email: user.email,
      full_name,
    };

    if (phone) payload.phone = String(phone);
    if (gender) payload.gender = String(gender);
    if (occupation) payload.occupation = String(occupation);
    if (bio) payload.bio = String(bio);
    if (dateOfBirth) payload.date_of_birth = String(dateOfBirth);
    if (userType) payload.user_type = String(userType);

    // Update the user's profile in rentlix_users table
    const { error: upsertError } = await supabase
      .from("rentlix_users")
      .upsert(payload, { onConflict: "id" });

    if (upsertError) {
      console.error("Profile upsert error:", upsertError);
      return NextResponse.json({ error: upsertError.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Profile updated successfully",
      user: {
        id: user.id,
        email: user.email,
        full_name
      }
    });
  } catch (err: any) {
    console.error("Profile update error:", err);
    return NextResponse.json({ error: err?.message ?? "Unexpected error" }, { status: 500 });
  }
}
