import React, { useEffect, useState } from 'react';

const Convert = () => {
    const [crypto, setCrypto] = useState('BTC');
    const [fiat, setFiat] = useState('USD');
    const [fiatValue, setFiatValue] = useState('');
    const [cryptoValue, setCryptoValue] = useState('');
    const [btcPrice, setBtcPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    // Fetch price when crypto or fiat changes
    const fetchPrice = async () => {
        try {
            const crp = crypto.toLowerCase();
            const ftt = fiat.toLowerCase();
            const response = await fetch(`https://preev.com/api/v1/tickers/${crp}+${ftt}`);
            const data = await response.json();
            const rate = data.p.bitstamp.l; // Get the current price
            setBtcPrice(rate); // Store the price for conversions
            // Update fiat value if cryptoValue is set
            if (cryptoValue !== '') {
                const newFiatValue = Number(cryptoValue) * rate; // Convert BTC to fiat
                setFiatValue(newFiatValue.toFixed(2)); // Set to 2 decimal places
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching BTC price:", error);
        }
    };

    useEffect(() => {
        fetchPrice();
    }, [crypto, fiat]);

    // Method to update crypto value and calculate fiat value
    const updateCrypto = (value) => {
        const newValue = Number(value);
        setCryptoValue(value); // Keep the original string for display
        if (!isNaN(newValue) && btcPrice) {
            const newFiatValue = newValue * btcPrice; // Convert BTC to fiat
            setFiatValue(newFiatValue.toFixed(2)); // Set to 2 decimal places
        } else {
            setFiatValue('');
        }
    };

    // Update fiat value based on cryptoValue and current price
    const updateFiat = (value) => {
        const newValue = Number(value);
        if (!isNaN(newValue) && btcPrice) {
            const newCryptoValue = newValue / btcPrice; // Convert fiat to crypto
            setCryptoValue(newCryptoValue.toFixed(6)); // Set to 6 decimal places
            setFiatValue(value); // Keep the original string for display
        } else {
            setCryptoValue('');
        }
    };

    return (
        <>
            <div className="flex gap-6 items-center justify-center w-fit mx-auto">
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        name="cryptoValue"
                        value={cryptoValue}
                        onChange={(e) => updateCrypto(e.target.value)} // Call the update function
                        className="w-auto min-w-[5ch] max-w-[10ch] text-5xl text-white text-center h-20 p-4 border border-[#333] bg-black rounded-l-lg"
                        style={{ width: `${Math.max(5, String(cryptoValue).length * 2.5)}ch` }} // Dynamically set width
                    />
                    <select
                        name="crypto"
                        onChange={(e) => {
                            setCrypto(e.target.value);
                            updateCrypto(cryptoValue); // Recalculate based on existing crypto value
                        }}
                        className="w-auto min-w-[5ch] max-w-[10ch] text-2xl h-20 text-white text-center p-4 border border-[#333] bg-black rounded-r-lg"
                    >
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="DOGE">DOGE</option>
                        <option value="LTC">LTC</option>
                    </select>
                </div>
                <div className="text-4xl text-white">=</div>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        name="fiatValue"
                        value={fiatValue}
                        onChange={(e) => updateFiat(e.target.value)} // Update based on fiat input
                        className="w-auto min-w-[5ch] max-w-[10ch] text-5xl text-white text-center h-20 p-4 border border-[#333] bg-black rounded-l-lg"
                        style={{ width: `${Math.max(5, String(fiatValue).length * 2.5)}ch` }} // Dynamically set width
                    />
                    <select
                        name="fiat"
                        onChange={(e) => {
                            setFiat(e.target.value);
                            updateFiat(fiatValue); // Recalculate based on existing fiat value
                        }}
                        className="w-auto min-w-[5ch] max-w-[10ch] text-2xl h-20 text-white text-center py-4 px-2 border border-[#333] bg-black rounded-r-lg"
                    >
                        <option value="USD">USD</option>
                        <option value="EURO">EURO</option>
                        <option value="GBP">GBP</option>
                        <option value="DZD">DZD</option>
                    </select>
                </div>
                <div className="flex"></div>
            </div>
        </>
    );
};

export default Convert;
