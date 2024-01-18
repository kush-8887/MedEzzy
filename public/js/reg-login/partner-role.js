// const { response } = require("express");

const sellerBtn = document.getElementById("seller");
const doctorBtn = document.getElementById("doctor");
const deliveryPartBtn = document.getElementById("delivery-part");

sellerBtn.addEventListener("click", async (e) => {
  const url = "/partner-role/seller";
  const data = {
    "role": "seller",
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
});
