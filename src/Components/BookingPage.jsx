import { useParams } from "react-router-dom";

function BookingPage() {

    const {hasPass} = useParams();
    const {payableAmount} = useParams();


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {(hasPass && payableAmount == 0) ? <div>Successfully Booked</div> : <div>Payment Page</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingPage;
