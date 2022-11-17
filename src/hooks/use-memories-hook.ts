import { ethers } from 'ethers'
import React from 'react'
import { useContractInterface } from './use-contract-interface'
import { MemwallAbi, MemwallAbi__factory } from '../types/contracts';
import { MemorialWall } from '../types/contracts/MemwallAbi';
const MEMORIAL_WALL_ADDRESS = '0x393b3442Df6E5AF57E0222343058A9Bff7F7dDcd';

export const useMemoriesHook = (provider: ethers.providers.Web3Provider) => {

    const {contract} = useContractInterface<MemwallAbi>(
        MEMORIAL_WALL_ADDRESS,
        provider,
        MemwallAbi__factory
        )
    const [memories, setMemories] = React.useState<MemorialWall.MemoryMessageStructOutput[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)
    const [allowance, setAllowance] = React.useState<number>(0)
    const [carvingOntoWall, setCarvingOntoWall] = React.useState<boolean>(false)

    const setMemory = async (message: string, name: string) => {
        if(!contract) {
            throw new Error('Contract not found')
        }

        //todo approval
        //todo set allowance
        
        try {
            setLoading(true)
            const tx = await contract.addMemory(message, name, '')
            setCarvingOntoWall(true)
            await tx.wait()
            setCarvingOntoWall(false)
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            setError(error.message)
        }
    }
    const getMemories = async () => {
        try {
          
            setLoading(true)
            setMemories(await contract?.getMemories() || [])
            setLoading(false)
        } catch (error: any) {
            setError(error.message)
            setLoading(false)
        }
    }

    React.useEffect(() => {
        getMemories()
    }, [])

    return {
        memories,
        loading,
        error
    }
}