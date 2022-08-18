import { NavLink } from 'react-router-dom';
import Authenticate from '@/containers/Authenticate';
import useStore from '@/store';
import shallow from 'zustand/shallow';
import style from './Menu.module.scss';

const Menu = () => {
  const [user, onLogout] = useStore(
    (state) => [state.user, state.onLogout],
    shallow,
  );
  return (
    <section data-name="Menu">
      <nav className={style.root}>
        <NavLink className={style.navItem} to="/">
          Home
        </NavLink>

        {!user && (
          <NavLink className={style.navItem} to="/login">
            login
          </NavLink>
        )}
        <NavLink className={style.navItem} to="/video">
          Video
        </NavLink>
        <Authenticate>
          <button
            className={style.navItem}
            onClick={() => {
              onLogout();
            }}
          >
            Logout
          </button>
        </Authenticate>
      </nav>
    </section>
  );
};
export default Menu;
