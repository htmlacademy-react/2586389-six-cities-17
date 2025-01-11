import Header from '../header/header.tsx';

function Spinner(): JSX.Element {
  return(
    <div>
      <Header/>
      <div className="spinner"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Занимает всю высоту экрана
        }}
      >
        <div className="spinner__inner"/>
        <p className="spinner__text">Loading...</p>
      </div>
    </div>
  );
}

export default Spinner;
