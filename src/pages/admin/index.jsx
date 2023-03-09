import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import memoryUtils from "../../utils/memoryUtils";

export default function Admin() {
  const user = memoryUtils.user;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user._id) {
      navigate("/login", { replace: true });
    }
  }, []);

  return <div>admin</div>;
}
