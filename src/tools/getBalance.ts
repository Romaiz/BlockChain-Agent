import { Address, formatEther } from "viem";
import { createViemPublicClient } from "../viem/createViemPublicClient";
import { ToolConfig } from "./allTools";

interface GetBalanceArgs {
    wallet: Address;
}

export const getBalanceTool: ToolConfig<GetBalanceArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_balance',
            description: 'Get the balance of a wallet in ETH.',
            parameters: {
                type: 'object',
                properties: {
                    wallet: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The wallet address to check the balance of.',
                    }
                },

                required: ['wallet'],
            }
        }
    },

    handler: async ({ wallet}) => {
        const publicClient = createViemPublicClient();
        const balance = await publicClient.getBalance({ address: wallet });
        return formatEther(balance);
    }
};