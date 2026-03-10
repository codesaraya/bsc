// Auto-accept prompts by injecting into the prompts module
// This must run before Payload's pushDevSchema uses prompts
import prompts from 'prompts';
prompts.inject([true, true, true, true, true]);

// Now run the seed (it has its own getPayload + process.exit)
import './src/seed.js';
