const { addChunk } = require("./vectorStore");
const {
    normalizeText,
    chunkText,
    generateEmbedding
} = require("./utils")

function extractFields(profile, extractionVersion) {
    return {
        summary: profile.bio.slice(0,200),
        inferredSkills: profile.skills,
        version: extractionVersion
    }
}

module.exports = (req, res) => {
    const start = Date.now();

    const profiles = req.body;
    const embeddingVersion = req.body.embeddingVersion || "v1";
    const extractionVersion = req.body.extractionVersion || "v1";

    let chunkCount = 0;

    profiles.forEach(profile => {
        const normalizedBio = normalizeText(profile.bio);
        const chunks = chunkText(normalizedBio);

        chunks.forEach((chunkText, index) => {
            const embedding = generateEmbedding(chunkText);

            addChunk({
                id: `${profile.id}_chunk_${index}`,
                candidateId: profile.id,
                text: chunkText,
                embedding,
                embeddingVersion,
                extractionVersion,
                metadata: {
                    name: profile.name,
                    experience: profile.experience,
                    skills: profile.skills,
                }
            });
            chunkCount++;
        })
    });

    res.json({
        profilesIngested: profiles.length,
        chunksCreated: chunkCount,
        timeTakenMs: Date.now() - start,
    })
}