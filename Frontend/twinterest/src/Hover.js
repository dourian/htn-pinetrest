import React from 'react';

const Hover = () => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        width:'400px',
        height:'300px'
      }}
    >
      <img src="https://via.placeholder.com/100" alt="Sample Image" style={{ width: '50px', height: '50px', borderRadius: '50%' }}/>
      
      <p style={{ marginLeft: '70px', marginTop:'-40px'}}>placeholder</p>

      <img src="https://via.placeholder.com/100" alt="Sample Image" style={{ width: '50px', height: '50px', borderRadius: '50%' }}/>

    </div>
  );
};

export default Hover;