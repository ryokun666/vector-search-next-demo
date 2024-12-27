"use client";

import { useState } from "react";

type SearchResult = {
  id: string;
  score: number;
  metadata: {
    text: string;
    source: string;
  } | null;
};

export default function Home() {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleAdd = async () => {
    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      alert(data.message);
      setText(""); // 送信後にフォームをクリア
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setSearchResults(data.matches || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "2rem",
        }}
      >
        ベクトルDB検索デモ
      </h1>

      {/* テキスト登録フォーム */}
      <div
        style={{
          marginBottom: "3rem",
          padding: "2rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#444", marginBottom: "1rem" }}>テキストの登録</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            type="text"
            placeholder="登録するテキストを入力してください"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "1rem",
            }}
          />
          <button
            onClick={handleAdd}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            登録
          </button>
        </div>
      </div>

      {/* 検索フォーム */}
      <div
        style={{
          marginBottom: "3rem",
          padding: "2rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#444", marginBottom: "1rem" }}>テキストの検索</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            type="text"
            placeholder="検索したいテキストを入力してください"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "1rem",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            検索
          </button>
        </div>
      </div>

      {/* 検索結果テーブル */}
      <div
        style={{
          padding: "2rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#444", marginBottom: "1rem" }}>検索結果</h2>
        {searchResults.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#e9ecef" }}>
                <th
                  style={{
                    padding: "1rem",
                    border: "1px solid #dee2e6",
                    textAlign: "left",
                  }}
                >
                  テキスト内容
                </th>
                <th
                  style={{
                    padding: "1rem",
                    border: "1px solid #dee2e6",
                    textAlign: "left",
                    width: "120px",
                  }}
                >
                  類似度
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((item, idx) => (
                <tr key={idx}>
                  <td
                    style={{
                      padding: "1rem",
                      border: "1px solid #dee2e6",
                      backgroundColor: "white",
                    }}
                  >
                    {item.metadata?.text || item.id}
                  </td>
                  <td
                    style={{
                      padding: "1rem",
                      border: "1px solid #dee2e6",
                      backgroundColor: "white",
                    }}
                  >
                    {(item.score * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>
            検索結果がありません
          </p>
        )}
      </div>
    </div>
  );
}
