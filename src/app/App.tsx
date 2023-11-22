import StoreProvider from './providers/StoreProvider/StoreProvider';
import PageProvider from './providers/PageProvider/PageProvider';



function App() {
  return (
    <StoreProvider>
      <PageProvider />
    </StoreProvider>
  )
}

export default App;
