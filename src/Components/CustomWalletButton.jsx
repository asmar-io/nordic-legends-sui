import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import SuiLogo from '../Assets/images/SuiLogo.png';

const CustomWalletButton = () => {
    const currentAccount = useCurrentAccount();
    const { mutate: disconnect } = useDisconnectWallet();

    const handleConnect = async () => {
        try {
            // Trigger the wallet connection process
            await window.suiWallet.requestPermissions();
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };

    const handleDisconnect = () => {
        disconnect();
    };

    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <button
            onClick={currentAccount ? handleDisconnect : handleConnect}
            className="custom-wallet-btn"
        >
            {currentAccount ? (
                <div className="connected-wallet">
                    <span className="address">{formatAddress(currentAccount.address)}</span>
                    <span className="disconnect">Disconnect</span>
                </div>
            ) : (
                <div className="connect-wallet">
                    <img src={SuiLogo} alt="Sui Logo" />
                    <span>Connect Wallet</span>
                </div>
            )}
        </button>
    );
};

export default CustomWalletButton;
