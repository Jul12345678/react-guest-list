import './App.css';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';

const pageStyle = css``;

const button = css``;

const guestList = css`
  margin-left: 5px;
`;

function App() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [list, setGuestList] = useState([]);
  const baseUrl = 'https://react-guest-list-host.herokuapp.com';
  const [isChecked, setIsChecked] = useState(false);

  // fetch list of guests from the server
  useEffect(() => {
    const fetchGuestList = async () => {
      const response = await fetch(`${baseUrl}/guests`);
      const listInfo = await response.json();
      setGuestList(listInfo);
    };

    fetchGuestList().catch((error) => {
      console.error(error);
    });
  }, []);

  // on submit click
  function handleSubmit(e) {
    e.preventDefault();

    async function newGuest() {
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      });
      const createdGuest = await response.json();
      window.location.reload(false);
      console.log(createdGuest);
      return createdGuest;
    }

    newGuest().catch((error) => {
      console.error(error);
    });
  }

  function handleDelete(id) {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'DELETE',
      });

      const deletedGuest = await response.json();
      window.location.reload(false);
      console.log(deletedGuest);
      return deletedGuest;
    }
    deleteGuest().catch((error) => {
      console.error(error);
    });
  }

  function handleUpdate(id, attending) {
    async function updateGuest() {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attending: !attending,
        }),
      });

      const updatedGuest = await response.json();

      window.location.reload(false);
      console.log(updatedGuest);
      return updatedGuest;
    }
    updateGuest().catch((error) => {
      console.error(error);
    });
  }

  return (
    <div data-test-id="guest" className="App">
      <header>
        <h1>Registration</h1>
      </header>

      <div>
        <form onSubmit={handleSubmit}>
          <label text="First name">
            First name:
            <input
              label="First name"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
          <br />
          <label text="Last name">
            Last name:
            <input
              label="Last name"
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>

          <button>Submit</button>
        </form>
      </div>
      {
        // table
      }
      <div>
        <table>
          <h1> Guest list:</h1>

          <tbody>
            <tr>
              <th>State Of Attendance</th>
              <th>F.Name / </th>
              <br />
              <br />
              <th>L.Name</th>
            </tr>
            {list.map((guest) => {
              return (
                <tr key={guest.id}>
                  <td>
                    {guest.attending ? 'Attending' : 'Not attending'}
                    <input
                      type="checkbox"
                      aria-label="attending"
                      onChange={() => {
                        handleUpdate(guest.id, guest.attending);
                        console.log(guest);
                      }}
                    />
                  </td>
                  <td> {guest.firstName} </td>
                  <td> {guest.lastName} </td>

                  <button
                    type="button"
                    onClick={() => handleDelete(guest.id)}
                    aria-label="Remove"
                  >
                    Remove
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

//  return (
//    <div className="App">
//      <header>
//        <h1>Register the guest:</h1>
//      </header>
//      {/* Personalia input fields */}
//      <form onSubmit={handleSubmit}>
//        <label>
//          <span>First name: </span>
//        </label>
//        <input
//          type="text"
//          id="firstName"
//          onChange={(e) => setFirstName(e.target.value)}
//        />
//        <br />
//        <br />
//        <label>Last name: </label>
//        <input
//          type="text"
//          id="lastName"
//          onChange={(e) => setLastName(e.target.value)}
//        />
//        <br />
//
//        <p>
//          <button>Submit</button>
//        </p>
//      </form>
//
//      {/* Tabelle */}
//      <h1 className="guestlist"> Guest list:</h1>
//
//      <table>
//        <tbody>
//          <tr>
//            <th></th>
//            <th>First Name</th>
//            <th>Last Name</th>
//          </tr>
//          {list.map((item) => {
//            <tr
//              key={item.id}
//              className={item.attending ? 'attending' : 'notAttending'}
//            >
//              <td>
//                <input
//                  type="checkbox"
//                  defaultChecked={checkboxes[item.id]}
//                  onChange={() => {
//                    setCheckboxes({ ...checkboxes, [item.id]: true });
//                  }}
//                />
//              </td>
//              <td>{item.firstName}</td>
//              <td>{item.lastName}</td>
//            </tr>;
//          })}
//        </tbody>
//      </table>
//
//      {/* Edit-Button */}
//      <p>
//        <label>
//          <button
//            type="button"
//            onClick={(item) => handleEdit(item.id)}
//            id="delete"
//          >
//            Confirm guest attendance
//          </button>
//        </label>
//      </p>
//
//      {/* Delete-Button */}
//      <p>
//        <label>
//          <button
//            type="button"
//            onClick={(guest) => handleDelete(guest.id)}
//            id="delete"
//          >
//            Delete guest
//          </button>
//        </label>
//      </p>
//    </div>
//  );
//}
//
// export default App;
