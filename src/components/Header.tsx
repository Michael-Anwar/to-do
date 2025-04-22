import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../context/AuthProvider";
import { useTodos } from "../context/TodoProvider"; // Adjust the import path as necessary

const Header = () => {
  const { currentUser, handleLogout } = useAuth();
  const { filter, setFilter } = useTodos();

  const now = new Date();
  const hour = now.getHours();
  let greeting = "Hello";
  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = now.toLocaleDateString("en-GB", options);

  return (
    <div className="header">
      <div className="">
        <h1>{`${greeting}, ${currentUser?.name} 🤩`} <IoIosLogOut onClick={() => handleLogout()} /></h1>
        <p>it's {formattedDate}</p>
      </div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'incomplete')}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};

export default Header;