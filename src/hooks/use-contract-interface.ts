import { BaseContract, providers } from 'ethers'

export const useContractInterface = <T ,> (
    contractAddress: string, 
    provider: providers.Web3Provider,
    Factory: {connect: (address: string, provider: providers.Web3Provider) => BaseContract}
    ) => {

/**
 * Error boundary
 * @returns 
 */
if(!contractAddress || !provider || !Factory) {
    throw new Error('Missing contract address, provider, ABI, or Factory')
}
 
    const buildContract = (): T => {
        const contract = Factory.connect(contractAddress, provider)
        return contract as T
    }

    const initContract = () => {
        try {
            return buildContract() as T;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    return initContract();

}