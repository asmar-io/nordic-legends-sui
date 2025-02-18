import { createContext, useState, useEffect } from "react";
import { SuiClient } from "@mysten/sui.js/client";
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';



export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    const [mintSuccessBanner, setMintSuccessBanner] = useState(false);
    const address = useCurrentAccount();
    const suiClient = useSuiClient();

    const getWalletBalance = async () => {
        if (!walletAddress) return;
        try {
            const balance = await suiClient.getBalance({
                owner: walletAddress,
            });
            setWalletBalance(Number(balance.totalBalance));
        } catch (error) {
            console.error("Failed to fetch wallet balance:", error);
        }
    };


    useEffect(() => {
        if (address) {
            setWalletAddress(address.address);
            getWalletBalance();
        }
    }, [address]);



    const handleMintSuccessBanner = () => {
        setMintSuccessBanner(true);
    }

    useEffect(() => {
        getWalletBalance();
    }, [walletAddress]);

    const value = {
        walletAddress,
        setWalletAddress,
        walletBalance,
        setWalletBalance,
        getWalletBalance,
        mintSuccessBanner,
        setMintSuccessBanner,
        handleMintSuccessBanner,
    };


    return <Context.Provider value={value}>{children}</Context.Provider>;
};
