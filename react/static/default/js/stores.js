/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

'use strict';

const domContainer = document.getElementById('stores-app');
const initData = JSON.parse(domContainer.dataset.init);
const daysOfWeek = initData.resources.daysOfWeek.split(",");
const tableHeadersList = initData.resources.tableHeadersList.split(",");
const tableHeadersDetail = initData.resources.tableHeadersDetail.split(",");
const initDetail = daysOfWeek.map((day, i) => { return { "day": i, "openingTime": "", "closingTime": "", "open": null }; });

function App() {
    const [visibleStore, setVisibleStore] = React.useState();

    return (
        <table className="table-stores n">
            <thead>
                <tr>
                    <th className="table_header w e s">{tableHeadersList[0]}</th>
                    <th className="table_header e s">{tableHeadersList[1]}</th>
                    <th className="table_header e s">{tableHeadersList[2]}</th>
                </tr>
            </thead>
            <tbody>
                {initData.stores.map((row) => (
                    <tr className={`tr-stores ${visibleStore === row.id ? 'active' : ''}`} key={row.id} onClick={() => setVisibleStore(row.id)}>
                        <td className="table_detail w e s">{row.id}</td>
                        <td className="table_detail e s">{row.address}</td>
                        <td className="table_detail e s">{row.city}</td>
                        {visibleStore === row.id &&
                            <StoreDetails key={`detail-${row.id}`} id={visibleStore} />
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function StoreDetails(props) {
    const [editing, setEditing] = React.useState(false);
    const [viewDetails, setViewDetails] = React.useState(initDetail);
    const [editDetails, setEditDetails] = React.useState(initDetail);

    React.useEffect(() => {
        setViewDetails(initDetail);

        if (props.id) {
            fetch(initData.urls.GetDetails.toString(), {
                method: 'POST',
                body: JSON.stringify({
                    id: props.id,
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const parsed = JSON.parse(decodeURIComponent(data.openingHrs));
                    const newArr = initDetail.map((_, index) => parsed[index]);
                    setViewDetails(newArr);
                    setEditDetails(newArr);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

    }, [props.id]);

    function save() {
        fetch(initData.urls.Save.toString(), {
            method: 'POST',
            body: JSON.stringify({
                id: props.id,
                storeHours: editDetails
            })
        })
            .then(response => {
                setViewDetails(prevDetails => [...prevDetails], [...editDetails]);
                return response;
            }).then(() => {

            });
    }

    const update = (day, keyName, value) => {
        setEditDetails(prevState => {
            prevState[day][keyName] = value;
            return prevState;
        });
    };

    return (
        <td className="details">
            <ViewDetails data={viewDetails} editing={() => setEditing(!editing)} />
            {editing &&
                <div className="edit">
                    <EditDetails data={viewDetails} update={update} />
                    <TimeList />
                    <button type="button" className="button stores-button" onClick={() => save()}>{initData.resources.save}</button>
                </div>
            }
        </td>
    );
}

function DetailsTableHead() {
    return (
        <thead>
            <tr>
                <th className="table_header w e s">{tableHeadersDetail[0]}</th>
                <th className="table_header e s th-time">{tableHeadersDetail[1]}</th>
                <th className="table_header e s th-time">{tableHeadersDetail[2]}</th>
                <th className="table_header e s">{tableHeadersDetail[3]}</th>
            </tr>
        </thead>
    );
}

function ViewDetails(props) {
    return (
        <table className='table-details-view n' onClick={props.editing}>
            <DetailsTableHead />
            <tbody>
                {props.data.map(data => (
                    <tr key={data.day}>
                        <td className="table_detail">{daysOfWeek[data.day]}</td>
                        <td className="table_detail">{data.open && data.openingTime ? insert(data.openingTime, 2, ":") : '—'}</td>
                        <td className="table_detail">{data.open && data.closingTime ? insert(data.closingTime, 2, ":") : '—'}</td>
                        <td className="table_detail">{(data.open && data.closingTime && data.openingTime ? "yes" : "no")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

}

function EditDetails(props) {
    return (
        <table className="table-details-edit n">
            <DetailsTableHead />
            <tbody>
                {props.data.map(data => (
                    <tr key={data.day}>
                        <td className="table_detail w e s">{daysOfWeek[data.day]}</td>
                        <td className="table_detail e s"><input type="time" step="900" list="timelist" defaultValue={data.openingTime ? insert(data.openingTime, 2, ":") : ''} onInput={(e) => props.update(data.day, "openingTime", e.target.value.replace(":", ""))}></input></td>
                        <td className="table_detail e s"><input type="time" step="900" list="timelist" defaultValue={data.closingTime ? insert(data.closingTime, 2, ":") : ''} onInput={(e) => props.update(data.day, "closingTime", e.target.value.replace(":", ""))}></input></td>
                        <td className="table_detail e s center"><input type="checkbox" defaultChecked={data.open} onChange={(e) => props.update(data.day, "open", e.target.checked)}></input></td>
                    </tr>
                ))}
            </tbody>
        </table>);
}

// helpers
function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

function TimeList() {
    const arr = [];
    let i = 0;
    let j = 0;
    for (i = 0; i < 24; i++) {
        for (j = 0; j < 4; j++) {
            const time = i + ":" + (j === 0 ? "00" : 15 * j);
            arr.push(<option key={time}>{time}</option>);
        }
    }
    return (<datalist id="timelist">{arr}</datalist>);
}

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, domContainer);