import { get } from "http";
import { getBalanceTool } from "./getBalance";
import { sendTransactionTool } from "./sendTransaction";

export interface ToolConfig<T=any> {
    definition: {
        type: 'function';
        function: {
            name: string;
            description: string;
            parameters: {
                type: 'object';
                properties: Record<string, unknown>;
                required: string[];
            };
        };
    };
    handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
    get_balance: getBalanceTool,
    send_transaction: sendTransactionTool,
}