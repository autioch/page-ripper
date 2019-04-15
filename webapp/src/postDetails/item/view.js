import React from 'react';

import './styles.scss';

const ArrayDetailView = ({ value }) => (
  <ul className="post-detail__array">
    {value.map((item) => <li key={item}>{item}</li>)}
  </ul>
);

const TextDetailView = ({ value }) => (
  <div className="post-detail__text">{value}</div>
);

const JsonDetailView = ({ value }) => (
  <div className="post-detail__json">{JSON.stringify(value, null, '  ')}</div>
);

function ContentView({ value }) {
  if (Array.isArray(value)) {
    return <ArrayDetailView value={value} />;
  }

  if (typeof value === 'string') {
    return <TextDetailView value={value} />;
  }

  return <JsonDetailView value={value} />;
}

const PostDetailView = ({ detail: [key, value] }) => (
  <div className="post-detail">
    <div className="post-detail__header">{key}</div>
    <ContentView value={value} />
  </div>
);

export default PostDetailView;
