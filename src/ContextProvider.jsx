import { createContext, useState, useEffect } from "react";
import { SuiClient } from "@mysten/sui.js/client";


export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    const [mintSuccessBanner, setMintSuccessBanner] = useState(false);

    const getWalletBalance = async () => {
        if (!walletAddress) return;
        try {
            const balance = await SuiClient.getBalance({
                owner: walletAddress,
            });
            setWalletBalance(Number(balance.totalBalance));
        } catch (error) {
            console.error("Failed to fetch wallet balance:", error);
        }
    };

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