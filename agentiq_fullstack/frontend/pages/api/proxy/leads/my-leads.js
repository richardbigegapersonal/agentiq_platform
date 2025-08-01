// pages/api/proxy/leads/my-leads.js
import { withAuth } from "@clerk/nextjs/api";

export default withAuth(async (req, res) => {
  const { userId, getToken } = req.auth;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const token = await getToken();
    const backendURL = process.env.BACKEND_API_BASE_URL || "https://your-backend-url.com";

    const apiRes = await fetch(`${backendURL}/leads/my-leads`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
