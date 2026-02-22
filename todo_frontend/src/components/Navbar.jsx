import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Todo App</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/new" style={styles.link}>New Todo</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "#111",
    color: "#ff6a00"
  },
  logo: {
    margin: 0
  },
  link: {
    color: "#ff6a00",
    marginLeft: "20px",
    textDecoration: "none"
  }
};

export default Navbar;