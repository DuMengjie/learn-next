import Layout from '../../components/Layout';
import { requestShowDetail } from '../../services/public';

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
    <img src={props.show.image.medium} />
  </Layout>
);

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const show = await requestShowDetail(id);

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;