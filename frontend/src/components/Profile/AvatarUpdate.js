import React from "react";

export default function AvatarUpdate() {
  return (
    <>
      <div className="row profile-row justify-content-center">
        <div className="col-md-4">
          <div className="avatar">
            <div className="avatar-bg center"></div>
          </div>
          <input className="form-control" type="file" name="avatar-file" />
        </div>
      </div>
    </>
  );
}
