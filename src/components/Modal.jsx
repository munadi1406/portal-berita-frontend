export default function Modal({status,changeStatus,msg}) {
    console.log(status)
  return (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" checked={status}/>
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">{msg}</p>
        </div>
        <button className="modal-backdrop" htmlFor="my_modal_7" onClick={()=>changeStatus(false)}>
          Close
        </button>
      </div>
    </>
  );
}



