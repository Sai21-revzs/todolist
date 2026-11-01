import { useState } from "react";

function EditTask({task}) {
  const [description, setDescription] = useState(task.description);

  const updateTask = async (e) => {//update api
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`http://localhost:5000/tasks/${task.listid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={updateTask}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button>Edit</button>
      </form>
    </div>
  );
}

export default EditTask