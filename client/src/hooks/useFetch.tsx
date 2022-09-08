/**
 * If you are looking to add OAuth 1.0 / 2.0, please create a
 * separate client or hook to make the fetch
 */

import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url: string, body?: any) => {
  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [abort, setAbort] = useState(() => {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);

        setResponse(data);
      } catch (error: any) {
        error.message !== `Unexpected token '<', "<!DOCTYPE "... is not valid JSON` &&
          setError(error.message || "Unknown error");
      }
    };
    fetchData();
  }, []);

  return [response, setResponse, error, abort];
};