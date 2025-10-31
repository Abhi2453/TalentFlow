import React from "react";
import { FileText, Workflow, CheckCircle, HelpCircle } from "lucide-react";

const JobProfileNavBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "description", label: "Job Description", shortLabel: "Description", icon: FileText },
    { id: "workflow", label: "Hiring Workflow", shortLabel: "Workflow", icon: Workflow },
    { id: "eligibility", label: "Eligibility Criteria", shortLabel: "Eligibility", icon: CheckCircle },
    { id: "questions", label: "Additional Questions", shortLabel: "Questions", icon: HelpCircle },
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm  top-0 z-30">
      <div className="w-full">
        <nav 
          className="flex overflow-x-auto scrollbar-hide" 
          role="tablist"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const IconComponent = tab.icon;
            
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 min-w-fit px-3 sm:px-4 md:px-6 py-3 sm:py-4 
                  font-medium text-xs sm:text-sm 
                  transition-all duration-200 relative
                  flex items-center justify-center gap-1.5 sm:gap-2 
                  whitespace-nowrap group
                  ${isActive 
                    ? 'text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {/* Background hover effect */}
                <div className={`
                  absolute inset-0 transition-all duration-200
                  ${isActive 
                    ? 'bg-gray-100' 
                    : 'bg-transparent group-hover:bg-gray-50 group-active:bg-gray-100'
                  }
                `}></div>
                
                {/* Content */}
                <div className="relative flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                  <IconComponent 
                    size={18} 
                    className={`transition-all duration-200 flex-shrink-0 ${
                      isActive 
                        ? 'text-gray-900' 
                        : 'text-gray-500 group-hover:text-gray-900'
                    }`}
                  />
                  {/* Show short label on mobile, full label on desktop */}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden text-[10px] sm:text-xs">{tab.shortLabel}</span>
                </div>
                
                {/* Active indicator */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-[2px] sm:h-[3px] bg-gray-900 
                  transition-all duration-300 rounded-t-sm
                  ${isActive ? 'opacity-100' : 'opacity-0 scale-x-0'}
                `}></div>
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* Add this CSS to hide scrollbar */}
      <style jsx>{`
        nav::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default JobProfileNavBar;
