const errorMessagesMap = new Map<string, string>([
    ["BeaconWalletNotInitialized", "Please synchronize your wallet."],
    ["UnknownBeaconError", "Unkown error."],
    ["MissedBlockDuringConfirmationError","Unkown error."],
    ["InvalidAddressError","Please synchronize your wallet."]

]);

function errorMapping(pattern: string): string  {
    for (let [key, value] of errorMessagesMap.entries()) {
        if (pattern.includes(key))
            return value;
    }
    return pattern;
} 

export { errorMapping };