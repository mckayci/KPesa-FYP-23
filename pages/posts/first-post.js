import Head from 'next/head';



export async function getServerSideProps(context) {
    const lastSnapshot = await fetch('https://data.smartdublin.ie/dublinbikes-api/last_snapshot');

    const body = await lastSnapshot.json();
    const data = body.map(station => station.id);

    return {
        props: { stationIds: data }, // will be passed to the page component as props
    }
}

export default function FirstPost({ stationIds }) {
    return <>
        <Head>
            <title>First Post</title>
        </Head>
        <h1>First post</h1>
        <ul>
            {stationIds.map(id => <li key={id}>{id}</li>)}
        </ul>
    </>;
}

