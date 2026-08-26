import { useState } from "react";
import { apiClient } from "../api/client";

export default function ColorMatch() {
  const [skinToneHex, setSkinToneHex] = useState("#E0AC69");
  const [undertone, setUndertone] = useState("WARM");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await apiClient.post("/colormatch/analyze", { skinToneHex, undertone });
      setResult(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h1>Color Match</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Skin tone
          <input type="color" value={skinToneHex} onChange={(e) => setSkinToneHex(e.target.value)} />
        </label>
        <label>
          Undertone
          <select value={undertone} onChange={(e) => setUndertone(e.target.value)}>
            <option value="WARM">Warm</option>
            <option value="COOL">Cool</option>
            <option value="NEUTRAL">Neutral</option>
          </select>
        </label>
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing…" : "Analyze"}
        </button>
      </form>

      {result && (
        <div>
          <h2>Your season: {result.season}</h2>
          <h3>Recommended colors</h3>
          <ul style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0 }}>
            {result.recommendedColors.map((color) => (
              <li
                key={color}
                title={color}
                style={{ background: color, width: 32, height: 32, borderRadius: "50%" }}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
