

const UpdateUsername = () => {
    return (
        <div className="grid grid-cols-1 bg-base-200 p-4 rounded-md space-y-3">
            <div className="text-3xl font-sans">Ganti Username</div>
            <form className="flex flex-col space-y-4">
                <label htmlFor="username">Username Baru</label>
                <input type="text" placeholder="Type here" id="username" className="input input-bordered input-info w-full" />
                <button className="btn btn-info text-base-200" type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateUsername