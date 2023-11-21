import StoreProvider from './providers/StoreProvider';
import PageProvider from './providers/PageProvider';



function App() {
  return (
    <StoreProvider>
      <PageProvider />
    </StoreProvider>
  )
}

export default App;
