import { createPublicClient, http } from 'viem'
import { linea } from 'viem/chains'

export function createViemPublicClient() {
    return createPublicClient({
        chain: linea,
        transport: http(),
    });
}