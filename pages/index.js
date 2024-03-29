import Layout from '../components/Layout';
import Link from 'next/link';
import { requestShowList } from '../services/public';
import '../styles/index.scss';

const Index = (props => {
  return (
    <Layout>
      <h1>Batman TV Shows</h1>
      <ul>
        {props.shows.map(show => (
          <li key={show.id}>
            <Link href='/p/[id]' as={`/p/${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
          h1,
          a {
            font-family: 'Arial';
          }

          ul {
            padding: 0;
          }

          li {
            list-style: none;
            margin: 5px 0;
          }

          a {
            text-decoration: none;
            color: blue;
          }

          a:hover {
            opacity: 0.6;
          }
        `}</style>
    </Layout>
  );
});

Index.getInitialProps = async function() {
  const data = await requestShowList();
  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;
