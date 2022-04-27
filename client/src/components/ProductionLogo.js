import React from "react";

function ProductionLogo({ companies, IMG_URL }) {
  const filterCompanies = companies
    .filter((data) => data.logo_path !== null)
    .slice(0, 3);
  return (
    <>
      {filterCompanies.map((data) => {
        {
          return data.logo_path === null ? null : (
            <img key={data.id} src={`${IMG_URL}original${data.logo_path}`} />
          );
        }
      })}
    </>
  );
}

export default ProductionLogo;
