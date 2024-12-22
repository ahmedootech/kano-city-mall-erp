import { IconType } from "react-icons";
import { MdOutlineArrowUpward } from "react-icons/md";
import { MdOutlineArrowDownward } from "react-icons/md";

const MetricCard: React.FC<{
  label: string;
  value: number;
  Icon?: IconType;
  change?: number;
}> = ({ Icon, value, label, change }) => {
  return (
    <div className="tw-rounded-md d-flex flex-column gap-3  px-3 px-lg-4 py-2 py-lg-3  border tw-border-gray-50 bg-white">
      {Icon && (
        <div className={`rounded-full p-2`}>
          <Icon size={24} />
        </div>
      )}
      <div className="d-flex flex-column gap-2">
        <p className="tw-text-[13px] tw-text-gray-600">{label}</p>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-semibold fs-5 tw-text-gray-600">
            {Number(value).toLocaleString()}
          </h5>
          {change ? (
            <>
              <span
                className={`d-flex align-items-center gap-1 tw-green-50 tw-text-xs px-1 rounded ${
                  change > 0 ? "tw-bg-green-100" : "tw-bg-red-100"
                }`}
              >
                {change > 0 ? (
                  <MdOutlineArrowUpward />
                ) : (
                  <MdOutlineArrowDownward />
                )}
                {Math.abs(change)}%
              </span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
