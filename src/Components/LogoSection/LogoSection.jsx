import React from 'react';
import usaFlag from '../../assets/Images/usaflag.png';
import canada from '../../assets/Images/canda.png';

const LogoSection = ({ variant = 'navbar' }) => {
  const mainTextColor = variant === 'footer' ? '#ffffff' : '#032177';
  const subtitleColor = variant === 'footer' ? '#ffffff' : '#032177';
  const gradient =
    variant === 'footer'
      ? 'linear-gradient(to right, rgba(255,255,255,1), rgba(200,200,200,1))'
      : 'linear-gradient(to right, rgba(3,33,119,1), rgba(229,21,21,1))';

  return (
    <section className="min-w-[250px] h-auto relative flex flex-col justify-start items-start leading-none space-y-0">
      
      {/* Main Logo Text */}
      <p
        className="text-[50px] font-black flex justify-start items-center m-0 p-0 leading-none"
        style={{ color: mainTextColor }}
      >
        DUBA
        <span
          className="inline-block font-black bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${usaFlag})`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          N
        </span>
        <span
          className="inline-block font-black bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${canada})`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          A
        </span>
      </p>

      {/* Gradient Line */}
      <div
        className="h-[3px]"
        style={{
          background: gradient,
          width: '228px', // fixed — same across all devices
          marginTop: '0px',
          marginBottom: '0px',
        }}
      ></div>

      {/* Subtitle Text */}
      <div className="leading-none mt-0">
        <p
          className="text-sm font-normal tracking-normal m-0 p-0 leading-none"
          style={{ color: subtitleColor }}
        >
          DHAKA UNIVERSITY BIOCHEMISTRY
        </p>
        <p
          className="text-sm font-normal m-0 p-0 leading-none"
          style={{ color: subtitleColor, letterSpacing: '2px' }}
        >
          ALUMNI IN NORTH AMERICA
        </p>
      </div>
    </section>
  );
};

export default LogoSection;
