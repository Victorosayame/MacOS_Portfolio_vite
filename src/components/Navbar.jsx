import dayjs from 'dayjs'
import { navIcons, navLinks } from '#constants'


//step3: Create a Navbar component that includes the logo, navigation links, icons, and current date/time. Use the dayjs library to format the date and time display. The component is structured with two main sections: one for the logo and navigation links, and another for the icons and date/time display. The navigation links and icons are rendered dynamically from the imported constants, allowing for easy updates in the future.

const Navbar = () => {
  return (
    <nav>
      <div>
        <img 
          src='/images/logo.svg'
          alt='logo'
        />
        <p className='font-bold'>Victor's Portfolio</p>

        <ul>
          {navLinks.map(({id, name}) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>

      </div>

      <div>
        <ul className='max-xl:ml-4'>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className='icon-hover' />
            </li>
          ))}
        </ul>

        <time className='max-xl:text-xs'>
          {dayjs().format("ddd MMM D h:mm A")}
        </time>
      </div>
    </nav>
  )
}

export default Navbar