import { useEffect, useMemo, useState } from 'react';
import UserCard from './components/UserCard';
import Pagination from './components/Pagination';
import './App.css';

let PageSize = 10;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/peoples')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Erro ao buscar usuários:', err));
  }, []);

  const currentUserCard = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, users]);

  return (
    <div className='App'>
      <h1>Dashboard de Usuários</h1>
      <p>Total de Usuários: {users.length}</p>
      
      <div className='user-container'>
        {currentUserCard.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
}

export default App;