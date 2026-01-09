import linkedin_logo from '../assets/linkedin.svg'
import github_logo from '../assets/github.svg'
import gmail_logo from '../assets/gmail.svg'

const Footer = () => {
  const cur_year = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-between gap-4 py-3">
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500">
        Copyright {cur_year} | Areeb Tahir
      </p>

      <div className="flex gap-3 px-6">
        <a href="mailto:areebtahir39@gmail.com">
          <img width={30} src={gmail_logo} alt="Gmail" />
        </a>
        <a href="https://www.linkedin.com/in/areeb-tahir-b16863267/">
          <img width={30} src={linkedin_logo} alt="LinkedIn" />
        </a>
        <a href="https://github.com/areebtahir97">
          <img width={30} src={github_logo} alt="GitHub" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;