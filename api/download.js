// backend download all social media by idin code
export default async function handler(req, res) {
  // 1. Handle CORS (Wajib biar Frontend React lo gak diblokir)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Ambil URL video dari query parameter (ex: /api/download?url=...)
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Mana link videonya, Bos? 😆" });
  }

  try {
    // 3. Konfigurasi Data untuk API (format x-www-form-urlencoded)
    const formData = new URLSearchParams();
    formData.append('url', url);

    // 4. Tembak ke Snap Video API v3 (Spek dari lo)
    const response = await fetch('https://snap-video3.p.rapidapi.com/download', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': '4e47b12293mshc3f65f7fe7805e5p1e21f3jsn311b011168eb',
        'x-rapidapi-host': 'snap-video3.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    const data = await response.json();

    // 5. Kirim hasil balik ke React
    return res.status(200).json(data);

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Gagal narik data. Pastikan link bener atau API Key masih ada jatah! 😅" });
  }
}