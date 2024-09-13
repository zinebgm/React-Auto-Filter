import { useEffect, useState } from "react"
import AutoFilterDropdown from "./AutoFilterDropdown"



const AutoFilterTest = ()  => {
    const [choosenUser, setChoosenUser] = useState(null);
    const [choosenCountry, setChoosenCountry] = useState(null);
    const [users, setUsers] = useState([]);
    const contries = [
        { name: "USA" },
        { name: "Canada" },
        { name: "Mexico" },
        { name: "England" },
        { name: "France" },
        { name: "Germany" },
        { name: "Spain" },
    ];

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setUsers(data))
    }, [])

  return (
    <div>
        <h2>Auto Filter Dropdown</h2>
        <div>
            <h3>Select a user</h3>
            <AutoFilterDropdown
              data={users}
              filterKey="name"
              valueChange={(choosenUser) => setChoosenUser(choosenUser)}
              />
            {choosenUser && <p>Selected User : {choosenUser.name}</p>}
        </div>

        <div>
            <h3>Select a country</h3>
            <AutoFilterDropdown
              data={contries}
              filterKey="name"
              valueChange={(choosenCountry) => setChoosenCountry(choosenCountry)}
            />
            {choosenCountry && <p>Selected Country : {choosenCountry.name}</p>}
        </div>
    </div>
  );
};

export default AutoFilterTest;