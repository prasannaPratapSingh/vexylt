import { Agent,AgentBuilder } from "./app/agent.js";

async function init(){
    const agent:Agent=Agent.builder()
                      .setInstructions("Hey u are a philanthrophist")
                      .build();
    agent.run("This is the query!")
}

init()