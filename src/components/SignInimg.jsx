import React from "react";
//Right Alighned image for sign-in and sign-up image
export default function SignIn() {
  return (
    <>
      <div className="right_data" style={{ width: "100%" }}>
        <div className="sign_img">
          <img
            src="./signup.png"
            style={{ maxWidth: 480, marginRight: "20px" }}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
