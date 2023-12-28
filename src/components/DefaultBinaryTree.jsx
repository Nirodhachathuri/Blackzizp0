
import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';

export default function DefaultBinaryTree() {
    const [selection, setSelection] = useState([]);
    const [data] = useState([
        {
            label: 'Dev',
            className: 'bg-[#151515] text-[#ffffff] shadow-lg shadow-black border-[#565656] border-opacity-40 border-[1px]',
            expanded: true,
            children: [
                {
                    label: 'debv66',
                    className: 'bg-[#151515] text-[#ffffff] shadow-lg shadow-black border-[#565656] border-opacity-40 border-[1px]',
                    expanded: true,
                    
                },
                {
                    label: 'Dev55',
                    className: 'bg-[#151515] text-[#ffffff] shadow-lg shadow-black border-[#565656] border-opacity-40 border-[1px]',
                    expanded: true,
                    children: [
                        {
                            className: 'bg-[#151515] text-[#ffffff] shadow-lg shadow-black border-[#565656] border-opacity-40 border-[1px]',
                            label: 'User'
                        },
                        {
                            className: 'bg-[#151515] text-[#ffffff] shadow-lg shadow-black border-[#565656] border-opacity-40 border-[1px]',
                            label: 'dev4'
                        }
                    ]
                }
            ]
        }
    ]);

    return (
        <div className="card-tree overflow-x-auto w-full" id="style-5">
            <OrganizationChart
                value={data}
                selectionMode="single"
                selection={selection}
                onSelectionChange={(e) => setSelection(e.data)}
                pt={{
                    node: ({ context }) => ({
                        className: context.selected ? 'border-orange-400 border-round-sm' : 'border-primary-400 border-round-sm'
                    })
                }}
            />
        </div>
    )
}
        