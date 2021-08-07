import { useState, useEffect, useRef } from "react";

export const useFetch = (url, method = "GET", body) => {
  const isMounted = useRef(true);
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const getData = async () => {
    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setState({
        loading: false,
        error: null,
        data,
      });
    } catch (error) {
      console.log("error", error);
      setState({
        data: {},
        loading: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    setState({ data: null, loading: true, error: null });
    getData();
  }, [url]);

  return state;
};
