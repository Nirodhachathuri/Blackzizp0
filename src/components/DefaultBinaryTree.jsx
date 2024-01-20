
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
        let resArr= response.data.data;
        resArr.push({id:decoded.userId,username: decoded.username ,user_code:decoded.user_code , ref_code:decoded.ref_code});
        let mapedArr= resArr.map(user=>{
            return{
                ...user,
                label: user.username,
                className: 'bg-[#151515] text-[#ffffff] shadow-lg shadow-black border-[#565656] border-opacity-40 border-[1px]',
                expanded: true,
            }
        })

        const mainArray = createNestedArray([], mapedArr, decoded.ref_code);
        console.log("mainArray ", mainArray)
        setData(mainArray);

    }

    const createNestedArray = (mainArray, dataArray, parentId) => {
        const result = [];
        for (const dataItem of dataArray) {
            if (dataItem.ref_code === parentId) {
                const newItem = {
                    id: dataItem.id,
                    username: dataItem.username,
                    user_code: dataItem.user_code,
                    ref_code: dataItem.ref_code,
                    label: dataItem.username,
                    className: 'bg-[#151515] text-[#ffffff] shadow-lg shadow-black border-[#565656] border-opacity-40 border-[1px]',
                    expanded: dataItem.expanded,
                };
                const children = createNestedArray(mainArray, dataArray, dataItem.user_code);
                if (children.length > 0) {
                    newItem.children = [];
                    newItem.downwardPyramid = [];

                    for (let i = 0; i < children.length; i++) {
                        if (i < 2) {
                            newItem.children.push(children[i]);
                        } else {
                            newItem.downwardPyramid.push(children[i]);
                        }
                    }

                }
                result.push(newItem);
            }
        }
        return result;
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

