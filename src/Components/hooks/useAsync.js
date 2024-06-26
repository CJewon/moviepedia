import React, { useState, useCallback } from "react";

export default function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const warppendFunction = useCallback(
    async (...args) => {
      try {
        setError(null);
        setPending(true);
        return await asyncFunction(...args);
      } catch (error) {
        setError(error);
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFunction]
  );

  return [pending, error, warppendFunction];
}
