import { harnessPrompt } from "./harness.js";
import OpenAI from "openai";



export interface IMessage {
    role: "user" | "assistant" | "developer",
    content: string
}

export interface ITool {
    name: string,
    description: string,
    doc?: string,
    executor: (input: string) => Promise<string>
}


export class AgentBuilder {
    public instructions: string | undefined;
    public toolList: ITool[]

    constructor() {
        this.toolList = [];
    }

    public setInstructions(instructions: string | undefined) {
        this.instructions = instructions;
        return this;
    }

    public tool(t: ITool) {
        this.toolList.push(t);
        return this;
    }

    public build() {
        return new Agent(this);
    }

}


export class Agent {

    private instructions: string;
    private messageHistory: IMessage[]
    private toolMap: Map<string, ITool>;
    private MAX_ITERATIONS = 30;
    private openai: OpenAI;


    constructor(builder: AgentBuilder) {
        this.toolMap = new Map();
        this.openai = new OpenAI({
            apiKey: "",
        });

        for (const t of builder.toolList) {
            this.toolMap.set(t.name, t);
        }

        this.instructions = harnessPrompt(builder.instructions, builder.toolList)
        this.messageHistory = [];
    }

    static builder() {
        return new AgentBuilder();
    }

    public async run(query: string) {

        this.messageHistory.push({ role: "user", "content": query });

        for (let i = 0; i < this.MAX_ITERATIONS; i++) {

            // make LLM call now

            const llmResponse = await this.openai.chat.completions.create({
                model: "gpt-5.4-mini",
                messages: [
                    { role: "system", content: this.instructions },
                    ...this.messageHistory.map(e => ({ role: e.role, content: e.content }))
                ]
            })

            const rawLLMResponse: string = llmResponse.choices[0]?.message.content as string;
            // push the response back to messagehistory
            this.messageHistory.push({ role: "assistant", content: rawLLMResponse });

            // parse the raw llm response to JSON object

            const parsedResult = JSON.parse(rawLLMResponse);


            // if the response is completed then return the message history and end the interation...

            if (parsedResult.step.toLowerCase() === "output") return this.messageHistory;


            // if there is some tool call...

            if (parsedResult.step.toLowerCase() === "tool_request") {

                const { functionName, input } = parsedResult

                const tool = this.toolMap.get(functionName);

                if (!tool) {
                    this.messageHistory.push({ role: "developer", content: `Error: function with name ${functionName} does not exists...` })
                    continue;
                }

                const toolReslt = await tool.executor(input);

                this.messageHistory.push({ role: "developer", content:JSON.stringify({
                    functionName,
                    input,
                    toolReslt
                }) });

            }

        }

    }

}