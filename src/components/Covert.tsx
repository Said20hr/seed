import React, { useEffect, useState } from 'react';

const Convert = ({ onCryptoChange, onFiatChange }) => {
    const [crypto, setCrypto] = useState('BTC');
    const [fiat, setFiat] = useState('USD');
    const [fiatValue, setFiatValue] = useState('');
    const [cryptoValue, setCryptoValue] = useState(''); // Start with an empty string
    const [btcPrice, setBtcPrice] = useState('');
    const [loading, setLoading] = useState(true);

    // Function to calculate width based on input length
    const calculateWidth = (value) => {
        const minWidth = 6; // Minimum width
        const adjustedWidth = String(value).length + 2; // Add extra padding
        return `${Math.max(minWidth, adjustedWidth)}ch`; // Return width in 'ch' based on length
    };

    // Fetch price when crypto or fiat changes
    const fetchPrice = async () => {
        try {
            const crp = crypto.toLowerCase();
            const response = await fetch(`https://preev.com/api/v1/tickers/${crp}+usd`);
            const data = await response.json();
            const rate = data.p.bitstamp.l; // Get the current price
            setBtcPrice(rate); // Store the price for conversions

            // Update fiat value if cryptoValue is set
            if (cryptoValue !== '') {
                const newFiatValue = parseFloat(cryptoValue) * parseFloat(rate); // Convert BTC to fiat
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
        setCryptoValue(value); // Keep the original string for display
        const newValue = parseFloat(value); // Parse the value as a float
        if (!isNaN(newValue) && btcPrice) {
            const newFiatValue = newValue * parseFloat(btcPrice); // Convert BTC to fiat
            setFiatValue(newFiatValue.toFixed(2)); // Set to 2 decimal places
        } else {
            setFiatValue('');
        }
    };

    // Update fiat value based on cryptoValue and current price
    const updateFiat = (value) => {
        const newValue = parseFloat(value); // Parse the value as a float
        if (!isNaN(newValue) && btcPrice) {
            const newCryptoValue = newValue / parseFloat(btcPrice); // Convert fiat to crypto
            setCryptoValue(newCryptoValue.toFixed(6)); // Set to 6 decimal places
            setFiatValue(value); // Keep the original string for display
        } else {
            setCryptoValue('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-fit mx-auto">
            {cryptoValue.length > 14 ? (
                <div className="flex flex-col items-center">
                    <input
                        type="text" // Change type to text for unlimited digits
                        name="cryptoValue"
                        value={cryptoValue}
                        onChange={(e) => updateCrypto(e.target.value)} // Call the update function
                        className="inputs text-4xl rounded-l-lg"
                        style={{ width: calculateWidth(cryptoValue) }} // Dynamically set width
                    />
                    <select
                        name="crypto"
                        onChange={(e) => {
                            const selectedCrypto = e.target.value;
                            setCrypto(selectedCrypto);
                            onCryptoChange(selectedCrypto); // Notify parent about the selected crypto
                            updateCrypto(cryptoValue); // Recalculate based on existing crypto value
                        }}
                        className="inputs text-2xl rounded-r-lg my-2"
                    >
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="DOGE">DOGE</option>
                        <option value="LTC">LTC</option>
                    </select>
                    <div className="text-4xl text-gray-800 dark:text-white my-2">=</div>
                    <input
                        type="number"
                        name="fiatValue"
                        value={fiatValue}
                        onChange={(e) => updateFiat(e.target.value)} // Update based on fiat input
                        className="inputs text-4xl rounded-l-lg"
                        style={{ width: calculateWidth(fiatValue) }} // Dynamically set width
                    />
                    <select
                        name="fiat"
                        onChange={(e) => {
                            const selectedFiat = e.target.value;
                            setFiat(selectedFiat);
                            onFiatChange(selectedFiat); // Notify parent about the selected fiat
                            updateFiat(fiatValue); // Recalculate based on existing fiat value
                        }}
                        className="inputs text-2xl rounded-r-lg my-2"
                    >
                        <option value="USD">USD</option>
                        <option value="EURO">EURO</option>
                        <option value="GBP">GBP</option>
                        <option value="DZD">DZD</option>
                    </select>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <input
                        type="text" // Change type to text for unlimited digits
                        name="cryptoValue"
                        value={cryptoValue}
                        onChange={(e) => updateCrypto(e.target.value)} // Call the update function
                        className="inputs text-4xl rounded-l-lg"
                        style={{ width: calculateWidth(cryptoValue) }} // Dynamically set width
                    />
                    <select
                        name="crypto"
                        onChange={(e) => {
                            const selectedCrypto = e.target.value;
                            setCrypto(selectedCrypto);
                            onCryptoChange(selectedCrypto); // Notify parent about the selected crypto
                            updateCrypto(cryptoValue); // Recalculate based on existing crypto value
                        }}
                        className="inputs text-2xl rounded-r-lg"
                    >
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="DOGE">DOGE</option>
                        <option value="LTC">LTC</option>
                    </select>
                    <div className="text-4xl text-gray-800 dark:text-white">=</div>
                    <input
                        type="number"
                        name="fiatValue"
                        value={fiatValue}
                        onChange={(e) => updateFiat(e.target.value)} // Update based on fiat input
                        className="inputs text-4xl rounded-l-lg"
                        style={{ width: calculateWidth(fiatValue) }} // Dynamically set width
                    />
                    <select
                        name="fiat"
                        onChange={(e) => {
                            const selectedFiat = e.target.value;
                            setFiat(selectedFiat);
                            onFiatChange(selectedFiat); // Notify parent about the selected fiat
                            updateFiat(fiatValue); // Recalculate based on existing fiat value
                        }}
                        className="inputs text-2xl rounded-r-lg"
                    >
                        <option value="USD">USD</option>
                        <option value="EURO">EURO</option>
                        <option value="GBP">GBP</option>
                        <option value="DZD">DZD</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default Convert;
