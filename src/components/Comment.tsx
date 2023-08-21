'use client';

import React from 'react';
const attrs = [
  ['repo', 'yjleeinkr/yj-log'],
  ['issue-term', 'pathname'],
  ['theme', 'github-light'],
  ['crossorigin', 'anonymous'],
];

const makeUtteranceScript = () => {
  const script = document.createElement('script');
  script.src = 'https://utteranc.es/client.js';
  script.async = true;
  attrs.forEach(attr => {
    script.setAttribute(attr[0], attr[1]);
  });
  return script;
};

export default function Comment() {
  return (
    <div
      ref={ele => {
        const scriptElement = makeUtteranceScript();
        ele?.appendChild(scriptElement);
      }}
    ></div>
  );
}
