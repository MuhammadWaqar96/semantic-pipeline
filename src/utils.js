function normalizeText(text){
    return text.toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function chunkText(text, chunkSize = 200, overlap = 50){
    const words = text.split(" ");
    const chunks = [];

    let start = 0;
    while (start < words.length) {
        const end = start + chunkSize;
        const chunk = words.slice(start, end).join(" ");
        chunks.push(chunk);
        start += chunkSize - overlap;
    }

    return chunks;
}

function generateEmbedding(text, dim=128){
    const embedding = new Array(dim).fill(0);
    for (let i = 0; i < text.length; i++){
        embedding [i%dim] += text.charCodeAt(i);
    }

    return embedding;
}


function cosineSimilarity(a,b){
    let dot = 0, normA = 0, normB = 0;

    for (let i = 0; i < a.length; i++){
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
} 

module.exports = {
    normalizeText,
    chunkText,
    generateEmbedding,
    cosineSimilarity
}