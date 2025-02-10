export default function Page() {
  return (
    <div>
      <h1>Page</h1>
      <p>My page content here</p>
      <div className="grid grid-cols-4 gap-4">
      {/* Secondary */}
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#BA68C8]"></div>
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#BA68C8]"></div>
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#BA68C8]"></div>
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#BA68C8]"></div>
      {/* Background */}
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#E3F2FD]"></div>
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#E3F2FD]"></div>
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#E3F2FD]"></div>
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#E3F2FD]"></div>
      {/* Primary */}
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#393ee3]"></div>
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#393ee3]"></div>
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#393ee3]"></div>
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#393ee3]"></div>
      {/* Ascent */}
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#81ff81]"></div>
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#81ff81]"></div>
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#81ff81]"></div>
      <div className="h-[20vh] w-[20vh] rounded-md bg-[#81ff81]"></div>        
      </div>
    </div>
  );
}