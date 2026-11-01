import { useState, useEffect } from "react";
import EditTask from '../components/EditTask.jsx';

function ListTasks() {
  const [lists, setList] = useState([]);

  const getList = async () => { //get crud
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      setList(data);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteList = async (id) => { //delete crud
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      setList(lists.filter((listahan) => listahan.listid !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((list) => (
            <tr key={list.listid}>
              <td>{list.description}</td>
              <td>
                <button onClick={() => deleteList(list.listid)}>Delete</button>
              </td>
              <td><EditTask task={list}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ListTasks;
