export function Question() {
  return (
    <div className="fixed bottom-4 right-4">
      <div className="dropdown dropdown-top dropdown-left">
        <div tabIndex={0} role="button" className="btn m-1">
          Click
        </div>
        <div
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow translate-x-16"
        >
          <input />
        </div>
      </div>
    </div>
  );
}
