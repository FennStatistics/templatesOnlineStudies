# Extension

❗**Note:** This document will be continously updated.❗

**Author:** Julius Fenn ([julius.fenn@psychologie.uni-freiburg.de](mailto:julius.fenn@psychologie.uni-freiburg.de))


List of possible extensions, which should be integrated in the future:


## Integration of Large Language Models via REST APIs

Online studies can be extended by integrating **Large Language Models (LLMs)** via **REST APIs**. This enables structured communication between browser-based study components and external language models in a modular and controllable way.

### Advantages

- **Flexibility:** Different LLM providers and model versions can be integrated without modifying the core study logic.
- **Scalability:** Computationally intensive language processing is handled server-side rather than in the participant’s browser.
- **Reproducibility:** API-based access allows explicit documentation of model versions, prompts, and parameters.
- **Experimental Control:** Model behavior can be systematically varied across experimental conditions (e.g., prompts, temperature).

### Security and Data Protection Considerations

- **API Key Protection:** API keys must never be exposed in client-side code; all LLM requests should be routed through a secure server.
- **Data Minimization:** Only data strictly required for the experimental task should be transmitted to external APIs.
- **Participant Privacy:** Personally identifiable information should not be sent to LLM services unless explicitly justified and approved.
- **Logging and Storage:** Requests and responses should be logged cautiously to avoid unintended data retention.
- **Compliance:** The use of external LLM services should be evaluated with respect to applicable data protection regulations (e.g., GDPR).

REST-based integration allows the use of LLMs in online studies while maintaining methodological transparency, provided that appropriate security and privacy safeguards are implemented.