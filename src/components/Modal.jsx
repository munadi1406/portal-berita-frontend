export default function Modal({ active, msg ,closeModal }) {
  return (
    <>
      <div className={`modal ${active?'modal-open':''}`} >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Message</h3>
          <p className="py-4">{msg}</p>
        </div>
        <button
          className="modal-backdrop modal-close" onClick={closeModal}
          htmlFor="my_modal_7"
        >
          Close
        </button>
      </div>
    </>
  );
}
