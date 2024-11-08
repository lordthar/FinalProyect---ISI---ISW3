import React from 'react'

const Alert = (props: { type: any; message: any; }) => {const { type, message } = props;
    let alertClass = '';
  
    switch (type) {
      case 'success':
        alertClass = 'bg-green-100 text-green-800';
        break;
      case 'error':
        alertClass = 'bg-red-100 text-red-800';
        break;
      case 'warning':
        alertClass = 'bg-yellow-100 text-yellow-800';
        break;
      default:
        alertClass = 'bg-blue-100 text-blue-800';
    }
  
    return (
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 mb-4 rounded-md shadow-lg ${alertClass}`}>
        {message}
      </div>
    );
  };
  
  export default Alert;