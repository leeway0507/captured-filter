import React from 'react';

export default async function Home() {
  const htmlContent = await fetch('http://localhost:8080/product/1', {
    headers: {
      'Content-Type': 'text/html',
    },
  });
  return (
    <div dangerouslySetInnerHTML={{ __html: await htmlContent.text() }} />
  );
}
