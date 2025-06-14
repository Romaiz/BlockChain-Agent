import OpenAI from "openai";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { Thread } from "openai/resources/beta/threads/threads";

export async function createRun(client: OpenAI, thread: Thread, assistantId: string) : Promise<Run> {

    let run = await client.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId,
    });

    while (run.status === 'in_progress' || run.status === 'queued') {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
        run = await client.beta.threads.runs.retrieve(run.id, {
            thread_id: thread.id,
        });
    }

    return run;
}  
