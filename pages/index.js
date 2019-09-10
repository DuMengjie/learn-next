import Layout from '../components/Layout';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { observer } from 'mobx-react';
import fetch from 'isomorphic-unfetch';

const Index = (props => {
  return (
    <Layout>
      <h1>Batman TV Shows</h1>
      <ul>
        {props.shows.map(show => (
          <li key={show.id}>
            <Link href="/p/[id]" as={`/p/${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="markdown">
        <Markdown
          source={`
      This is our blog post.
      Yes. We can have a [link](/link).
      And we can have a title as well.

      ### This is a title

      And here's the content.
        `}
          />
      </div>
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
  )
});

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;