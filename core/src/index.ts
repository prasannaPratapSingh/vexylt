import { exec } from "child_process";
import { Agent, AgentBuilder } from "./app/agent.js";
import type { ITool } from "./app/agent.js";
import axios from "axios";

const weatherTool: ITool = {
    name: "fetchWeather",
    description: "smthng",
    async executor(cityName) {
        const url = `https://wttr.in/${cityName.toLowerCase()}?format=%C+%t`;
        const response = await axios.get(url, { responseType: 'text' });
        return JSON.stringify({ cityName, weatherInfo: response.data });
    },

}

const cliTool: ITool = {
    name: "executeCLI",
    description: "This tool executes cli commands",
    executor(cmd: string) {
        return new Promise((res, rej) => {
            exec(cmd, (err: any, out: any) => {
                if (err) return res(`There is some error while calling CLI Tool ${err}`);
                else return res(out);
            })
        })
    }
}

async function init() {
    const agent: Agent = Agent.builder()
        .setInstructions("You are a expert weather agent!!")
        .tool(weatherTool)
        .tool(cliTool)
        .build();
    const result = await agent.run("Tell the weather of Kanpur and create a bare minimum html file and write hello Vexylt in it ");
    console.log(result);
}

init()