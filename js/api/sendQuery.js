export default class Api {
  constructor() {}
  getGraphData = async (sentQuery) => {
    let token = localStorage.getItem("jwt");
    console.log(token);
    const res = await fetch(
      "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          query: sentQuery,
        }),
      }
    );
    const data = await res.json();
    console.log("this is the api data",data)
    return data;
  };
}
