# Minimal Semantic Pipeline

## Architecture Decisions
- Node.js + Express for rapid API development
- In-memory vector store for simplicity and speed
- Mock AI components to avoid external dependencies

## Data Flow
1. Profiles ingested via `/ingest`
2. Bio text normalized and chunked
3. Fields extracted via mock AI
4. Embeddings generated per chunk
5. Stored with versioning and metadata

## Chunking Strategy
- Fixed-size semantic windows of 200 words
- 50-word overlap to preserve context

## Embedding Strategy
- Deterministic mock embedding function
- Supports embedding versioning for future upgrades

## AI Tooling Usage
- ChatGPT used for system design, code generation, and refinement
- AI assisted in defining trade-offs under time constraints

## Trade-offs
- No persistent storage
- Mock embeddings instead of real models
- No authentication or validation

## Productionization
- Replace mock embeddings with OpenAI or local models
- Use a real vector DB (Weaviate, Pinecone)
- Add async ingestion pipeline
- Persist versioned embeddings
- Add monitoring and retries
