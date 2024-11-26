import MainSection from '../../pages/main/main.tsx';

type AppSectionProps = {
    numberRentals: number;
}

function App({numberRentals}: AppSectionProps): JSX.Element {
  return (
    < MainSection numberRentals={numberRentals} />
  );
}

export default App;
