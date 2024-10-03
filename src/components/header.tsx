import { Component } from 'react';
import { Icon } from '@iconify/react';

class Header extends Component {
    render() {
        return (
            <div className="px-6 inset-x-0 w-full h-20 border-b border-gray-200 flex justify-between items-center">
                <a href="/" className="hover:bg-gray-100 transition-all hover:text-slate-800 duration-300 border border-gray-100 text-white text-2xl px-1">
                    SEED
                </a>
                <div className="text-white flex gap-1 text-2xl">
                    <div className="font-bold">Ethereum</div>  to <div className="font-bold">US Dollar</div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-100 transition-all duration-300 group border border-slate-600 rounded-md">
                        <Icon icon="circum:dark" className="text-2xl text-gray-200 group-hover:text-slate-800"/>
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 transition-all duration-300 group border border-slate-600 rounded-md">
                        <Icon icon="mdi:cog" className="text-2xl text-gray-200 group-hover:text-slate-800"/>
                    </button>
                     <button className="p-1.5 hover:bg-gray-100 transition-all duration-300 group border border-slate-600 rounded-md">
                        <Icon icon="fe:warning" className="text-2xl text-gray-200 group-hover:text-slate-800"/>
                    </button>
                </div>

            </div>
        );
    }
}

export default Header;
