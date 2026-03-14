import api from "@/lib/api";

/** Admin login. Sends credentials; on success backend sets httpOnly session cookie. */
export async function adminLogin(loginId: string, password: string): Promise<{ ok: boolean }> {
  const { data } = await api.post<{ ok: boolean }>("/admin/login", { login_id: loginId, password }, { withCredentials: true });
  return data;
}

/** Check if admin session is valid. Use on admin page load to show login vs panel. */
export async function adminMe(): Promise<{ ok: boolean }> {
  const { data } = await api.get<{ ok: boolean }>("/admin/me", { withCredentials: true });
  return data;
}
