const fetch = require("node-fetch");

let cachedData = "";
let lastUpdated = null;

const url =
  "https://himalayareload.otoreport.com/harga.js.php?id=b61804374cb7e3d207028ac05b492f82265047801111a2c0bc3bb288a7a843341b24cdc21347fbc9ba602392b435df468647-6";

// Fungsi untuk mengambil data dari URL
const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Gagal mengambil data");

    const data = await response.text();

    if (data !== cachedData) {
      cachedData = data;
      lastUpdated = new Date();
    }

    return { data: cachedData, lastUpdated };
  } catch (error) {
    return { error: error.message };
  }
};

// API handler
module.exports = async (req, res) => {
  if (req.method === "GET") {
    const result = await fetchData();
    res.status(200).json(result);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
