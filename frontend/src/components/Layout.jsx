import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="h-[50px] bg--300 flex items-center">
        <ul className="flex items-center gap-3 m-5">
          <li className="p-3 hover:border-b-4 hover:text-blue-400 border-blue-500">
            <Link to="/">Home</Link>
          </li>
          <li className="p-3 hover:border-b-4 hover:text-blue-400 border-blue-500">
            <Link to="/users">Users</Link>
          </li>
          <li className="p-3 hover:border-b-4 hover:text-blue-400 border-blue-500">
            <Link to="/user-homes">User-Homes</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;