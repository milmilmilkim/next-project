import Link from 'next/link';

export default function Nav() {
  const menuList = [
    {
      name: 'home',
      path: '/',
    },
    {
      name: 'villager',
      path: '/villager',
    },
  ];
  return (
    <>
      <nav>
        <ul>
          {menuList.map((menu) => (
            <li key={menu.path}>
              <Link href={menu.path}>{menu.name} </Link>
            </li>
          ))}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          margin: 20px 0 20px;
        }
        ul {
          display: flex;
        }
        ul li {
          margin-right: 10px;
        }
      `}</style>
    </>
  );
}
