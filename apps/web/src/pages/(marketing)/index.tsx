import { useEffect } from "react";
import { useNavigate } from "react-router";

export function MarketingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/app/home");
  }, [navigate]);

  return null;
}
