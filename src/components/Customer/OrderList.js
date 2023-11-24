import moment from "moment";

const OrderList = ({ order }) => {
  return (
    <>
      <div className="bg-white flex flex-col justify-between mb-8 ">
        <div className="px-4 py-2   rounded shadow-md">
          <div className="flex justify-between ">
            <div className="flex gap-4  ">
              <h2 className="font-medium text-lg">
                Order ID:{" "}
                <span className="text-sm font-normal text-[#333]">
                  {" "}
                  {order?.id}
                </span>{" "}
              </h2>
              {order?.status === "delivered" && (
                <span className="px-3 py-1 text-black bg-green-500 rounded-md font-medium">
                  {order?.status}
                </span>
              )}
              {order?.status === "cancelled" && (
                <span className="px-3 py-1 text-black bg-red-500 rounded-md font-medium">
                  {order?.status}
                </span>
              )}
              {order?.status === "intransit" && (
                <span className="px-3 py-1 text-black bg-[#e37c3b] rounded-md font-medium">
                  {order?.status}
                </span>
              )}
            </div>
            <h2>
              Order Date: {moment(order?.createdAt).format("MMMM DD, YYYY")}
            </h2>
          </div>

          <div className="flex ">
            <img
              src={""}
              className="block object-cover max-h-[100px] max-w-[100px] p-2 mr-2"
              alt="Imgg"
            />
            <div>
              <p className="font-medium text-xl ">
                {order?.car}-{order?.carModel}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2 bg-green-200">
          <div>
            <span className="font-medium text-base">Total Amount:</span>
            <span className="font-medium text-md"> $ {order?.totalFare}</span>
          </div>
          <div>
            <span className="font-medium text-base"> Jouney Start Date:</span>
            <span className="font-medium text-md">
              {" "}
              {moment(order?.startDate).format("MMMM DD, YYYY")}
            </span>
          </div>
          <div>
            <span className="font-medium text-base"> Jouney Start Date:</span>
            <span className="font-medium text-md">
              {" "}
              {moment(order?.startDate).format("MMMM DD, YYYY")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderList;
