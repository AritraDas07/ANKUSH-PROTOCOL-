import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Ankush Protocol',
    projectId: '04e03063529329759af501620023a591', // Public WalletConnect Project ID for testing
    chains: [baseSepolia],
    ssr: true,
});
