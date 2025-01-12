import Header from '../header/header.tsx';

interface ErrorMessageProps {
  message: string | null;
}

function ErrorMessage({ message }: ErrorMessageProps): JSX.Element | null {
  if (!message) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="error-message"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          marginTop: '17%',
          backgroundColor: '#ffebee',
          border: '1px solid #ffcdd2',
          borderRadius: '8px',
          margin: '20px 0',
        }}
      >
        <p className="error-message__text"
          style={{
            color: '#c62828',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            margin: '0',
          }}
        >
          {message}
        </p>
      </div>
    </>
  );
}

export default ErrorMessage;
