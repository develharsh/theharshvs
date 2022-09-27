// import React from 'react'
import Link from "next/link";

const Header = () => {
  return (
    <div className="header-1cont-1div">
      <div className="header-1cont-2div">
        <div>
          <img
            src="https://media-exp1.licdn.com/dms/image/C4D03AQEGLgrAjJAXxA/profile-displayphoto-shrink_800_800/0/1662497414233?e=1668643200&amp;v=beta&amp;t=CZ10RzvMqinH_Rb8iRbdP61jGzzFTyStisCSQyi7Wuo"
            alt="harshvardhan singh's personal hompage"
            style={{ width: "6rem", borderRadius: "50%" }}
          />
        </div>
        <div>
          <p>Harshvardhan Singh</p>
          <p>Musings on coding, web/app development and technology</p>
        </div>
      </div>

      <div className="header-1cont-3div">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/blog">
          <a>Musings</a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
