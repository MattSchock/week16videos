import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch
} from 'react-router-dom';

export default function App() {
  const posts = [
    {
      id: 1,
      title: 'My First Post',
      date: '4-7-2020',
      content: 'This is my first post!'
    },
    {
      id: 2,
      title: 'Checking in',
      date: '4-8-2020',
      content: 'Yesterday was a good day, looking forward to another!'
    },
    {
      id: 3,
      title: 'Vacation time!',
      date: '4-9-2020',
      content: 'Finally time to head to Cancun for our trip!'
    }
  ];

  return (
    <Container>
      <Router>
        <div>
          <ButtonGroup>
            <Button variant="outline-secondary">
              <Link to="/">Home</Link>
            </Button>
            <Button variant="outline-secondary">
              <Link to="/friends">Friends</Link>
            </Button>
            <Button variant="outline-secondary">
              <Link to="/posts">Posts</Link>
            </Button>
          </ButtonGroup>
          
          <Routes>
            <Route path='posts'>
              <Posts posts={posts} />
            </Route>
            <Route path="/friends">
              <Friends names={['Tom', 'Sally', 'Samantha']} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Routes>
        </div>
      </Router>
    </Container>
  );
}

function Home() {
  return <h2>Home</h2>
};

function Friends(props) {
  const { names } = props;

  return (
    <div>
      <ul>
        {names.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>
  );
}

function Posts( { posts }) {
  const match = useMatch();
  const findPostById = (id) =>
  posts.filter((post) => post.id ==id)[0];

  return (
    <div>
      <h2>Posts</h2>
      
        {posts.map((post, index) => {
          return (
            <Alert key={index} variant="primary">
              <Link to={`${match.url}/${post.id}`}>
                {post.title}
              </Link>
            </Alert>
          );
        })}
      
      <Routes>
        <Route
        path={`${match.path}/:postId`}
        render={(props) => (
          <Post
            {...props}
            data={findPostById(props.match.params.postId)}
            />
        )}
        />
        <Route path={match.path}>
          <h3>Please Select a Post</h3>
        </Route>
      </Routes>
    </div>
  );
}

function Post(props) {
  const { data } = props;
  return (
    <Card>
      <Card.Header>{data.title}</Card.Header>
      <Card.Body>
        <Card.Subtitle>{data.date}</Card.Subtitle>
        <Card.Text>{data.content}</Card.Text>
      </Card.Body>

    </Card>
  );
}