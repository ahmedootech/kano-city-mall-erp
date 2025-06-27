import { FC } from "react";

import { VendorType } from "../vendor-list/types";
const ViewVendor: FC<{ vendor: VendorType }> = ({ vendor }) => {
  return (
    <section className="container tw-text-sm">
      <div className="row">
        <div className="col-lg-8">
          <h5 className="tw-text-sm text-primary border-bottom pb-1 mb-3">
            PERSONAL INFORMATION
          </h5>
          <div className="mb-3">
            <p className="my-1">Full Name : {vendor.fullName} </p>
            <p className="my-1">Email : {vendor.code} </p>
            <p className="my-1">Email : {vendor.email} </p>
            <p className="my-1">Phone : {vendor.phoneNo} </p>
            <p className="my-1">Alternative Phone : {vendor.alternateNo} </p>
            <p className="my-1">Current Address : {vendor.currentAddress} </p>
            <p className="my-1">
              Permanent Address : {vendor.parmanentAddress}{" "}
            </p>
            <p className="my-1">State : {vendor.state.name} </p>
            <h5 className="tw-text-sm text-primary border-bottom pb-1 mb-3">
              Vendor STATUS
            </h5>
            <div className="mb-3">
              <p className="my-1 ">
                <span
                  className={`
                  ${
                    vendor.status == 1 ? "text-success" : "text-danger"
                  } fw-semibold
                `}
                >
                  {vendor.status == 1 ? "Active" : "Deactivated"}
                </span>
              </p>
            </div>
          </div>

          <h5 className="tw-text-sm text-primary border-bottom pb-1 mb-3">
            GUARANTOR INFORMATION
          </h5>
          <div className="mb-3">
            <p className="my-1">
              Full Name : {vendor.vendor_guarantor?.fullName}{" "}
            </p>
            <p className="my-1">Phone : {vendor.vendor_guarantor?.phoneNo} </p>
            <p className="my-1">
              Alternative Phone : {vendor.vendor_guarantor?.alternateNo}{" "}
            </p>
            <p className="my-1">Email : {vendor.vendor_guarantor?.email} </p>
            <p className="my-1">
              Current Address : {vendor.vendor_guarantor?.currentAddress}{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewVendor;
