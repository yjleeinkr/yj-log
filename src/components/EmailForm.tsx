'use client';

export default function EmailForm() {
  return (
    <form className="bg-lightgrey w-full sm:w-[90%] md:w-[70%] m-zero-auto p-3 rounded-lg">
      <h3 className="text-primary text-start py-2">Your email address</h3>
      <input
        type="text"
        className="w-full focus:outline-none focus:border-secondary focus:shadow-input py-1 px-2 text-sm"
      />
      <h3 className="text-primary text-start py-2">Subject</h3>
      <input
        type="text"
        className="w-full focus:outline-none focus:border-secondary focus:shadow-input py-1 px-2 text-sm"
      />
      <h3 className="text-primary text-start py-2">Message</h3>
      <textarea className="w-full resize-none h-44 focus:outline-none focus:border-secondary focus:shadow-input py-1 px-2 text-sm" />
      <button className="bg-point w-full mt-2 py-2 font-bold">Submit</button>
    </form>
  );
}
