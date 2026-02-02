const baseUrl = `http://localhost:4000`;

export const getData = async function (endpoint) {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`error here ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getDataById = async function (endpoint, id) {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}/${id}`);

    if (!response.ok) {
      throw new Error(`error here ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const sendData = async function (endpoint, data) {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`error here ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteData = async function (endpoint, id) {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Something wrong delete ${response.status}`);
    }
    console.log("delete ok");
    return true;
  } catch (err) {
    throw err;
  }
};

export const patchData = async function (endpoint, id, data) {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Something wrong delete ${response.status}`);
    }
    console.log("change ok");
    return true;
  } catch (err) {
    throw err;
  }
};
