import './App.css'
import CreateItemForm from './components/item/CreateItemForm';
import ItemList from './components/item/ItemList';

function App() {
  return (
    <div>
      <div className='md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 p-4'>
      <CreateItemForm />
      <ItemList />
      </div>
    </div>
  )
}

export default App;
