const { getAll } = require("./vectorStore");
const {
    generateEmbedding,
    cosineSimilarity,
    normalizeText,
} = require("./utils");


module.exports = (req, res) => {
    const {query, topK = 5} = req.query;

    const normalizedQuery = normalizeText(query);
    const queryEmbedding = generateEmbedding(normalizedQuery);

    const results = getAll()
                    .map(chunk => ({
                        text: chunk.text,
                        candidateId: chunk.candidateId,
                        embeddingVersion: chunk.embeddingVersion,
                        score: cosineSimilarity(queryEmbedding, chunk.embedding),
                    }))
                    .sort((a,b) => b.score - a.score)
                    .slice(0, topK);

                res.json(results);
};

