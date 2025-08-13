'use client';

import React from 'react';

const daysOfWeek = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
const highlightedDays = [
  // { day: 30, month: 'julio' },
  { day: 25, month: 'agosto' },
  { day: 30, month: 'agosto' }
];

export default function FakeCalendar() {
  const buildCalendar = (
    startDay: number,
    endDay: number,
    startIndex: number,
    label: string
  ) => {
    const cells: React.ReactNode[] = [];

    // Pad the start
    for (let i = 0; i < startIndex; i++) {
      cells.push(<div key={`${label}-empty-${i}`} />);
    }

    for (let day = startDay; day <= endDay; day++) {
      const isHighlighted = highlightedDays.some(
        d => d.day === day && d.month === label.toLowerCase()
      );

      cells.push(
        <div key={`${label}-${day}`} className="relative flex flex-col items-center justify-center text-xs">
          <div
            className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full 
              ${isHighlighted ? 'bg-[#10B981]/80 text-white font-semibold text-sm' : 'text-gray-400'}`}
          >
            {day}
          </div>
          {isHighlighted && (
            <span className="absolute -bottom-3 text-[9px] text-[#0F172A] font-medium">3PM</span>
          )}
        </div>
      );
    }

    return (
      <>
        <div className="col-span-7 text-[10px] text-gray-500 text-center font-semibold mt-2 mb-1">
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </div>
        <div className="grid grid-cols-7 gap-[2px] mb-2">{cells}</div>
      </>
    );
  };

  return (
    <div className="w-full max-w-xs mx-auto bg-white px-4 py-5 rounded-xl shadow-sm border border-gray-200 scale-95">
      <h3 className="text-xs font-semibold text-center text-[#0F172A] mb-3">
        Fechas del webinar - Agosto 2025
      </h3>

      {/* Week headers */}
      <div className="grid grid-cols-7 text-[10px] text-gray-500 mb-1 text-center font-medium">
        {daysOfWeek.map((day, i) => (
          <div key={i} className="leading-none">
            {day}
          </div>
        ))}
      </div>

      {/* Month Grids */}
      {/* {buildCalendar(14, 31, 0, 'julio')}  July 8 is Tuesday (index 1) */}
      {buildCalendar(10, 31, 6, 'agosto')}  {/* August 1 is Friday (index 4) */}
    </div>
  );
}
