import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
   
     const [amount, setAmount] = useState(1);
     const [fromcurrency, setFromcurrency] = useState("USD");
     const [tocurrency, setTocurrency] = useState("INR");
     const [convertedamount, setConvertedamount] = useState(null);
     const [exchangerate, setExchangerate] = useState(null)

     useEffect(()=>{
      const getExchangeRate= async ()=>{
        try{
          let url=`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`;
          const response = await axios.get(url);
          setExchangerate(response.data.rates[tocurrency])
        }
        catch(err){
          console.error("Error: ",err)
        }}
      getExchangeRate();
     },[fromcurrency, tocurrency]);


     useEffect(()=>{
        if(exchangerate !== null){
          setConvertedamount((amount* exchangerate).toFixed(2))
        }
     },[amount, exchangerate]);


     const handle =(e)=>{
      const value = parseFloat(e.target.value)
         setAmount(value);
     };

     const handlefrom =(e)=>{
      setFromcurrency(e.target.value);
     }

     const handleto =(e)=>{
      setTocurrency(e.target.value)
     }
 
  return (
   <div className="app">
     <div className='box'></div>

     <div className='data'>
      <h1>Currency Converter</h1>
      <div className="input-container">
        <label>Amount: </label>
        <input type="number" name="" value={amount} onChange={handle} id="amt"/>
         </div>

         <div className='input-container'>
          <label>From Currency:</label>
          <select id="fromcurrency" value={fromcurrency} onChange={handlefrom}>
            <option value="EUR">EUR - Euro</option>
            <option value="USD">USD - United states Dollar</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="BRL">BRl - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
            
          </select>
         </div>

         <div className='input-container'>
          <label>To Currency: </label>
          <select id="tocurrency" value={tocurrency} onChange={handleto}>
          <option value="EUR">EUR - Euro</option>
            <option value="USD">USD - United states Dollar</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="BRL">BRl - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
         </div>

           <div className='result'>
            <p>{amount} {fromcurrency} is equal to {convertedamount} {tocurrency}</p>
           </div>
     </div>
   </div>
  )
}
export default App;
