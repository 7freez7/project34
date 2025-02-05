import React from "react";

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Error 404, Not Found</h1>
      <p>Webová stránka, kterou chcete načíst, byla buď odstraněna, přemístěna, přejmenována nebo jste ji do vyhledávacího řádku prohlížeče zadali s překlepem.</p>
    </div>
  );
};

export default NotFound;
