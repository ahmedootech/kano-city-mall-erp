import { Dispatch, SetStateAction, useEffect, useState } from "react";

import VendorInfo from "./vendor-info";
import GuarantoInfo from "./tenant-guarantor-info";

import { VendorFormData, VendorFormSteps, VendorType } from "../../../tenancy/vendor-list/types";
import { vendorDefaultData } from "../../data";

const VendorForm: React.FC<{
  vendor?: VendorType | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}> = ({ vendor, setRefetch }) => {
  const [vendorData, setVendorData] =
    useState<VendorFormData>(vendorDefaultData);
  //   const [vendorData, setVendorData] = useState<VendorFormData>(() => {
  //   if (vendor) {
  //     return {
  //       vendorPersonalInfo: {
  //         fullName: vendor.fullName || "",
  //         phoneNo: vendor.phoneNo || "",
  //         alternateNo: vendor.alternateNo || "",
  //         email: vendor.email || "",
  //         currentAddress: vendor.currentAddress || "",
  //         parmanentAddress: vendor.parmanentAddress || "",
  //         nationality: vendor.nationality || "",
  //         state_id: vendor.state_id || 0,
  //         gender: vendor.gender || "",
  //         meansOfId: vendor.meansOfId || "",
  //         IDNumber: vendor.IDNumber || "",
  //       },
  //       guarantorInfo: {

  //         guarantorFullName: vendor.vendor_guarantor?.fullName || "",
  //         guarantorPhoneNo: vendor.vendor_guarantor?.phoneNo || "",
  //         guarantorAlternateNo: vendor.vendor_guarantor?.alternateNo || "",
  //         guarantorEmail: vendor.vendor_guarantor?.email || "",
  //         guarantorCurrentAddress: vendor.vendor_guarantor?.currentAddress || "",
  //       },
  //     };
  //   }
  //   return vendorDefaultData;
  // });
  const [step, setStep] = useState<VendorFormSteps>("vendorPersonalInfo");
 
useEffect(() => {
    if (vendor) {
      setVendorData({
        vendorPersonalInfo: {
          fullName: vendor.fullName || "",
          phoneNo: vendor.phoneNo || "",
          alternateNo: vendor.alternateNo || "",
          email: vendor.email || "",
          currentAddress: vendor.currentAddress || "",
          parmanentAddress: vendor.parmanentAddress || "",
          nationality: vendor.nationality || "",
          state_id: vendor.state_id || 0,
          gender: vendor.gender || "",
          meansOfId: vendor.meansOfId || "",
          IDNumber: vendor.IDNumber || "",
        },
        guarantorInfo: {
          guarantorFullName: vendor.vendor_guarantor?.fullName || "",
          guarantorPhoneNo: vendor.vendor_guarantor?.phoneNo || "",
          guarantorAlternateNo: vendor.vendor_guarantor?.alternateNo || "",
          guarantorEmail: vendor.vendor_guarantor?.email || "",
          guarantorCurrentAddress: vendor.vendor_guarantor?.currentAddress || "",
        },
      });
    }
  }, [vendor]);


  return (
    <section className="tw-text-md container">
      {vendor ? (
        <div className="text-center mb-3">
          <h2 className="fs-6 text-primary my-0">Edit Vendor</h2>
          <p className="tw-text-sm my-0">Update Vendor Information</p>
        </div>
      ) : (
        <div className="text-center mb-3">
          <h2 className="fs-6 text-danger my-0">Create New Vendor</h2>
          <p className="tw-text-sm my-0">
            Fill the Input below with the Appropriate Info!
          </p>
        </div>
      )}
      <div className="row">
        <div className="col-lg-8">
          {step === "vendorPersonalInfo" && (
            <VendorInfo
              vendor={vendor}
              vendorData={vendorData}
              setVendorData={setVendorData}
              setStep={setStep}
            />
          )}
          {step === "guarantorInfo" && (
            <GuarantoInfo
              vendor={vendor}
              vendorData={vendorData}
              setVendorData={setVendorData}
              setStep={setStep}
              setRefetch={setRefetch}
              
            />
          )}

        </div>
      </div>
    </section>
  );
};

export default VendorForm;
