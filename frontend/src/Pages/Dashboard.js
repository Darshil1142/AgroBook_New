import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar.js";
import Itemtable from "../component/Itemtable.js";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Contact from "../component/Contact.js";
import AddCustomer from "../Admin/FormInput.js";
import ItemForm from "../Admin/ItemForm.js";
import CategoryList from "./CategoryList.js";
import CustomerList from "./CustomerList.js";
import ItemList from "./ItemList.js";
import Sell from "./Sell.js";
import Analysis from "./Analysis.js";
import Payment from './Payment.js';
import { set } from "mongoose";
import Invoice from "./Invoive.js";
// import { Link } from 'react-router-dom'
export default function Dashboard() {


  const links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact Us", link: "/contact" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Customer List", link:"/CustomerList"}
    //{ name: "Payment", link:"/payment"}
  ];

  //for sell page
  const [formData, setFormData] = useState({
    customerId: "",
    customerFirstname: "",
    customerLastname: "",
    customerPhone: "",
  });

  const [history, sethistory] = useState(false);
  const [contact, setContact] = useState(false);
  const [customerList, setcustomerList] = useState(false);
  const [itemList, setitemList] = useState(false);
  const [recent, setrecent] = useState(false);
  const [invoice, setinvoice] = useState(false);
  const [addCustomer, setAddCustomer] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [categoryList, setcategoryList] = useState(false);
  const [sell, setSell] = useState(false);
  const [analysis, setAnalysis] = useState(false);
  const [payment, setPayment] = useState(false);

 useEffect(()=>{
  const name = localStorage.getItem('name') ; 
  if(name === 'customerList') setcustomerList(true) ;
  if(name === 'itemList') setitemList(true) ;
  if(name === 'categoryList') setcategoryList(true) ;
  if(name === 'invoice') setinvoice(true) ;
 }, [])

  return (
    <>
      <div className='md:h-20 h-12'>
        <Navbar links={links} setAddCustomer={setAddCustomer} setitemList={setitemList} setContact={setContact} setAddItem={setAddItem} setcategoryList={setcategoryList} setcustomerList={setcustomerList} setPayment={setPayment} setSell={setSell} setinvoice={setinvoice} />
      </div>
      <div className="flex flex-row mb-2 ">
        <div className="md:w-1/6 w-2/4 bg-gray-200 border-2 p-4 my_side_bar">
          <table className="place-items-center w-full text-[#1F3F49] capitalize md:text-xl font-medium tracking-wide">
            <tr
              className={`border-b-2 mt-2 hover:bg-gray-300 hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer `}
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/control-panel--v2.png"
                alt="control-panel--v2"
                className="mr-3"
              />
              DashBoard
            </tr>
            <tr className="mt-2 border-b-2  hover:bg-gray-300 hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer">
              History
            </tr>
            <tr
              className={`mt-2 border-b-2 hover:bg-gray-300 hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer ${customerList ? "bg-[#1F3F49] text-white" : ""
                }`}
            >
              <Link
                to="/dashboard"
                onClick={() => {
                  setAddItem(false);
                  setContact(false);
                  setAddCustomer(false);
                  setcategoryList(false);
                  setitemList(false);
                  setSell(false);
                  setAnalysis(false);
                  setPayment(false);
                  setinvoice(false)
                  setcustomerList(true);
                  localStorage.setItem('name','customerList') ;
                }}
              >
                Customer List
              </Link>
            </tr>
            <tr
              className={`mt-2 border-b-2 hover:bg-gray-300 hover:text-black border-slate-500 h-20  flex items-center justify-center cursor-pointer ${itemList ? "bg-[#1F3F49] text-white" : ""
                }`}
            >
              <Link
                to="/dashboard"
                onClick={() => {
                  setAddItem(false);
                  setContact(false);
                  setAddCustomer(false);
                  setcategoryList(false);
                  setSell(false);
                  setAnalysis(false);
                  setPayment(false)
                  setcustomerList(false);
                  setinvoice(false)
                  setitemList(true);
                  localStorage.setItem('name','itemList') ;
                }}
              >
                Item List
              </Link>
            </tr>
            <tr
              className={`mt-2 border-b-2 hover:bg-gray-300 hover:text-black  border-slate-500 h-20  flex items-center justify-center  cursor-pointer ${categoryList ? "bg-[#1F3F49] text-white" : ""
                }`}
            >
              <Link
                to="/dashboard"
                onClick={() => {
                  setAddItem(false);
                  setitemList(false);
                  setAddCustomer(false);
                  setContact(false);
                  setSell(false);
                  setcustomerList(false);
                  setAnalysis(false);
                  setPayment(false);
                  setinvoice(false)
                  setcategoryList(true);
                  localStorage.setItem('name','categoryList') ;
                }}
              >
                categoryList
              </Link>
            </tr>
            <tr className={`mt-2 border-b-2 hover:bg-gray-300 hover:text-black  border-slate-500 h-20  flex items-center justify-center  cursor-pointer ${categoryList ? "bg-[#1F3F49] text-white" : ""
              }`}>
              <Link
                to="/dashboard"
                onClick={() => {
                  setAddItem(false);
                  setitemList(false);
                  setAddCustomer(false);
                  setContact(false);
                  setSell(false);
                  setcustomerList(false);
                  setAnalysis(false);
                  setPayment(false);
                  setcategoryList(false);
                  setinvoice(true);
                  localStorage.setItem('name','invoice') ;
                }}
              >
                Invoice
              </Link>
            </tr>

            <tr className="hover:uppercase mt-4 h-20 flex  hover:bg-gray-300 items-center  justify-center  cursor-pointer"></tr>
          </table>
        </div>
        <div className='md:w-3/4 w-2/4 ml-72'>
          {itemList ? <Itemtable /> : contact ? <Contact /> : addCustomer ? <AddCustomer /> : addItem ? <ItemForm /> : categoryList ? <CategoryList /> : customerList ? <CustomerList setAddCustomer={setAddCustomer} setitemList={setitemList} setContact={setContact} setAddItem={setAddItem} setcategoryList={setcategoryList} setcustomerList={setcustomerList} setPayment={setPayment} setSell={setSell} setFormData={setFormData} setinvoice={setinvoice} /> : sell ? <Sell formData={formData} setAddCustomer={setAddCustomer} setitemList={setitemList} setContact={setContact} setAddItem={setAddItem} setcategoryList={setcategoryList} setcustomerList={setcustomerList} setPayment={setPayment} setSell={setSell} setFormData={setFormData} setinvoice={setinvoice} /> : payment ? <Payment /> : analysis ? <Analysis /> : invoice ? <Invoice /> : null}
        </div>
      </div>
    </>
  );
}