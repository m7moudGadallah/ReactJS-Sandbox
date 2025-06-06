import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [selectedBillSplitForm, setSelectedBillSplitForm] = useState(null);

  function onAddFriend(friend) {
    friend.id =
      friends.reduce((acc, curr) => (curr = Math.max(curr.id, acc)), 0) + 1;
    setFriends([...friends, friend]);
  }

  function onSplitFormSubmit(friend) {
    setFriends(friends.map((f) => (f.id === friend.id ? friend : f)));
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedBillSplitForm={selectedBillSplitForm}
          setSelectedBillSplitForm={setSelectedBillSplitForm}
        />
        {showAddFriendForm && <AddFriendForm onAddFriend={onAddFriend} />}
        <button
          className="button"
          onClick={() => setShowAddFriendForm(!showAddFriendForm)}
        >
          {showAddFriendForm ? "Close" : "Add Friend"}
        </button>
      </div>
      {selectedBillSplitForm && (
        <SplitBillForm
          friend={selectedBillSplitForm}
          onSubmit={onSplitFormSubmit}
          setSelectedBillSplitForm={setSelectedBillSplitForm}
        />
      )}
    </div>
  );
}

function FriendList({
  friends,
  selectedBillSplitForm,
  setSelectedBillSplitForm,
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          isSelected={selectedBillSplitForm?.id === friend.id}
          onSelectBillForm={() =>
            setSelectedBillSplitForm(
              selectedBillSplitForm?.id === friend.id ? null : friend
            )
          }
        />
      ))}
    </ul>
  );
}

function Friend({ friend, isSelected, onSelectBillForm }) {
  const { name, image, balance } = friend;

  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className={balance < 0 ? "red" : "green"}>
        {balance < 0
          ? `You owe ${name} ${-balance}`
          : `${name} owes you ${balance}`}
        &euro;
      </p>
      <button onClick={onSelectBillForm} className="button">
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function AddFriendForm({ onAddFriend }) {
  const friendInit = {
    name: "",
    image: "https://i.pravatar.cc/48",
    balance: 0,
  };
  const [friend, setFriend] = useState(friendInit);

  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => {
        e.preventDefault();
        onAddFriend(friend);
        setFriend(friendInit);
      }}
    >
      <label htmlFor="friend-name">👫 Friend name</label>
      <input
        type="text"
        value={friend.name}
        onChange={(e) => setFriend({ ...friend, name: e.target.value })}
        id="friend-name"
      />
      <label htmlFor="friend-image">🌄 Image URL</label>
      <input
        type="text"
        value={friend.image}
        onChange={(e) => setFriend({ ...friend, image: e.target.value })}
        id="friend-image"
      />
      <input type="submit" value="Add" className="button" />
    </form>
  );
}

function SplitBillForm({ friend, onSubmit, setSelectedBillSplitForm }) {
  const [bill, setBill] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const friendExpense = bill - yourExpense;
  const [payer, setPayer] = useState("you");

  return (
    <form
      className="form-split-bill"
      onSubmit={(e) => {
        e.preventDefault();

        if (!bill || yourExpense > bill) return;

        onSubmit({
          ...friend,
          balance:
            friend.balance + (payer === "you" ? friendExpense : -friendExpense),
        });
        setSelectedBillSplitForm(null);
      }}
    >
      <h2>Split A Bill With {friend.name}</h2>

      <label htmlFor="bill-value">💰 Bill value</label>
      <input
        id="bill-value"
        type="number"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label htmlFor="your-expense">🧍‍♀️ Your expense</label>
      <input
        id="your-expense"
        type="number"
        value={yourExpense}
        onChange={(e) => setYourExpense(+e.target.value)}
      />

      <label htmlFor="friend-expense">{`👫 ${friend.name}'s expense`}</label>
      <input id="friend-expense" type="number" value={friendExpense} disabled />

      <label htmlFor="who-is-paying">🤑 Who is paying the bill</label>
      <select
        id="who-is-paying"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
      >
        <option value="you">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <input type="submit" className="button" value="Split bill" />
    </form>
  );
}
