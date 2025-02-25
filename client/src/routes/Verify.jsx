import React, { useState } from "react";
import CodeVerification from "../components/CodeVerification";
import ValidationPage from "../components/ValidationPage";


function Verify() {



  const [validationPage, setValidationPage] = useState(false); 
  const [product, setProduct] = useState(null);

  const handleSetProduct = (obj) => {
    setProduct(obj);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      

      {validationPage ? (
        <ValidationPage setValidationPage={setValidationPage} clearProduct={handleSetProduct} product={product} />
      ) : (
        <CodeVerification
          setValidationPage={setValidationPage}
          setProduct={handleSetProduct}

        />
      )}
    </div>
  );
}

export default Verify;