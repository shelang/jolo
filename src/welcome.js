import React from 'react';

function Welcome(props) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 16,
      }}
    >
      <h1>Welcome</h1>
      <h4>The System in under develope...</h4>
      <p>
        plz be patient the <strong>{props.sectionName}</strong> section will
        place here.
      </p>
    </div>
  );
}

export default Welcome;
