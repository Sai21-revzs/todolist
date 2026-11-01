import { useState } from "react";

function InputTask() {
  const [description, setDescription] = useState("");

  const submit = async (e) => { //put api
    e.preventDefault();
    try {
      const body = { description }; //post crud
      await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = '/'
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="list-parent">
      <h2> Input note</h2>
      <form onSubmit = {submit}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
export default InputTask;
