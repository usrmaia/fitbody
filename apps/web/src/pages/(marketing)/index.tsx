import { useEffect } from "react";
import { useNavigate } from "react-router";

export function MarketingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/sign-in", { replace: true });
  }, [navigate]);

  return null;
}
