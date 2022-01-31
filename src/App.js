import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const baseUrl = 'https://react-guest-list-host.herokuapp.com/';

const pageStyle = css``;

const button = css``;

const guestList = css`
  margin-left: 5px;
`;

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestList, setGuestList] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [list, setList] = useState([]);

  // fetch list of guests from the server
  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch(
        `https://react-guest-list-host.herokuapp.com/`,
      );
      const info = await response.json();
      setGuestList(info);
    };

    fetchList().catch((error) => {
      console.error(error);
    });
  }, []);

  // on submit click
  const handleSubmit = (e) => {
    e.preventDefault();

    async function newGuest() {
      const response = await fetch(
        `https://react-guest-list-host.herokuapp.com/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
          }),
        },
      );
      const createdGuest = await response.json();
      window.location.reload();
      return createdGuest;
    }

    newGuest().catch((error) => {
      console.error(error);
    });
  };

  function handleDelete() {
    const checkboxKeys = Object.keys(isChecked);
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/${checkboxKeys}`, {
        method: 'DELETE',
      });

      const deletedGuest = await response.json();

      window.location.reload();
      return deletedGuest;
    }
    deleteGuest().catch((error) => {
      console.error(error);
    });
  }

  function handleEdit() {
    const checkboxKeys = Object.keys(isChecked);
    async function editGuest() {
      const response = await fetch(`${baseUrl}/${checkboxKeys}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attending: true,
        }),
      });

      const updatedGuest = await response.json();

      window.location.reload();
      return updatedGuest;
    }
    editGuest().catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Registration</h1>
      </header>
      <div css={pageStyle}>
        <form onSubmit={handleSubmit}>
          <label>First name:</label>
          <input
            type="text"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <label>Last name: </label>
          <input
            type="text"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
          <p>
            <button>Submit</button>
          </p>
        </form>

        {/* Guest list Table */}
        <h1 css={guestList}> Guest list:</h1>

        <table>
          <tbody>
            <tr>
              <th>First Name / </th>
              <br />
              <br />
              <th>Last Name</th>
            </tr>
            {list.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    aria-label="attending"
                    type="checkbox"
                    defaultChecked={isChecked[item.id]}
                    onChange={() => {
                      setIsChecked({ ...setIsChecked, [item.id]: true });
                    }}
                  />
                </td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{`*${item.attending}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          css={button}
          aria-label="Remove"
          onClick={(item) => handleDelete(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default App;
