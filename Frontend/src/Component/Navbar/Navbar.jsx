import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../Redux/Slice/AuthSlice';

const Navbar = () => {
  const{user} = useSelector(state=>state.user)
  console.log(user)
  const dispatch = useDispatch()
  const menuItems = (
    <>
      <li>
        <Link to='/' className='hover:bg-neutral-focus hover:text-white transition-colors duration-200 rounded-btn'>
          Home
        </Link>
      </li>
      <li>
        <Link to='/events' className='hover:bg-neutral-focus hover:text-white transition-colors duration-200 rounded-btn'>
          Events
        </Link>
      </li>
      {user?.email && (
        <>
          <li>
            <Link to='/add-event' className='hover:bg-neutral-focus hover:text-white transition-colors duration-200 rounded-btn'>
              Add Event
            </Link>
          </li>
          <li>
            <Link to='/my-events' className='hover:bg-neutral-focus hover:text-white transition-colors duration-200 rounded-btn'>
              My Events
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className='navbar bg-neutral text-white shadow-lg px-4 md:px-8'>
      {/* logo + name */}
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost normal-case text-xl gap-2 hover:bg-neutral-focus'>
          <img
            src='/logo192.png'
            alt='Logo'
            className='h-8 w-8'
          />
          <span className='font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
            EventHub
          </span>
        </Link>
      </div>

      {/* desktop menu */}
      <div className='hidden md:flex'>
        <ul className='menu menu-horizontal px-1 gap-2'>{menuItems}</ul>
      </div>

      {/* auth area */}
      <div className='flex items-center gap-2'>
        {user?.email ? (
          <div className='dropdown dropdown-end'>
            <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar hover:bg-neutral-focus'>
              <div className='w-7 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2'>
                <img
                  src={user.photoURL || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                  alt='User avatar'
                  className='object-cover'
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52 border border-neutral-focus'
            >
              <li className='pointer-events-none font-semibold text-white'>
                {user.displayName || user.name || 'Anonymous User'}
              </li>
              <li>
                <Link to='/profile' className='hover:bg-neutral-focus hover:text-white'>
                  Profile
                </Link>
              </li>
              <li>
                <button 
                  onClick={()=>dispatch(logoutUser())} 
                  className='text-error hover:bg-error hover:text-white transition-colors duration-200'
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link 
            to='/login' 
            className='btn btn-primary ml-2 bg-gradient-to-r from-primary to-secondary border-0 text-white hover:opacity-90 transition-opacity'
          >
            Sign In
          </Link>
        )}

        {/* mobile hamburger */}
        <div className='md:hidden dropdown dropdown-end ml-2'>
          <label tabIndex={0} className='btn btn-ghost btn-circle hover:bg-neutral-focus'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52 border border-neutral-focus'
          >
            {menuItems}
            {/* auth-specific action in mobile menu */}
            {!user?.email ? (
              <li>
                <Link 
                  to='/login' 
                  className='bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                >
                  Sign In
                </Link>
              </li>
            ) : (
              <li>
                <button 
                  // onClick={onLogout} 
                  className='text-error hover:bg-error hover:text-white transition-colors duration-200'
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;