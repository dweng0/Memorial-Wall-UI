import { BaseContract, Signer, providers } from 'ethers'

export const useContractInterface = <T ,> (
    contractAddress: string, 
    signer: Signer | providers.Provider,
    Factory: {connect: (address: string, signer: Signer | providers.Provider) => BaseContract}
    ) => {

/**
 * Error boundary
 * @returns 
 */
if(!contractAddress || !signer || !Factory) {
    throw new Error('Missing contract address, signer, ABI, or Factory')
}
 
    const buildContract = (): T => {
        const contract = Factory.connect(contractAddress, signer)
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