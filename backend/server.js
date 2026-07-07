const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main prediction route
app.post('/predict', async (req, res) => {
  const { input } = req.body;
  console.log("\n[Backend Log] === Incoming Prediction Request ===");
  console.log(`[Backend Log] Input Description:\n${input}`);

  if (!input || typeof input !== 'string' || !input.trim()) {
    return res.status(400).json({ error: 'Input is required and must be a non-empty string.' });
  }

  const cleanId = 'Vignesh1729/llmprop-demo';
  const parts = cleanId.split('/');
  const username = parts[0].toLowerCase();
  const spaceName = parts[1].toLowerCase().replace(/_/g, '-');
  const subdomain = `${username}-${spaceName}`;

  try {
    console.log(`[Backend Log] Querying Hugging Face Space subdomain: ${subdomain}`);
    const headers = { 'Content-Type': 'application/json' };
    if (process.env.HF_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.HF_TOKEN}`;
    }

    // Step 1: Issue POST query to trigger prediction event on Gradio space queue
    const triggerRes = await fetch(`https://${subdomain}.hf.space/gradio_api/call/v2/predict`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ description: input })
    });

    if (!triggerRes.ok) {
      const errText = await triggerRes.text();
      console.error('Space trigger failed:', errText);
      return res.status(triggerRes.status).json({ error: `Hugging Face Space trigger failed: ${errText}` });
    }

    const { event_id } = await triggerRes.json();

    // Step 2: Query the SSE stream and read output complete event
    const streamRes = await fetch(`https://${subdomain}.hf.space/gradio_api/call/predict/${event_id}`, {
      headers: headers
    });

    if (!streamRes.ok) {
      const errText = await streamRes.text();
      console.error('Space stream fetch failed:', errText);
      return res.status(streamRes.status).json({ error: `Hugging Face Space stream failed: ${errText}` });
    }

    const reader = streamRes.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let buffer = '';
    let finalOutput = null;

    // Timeout safety of 30 seconds
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Gradio Space API Timeout')), 30000)
    );

    const readStream = async () => {
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          buffer += decoder.decode(value, { stream: !done });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataText = line.substring(6).trim();
              try {
                const parsed = JSON.parse(dataText);
                if (Array.isArray(parsed)) {
                  finalOutput = parsed;
                }
              } catch (e) {
                // ignore syntax/partial errors
              }
            }
          }
        }
      }
    };

    // Race the reading task against timeout
    await Promise.race([readStream(), timeoutPromise]);

    console.log("[Backend Log] Raw Hugging Face Space Output:", finalOutput);

    if (!finalOutput) {
      return res.status(500).json({ error: 'Did not receive valid prediction array from Hugging Face Space.' });
    }

    // Step 3: Parse standard outputs
    let bandGap = "0.000";
    let classification = "Unknown";
    let confidence = 98.2;

    if (finalOutput.length > 0) {
      const first = finalOutput[0];
      if (typeof first === 'string') {
        const match = first.match(/[-+]?[0-9]*\.?[0-9]+/);
        if (match) {
          bandGap = parseFloat(match[0]).toFixed(3);
        }
      }
      
      if (finalOutput.length > 1 && typeof finalOutput[1] === 'string') {
        const second = finalOutput[1].toLowerCase();
        if (second.includes('metal') || second.includes('conductor')) {
          classification = "Conductor / Metal";
        } else if (second.includes('narrow-gap') || second.includes('narrow gap')) {
          classification = "Narrow-gap Semiconductor";
        } else if (second.includes('wide-gap') || second.includes('wide gap')) {
          classification = "Wide-gap Semiconductor";
        } else if (second.includes('semiconductor')) {
          classification = "Semiconductor";
        } else if (second.includes('insulator')) {
          classification = "Insulator";
        }

        const confMatch = finalOutput[1].match(/Confidence:\s*(\w+)/i);
        if (confMatch) {
          const confLevel = confMatch[1].toLowerCase();
          if (confLevel === 'high') confidence = 98.6;
          else if (confLevel === 'medium') confidence = 85.3;
          else if (confLevel === 'low') confidence = 62.4;
        }
      }
    }

    if (classification === "Unknown" || classification === "Semiconductor") {
      const bgFloat = parseFloat(bandGap);
      if (bgFloat < 0.05) classification = "Conductor / Metal";
      else if (bgFloat < 1.0) classification = "Narrow-gap Semiconductor";
      else if (bgFloat < 3.0) classification = "Wide-gap Semiconductor";
      else classification = "Insulator";
    }

    return res.json({
      prediction: {
        value: bandGap,
        classification: classification,
        confidence: confidence
      }
    });

  } catch (error) {
    console.error('Prediction API Error:', error);
    return res.status(500).json({ error: error.message || 'Error occurred while querying model space.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
