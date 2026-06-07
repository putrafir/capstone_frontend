import axiosInstance from "@/shared/lib/axios";
import API_CONFIG from "@/shared/config/api";
import type { FakeFollowersResult } from "@/shared/types";


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
