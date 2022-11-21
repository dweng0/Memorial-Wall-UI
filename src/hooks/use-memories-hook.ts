import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useContractInterface as contractInterface } from "./use-contract-interface";
import { MemwallAbi, MemwallAbi__factory } from "../types/contracts";
import { MemorialWall } from "../types/contracts/MemwallAbi";
const MEMORIAL_WALL_ADDRESS = "0x393b3442Df6E5AF57E0222343058A9Bff7F7dDcd";

interface MemoriesHook {
  loading: boolean;
  error: string;
  carvingOnToWall: boolean /** mining  */;
  memories: MemorialWall.MemoryMessageStructOutput[];
  setMemory: (message: string, name: string, donation: string) => Promise<void>;
  getMemories: () => Promise<void>;
  setProvider: (provider: ethers.providers.Web3Provider) => void;
}

/**
 * This is a hook that interfaces with the memwall contract and returns an API that can be leveraged
 * @param provider
 * @returns {@see MemoriesHook}
 */
export const useMemoriesHook = (): MemoriesHook => {
  const [contract, setContract] = React.useState<MemwallAbi>();
  const [memories, setMemories] = React.useState<
    MemorialWall.MemoryMessageStructOutput[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [carvingOnToWall, setCarvingOnToWall] = React.useState<boolean>(false);
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider>();
    
  useEffect(() => { 
    if(!provider) return;
    const signer = provider.getSigner();
    const contract = contractInterface<MemwallAbi>(
      MEMORIAL_WALL_ADDRESS,
      signer,
      MemwallAbi__factory
    );
    contract.connect(provider.getSigner());
    setContract(contract);
  }, [provider])

  const providerCheck = () => { 
    if(!provider) {
      throw new Error("Please use set the provider with 'setProvider' before interacting with the contract");
    }
  }

  /**
   * Write the memory to the blockchain. Re fetches the memories after the transaction is mined
   * @param message 
   * @param name 
   * @param donation 
   */
  const setMemory = async (message: string, name: string, donation: string) => {
    providerCheck();
    if (!contract) {
      throw new Error("Contract not found");
    }

    if (isNaN(Number(donation)) || Number(donation) <= 0) {
      throw new Error("Please donate to the wall");
    }
    
    try {    
      const tx = await contract.addMemory(message, name, "", {
        value: ethers.utils.parseEther(donation),
        
      });
      setLoading(true);
      setCarvingOnToWall(true);
      await tx.wait();
      setCarvingOnToWall(false);
      setLoading(false);
      getMemories();
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const getMemories = async () => {
    providerCheck();
    try {
      setLoading(true);
      setMemories((await contract?.getMemories()) || []);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return {
    memories,
    loading,
    error,
    carvingOnToWall,
    setMemory,
    getMemories,
    setProvider
  };
};
