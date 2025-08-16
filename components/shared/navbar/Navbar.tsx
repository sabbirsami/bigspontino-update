/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import RevealText from '@/components/animation/text/RevealText';
import DownArrowIcon from '@/components/icons/DownArrowIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  const pathname = usePathname();
  const { t, i18n, ready } = useTranslation();



  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = async (languageCode: string) => {
    if (i18n && typeof i18n.changeLanguage === 'function') {
      try {
        await i18n.changeLanguage(languageCode);
        setIsLanguageSheetOpen(false);
      } catch (error) {
        console.error('Failed to change language:', error);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Handle booking button click - direct redirect to OpenTable
  const handleBookTable = () => {
    window.open('https://www.opentable.de/restref/client/?restref=441969', '_blank');
  };

  const isI18nReady = mounted && ready && i18n;
  const currentLanguage = isI18nReady ? i18n.language : 'en';

  const navLinks = [
    { href: '/', label: t('navigation.home') || 'Home' },
    { href: '/menus', label: `Il Menu (${t('navigation.menu') || 'menus'})` },
    {
      href: '/events',
      label: `Eventi (${t('navigation.events') || 'events'})`,
    },
    {
      href: '/history',
      label: `La Storia (${t('navigation.history') || 'history'})`,
    },
    {
      href: '/impressions',
      label: `Impressioni  (${t('navigation.impressions') || 'Bildgalerie'})`,
    },
    {
      href: '/contact',
      label: `Contatto (${t('navigation.contact') || 'contact'} )`,
    },
    {
      href: '/jobs',
      label: `Lavori (${t('navigation.jobs') || 'Stellen'})`,
    },
  ];

  const socialLinks = [{ href: 'https://www.instagram.com/bigspuntino/', label: 'Instagram' }];

  const processText = (text: string) => {
    const parts = text.split('(');
    const mainText = parts[0].trim();
    const bracketed = parts[1] ? `(${parts[1]}` : '';
    return { mainText, bracketed };
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isScrolled ? 0 : 1,
          y: isScrolled ? -100 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={cn(
          'flex items-center px-3 overflow-y-hidden sm:px-4 py-10 text-white md:px-6 fixed top-0 z-50 w-full',
          isScrolled && 'py-4',
        )}
      >
        {/* Animated background overlay */}
        {/* <motion.div
          className="absolute inset-0 bg-secondary/10 backdrop-blur-sm -z-10"
          initial={{ y: '-100%' }}
          animate={{
            y: isScrolled ? '0%' : '-100%',
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        /> */}

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="flex cursor-pointer items-center gap-1 sm:gap-2 text-sm  md:text-2xl z-20">
            <span>{t('navigation.menu') || 'Menu'}</span>
            <div className="relative">
              <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
                <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </motion.div>
            </div>
          </SheetTrigger>
          <SheetContent className=" rounded-none border border-primary bg-transparent pointer-events-none text-white w-full sm:w-xl">
            <div className="w-full h-full bg-primary pointer-events-auto rounded-none">
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
                <div
                  style={{ height: 'calc(100vh)' }}
                  className="w-full flex gap-0.5 flex-col h-full md:items-center items-start justify-center px-4 sm:px-8 md:ps-16 md:pe-10 relative"
                >
                  {/* Riservare button at the top */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      y: isOpen ? 0 : -20,
                    }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="absolute top-4 left-4 sm:left-8 md:left-10"
                  >
                    <motion.button
                      onClick={() => {
                        handleBookTable();
                        setIsOpen(false);
                      }}
                      className="group relative inline-flex h-12 sm:h-14 items-center cursor-pointer justify-center overflow-hidden rounded-none font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* SVG Pattern Background */}
                      <div
                        className="absolute inset-0 bg-white"
                        style={{
                          backgroundImage: "url('/assets/divider-15.svg')",
                          backgroundSize: '40px auto',
                        }}
                      />

                      {/* Button Content */}
                      <div className="relative z-10 inline-flex h-12 sm:h-14 translate-y-0 items-center justify-center text-lg sm:text-xl px-8 text-secondary transition group-hover:-translate-y-[150%] rounded-none font-medium tracking-wide">
                        {t('buttons.bookTable') || 'Book A Table'}
                      </div>

                      {/* Hover State */}
                      <div className="absolute inset-0 z-10 inline-flex h-12 sm:h-14 w-full translate-y-[100%] items-center justify-center text-lg sm:text-xl bg-[#000c71] px-8 text-white transition duration-300 group-hover:translate-y-0 rounded-none font-medium tracking-wide">
                        {t('buttons.bookTable') || 'Book A Table'}
                      </div>
                    </motion.button>
                  </motion.div>

                  <div className="flex flex-col gap-0.5 md:items-center md:justify-center justify-start items-start w-full">
                    {navLinks.map((link, index) => {
                      const { mainText, bracketed } = processText(link.label);
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{
                            opacity: isOpen ? 1 : 0,
                            x: isOpen ? 0 : -30,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: isOpen ? index * 0.1 : 0,
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full md:flex md:justify-center flex justify-start"
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`block font-medium md:text-center text-start relative after:absolute md:after:bottom-1.5 after:bottom-0.5 after:left-0 md:after:h-[3px] after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 dark:after:bg-background after:bg-background  after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 hover:italic  ${
                              pathname === link.href ? 'italic after:scale-x-100' : ''
                            }`}
                          >
                            <div className="flex items-center gap-1 text-white sm:gap-2 md:gap-2.5">
                              <span className="text-3xl md:text-4xl  lg:text-5xl leading-tight">
                                {mainText}
                              </span>
                              {bracketed && (
                                <span className="text-xs sm:text-sm md:text-lg lg:text-xl uppercase leading-tight italic font-narrow">
                                  {bracketed.split('(')[1].split(')')[0]}
                                </span>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      y: isOpen ? 0 : 20,
                    }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="md:hidden block"
                  >
                    <div className="mt-10 mb-1 gap-4 w-full">
                      <h5 className="text-lg text-left">{t('social.title') || 'Social'}</h5>
                    </div>
                    {socialLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isOpen ? 1 : 0,
                          x: isOpen ? 0 : -20,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: 1.2 + index * 0.1,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={link.href}
                          target="_blank"
                          onClick={() => setIsOpen(false)}
                          className={`block text-3xl font-medium text-left relative after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 dark:after:bg-secondary after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 hover:italic ${
                            pathname === link.href ? 'italic after:scale-x-100' : ''
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </SheetHeader>
            </div>
          </SheetContent>
        </Sheet>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Link href={'/'} className="">
            <motion.div
              className="py-2"
              animate={{
                scale: isScrolled ? 0.6 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/assets/logo-white.png"
                alt="Big Spuntino - Authentic Italian Restaurant Hamburg"
                width={100}
                height={100}
                className="w-auto h-16 md:h-20 lg:h-24"
                priority
                quality={100}
              />
            </motion.div>
          </Link>
        </div>

        <div className="flex items-center ml-auto z-20">
          <motion.div
            className="lg:flex hidden items-center gap-1 sm:gap-2 pe-2 sm:pe-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <Link
                target="_blank"
                href={'https://www.instagram.com/bigspuntino/'}
                className="text-primary"
              >
                <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="w-3 sm:w-4 h-[1px] lg:block hidden bg-gray-100"></div>

          <Sheet open={isLanguageSheetOpen} onOpenChange={setIsLanguageSheetOpen}>
            <SheetTrigger className="cursor-pointer flex items-center gap-1 text-sm sm:gap-2 md:text-2xl z-20">
              {currentLanguage === 'en' ? (
                <motion.span
                  className={`transition-colors duration-200 flex items-center gap-1 md:px-3 ${
                    currentLanguage === 'en' ? 'text-white ' : 'hover:text-primary'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  English <DownArrowIcon className="!font-normal text-white" />
                </motion.span>
              ) : (
                <motion.span
                  className={`transition-colors duration-200 flex items-center gap-1 md:px-3 ${
                    currentLanguage === 'de' ? 'text-white ' : 'hover:text-primary'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Deutsch <DownArrowIcon className="!font-normal text-white" />
                </motion.span>
              )}
            </SheetTrigger>
            <SheetContent side="right" className="rounded-none pointer-events-none w-full sm:w-xl">
              <div className="w-full h-full bg-background pointer-events-auto rounded-none">
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="h-full w-full flex items-center justify-end text-end px-20">
                  <div className="">
                    <h2 className="text-lg sm:text-xl lg:text-xl  opacity-75 font-bold mb-10">
                      {t('language.title') || 'Language'}
                    </h2>
                    <div className="">
                      <motion.button
                        onClick={() => changeLanguage('en')}
                        className={`cursor-pointer transition-colors text-4xl uppercase mb-6 duration-200 ${
                          currentLanguage === 'en' ? 'text-primary ' : 'hover:text-primary'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <RevealText>{t('language.english') || 'English'}</RevealText>
                      </motion.button>
                    </div>
                    <div className="">
                      <motion.button
                        onClick={() => changeLanguage('de')}
                        className={`cursor-pointer transition-colors text-4xl uppercase duration-200 ${
                          currentLanguage === 'de' ? 'text-primary ' : 'hover:text-primary'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <RevealText>Deutsch</RevealText>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden sm:block">
            <motion.button
              onClick={handleBookTable}
              className="group relative inline-flex h-8 sm:h-9 md:h-10 items-center cursor-pointer justify-center overflow-hidden rounded-none font-medium"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="inline-flex h-8 sm:h-9 md:h-10 translate-y-0 items-center justify-center bg-primary text-sm sm:text-lg md:text-xl lg:text-2xl px-3 sm:px-4 md:px-6 text-white transition group-hover:-translate-y-[150%] rounded-none">
                <span className="hidden sm:inline">
                  {t('buttons.bookTable') || 'Book A Table'}
                </span>
                <span className="sm:hidden">
                  {t('buttons.book') || 'Book'}
                </span>
              </div>
              <div className="absolute inline-flex h-8 sm:h-9 md:h-10 w-full translate-y-[100%] items-center justify-center text-sm sm:text-lg md:text-xl lg:text-2xl bg-background px-3 sm:px-4 md:px-6 text-secondary transition duration-300 group-hover:translate-y-0 rounded-none">
                <span className="hidden sm:inline">
                  {t('buttons.bookTable') || 'Book A Table'}
                </span>
                <span className="sm:hidden">
                  {t('buttons.book') || 'Book'}
                </span>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 overflow-y-hidden bg-background  flex justify-between items-center h-10 ">
        <div className="flex-1 ">
          <motion.button
            onClick={handleBookTable}
            className="group relative inline-flex h-11 md:h-11 items-center cursor-pointer justify-center overflow-hidden rounded-none font-medium w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="inline-flex h-11 md:h-11 translate-y-0 items-center justify-center bg-primary  px-3 sm:px-4 md:px-6 text-white transition group-hover:-translate-y-[150%] rounded-none w-full">
              <span className="">
                {t('buttons.bookTable') || 'Book A Table'}
              </span>
            </div>
            <div className="absolute inline-flex h-11 md:h-11 w-full translate-y-[100%] items-center justify-center  bg-background px-3 sm:px-4 md:px-6 text-secondary transition duration-300 group-hover:translate-y-0 rounded-none">
              <span className="">
                {t('buttons.bookTable') || 'Book A Table'}
              </span>
            </div>
          </motion.button>
        </div>
        <Link
          href={'/menus'}
          className="px-8 h-full flex items-center justify-center border-x-1 bg-primary text-white border-white"
        >
          Menu
        </Link>
        <motion.button
          className=" bg-primary h-10 aspect-square flex items-center justify-center w-10"
          onClick={scrollToTop}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center">
            <DownArrowIcon className="w-5 h-5 rotate-180 text-white" />
          </div>
        </motion.button>
      </div>




    </>
  );
};

export default Navbar;
