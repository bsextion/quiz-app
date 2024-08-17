import axios from "axios";
import React, { useEffect, useState } from "react";

export const useApiOnUpdate = (url, transformFunction, deps = []) => {
  const firstRender = React.useRef(true);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios(url);
      const transformedData = transformFunction(response.data);

      setData(transformedData);
    } catch (error) {
      console.log("Caught Error: ", error);

      setError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      fetchData();
    }

    fetchData();
  }, deps);
  return { data, isLoading, error };
};
