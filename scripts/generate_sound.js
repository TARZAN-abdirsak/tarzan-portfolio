const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'sounds', 'door-open.wav');

// WAV Header constants
const sampleRate = 44100;
const duration = 1.5; // seconds
const numSamples = sampleRate * duration;
const bytesPerSample = 2; // 16-bit
const numChannels = 1;
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = numSamples * blockAlign;
const fileSize = 36 + dataSize;

const buffer = Buffer.alloc(44 + dataSize);

// Write Header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(fileSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34); // BitsPerSample
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

// Generate Sound Data (Simple "Creak" - Sawtooth wave with dropping pitch)
for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;

    // Pitch drops from 400Hz to 100Hz over 1.5s
    const frequency = 400 - (300 * (t / duration));

    // Amplitude envelope: Attack (0.1s), Sustain, Decay (0.5s)
    let amplitude = 0.5;
    if (t < 0.1) amplitude = 0.5 * (t / 0.1);
    else if (t > duration - 0.5) amplitude = 0.5 * ((duration - t) / 0.5);

    // Sawtooth Wave
    const sample = ((t * frequency) % 1) * 2 - 1;

    // Apply amplitude
    const value = sample * amplitude * 32767;

    buffer.writeInt16LE(Math.floor(value), 44 + i * 2);
}

// Ensure directory exists
const dir = path.dirname(filePath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(filePath, buffer);
console.log(`Generated sound at ${filePath}`);
