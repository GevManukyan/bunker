import { useEffect, useState } from "react";
import { db } from "../../config/firebase-config";
import { getDocs, collection, addDoc, updateDoc, doc, query, where } from "firebase/firestore";
import { getTimeDifference, getTodayDay, menu, optionsMenu } from "./main.helper";
import "./main.css"
import { Months } from "../months/months";
export const Main = () => {
    const [dateTimeList, setDateTimeList] = useState([]);
    const [room, setRoom] = useState("")
    const [dateTime, setDateTime] = useState("")
    const [updateHours, setUpdateHours] = useState("")
    const [filetrDate, setFilterDate] = useState("")
    const [amount, setAmount] = useState(0)
    const [month, setMonth] = useState(false)
    const DateCollectionRef = collection(db, "DateTimes");
    const futureDate = new Date().toISOString().split('T')[0]
    const [disabledButton, setDisabledButton] = useState(false)
    useEffect(() => { getDataList() }, [])

    const showMonth = () => setMonth(!month)

    const getDataList = async () => {
        try {
            const formattedToday = getTodayDay().formattedToday
            const q = query(DateCollectionRef, where("Added_Date", "==", `${formattedToday}`))
            const data = await getDocs(q)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
            const number = filteredData.filter((item) => { return item.disabled !== true }).reduce((acc, current) => { return acc + +current.Income }, 0)
            setAmount(number)
            setDateTimeList(filteredData.sort(function (a, b) { return (new Date(b.addedTimeforOrder.seconds)) - new Date(a.addedTimeforOrder.seconds) }));
        } catch (err) { console.log(err) }
    }

    const addDateTime = async () => {

        if (dateTime !== "" && room !== "") {
            setDisabledButton(true)
            const timeData = getTimeDifference(dateTime);
            const hoursDifference = `${timeData.hours}.${`${timeData.minutes / 60 * 10}`.slice(0, 4).replace(".", "")}`
            let answer = await addDoc(DateCollectionRef, {
                Room: room,
                time: dateTime,
                Hour: hoursDifference,
                Income: `${Math.ceil(menu[`${room}`].income * +hoursDifference)}`,
                Added_Date: timeData.formattedToday.formattedToday,
                Added_Hour: timeData.formattedToday.formattedTodayHour,
                addedTimeforOrder: new Date()
            })
            if (answer) setDisabledButton(false)
            setDateTime("")
            setRoom("")
            getDataList()
        } else if (room.includes('Nargile')) {
            setDisabledButton(true)
            const timeData = getTimeDifference(dateTime);
            await addDoc(DateCollectionRef, {
                Room: room,
                time: "-",
                Hour: "-",
                Income: `${menu[`${room}`].income}`,
                Added_Date: timeData.formattedToday.formattedToday,
                Added_Hour: timeData.formattedToday.formattedTodayHour,
                addedTimeforOrder: new Date()
            })
            setDisabledButton(false)
            setDateTime("")
            setRoom("")
            getDataList()
        }
    }

    const updateDateTime = async (id, roomName) => {
        if (updateHours != "") {
            const difference = getTimeDifference(updateHours);
            const hoursDifference = `${difference.hours}.${`${difference.minutes / 60 * 10}`.slice(0, 4).replace(".", "")}`
            const updateTime = doc(db, "DateTimes", id)
            await updateDoc(updateTime, { time: updateHours, Hour: hoursDifference, Income: (`${Math.ceil(menu[`${roomName}`].income * +hoursDifference)}`) })
            getDataList()
        }
    }

    const filterDateFunc = async () => {
        if (filetrDate.length > 0) {
            const timeFormat = filetrDate.split("-").reverse().join(".")
            try {
                const q = query(DateCollectionRef, where("Added_Date", "==", `${timeFormat}`))
                const data = await getDocs(q)
                const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }));
                const number = filteredData.filter((item) => { return item.disabled !== true }).reduce((acc, current) => { return acc + +current.Income }, 0)
                setAmount(number)
                setDateTimeList(filteredData.sort(function (a, b) { return (new Date(b.addedTimeforOrder.seconds)) - new Date(a.addedTimeforOrder.seconds) }));
            } catch (err) { console.log(err) }
        } else getDataList()
    }
    const deleteDate = async (id) => {
        const updateTime = doc(db, "DateTimes", id)
        await updateDoc(updateTime, { disabled: true })
        getDataList()
    }

    return (
        <div className="main">
            <div className="formDiv">
                <div className="addingForm">
                    <select onInput={(e) => setRoom(e.target.value)} value={room}>
                        <option value="">Սենյակ</option>
                        {
                            optionsMenu.map((e) => {
                                return <option value={e.key} key={e.key}>{e.room}</option>
                            })
                        }
                    </select>
                    <input type='text' onChange={(e) => setDateTime(e.target.value)} value={dateTime} />
                    <button onClick={() => addDateTime()} disabled={disabledButton}>Ավելացնել</button>
                    <button onClick={() => showMonth()}>Ամիսներ</button>
                </div>
                <div className="filterForm">
                    <input type='date' onChange={(e) => setFilterDate(e.target.value)} defaultValue={futureDate} />
                    <button onClick={() => filterDateFunc()}>Որոնել</button>
                </div>
                <h1 className="amount">{!isNaN(amount) ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "դր" : "Սպասում"}</h1>
            </div>
            <table>
                <thead className="listHeader">
                    <tr >
                        <th>Սենյակ</th>
                        <th>ժամը</th>
                        <th>Տևողություն (Ժամ)</th>
                        <th>Ամսաթիվ</th>
                        <th>Գրանցման Ժամ</th>
                        <th>Գումար (ԴՐ)</th>
                        <th>Թարմացում</th>
                    </tr>
                </thead>
                <tbody className="listItem">
                    {dateTimeList.map((elem) => {
                        return <tr key={elem.id} style={elem.disabled ? { opacity: "0.2", background: "grey", userSelect: "none" } : null} disabled={elem.disabled}>
                            <td>{menu[`${elem.Room}`].room}</td>
                            <td>{elem.time}</td>
                            <td>{!isNaN(elem.Hour) || elem.Hour == '-' ? `${elem.Hour}`.slice(0, 3) : "Սպասում"}</td>
                            <td>{elem.Added_Date}</td>
                            <td>{elem.Added_Hour}</td>
                            <td>{!isNaN(elem.Income) ? elem.Income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "դր" : "Սպասում"}</td>
                            {!elem.Room.includes("Nargile") ? (
                                <td>
                                    <input onChange={(e) => setUpdateHours(e.target.value)} disabled={elem.disabled} style={elem.disabled ? { pointerEvents: "none" } : null} />
                                    <button onClick={() => updateDateTime(elem.id, elem.Room)} disabled={elem.disabled} style={elem.disabled ? { pointerEvents: "none" } : null} >Թարմացնել</button>
                                </td>
                            ) : (
                                <td>-</td>
                            )}
                            <td onClick={() => deleteDate(elem.id)} className="deleteBtn" disabled={elem.disabled} style={elem.disabled ? { pointerEvents: "none" } : null}><p>X</p></td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className={month ? "showMonth" : "noneMonth"} >
                <Months setMonth={setMonth} />
            </div>
        </div>
    );
}