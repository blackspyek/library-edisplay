import React from 'react';
import { HardDrive } from 'lucide-react';

const DiskSpace = () => {
    return (
        <div className="flex items-center space-x-2 text-black">
            <HardDrive className="w-6 h-6" />
            <div>
                <p className="font-semibold text-lg">Dysk</p>
                <p className="text-gray-500 text-sm">wolne 50%</p>
            </div>
        </div>
    );
};

export default DiskSpace;