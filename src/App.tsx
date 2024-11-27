import "./App.css";

import { Button, Layout } from "antd";
import { useEffect, useState } from "react";

import { ReadOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";

interface QuoteData {
  content: string;
  originator: {
    name: string;
  };
}

const API_URL = import.meta.env.VITE_API_URL as string;
const API_HOST = import.meta.env.VITE_API_HOST as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

const App: React.FC = () => {
  const [quote, setQuote] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<QuoteData>(API_URL, {
        headers: {
          "X-RapidAPI-Host": API_HOST,
          "X-RapidAPI-Key": API_KEY,
        },
      });
      setQuote(data.content);
      setAuthor(data.originator?.name);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="wrapper">
      <Content className="quote">
        {error ? (
          <div className="quote__text">{error.message}</div>
        ) : (
          quote && (
            <div className="quote__text">
              &quot;{quote}&quot;
              {author && <div className="quote__subtext">- {author}</div>}
            </div>
          )
        )}
        <Button className="quote__btn" type="primary" onClick={fetchQuote}>
          <ReadOutlined /> {loading ? "Loading..." : "Get Quote"}
        </Button>
      </Content>
      <footer className="shoutout">
        Photo by{" "}
        <a
          href="https://unsplash.com/@alfonsmc10"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alfons Morales
        </a>{" "}
        on{" "}
        <a
          href="https://unsplash.com/s/photos/library"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </a>
      </footer>
    </Layout>
  );
};

export default App;
