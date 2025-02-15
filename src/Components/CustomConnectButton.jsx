import { ConnectButton } from '@mysten/dapp-kit';

export const CustomConnectButton = () => {
    return (
        <ConnectButton>
            {({ isConnected, isConnecting, connect, disconnect, address }) => {
                if (isConnected) {
                    return (
                        <div className='wallet-info'>
                            <span className='wallet-address' onClick={() => navigator.clipboard.writeText(address)}>
                                {address.slice(0, 6)}...{address.slice(-4)}
                            </span>
                            <button className='disconnect-btn' onClick={disconnect}>Disconnect</button>
                        </div>
                    );
                }

                return (
                    <button className='connect-btn' onClick={connect} disabled={isConnecting}>
                        {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </button>
                );
            }}
        </ConnectButton>
    );
};
