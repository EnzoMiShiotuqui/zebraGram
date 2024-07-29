import "./Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <p>Zebragram &copy; {currentYear}</p>
    </footer>
  )
}

export default Footer
