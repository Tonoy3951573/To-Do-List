import { useRef } from "react";

function TabsAndControl({ activeTab, setActiveTab }) {

  const tabs = ['all','active','completed'];
  const tabRefs = useRef([]);
  const activeIndex = tabs.indexOf(activeTab);

  return (
    <nav className="filter-tabs">

      <div className="tabs-list">

        <div
          className="tab-slider"
          style={{
            width: tabRefs.current[activeIndex]?.offsetWidth - 8,
            transform: `translateX(${tabRefs.current[activeIndex]?.offsetLeft}px)`
          }}
        />

        {tabs.map((tab, i) => (
          <button
            key={tab}
            ref={(el) => tabRefs.current[i] = el}
            onClick={() => setActiveTab(tab)}
            className={`tab-item ${activeTab === tab ? 'active': ''}`}
          >
            {tab}
          </button>
        ))}

      </div>

    </nav>
  );
}

export default TabsAndControl;