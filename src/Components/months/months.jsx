import { useEffect, useState } from "react";
import { db } from "../../config/firebase-config";
import { getDocs, collection, addDoc, updateDoc, doc, orderBy, query, where } from "firebase/firestore";
import "./months.css"
import { menu } from "../main/main.helper";

export const Months = ({ setMonth }) => {

    const [amount, setAmount] = useState(0)
    const [monthForFilter, setMonthForFilter] = useState("")
    const [amounts, setAmounts] = useState([])
    const DateCollectionRef = collection(db, "DateTimes");
    const getMonthList = async () => {
        if (monthForFilter !== "") {
            try {
                const data = await getDocs(DateCollectionRef)
                const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }));
                setAmounts(filteredData.filter(e => { return e.Added_Date.includes(monthForFilter) && e.disabled !== true }))
                const number = filteredData.filter((e) => { return e.Added_Date.includes(monthForFilter) && e.disabled !== true }).reduce((acc, current) => { return acc + +current.Income }, 0)
                setAmount(number)
            } catch (err) { console.log(err) }
        }
    }
    return (
        <div>
            <div className="monthsContainer">
                <div className="searchingForm">
                    <p onClick={() => setMonth(false)} style={{ position: "absolute", top: "-15px", right: "15px", "fontSize": "44px", color: "black", cursor: "pointer" }}>x</p>
                    <select onInput={(e) => setMonthForFilter(e.target.value)} value={monthForFilter}>
                        <option value="">Ամիս</option>
                        <option value="01.2024">Հունվար</option>
                        <option value="02.2024">Փետրվար</option>
                        <option value="03.2024">Մարտ</option>
                        <option value="04.2024">Ապրիլ</option>
                        <option value="05.2024">Մայիս</option>
                        <option value="06.2024">Հունիս</option>
                        <option value="07.2024">Հուլիս</option>
                        <option value="08.2024">Օգոստոս</option>
                        <option value="09.2024">Սեպտեմբեր</option>
                        <option value="10.2024">Հոկտեմբեր</option>
                        <option value="11.2024">Նոյեմբեր</option>
                        <option value="12.2024">Դեկտեմբեր</option>
                    </select>
                    <button onClick={() => getMonthList()} style={{ marginLeft: "10px" }}>Որոնել</button>
                </div>
                <h1>{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} դր</h1>
                <h3>Պատվերներ {amounts.length}</h3>
                <div>
                    {amounts?.map(item => {
                        return (
                            !item.disabled ? (
                                <div key={item.id} style={{ display: "flex", gap: "10px", marginTop: "10px" }} >
                                    <p>{menu[`${item.Room}`].room} </p>
                                    <p>{item.Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} դր</p>
                                    <p>-  {item.Added_Date}</p>
                                </div>
                            ) : null
                        )
                    })}
                </div>

            </div>
        </div>
    )
}