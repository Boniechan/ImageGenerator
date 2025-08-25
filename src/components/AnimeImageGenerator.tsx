import React, { useState } from "react";
import { Download, Sparkles, Camera, Loader2 } from "lucide-react";

// Load API key from .env
// For React, it must be prefixed with REACT_APP_
const API_KEY = process.env.REACT_APP_STABILITY_API_KEY || "";

const AnimeCharacterGenerator: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState("anime");
  const [customPrompt, setCustomPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Art styles
  const styles = [
    { id: "anime", name: "Classic Anime", description: "Traditional anime art style" },
    { id: "realistic", name: "Semi-Realistic", description: "More realistic anime style" },
    { id: "chibi", name: "Chibi", description: "Cute chibi style" },
    { id: "sketch", name: "Sketch", description: "Hand-drawn sketch style" },
    { id: "watercolor", name: "Watercolor", description: "Soft watercolor painting" },
    { id: "digital", name: "Digital Art", description: "Modern digital art style" },
    { id: "vintage", name: "Vintage Anime", description: "90s anime aesthetic" },
    { id: "minimalist", name: "Minimalist", description: "Clean, simple style" },
  ];

  // Base character prompt
  const basePrompt =
    "single character, red-haired anime girl with long red hair, red eyes, wearing white dress shirt with gray bow tie and black skirt, professional office setting";

  // Style-specific prompt additions
  const getStylePrompt = (style: string) => {
    const styleMap: Record<string, string> = {
      anime: ", high quality anime art style, cel shading, vibrant colors",
      realistic: ", semi-realistic anime style, detailed shading, soft lighting",
      chibi: ", chibi art style, cute proportions, big eyes, kawaii",
      sketch: ", pencil sketch style, hand-drawn lines, monochrome",
      watercolor: ", watercolor painting style, soft colors, artistic brush strokes",
      digital: ", digital art style, sharp details, modern anime aesthetic",
      vintage: ", 90s anime style, retro aesthetic, classic anime look",
      minimalist: ", minimalist art style, clean lines, simple colors",
    };
    return styleMap[style] || "";
  };

  // Generate image
  const generateImage = async () => {
    if (!API_KEY) {
      alert("❌ Missing API key! Please set REACT_APP_STABILITY_API_KEY in your .env file.");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage("");

    const fullPrompt =
      basePrompt + getStylePrompt(selectedStyle) + (customPrompt ? `, ${customPrompt}` : "");

    try {
      const response = await fetch(
        "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            text_prompts: [{ text: fullPrompt, weight: 1 }],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            samples: 1,
            steps: 30,
          }),
        }
      );

      if (!response.ok) {
        let msg = "Failed to generate image.";
        try {
          const err = await response.json();
          msg = err?.message || msg;
        } catch {}
        throw new Error(msg);
      }

      const data = await response.json();
      if (data.artifacts && data.artifacts[0]?.base64) {
        setGeneratedImage(`data:image/png;base64,${data.artifacts[0].base64}`);
      } else {
        throw new Error("No image returned. Try a simpler prompt or different style.");
      }
    } catch (error: any) {
      console.error("Error generating image:", error);
      alert(
        (error?.message?.includes("CORS") || error?.name === "TypeError")
          ? "Generation failed (possibly CORS). Use a backend proxy if needed."
          : `Generation failed: ${error?.message || "Unknown error"}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Download image
  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `anime-character-${selectedStyle}-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-title">
            <Sparkles className="icon-lg purple" />
            <h1 className="gradient-text">Anime Character Generator</h1>
          </div>
          <p className="subtext">
            Generate beautiful anime art of a single red-haired character in various styles
          </p>
        </div>

        <div className="grid">
          {/* Controls Panel */}
          <div className="panel">
            <h2 className="panel-title">
              <Camera className="icon-md purple" />
              <span>Customization</span>
            </h2>

            {/* Style Selection */}
            <div className="form-group">
              <label className="label">Art Style</label>
              <div className="style-grid">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`style-btn ${selectedStyle === style.id ? "selected" : ""}`}
                  >
                    <div className="style-name">{style.name}</div>
                    <div className="style-desc">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Prompt */}
            <div className="form-group">
              <label className="label">Additional Details (Optional)</label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., sitting at desk, smiling, dramatic lighting..."
                rows={3}
                className="textarea"
              />
            </div>

            {/* Generate Button */}
            <button onClick={generateImage} disabled={isGenerating} className="generate-btn">
              {isGenerating ? (
                <>
                  <Loader2 className="icon-md spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="icon-md" />
                  Generate Image
                </>
              )}
            </button>

            {/* Current Settings */}
            <div className="settings">
              <h3 className="settings-title">Current Settings:</h3>
              <p className="settings-body">
                Style:{" "}
                <span className="strong">
                  {styles.find((s) => s.id === selectedStyle)?.name}
                </span>
                {customPrompt && (
                  <>
                    <br />
                    Additional: <span className="strong">{customPrompt}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="panel">
            <h2 className="panel-title">Generated Image</h2>

            <div className="preview">
              {generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated anime character"
                  className="preview-img"
                />
              ) : (
                <div className="preview-empty">
                  <Camera className="icon-xl faded" />
                  <p>Generated image will appear here</p>
                </div>
              )}
            </div>

            {generatedImage && (
              <div className="action-row">
                <button onClick={downloadImage} className="btn primary">
                  <Download className="icon-sm" />
                  Download
                </button>
                <button onClick={() => setGeneratedImage("")} className="btn">
                  Clear
                </button>
              </div>
            )}

            {/* Tips */}
            <div className="tips">
              <h3>💡 Tips for Better Results:</h3>
              <ul>
                <li>Try different art styles for variety</li>
                <li>Add specific pose or expression details</li>
                <li>Mention lighting or background preferences</li>
                <li>Keep prompts clear and descriptive</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">ANIME GENERATOR IMAGE</div>
      </div>
    </div>
  );
};

export default AnimeCharacterGenerator;
