
import React, { useEffect, useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { env_data } from '../config/config';

export default function DefaultBinaryTree() {
    const [selection, setSelection] = useState([]);
    const [data,setData]=useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData=async ()=>{
        const resp = await axios.get(`${env_data.base_url}/token`);
        const decoded = jwt_decode(resp.data.accessToken);
        console.log(
            "loged user:",
            decoded
        );
        const user_id = decoded.userId;
        const response = await axios.get(
            `${env_data.base_url}/GetIrAllowance1/${user_id}`
        );
        console.log(
            "🚀 ~ file: Dashboard.jsx:54 ~ getRefUsers ~ response:",
            response.data.data
        );
        let resArr = response.data.data;
        // let downArray = response.data.data[0].downwardPyramid;

        // let chanArray = children.map(data=>{
            
        //     if(data.children){
        //         return{
        //             ...data,
        //             children:downArray,
        //         }
        //     }
         
        // })

        let mapedArr= resArr.map(user=>{
            return{
                ...user,
                label: user.username,
                className: 'bg-[#151515] text-[#ffffff] shadow-lg shadow-black border-[#565656] border-opacity-40 border-[1px]',
                expanded: true,
            }
        })

        // const mainArray = createNestedArray([], mapedArr, decoded.ref_code);
        
        setData(mapedArr);

    }

    

    return (
        <div className="card-tree overflow-x-auto w-full" id="style-5">
            {data.length>0 && <OrganizationChart
                value={data}
                selectionMode="single"
                selection={selection}
                onSelectionChange={(e) => setSelection(e.data)}
                pt={{
                    node: ({ context }) => ({
                        className: context.selected ? 'border-orange-400 border-round-sm' : 'border-primary-400 border-round-sm'
                    })
                }}
            />}
        </div>
    )
}

