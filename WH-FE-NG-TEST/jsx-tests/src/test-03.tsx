/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";

const style = {
  table: {
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
    },
  },
} as const;
type UserInfo = {
  userFirstname: string;
  userLastname: string;
  userPhone: number;
};
function PhoneBookForm({ addEntryToPhoneBook }) {
  const [userData, setUserData] = useState<UserInfo>({
    userFirstname: "Coder",
    userLastname: "Byte",
    userPhone: 8885559999,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addEntryToPhoneBook(userData);
        // setUserData({} as UserInfo);
      }}
      style={style.form.container}
    >
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        value={userData.userFirstname}
        onChange={(e) => handleInputChange(e)}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        value={userData.userLastname}
        onChange={(e) => handleInputChange(e)}
        type="text"
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        value={userData.userPhone}
        onChange={(e) => handleInputChange(e)}
        type="text"
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
}

function InformationTable({ phoneBookList }) {
  const sortByLastName = (
    users: {
      userFirstname: string;
      userLastname: string;
      userPhone: number;
    }[] = []
  ) => {
    return users.sort(function (a, b) {
      if (a.userLastname.toLowerCase() < b.userLastname.toLowerCase()) {
        return -1;
      }
      if (a.userLastname.toLowerCase() > b.userLastname.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  };
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {sortByLastName(phoneBookList).map((phone) => (
          <tr key={phone.userFirstname + phone.userLastname}>
            <td>{phone.userFirstname}</td>
            <td>{phone.userLastname}</td>
            <td>{phone.userPhone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Application(props) {
  const [phoneBook, setPhoneBook] = useState<
    { userFirstname: string; userLastname: string; userPhone: number }[]
  >([]);
  const addEntryToPhoneBook = (entry) => {
    setPhoneBook((prev) => [...prev, entry]);
  };
  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable phoneBookList={phoneBook} />
    </section>
  );
}

ReactDOM.render(<Application />, document.getElementById("test-03"));
