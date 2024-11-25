import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/fetchData");
      const result = await res.json();

      if (result.error) {
        console.error(result.error);
        return;
      }

      setData(result.data);
      setLastUpdated(result.lastUpdated);
    };

    // Ambil data pertama kali
    fetchData();

    // Interval untuk refresh data setiap 10 detik
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Monitor Perubahan Data</h1>
      <p>
        <strong>Terakhir Diperbarui:</strong>{" "}
        {lastUpdated
          ? new Date(lastUpdated).toLocaleString()
          : "Belum ada data"}
      </p>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "10px",
          borderRadius: "5px",
          overflowX: "auto",
        }}
      >
        {data || "Memuat data..."}
      </pre>
    </div>
  );
}
