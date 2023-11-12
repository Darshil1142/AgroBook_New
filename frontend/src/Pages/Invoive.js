import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppState } from "../App.js";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useData } from '../useContext/DataContext';

function Invoice() {
    const [customers, setCustomers] = useState([]);
    const [query, setQuery] = useState("")
    const useAppState = useContext(AppState);
    const userID = useAppState.UserId;

    const navigate = useNavigate();

    const { data, shopname } = useData();

    // const handleInvoice=(customer)=>{
    //        navigate(`/bill?customerName=${customer.firstname} ${customer.lastname}&customerPhone=${customer.phoneno}`);
    // }

    async function fetchCustomers() {
        try {


            fetch('http://localhost:4000/add/fetch_customers'
            ).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
                .then(data => {
                    setCustomers(data)
                })
                .catch(error => {
                    console.error('Error fetching Customers: ', error);

                })
        }
        catch (error) {
            window.alert(error);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="mt-4  flex justify-center items-center ">
                <input
                    type="text"
                    placeholder="Search Customer"
                    className="border-4 rounded-md border-[#1F3F49] px-2 py-1 mr-2 w-[60%] search_icon
                "
                    onChange={e => setQuery(e.target.value)}
                />
            </div>
            <div className='mt-8 flex justify-center items-center'>
                <table className="w-1/2 border-collapse">
                    <thead className="text-center">
                        <tr>
                            <th className=" rounded-tl-xl border-gray-700 bg-gray-700 text-white  py-2 text-center text-xs font-medium uppercase">
                                <div className="">CID </div>
                            </th>
                            <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">First Name</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Last Name</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Phone No</div>
                            </th>

                            <th className=" rounded-tr-xl border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Invoice</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.filter((customer) => customer.firstname.toLowerCase().includes(query.toLowerCase()) || customer.lastname.toLowerCase().includes(query.toLowerCase()) || customer.phoneno.includes(query)).map((customer, index) => (
                            <tr className='text-center capitalize hover:border-2 hover:border-black hover:rounded-md' style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#f8f8f8' }} key={customer._id} >
                                <td className='border border-gray-300 px-4 py-2 m-2 rounded bg-[1F3F49]'><p className='bg-gray-700 text-white w-8 h-8 rounded-full mt-1'>{index + 1}</p></td>
                                <td className='border border-gray-300 px-4 py-2'>{customer.firstname}</td>
                                <td className='border border-gray-300 px-4 py-2'>{customer.lastname}</td>
                                <td className='border border-gray-300 px-4 py-2'>{customer.phoneno}</td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    <Link to={`/bill?name=${customer.firstname} ${customer.lastname}&phoneno=${customer.phoneno}`}>
                                        <button className="category_del_btn">INVOICE</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default Invoice;