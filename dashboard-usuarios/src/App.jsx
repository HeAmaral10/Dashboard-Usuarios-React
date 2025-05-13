import { useEffect, useState } from 'react'
import UserCard from './components/UserCard';
import './App.css'
import Pagination from './components/Pagination';

let PageSize = 10;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/peoples')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Erro ao buscar usuários:', err));
  }, []);

  const currentUserCard = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  
  return (
    <div className='App'>
      <h1>Dashboard de Usuários</h1>
      <p>Total de Usuários: {users.length}</p>
      <div className='user-container'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
