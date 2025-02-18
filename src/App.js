import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
// import { WalletProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ConnectWallet from "./Pages/ConnectWallet";
import { ContextProvider } from "./ContextProvider";
import Mint from "./Pages/Mint";
const queryClient = new QueryClient();

const networks = {
  localnet: { url: getFullnodeUrl("localnet") },
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider autoConnect={true}>
          <ContextProvider>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/connectwallet" element={<ConnectWallet />} />
                <Route path="/mint" element={<Mint />} />
              </Routes>
            </BrowserRouter>
          </ContextProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default App;
