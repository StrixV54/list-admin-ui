import { useEffect, useState } from "react";
import Table from "./components/Table";

function App() {
  const [usersDataList, setUsersDataList] = useState(null);

  const fetchData = async () => {
    const res = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const result = await res.json();
    return result;
  };

  useEffect(() => {
    fetchData()
      .then((res) => {
        setUsersDataList(res?.map((item) => ({ checked: false, ...item })));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] bg-slate-100 flex items-center justify-center">
      <Table
        usersDataList={usersDataList}
        setUsersDataList={setUsersDataList}
      />
    </div>
  );
}

export default App;
