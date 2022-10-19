import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Services from "../classes/fetch";

const Home: NextPage = () => {
  const [isVercel, setVercel] = useState(true);
  const [data, setData] = useState({ type: "json", url: "" });
  const router = useRouter();

  const onChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    const res = await Services.Post("api/callback", {
      ...data,
      code: router.query.code,
      next: router.query.next,
    });
    console.log(res);
  };

  useEffect(() => {
    if (!router.query.code || !router.query.next) {
      setVercel(false);
    } else {
      setVercel(true);
    }
  }, [router.query, router.query.code, router.query.next]);

  return (
    <div style={{ padding: "20px" }}>
      {isVercel ? (
        <>
          <h2>Logs Drain</h2>
          <p>
            <select name="type" onChange={onChange}>
              <option value="json">json</option>
              <option value="ndjson">ndjson</option>
              <option value="syslog">syslog</option>
            </select>
            <input
              type="text"
              name="url"
              placeholder="URL"
              onChange={onChange}
            />
            <button onClick={onSubmit}>Submit</button>
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
