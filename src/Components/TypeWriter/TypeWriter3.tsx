import React from 'react';

/**
 * Renders a TypeWriter component with a customized heading.
 *
 * @return {JSX.Element} The TypeWriter component.
 */
const TypeWriterWallet = () => {
    return (
        <div className="flex justify-center">
            <h1 className="relative mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white
                before:absolute before:inset-0 before:animate-typewriter before:bg-current
                after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-black">
                WALLET 🥮
            </h1>
        </div>
    );
};

export default TypeWriterWallet;
