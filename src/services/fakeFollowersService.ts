import axiosInstance from "@/lib/axios";
import API_CONFIG from "@/config/api";
import type { FakeFollowersResult } from "@/types";


 @param profileUrl 
 
export async function analyzeAccount(
  profileUrl: string
): Promise<FakeFollowersResult> {
  const res = await axiosInstance.get<FakeFollowersResult>(
    API_CONFIG.ENDPOINTS.FAKE_FOLLOWERS,
    { params: { url: profileUrl } }
  );
  return res.data;
}
