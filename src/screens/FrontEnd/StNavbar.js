import React from 'react'

const StNavbar = () => {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light  fixed-top"
          style={{
            backgroundColor: "#fff",
            boxShadow: "0px 10px 11px 0px rgba(0, 0, 0, 0.24)",
          }}
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src="img/connection.png"
                alt
                width={30}
                height={24}
                className="d-inline-block align-text-top"
              />
              <span className="BioName">| BioRmutt</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="row collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 namehome">
                <li className="nav-item">
                  <a
                    className="nav-link active NavBarName"
                    aria-current="page"
                    href="#"
                  >
                    หน้าแรก
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link NavBarName" href="#">
                    สารเคมี
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link NavBarName" href="#">
                    อุปกรณ์
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link NavBarName" href="#">
                    รายการเบิกสารเคมี
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link NavBarName" href="#">
                    รายการยืมอุปกรณ์
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link NavBarName dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    ตะกร้าอุปกรณ์และสารเคมี
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        สารเคมี
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        อุปกรณ์
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {/* <i class="fas fa-user-circle"></i> */}
          </div>
        </nav>
      </div>
    );
}

export default StNavbar
