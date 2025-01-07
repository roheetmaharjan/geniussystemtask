"use client"
import React from 'react'
import Link from 'next/link'
import styles from './Header.module.css'
import { Users, LayoutGrid } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
        <nav className={styles.nav}>
          {/* Logo Section */}
          <Link href="/">
            <h3 className={styles.logo}>GS</h3>
          </Link>
          {/* Navigation Section */}
          <ul className={styles.nav__links}>
            <li className={pathname === '/' ? styles.active : ''}>
              <Link href="/">
                <LayoutGrid size={24} strokeWidth={2} />
              </Link>
            </li>
            <li className={pathname.startsWith('/subscribers') ? styles.active : ''}>
              <Link href="/subscribers">
                <Users size={24} strokeWidth={2} />
              </Link>
            </li>
          </ul>
          {/* Right Navigation Section */}
          <ul className={styles.nav__bottom}>
            <li className={styles.nav__profile}>
              <Link href="/">
                <Image src="/user.jpg" alt="Ronaldo" width={50} height={50} />
              </Link>
            </li>
          </ul>
        </nav>
    </header>
  )
}

export default Header