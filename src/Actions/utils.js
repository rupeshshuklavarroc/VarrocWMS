// Function to fetch data from the API based on formData for product
export const fetchDataFromQR = async (formData) => {
  const apiUri = "http://localhost:4000/product";
  const response = await fetch(apiUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

// Function to fetch data from the API based on formData for location
export const fetchDataFromLocation = async (formData) => {
  const apiUri = "http://localhost:4000/location";
  const response = await fetch(apiUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

// Function to fetch user data from the API based on formData
export const fetchUser = async (formData) => {
  const apiUri = "http://localhost:4000/user";
  const response = await fetch(apiUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

// Function to perform an operation and send formData to the backend
export const Op = async (formData) => {
  const apiUri = "http://localhost:4000/op";
  const response = await fetch(apiUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

// Function to fetch parameters data from the API
export const Params = async () => {
  const apiUri = "http://localhost:4000/paramData";
  const response = await fetch(apiUri, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

// Function to fetch common live data from the API
export const ComLive = async () => {
  const apiUri = "http://localhost:4000/comLive";
  const response = await fetch(apiUri, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

// Function to fetch live data from the API based on formData
export const LiveData = async (formData) => {
  const apiUri = "http://localhost:4000/liveData";
  const response = await fetch(apiUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

// Function to fetch transaction data from the API
export const TranData = async () => {
  const apiUri = "http://localhost:4000/Tran";
  const response = await fetch(apiUri, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

// Function to fetch quantity data from the API based on formData
export const Quantity = async (formData) => {
  const apiUri = "http://localhost:4000/quantity";
  const response = await fetch(apiUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

// Function to fetch quantity data from the API based on formData
export const QuantityFetch = async (formData) => {
  const apiUri = "http://localhost:4000/quantityfetch";
  const response = await fetch(apiUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};
