'use client';

import { Card } from '@/Components/Cards/Card';
import { CardContainer } from '@/Components/Cards/CardContainer';
import { AddCrypto } from "@/Components/Modals/AddCryptoModal"
import Nav from '@/Components/Nav/Nav';
import { getAllCrypto } from '@/Services/crypto';
import { CryptoProps } from '@/Utils/type';
import { useEffect, useState } from 'react';
import "../../../public/style.css";
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';




/**
 * Represents the props for the AnimatedCard component.
 */
type AnimatedCardProps = {
  /**
   * The data for the crypto card.
   */
  crypto: CryptoProps;

  /**
   * A function used to update the state of `isReloadNeeded` in the parent component.
   *
   * @param value - The new value for `isReloadNeeded`.
   */
  setIsReloadNeeded: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Renders an animated card component with hover effects.
 *
 * @param {AnimatedCardProps} props - The component props.
 * @param {CryptoProps} props.crypto - The crypto data for the card.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsReloadNeeded - The function to set the reload needed state.
 * @return {JSX.Element} The animated card component.
 */


const AnimatedCard = ({ crypto, setIsReloadNeeded }: AnimatedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    scale: isHovered ? 1.1 : 1,
  });

  return (
    <animated.div 
      key={crypto.name}
      className="w-72"
      style={props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/crypto/${crypto.name}`}>
        <Card
          CryptoProps={crypto}
          setIsReloadNeeded={setIsReloadNeeded}
        />
      </Link>
    </animated.div>
  );
};

/**
 * Renders the HomeUser component.
 *
 * @return {JSX.Element} The HomeUser component.
 */
const HomeUser = () => {
  const [cryptoList, setCryptoList] = useState<CryptoProps[]>([]);
  const [isReloadNeeded, setIsReloadNeeded] = useState(false);

  useEffect(() => {
    getAllCrypto()
      .then((res) => {
        setCryptoList(res);
        console.log(res);
      })
      .catch((err) => {
        console.error('Failed to fetch cryptos:', err);
      });
  }, [isReloadNeeded]);

  return (
    <div className='background1'>
    <main className="flex min-h-screen flex-col items-center justify-between p-24 background2" >
      <Nav />
      <AddCrypto setIsReloadNeeded={setIsReloadNeeded} />
      <h1>Exchange Avaliable: 👇</h1>
      <CardContainer>
        {cryptoList.map((crypto) => (
          <AnimatedCard
            key={crypto.name}
            crypto={crypto}
            setIsReloadNeeded={setIsReloadNeeded}
          />
        ))}
      </CardContainer>
    </main>
  </div> 
  );
};

export default HomeUser;