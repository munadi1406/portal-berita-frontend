import { useNavigate } from "react-router-dom";
import jwtDecodeId from "../utils/jwtDecodeId";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const { role } = jwtDecodeId();
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate('/dashboard');
    }
  }, []);

  return children;
}
