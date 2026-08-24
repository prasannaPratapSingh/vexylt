import type { ITool } from "./agent.js";
import { HARNESS_PROMPT } from "./config.js"

export const harnessPrompt = (prompt: string | undefined, toolList: ITool[]) => {
    const finalPrompt = `
    ${HARNESS_PROMPT}\n\n
    
    System Prompt:
    ${prompt}
    
    Available Tools:
    ${toolList.map(t => JSON.stringify({ functionDescription: t.description, functionName: t.name, functionDoc: t.doc })).join('\n')}
    `
    return finalPrompt;

}