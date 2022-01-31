const baseUrl = "https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/public/public";

export const profilePhotoUrl = (id: string): string =>
    `${baseUrl}/users/${id}.jpg`