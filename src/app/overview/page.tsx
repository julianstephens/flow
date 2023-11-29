import { FaColumns, FaPiggyBank, FaSignOutAlt } from "react-icons/fa";

const OverviewDashboard = () => {
  return (
    <div className="h-100 w-100 row">
      <div className="sidebar col h-100 w-25 py-lg ps-2xl d-flex flex-column justify-content-between border-end">
        <div>
          <p className="font-logo font-sm">flow</p>
          <nav className="module-nav font-xs mt-3xl">
            <ul className="d-flex flex-column p-0">
              <li>
                <a className="d-flex align-items-center">
                  <span>
                    <FaColumns />
                  </span>
                  Dashboard
                </a>
              </li>
              <li>
                <a className="d-flex align-items-center">
                  <span>
                    <FaPiggyBank />
                  </span>
                  Budgets
                </a>
              </li>
              <li>
                <a className="d-flex align-items-center">
                  <span>
                    <FaPiggyBank />
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <button className="logout font-xs">
          <span>
            <FaSignOutAlt />
          </span>
          Logout
        </button>
      </div>

      <div className="col h-100 pt-lg d-flex flex-column w-auto">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <h3>Welcome back, Shinji</h3>
          <div className="circle bg-blue" />
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
