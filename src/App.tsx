import { useState } from 'react';
import './App.css';
import Header from './components/header';
import Convert from './components/Covert';


function App() {
    const [selectedCrypto, setSelectedCrypto] = useState('BTC'); // Default to BTC
    const [selectedFiat, setSelectedFiat] = useState('USD'); // Default to USD

    return (
        <div className="min-h-screen">
            {/* Pass selected currencies as props to the Header */}
            <Header selectedCrypto={selectedCrypto} selectedFiat={selectedFiat} />
            <div className="flex w-full items-center h-screen justify-center">
                {/* Pass setSelectedCrypto and setSelectedFiat to Convert to update the header */}
                <Convert setSelectedCrypto={setSelectedCrypto} setSelectedFiat={setSelectedFiat} />
            </div>
        </div>
    );
}

export default App;
