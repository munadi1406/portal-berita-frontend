const Sidebar = () => {
  return (
    <>
      <div className="space-y-2">
      <h1 className="font-bold text-xl">Recent</h1>
        <div className="collapse bg-base-200">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
            Click me to show/hide content
          </div>
          <div className="collapse-content bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse bg-base-200">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
            Click me to show/hide content
          </div>
          <div className="collapse-content bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse bg-base-200">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
            Click me to show/hide content
          </div>
          <div className="collapse-content bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse bg-base-200">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
            Click me to show/hide content
          </div>
          <div className="collapse-content bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse bg-base-200">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
            Click me to show/hide content
          </div>
          <div className="collapse-content bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
            <p>hello</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
