import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

function Header({ title }) {
    return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
    const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

    const [likes, setLikes] = useState(0);

    function handleClick() {
        setLikes(likes + 1);
    }

    return (
        <div>
            <Head>
                <title>Ciaran&apos;s app</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="Develop. Preview. Ship. 🚀" />
            <ul>
                {names.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>

            <button onClick={handleClick}>Like ({likes})</button>

            <h1 className="text-3xl text-black hover:text-red-600 font-bold underline">
                Read <Link href="/posts/first-post">this page!</Link>
            </h1>

            <Image
                src="/images/profile.jpg" // Route of the image file
                height={144} // Desired size with correct aspect ratio
                width={144} // Desired size with correct aspect ratio
                alt="Your Name"
            />
        </div>
    );
}