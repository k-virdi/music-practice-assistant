function autoCorrelate(buf, sampleRate) {
    let size = buf.length;
    let maxSamples = Math.floor(size / 2);
    let bestCorr = -1;
    let bestLag = -1;
    let rms = 0;
    for (let i = 0; i < size; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / size);
    if (rms < 0.01) return -1; // too quiet
    let corr;
    for (let lag = 0; lag < maxSamples; lag++) {
        corr = 0;
        for (let i = 0; i < maxSamples; i++) {
            corr += buf[i] * buf[i + lag];
        }
        corr /= maxSamples;
        if (corr > bestCorr) {
            bestCorr = corr;
            bestLag = lag;
        }
    }
    if (bestCorr < 0.1) return -1;
    let pitch = sampleRate / bestLag;
    return pitch;
}
