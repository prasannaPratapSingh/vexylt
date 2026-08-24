export class AgentBuilder {
    public instructions: string | undefined;

    constructor() { }

    public setInstructions(instructions: string | undefined) {
        this.instructions = instructions;
        return this;
    }

    public build() {
        return new Agent(this);
    }
}

export interface IMessage {
    role: "user" | "assistant" | "developer",
    content: string
}


export class Agent {

    private instructions: string;
    private messageHistory:IMessage[]


    constructor(builder: AgentBuilder) {
        this.instructions = builder.instructions ?? "";
        this.messageHistory=[];
    }

    static builder() {
        return new AgentBuilder();
    }

    public async run(query: string) {
        console.log(query);
    }

}